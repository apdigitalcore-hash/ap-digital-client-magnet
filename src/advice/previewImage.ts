import type { Simulation } from './types';
import { creativeAspect, previewPair, type PreviewCard } from './adPreview';

/**
 * Paints the ad preview as a PNG, for sharing.
 *
 * Drawn on a canvas rather than screenshotted from the DOM so it needs no
 * library and works the same whether or not the report is on screen. It takes
 * its content from previewPair, the same function the report and the PDF use,
 * so the three cannot disagree about where the text is cut.
 *
 * Carries no platform branding, by design — it is a mockup of a layout.
 */
const W = 1200;
const PAD = 48;
const GAP = 32;

function wrap(ctx: CanvasRenderingContext2D, text: string, max: number): string[] {
  const out: string[] = [];
  for (const para of text.split('\n')) {
    let line = '';
    for (const word of para.split(' ')) {
      const next = line ? `${line} ${word}` : word;
      if (ctx.measureText(next).width > max && line) { out.push(line); line = word; } else { line = next; }
    }
    out.push(line);
  }
  return out;
}

const loadImage = (src: string) =>
  new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

export async function renderPreviewImage(sim: Simulation): Promise<Blob | null> {
  const p = previewPair(sim);
  if (!p) return null;

  const colW = (W - PAD * 2 - GAP) / 2;
  const img = p.image ? await loadImage(`data:${p.image.mime};base64,${p.image.data}`) : null;

  // Measure first so the canvas is exactly as tall as the content.
  const probe = document.createElement('canvas').getContext('2d')!;
  const measure = (c: PreviewCard) => {
    let h = 56; // label + card padding
    probe.font = '400 20px -apple-system, Helvetica, Arial, sans-serif';
    if (p.kind === 'search') {
      h += 28 + 34 + wrap(probe, c.description, colW - 56).length * 26 + 32;
    } else {
      h += wrap(probe, c.primaryText + (c.truncated ? '… See more' : ''), colW - 56).length * 26;
      if (img) h += (colW / creativeAspect(p.image)) + 20;
      probe.font = '600 22px -apple-system, Helvetica, Arial, sans-serif';
      h += wrap(probe, c.headline, colW - 56).length * 28 + 44;
    }
    return h;
  };
  const cardH = Math.max(measure(p.yours), measure(p.rewritten));
  const H = PAD * 2 + 44 + cardH + 56;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#f5f5f7';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#1d1d1f';
  ctx.font = '600 26px -apple-system, Helvetica, Arial, sans-serif';
  ctx.fillText(sim.inputs.campaignName || 'Ad preview', PAD, PAD + 12);

  const withheld = !!sim.results.recommendations.claimNotice;
  const cards: [string, PreviewCard][] = withheld
    ? [['YOUR AD', p.yours]]
    : [['YOUR AD', p.yours], ['REWRITTEN', p.rewritten]];
  cards.forEach(([title, c], col) => {
    const x = PAD + col * (colW + GAP);
    let y = PAD + 52;

    ctx.fillStyle = '#86868b';
    ctx.font = '600 14px -apple-system, Helvetica, Arial, sans-serif';
    ctx.fillText(title, x, y);
    y += 22;

    const top = y;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = 'rgba(0,0,0,0.08)';
    ctx.beginPath();
    ctx.roundRect(x, top, colW, cardH - 44, 16);
    ctx.fill();
    ctx.stroke();
    y += 28;

    if (p.kind === 'search') {
      ctx.fillStyle = '#6e6e73';
      ctx.font = '400 18px -apple-system, Helvetica, Arial, sans-serif';
      ctx.fillText(`Ad · ${c.displayUrl || ''}`, x + 28, y); y += 32;
      ctx.fillStyle = '#1a0dab';
      ctx.font = '400 26px -apple-system, Helvetica, Arial, sans-serif';
      for (const l of wrap(ctx, c.headline, colW - 56)) { ctx.fillText(l, x + 28, y); y += 32; }
      y += 2;
      ctx.fillStyle = '#4d5156';
      ctx.font = '400 20px -apple-system, Helvetica, Arial, sans-serif';
      for (const l of wrap(ctx, c.description + (c.truncated ? '…' : ''), colW - 56)) { ctx.fillText(l, x + 28, y); y += 26; }
    } else {
      ctx.fillStyle = '#1d1d1f';
      ctx.font = '400 20px -apple-system, Helvetica, Arial, sans-serif';
      for (const l of wrap(ctx, c.primaryText + (c.truncated ? '… See more' : ''), colW - 56)) { ctx.fillText(l, x + 28, y); y += 26; }
      y += 8;
      if (img) {
        const h = colW / creativeAspect(p.image);
        ctx.drawImage(img, x, y, colW, h);
        y += h + 20;
      }
      // The headline wraps like any other text: left unwrapped it ran past the
      // edge of the card in the exported image.
      ctx.fillStyle = '#1d1d1f';
      ctx.font = '600 22px -apple-system, Helvetica, Arial, sans-serif';
      for (const l of wrap(ctx, c.headline, colW - 56)) { ctx.fillText(l, x + 28, y); y += 28; }
    }
  });

  ctx.fillStyle = '#86868b';
  ctx.font = '400 16px -apple-system, Helvetica, Arial, sans-serif';
  ctx.fillText('Preview of layout and truncation — not a screenshot of any platform · ADvice by AP Digital Co.', PAD, H - PAD + 10);

  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), 'image/png'));
}
