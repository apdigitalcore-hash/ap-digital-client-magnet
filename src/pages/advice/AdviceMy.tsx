import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, X } from 'lucide-react';
import AdviceShell from '@/advice/AdviceShell';
import { readHistory, removeFromHistory } from '@/advice/api';

const scoreClass = (s: number) => (s >= 75 ? 'text-[#248a3d]' : s >= 50 ? 'text-[#b25000]' : 'text-[#d70015]');

const AdviceMy = () => {
  const [rows, setRows] = useState(readHistory);

  const remove = (id: string) => {
    removeFromHistory(id);
    setRows(readHistory());
  };

  return (
    <AdviceShell>
      <Helmet>
        <title>My Simulations | ADvice</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">My simulations</h1>
            <p className="mt-1 text-sm text-[#86868b]">Saved in this browser. Use Share on any report to keep a permanent link.</p>
          </div>
          <Link to="/advice/simulate" className="inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] px-4 py-2 text-sm font-medium hover:bg-black text-white">
            New simulation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {rows.length === 0 ? (
          <p className="mt-12 rounded-xl border border-black/[0.06] p-8 text-center text-[#6e6e73]">No simulations yet. Run one and it’ll show up here.</p>
        ) : (
          <ul className="mt-8 divide-y divide-black/[0.06] overflow-hidden rounded-xl border border-black/[0.06]">
            {rows.map((r) => (
              <li key={r.id} className="group relative">
                <Link
                  to="/advice/report"
                  state={{ sim: r }}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 py-4 pl-5 pr-12 transition-colors hover:bg-[#f5f5f7] sm:grid-cols-[1fr_180px_110px_60px]"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{r.inputs.campaignName || 'Untitled simulation'}</p>
                    <p className="text-xs text-[#86868b] sm:hidden">{r.inputs.channel} · {new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className="hidden text-sm text-[#6e6e73] sm:block">{r.inputs.channel}</span>
                  <span className="hidden text-sm text-[#86868b] sm:block">{new Date(r.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
                  <span className={`text-right text-lg font-semibold tabular-nums ${scoreClass(r.results.creative.overall)}`}>{r.results.creative.overall}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => remove(r.id)}
                  aria-label={`Remove ${r.inputs.campaignName || 'simulation'}`}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1.5 text-[#86868b] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdviceShell>
  );
};

export default AdviceMy;
