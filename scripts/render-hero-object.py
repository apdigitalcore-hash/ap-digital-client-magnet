"""
Renders the hero object for ap-digital.ca.

A raymarched glossy sphere with a yin-yang finish, exported with a transparent
background so it drops into the hero's existing light-fan + contact-shadow
composition.

Lighting notes: black gloss reads as *dark with bright reflection sweeps*, so
the environment is a near-black room with one bright overhead softbox and a
side strip. A uniformly bright sky flattens the whole surface to grey.

Run:  python3 scripts/render-hero-object.py
Out:  public/hero-object.png / .webp
"""

import os
import numpy as np
from PIL import Image, ImageFilter

W, H = 1600, 1600
SS = 2                      # supersample factor
RW, RH = W * SS, H * SS

MAX_STEPS = 200
MAX_DIST = 60.0
SURF_EPS = 0.0006

OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public')

# ── Scene ────────────────────────────────────────────────────────────────────

CAM = np.array([0.0, 0.85, 6.30])
TARGET = np.array([0.0, 0.0, 0.0])
FOV = 0.35

# Key light high and slightly camera-left, matching the hero's light fan.
KEY_DIR = np.array([-0.40, 0.86, 0.32])
KEY_DIR /= np.linalg.norm(KEY_DIR)

SPHERE_R = 1.70

# Yin-yang tilt (degrees) so the S-curve reads dynamically rather than dead-on.
PATTERN_TILT = -18.0


def normalize(v):
    n = np.linalg.norm(v, axis=-1, keepdims=True)
    return v / np.maximum(n, 1e-9)


def scene(p):
    return np.linalg.norm(p, axis=-1) - SPHERE_R


def raymarch(ro, rd):
    n = rd.shape[0]
    t = np.zeros(n)
    hit = np.zeros(n, dtype=bool)
    active = np.ones(n, dtype=bool)

    for _ in range(MAX_STEPS):
        if not active.any():
            break
        d = scene(ro + rd * t[:, None])

        newly_hit = active & (d < SURF_EPS)
        hit |= newly_hit
        active &= ~newly_hit

        active &= t <= MAX_DIST
        t = np.where(active, t + np.maximum(d, SURF_EPS) * 0.9, t)

    return t, hit


def env(rd):
    """Studio environment tuned for a black-and-white glossy subject."""
    y = rd[..., 1]
    x = rd[..., 0]

    base = np.stack([
        np.full_like(y, 0.015),
        np.full_like(y, 0.016),
        np.full_like(y, 0.019),
    ], axis=-1)

    # Overhead softbox.
    box = np.clip((y - 0.36) / 0.54, 0.0, 1.0) ** 1.2
    base += box[..., None] * np.array([2.40, 2.43, 2.50])

    # Strip light, camera-left and lower.
    strip = np.exp(-(((y - 0.08) / 0.12) ** 2)) * np.clip(-x, 0.0, 1.0) ** 1.5
    base += strip[..., None] * np.array([0.80, 0.85, 1.00])

    # Faint horizon bounce.
    horizon = np.exp(-(((y + 0.18) / 0.17) ** 2)) * 0.18
    base += horizon[..., None] * np.array([0.55, 0.58, 0.66])

    return np.clip(base, 0.0, 8.0)


def yin_yang_mask(u, v):
    """
    Classic taijitu on the unit disc, returned as a 0..1 'is light' mask.

    Construction: two half-circles of radius 1/2 centred at (0, +1/2) and
    (0, -1/2) form the S-curve; outside them the disc splits left/right. Each
    lobe carries a small dot of the opposite tone.
    """
    a = np.radians(PATTERN_TILT)
    ca, sa = np.cos(a), np.sin(a)
    ur = u * ca - v * sa
    vr = u * sa + v * ca

    d_top = np.sqrt(ur ** 2 + (vr - 0.5) ** 2)
    d_bot = np.sqrt(ur ** 2 + (vr + 0.5) ** 2)

    light = np.where(d_top <= 0.5, 1.0, np.where(d_bot <= 0.5, 0.0, (ur <= 0).astype(float)))

    # Eyes — opposite tone, radius 1/8.
    light = np.where(d_top <= 0.125, 0.0, light)
    light = np.where(d_bot <= 0.125, 1.0, light)

    return light


def render():
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
        n = p / SPHERE_R                      # exact normal for a sphere
        v = -rd[idx]

        ndl = np.clip((n * KEY_DIR).sum(-1), 0.0, 1.0)

        # Pattern coordinates: project the normal onto the camera-facing frame,
        # so the taijitu reads as painted on the ball and compresses naturally
        # toward the silhouette.
        u_c = (n * right).sum(-1)
        v_c = (n * up).sum(-1)
        light = yin_yang_mask(u_c, v_c)

        # Soften the tone boundary a touch so it survives downscaling.
        albedo = (np.array([0.010, 0.011, 0.013])[None, :] * (1 - light)[:, None]
                  + np.array([0.940, 0.944, 0.952])[None, :] * light[:, None])

        refl = rd[idx] - 2.0 * (rd[idx] * n).sum(-1, keepdims=True) * n
        env_col = env(normalize(refl))

        cos_t = np.clip((n * v).sum(-1), 0.0, 1.0)
        F0 = 0.055
        fres = F0 + (1.0 - F0) * (1.0 - cos_t) ** 5.0

        # Ambient term keeps the white side from going flat grey in shadow.
        ambient = 0.30 + 0.16 * np.clip(n[..., 1] * 0.5 + 0.5, 0.0, 1.0)
        diffuse = albedo * (ambient + 0.72 * ndl)[:, None]

        h_vec = normalize(KEY_DIR + v)
        ndh = np.clip((n * h_vec).sum(-1), 0.0, 1.0)
        spec = (ndh ** 900.0) * 3.0

        col = diffuse + env_col * (fres[:, None] * 0.34 + 0.05) + spec[:, None]

        rgb[idx] = col
        alpha[idx] = 1.0

    # Reinhard crushed the light half to mid-grey — at these radiance levels it
    # never approaches 1.0. Straight exposure + clamp keeps the white white and
    # the black genuinely black, which is the whole point of the motif.
    rgb = np.clip(rgb * 1.22, 0.0, 1.0) ** (1.0 / 2.2)

    rgb = rgb.reshape(RH, RW, 3)
    alpha = alpha.reshape(RH, RW)

    img = Image.fromarray((np.dstack([rgb, alpha]) * 255).astype(np.uint8), mode='RGBA')
    img = img.resize((W, H), Image.LANCZOS)

    r, g, b, a = img.split()
    a = a.filter(ImageFilter.GaussianBlur(0.6))
    img = Image.merge('RGBA', (r, g, b, a))

    bbox = img.getbbox()
    pad = 20
    img = img.crop((
        max(0, bbox[0] - pad), max(0, bbox[1] - pad),
        min(img.width, bbox[2] + pad), min(img.height, bbox[3] + pad),
    ))
    return img


if __name__ == '__main__':
    out = render()
    out.save(os.path.join(OUT_DIR, 'hero-object.png'), optimize=True)
    out.save(os.path.join(OUT_DIR, 'hero-object.webp'), 'WEBP', quality=92, method=6)
    print('rendered ->', out.size)
