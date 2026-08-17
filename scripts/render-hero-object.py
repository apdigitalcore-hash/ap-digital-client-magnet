"""
Renders the hero object for ap-digital.ca.

A raymarched glossy torus: an original abstract form, physically lit, exported
with a transparent background so it can drop straight into the hero's existing
light-fan + contact-shadow composition.

Why a torus: it reads as a deliberate designed object (not ambiguous hardware),
its curvature produces a long specular sweep that catches the hero's overhead
light, and the hole lets the background light fan show through — which ties the
object into the scene instead of pasting it on top.
"""

import numpy as np
from PIL import Image, ImageFilter

W, H = 1600, 1200
SS = 2                      # supersample factor
RW, RH = W * SS, H * SS

MAX_STEPS = 220
MAX_DIST = 60.0
SURF_EPS = 0.0006

# ── Scene ────────────────────────────────────────────────────────────────────

CAM = np.array([0.0, 3.30, 5.90])
TARGET = np.array([0.0, 0.00, 0.0])
FOV = 0.29

# Key light sits high and slightly camera-left, matching the hero's light fan.
KEY_DIR = np.array([-0.42, 0.86, 0.30])
KEY_DIR /= np.linalg.norm(KEY_DIR)

TORUS_R = 1.70              # major radius
TORUS_r = 0.46              # minor radius


def normalize(v):
    n = np.linalg.norm(v, axis=-1, keepdims=True)
    return v / np.maximum(n, 1e-9)


def sd_torus(p):
    """Signed distance to a torus lying in the XZ plane, tilted toward camera."""
    # Tilt the ring back ~22 degrees so we see through the hole.
    a = np.radians(8.0)
    ca, sa = np.cos(a), np.sin(a)
    y = p[..., 1] * ca - p[..., 2] * sa
    z = p[..., 1] * sa + p[..., 2] * ca
    x = p[..., 0]

    q_x = np.sqrt(x * x + z * z) - TORUS_R
    return np.sqrt(q_x * q_x + y * y) - TORUS_r


def scene(p):
    return sd_torus(p)


def raymarch(ro, rd):
    """March rays; returns (distance, hit-mask)."""
    n = rd.shape[0]
    t = np.zeros(n)
    hit = np.zeros(n, dtype=bool)
    active = np.ones(n, dtype=bool)

    for _ in range(MAX_STEPS):
        if not active.any():
            break
        p = ro + rd * t[:, None]
        d = scene(p)

        newly_hit = active & (d < SURF_EPS)
        hit |= newly_hit
        active &= ~newly_hit

        too_far = active & (t > MAX_DIST)
        active &= ~too_far

        t = np.where(active, t + np.maximum(d, SURF_EPS) * 0.85, t)

    return t, hit


def normals(p):
    """Central-difference gradient of the SDF."""
    e = 0.0009
    dx = np.array([e, 0, 0])
    dy = np.array([0, e, 0])
    dz = np.array([0, 0, e])
    n = np.stack([
        scene(p + dx) - scene(p - dx),
        scene(p + dy) - scene(p - dy),
        scene(p + dz) - scene(p - dz),
    ], axis=-1)
    return normalize(n)


def soft_shadow(p, ldir, k=14.0):
    """Percentage-closer soft shadow by marching toward the light."""
    n = p.shape[0]
    res = np.ones(n)
    t = np.full(n, 0.045)
    active = np.ones(n, dtype=bool)

    for _ in range(56):
        if not active.any():
            break
        h = scene(p + ldir * t[:, None])
        res = np.where(active, np.minimum(res, k * h / np.maximum(t, 1e-4)), res)
        blocked = active & (h < 0.0008)
        res = np.where(blocked, 0.0, res)
        active &= ~blocked
        t = np.where(active, t + np.clip(h, 0.012, 0.30), t)
        active &= t < 9.0

    return np.clip(res, 0.0, 1.0)


def env(rd):
    """
    Studio environment for a black glossy subject: near-black almost everywhere,
    with a bright overhead softbox and a thin horizon strip. Black gloss reads
    as *dark with bright streaks* — a uniformly lit environment flattens it to
    grey, which is what a naive gradient sky does.
    """
    y = rd[..., 1]
    x = rd[..., 0]

    # Dark base — the room is black.
    base = np.stack([
        np.full_like(y, 0.012),
        np.full_like(y, 0.013),
        np.full_like(y, 0.016),
    ], axis=-1)

    # Overhead softbox: a broad, very bright panel above the subject.
    box = np.clip((y - 0.38) / 0.52, 0.0, 1.0) ** 1.25
    base += box[..., None] * np.array([2.55, 2.58, 2.65])

    # Secondary strip light, camera-left and lower — gives a second sweep.
    strip = np.exp(-(((y - 0.10) / 0.11) ** 2)) * np.clip(-x, 0.0, 1.0) ** 1.5
    base += strip[..., None] * np.array([0.85, 0.90, 1.05])

    # Faint horizon bounce so the underside is not pure void.
    horizon = np.exp(-(((y + 0.16) / 0.16) ** 2)) * 0.16
    base += horizon[..., None] * np.array([0.55, 0.58, 0.66])

    return np.clip(base, 0.0, 8.0)


def render():
    # Camera basis
    fwd = normalize(TARGET - CAM)
    right = normalize(np.cross(fwd, np.array([0.0, 1.0, 0.0])))
    up = np.cross(right, fwd)

    yy, xx = np.mgrid[0:RH, 0:RW]
    ndc_x = (xx + 0.5) / RW * 2 - 1
    ndc_y = 1 - (yy + 0.5) / RH * 2
    aspect = RW / RH

    rd = normalize(
        fwd
        + right * (ndc_x * aspect * FOV)[..., None]
        + up * (ndc_y * FOV)[..., None]
    ).reshape(-1, 3)
    ro = np.broadcast_to(CAM, rd.shape).copy()

    t, hit = raymarch(ro, rd)

    rgb = np.zeros((rd.shape[0], 3))
    alpha = np.zeros(rd.shape[0])

    idx = np.where(hit)[0]
    if len(idx):
        p = ro[idx] + rd[idx] * t[idx][:, None]
        n = normals(p)
        v = -rd[idx]

        ndl = np.clip((n * KEY_DIR).sum(-1), 0.0, 1.0)
        sh = soft_shadow(p + n * 0.006, KEY_DIR)

        # Reflection vector -> environment
        refl = rd[idx] - 2.0 * (rd[idx] * n).sum(-1, keepdims=True) * n
        env_col = env(normalize(refl))

        # Fresnel — grazing angles reflect far more.
        cos_t = np.clip((n * v).sum(-1), 0.0, 1.0)
        F0 = 0.055
        fres = F0 + (1.0 - F0) * (1.0 - cos_t) ** 5.0

        # Base albedo: near-black, matching the site's #0C0E11 anchors.
        albedo = np.array([0.016, 0.018, 0.021])
        diffuse = albedo * (0.10 + 0.90 * (ndl * sh))[:, None]

        # Sharp specular highlight from the key light.
        h_vec = normalize(KEY_DIR + v)
        ndh = np.clip((n * h_vec).sum(-1), 0.0, 1.0)
        spec = (ndh ** 1400.0) * sh * 5.0

        col = diffuse + env_col * (fres[:, None] * 0.55 + 0.14) + spec[:, None]

        # Gentle contact darkening near the ring's inner curve.
        col *= (0.72 + 0.28 * np.clip(ndl * sh + 0.35, 0.0, 1.0))[:, None]

        rgb[idx] = col
        alpha[idx] = 1.0

    # Tonemap (Reinhard) + sRGB
    rgb = rgb / (1.0 + rgb)
    rgb = np.clip(rgb, 0.0, 1.0) ** (1.0 / 2.2)

    rgb = rgb.reshape(RH, RW, 3)
    alpha = alpha.reshape(RH, RW)

    rgba = np.dstack([rgb, alpha])
    img = Image.fromarray((rgba * 255).astype(np.uint8), mode='RGBA')
    img = img.resize((W, H), Image.LANCZOS)

    # Soften the alpha edge a hair so it composites cleanly on any background.
    r, g, b, a = img.split()
    a = a.filter(ImageFilter.GaussianBlur(0.6))
    img = Image.merge('RGBA', (r, g, b, a))

    return img


if __name__ == '__main__':
    out = render()
    bbox = out.getbbox()
    # Crop tight to the object with a small breathing margin, so the site
    # controls spacing rather than inheriting baked-in transparent padding.
    pad = 24
    box = (max(0, bbox[0] - pad), max(0, bbox[1] - pad),
           min(out.width, bbox[2] + pad), min(out.height, bbox[3] + pad))
    out = out.crop(box)
    out.save('hero-object.png')
    print('rendered + cropped ->', out.size)
