import { CONVERSION_NOUN, type Objective, type Range, type Simulation } from './types';

/**
 * Builds the report as a real PDF file.
 *
 * The button used to call window.print(), which opens the print dialog and
 * leaves saving to the visitor. This draws the report directly so "Download"
 * downloads something — and it stays legible in black on white rather than
 * depending on the browser printing dark backgrounds.
 */
const money = (n: number) => (n >= 100 ? `$${Math.round(n).toLocaleString('en-US')}` : `$${n.toFixed(2)}`);
const int = (n: number) => Math.round(n).toLocaleString('en-US');
const pct = (n: number) => `${n.toFixed(n < 10 ? 1 : 0)}%`;
const span = (r: Range, f: (n: number) => string) =>
  Math.abs(r.high - r.low) < 1e-9 ? f(r.low) : `${f(r.low)} – ${f(r.high)}`;

export async function downloadReportPdf(sim: Simulation): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });

  const M = 56;                       // page margin
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const COL = W - M * 2;
  let y = M;

  const room = (needed: number) => {
    if (y + needed > H - M) {
      doc.addPage();
      y = M;
    }
  };
  const text = (s: string, size: number, style: 'normal' | 'bold' = 'normal', colour = '#1d1d1f', indent = 0) => {
    doc.setFont('helvetica', style).setFontSize(size).setTextColor(colour);
    const lines = doc.splitTextToSize(s, COL - indent) as string[];
    room(lines.length * (size + 4));
    doc.text(lines, M + indent, y);
    y += lines.length * (size + 4);
  };
  const rule = (gap = 14) => {
    y += gap;
    room(1);
    doc.setDrawColor('#d2d2d7').line(M, y, W - M, y);
    y += gap;
  };
  const heading = (s: string) => {
    room(40);
    text(s, 13, 'bold');
    y += 4;
  };

  const { inputs: i, results: r } = sim;
  const p = r.predictions;

  // ── header ────────────────────────────────────────────────────────────────
  text('ADvice by AP Digital Co. — campaign simulation', 9, 'bold', '#6e6e73');
  y += 6;
  text(i.campaignName || 'Simulation report', 22, 'bold');
  y += 2;
  text(
    `${i.channel} · ${i.objective || 'Leads'} · ${i.industry} · ${money(i.budget)} ${i.currency ?? 'CAD'}/month · ${new Date(sim.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}`,
    9, 'normal', '#6e6e73',
  );
  y += 10;
  text(r.summary, 10, 'normal', '#1d1d1f');
  rule();

  // ── predictions, two columns of label/value ───────────────────────────────
  heading('Performance predictions');
  // A traffic or awareness campaign has no conversion step after the click,
  // so those rows are omitted rather than printed as zeroes.
  const noun = CONVERSION_NOUN[(i.objective || 'Leads') as Objective];
  const metrics: [string, string][] = [
    ['Click-through rate', span(p.ctr, pct)],
    ['Cost per click', span(p.cpc, money)],
    ['Monthly clicks', span(p.clicks, int)],
    ...(noun
      ? ([
          ['Conversion rate', span(p.conversionRate, pct)],
          [`${noun.many.replace(/^./, (c) => c.toUpperCase())} / month`, span(p.conversions, int)],
          [noun.cost, span(p.cpa, money)],
        ] as [string, string][])
      : ([['Objective', `${i.objective || 'Leads'} — no conversion step modelled`]] as [string, string][])),
    ['ROAS', p.roas ? span(p.roas, (n) => `${n.toFixed(1)}x`) : '—'],
    ['Confidence', p.confidence],
    ['Currency', i.currency ?? 'CAD'],
  ];
  const half = COL / 2;
  for (let k = 0; k < metrics.length; k += 2) {
    room(34);
    const row = metrics.slice(k, k + 2);
    row.forEach(([label, value], col) => {
      const x = M + col * half;
      doc.setFont('helvetica', 'normal').setFontSize(8).setTextColor('#6e6e73');
      doc.text(label, x, y);
      doc.setFont('helvetica', 'bold').setFontSize(12).setTextColor('#1d1d1f');
      doc.text(value, x, y + 15);
    });
    y += 34;
  }
  y += 2;
  text(p.confidenceReason, 9, 'normal', '#6e6e73');
  p.assumptions.forEach((a) => text(`· ${a}`, 9, 'normal', '#6e6e73', 10));
  rule();

  // ── creative ──────────────────────────────────────────────────────────────
  heading(`Creative score — ${r.creative.overall}/100 (${r.creative.verdict})`);
  const scores: [string, { score: number; note: string } | null][] = [
    ['Headline strength', r.creative.headline],
    ['Copy clarity & persuasion', r.creative.clarity],
    ['Call to action', r.creative.cta],
    ['Emotional triggers', r.creative.emotion],
    ['Keyword–intent alignment', r.creative.intent],
  ];
  scores.forEach(([label, s]) => {
    if (!s) return;
    text(`${label} — ${s.score}/100`, 10, 'bold');
    text(s.note, 9, 'normal', '#6e6e73', 10);
    y += 4;
  });
  rule();

  // ── risk ──────────────────────────────────────────────────────────────────
  heading(`Risk assessment — ${r.risk.overall}`);
  text(r.risk.summary, 9, 'normal', '#6e6e73');
  y += 6;
  text(`Budget (${r.risk.budget.status.replace('_', ' ')})`, 10, 'bold');
  text(r.risk.budget.note, 9, 'normal', '#6e6e73', 10);
  text(`Competition (${r.risk.competition.level})`, 10, 'bold');
  text(r.risk.competition.note, 9, 'normal', '#6e6e73', 10);
  text(`Seasonality (${r.risk.seasonality.status})`, 10, 'bold');
  text(r.risk.seasonality.note, 9, 'normal', '#6e6e73', 10);
  rule();

  // ── recommendations ───────────────────────────────────────────────────────
  heading('Recommendations');
  r.recommendations.improvements.forEach((m, n) => {
    text(`${n + 1}. ${m.title} (${m.impact} impact)`, 10, 'bold');
    text(m.detail, 9, 'normal', '#6e6e73', 12);
    y += 4;
  });
  y += 6;
  text('Rewritten ad', 10, 'bold');
  text(`Headline: ${r.recommendations.headline}`, 9, 'normal', '#1d1d1f', 10);
  text(`Primary text: ${r.recommendations.primaryText}`, 9, 'normal', '#1d1d1f', 10);
  text(`Description: ${r.recommendations.description}`, 9, 'normal', '#1d1d1f', 10);
  y += 6;
  text('Budget', 10, 'bold');
  text(r.recommendations.budget, 9, 'normal', '#6e6e73', 10);
  text('Audience', 10, 'bold');
  r.recommendations.audience.forEach((a) => text(`· ${a}`, 9, 'normal', '#6e6e73', 10));
  if (r.recommendations.landingPage) {
    text('Landing page', 10, 'bold');
    text(r.recommendations.landingPage, 9, 'normal', '#6e6e73', 10);
  }
  rule();

  // ── competitors ───────────────────────────────────────────────────────────
  heading('Competitor snapshot');
  text(`Estimated advertisers: ${span(r.competitors.advertisers, int)}`, 9, 'normal', '#1d1d1f');
  text(`Average cost per click: ${span(r.competitors.avgCpc, money)}`, 9, 'normal', '#1d1d1f');
  y += 4;
  text('What top ads do differently', 10, 'bold');
  r.competitors.patterns.forEach((x) => text(`· ${x}`, 9, 'normal', '#6e6e73', 10));

  // ── footer on every page ──────────────────────────────────────────────────
  const pages = doc.getNumberOfPages();
  for (let n = 1; n <= pages; n++) {
    doc.setPage(n);
    doc.setFont('helvetica', 'normal').setFontSize(7.5).setTextColor('#86868b');
    doc.text(
      'AI estimates based on industry benchmarks, not guarantees · ADvice by AP Digital Co. · ap-digital.ca/advice',
      M, H - 28,
    );
    doc.text(`${n} / ${pages}`, W - M, H - 28, { align: 'right' });
  }

  const slug = (i.campaignName || 'advice-simulation')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
  doc.save(`${slug || 'advice-simulation'}.pdf`);
}
