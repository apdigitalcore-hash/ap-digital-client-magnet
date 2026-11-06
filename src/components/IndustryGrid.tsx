import { Link } from 'react-router-dom';
import { INDUSTRY_GROUPS } from '@/lib/industries';

/**
 * The industry directory, as a set of grouped link columns.
 *
 * This was fifteen equal tiles in a flat grid, each carrying its own icon chip.
 * A droplet beside "Plumbers" and a wrench beside "Trades" say nothing the word
 * does not already say, and fifteen unrelated glyphs were most of the visual
 * noise. Headings and plain links replace them, so a plumber reads the six
 * names under "Trades & home services" instead of scanning all fifteen.
 *
 * The list itself lives in @/lib/industries.
 */
const IndustryGrid = ({ className = '' }: { className?: string }) => (
  // CSS columns rather than a grid: the groups are different lengths, and in a
  // grid the six-item trades column set the first row's height, leaving a gap
  // under every short group beside it. Columns let them flow and pack.
  <div className={`columns-1 gap-10 sm:columns-2 lg:columns-3 ${className}`}>
    {INDUSTRY_GROUPS.map((group) => (
      <div key={group.label} className="mb-10 break-inside-avoid">
        <h3 className="border-b border-foreground/10 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {group.label}
        </h3>
        <ul>
          {group.items.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="block border-b border-foreground/[0.06] py-2.5 text-[15px] font-medium text-foreground transition-colors hover:text-muted-foreground"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default IndustryGrid;
