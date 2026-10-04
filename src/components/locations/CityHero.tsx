import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * One photograph per city, in the three derivatives the homepage hero uses.
 * `base` is the public path without the size suffix, so a city wired up as
 * { base: '/surrey-night' } expects surrey-night-m750.webp, -1130.webp,
 * -2260.webp and -2260.jpg in public/.
 */
export type CityPhoto = {
  base: string;
  /** Desktop focal point, e.g. '78% bottom'. Defaults to centre-bottom. */
  position?: string;
};

type Props = {
  /** Eyebrow line — the city as a visitor would say it. */
  city: string;
  /** The H1. Passed as nodes so each page keeps its own italic emphasis. */
  headline: ReactNode;
  intro: ReactNode;
  photo?: CityPhoto;
  /** Shown on the right when there is no photograph yet. */
  neighbourhoods?: string[];
  secondaryHref?: string;
  secondaryLabel?: string;
};

/**
 * The city-page hero, matching the homepage.
 *
 * Every location page had its own copy of this markup — seven files, each
 * opening on a logo mark over a flat grey band, none of them resembling the
 * page they were meant to extend. This is the single version.
 *
 * MOBILE HEIGHT IS DRIVEN BY CONTENT AND vw — NEVER vh/svh/dvh. Mobile
 * browsers resize the viewport as the URL bar hides, which visibly resizes a
 * vh-sized photograph mid-scroll. The copy sits in normal flow and the plate
 * follows it, so nothing the URL bar does can move either. Desktop keeps svh:
 * no URL bar, no problem.
 *
 * The photograph is one <picture> rather than two <img> in breakpoint-hidden
 * containers, because display:none does not stop a fetch — that bug cost a
 * phone 139KB for a single visible band (d10a40f).
 */
const CityHero = ({
  city,
  headline,
  intro,
  photo,
  neighbourhoods,
  secondaryHref = '/services/paid-ads',
  secondaryLabel = 'See our services',
}: Props) => (
  <section className="relative isolate overflow-hidden bg-primary text-primary-foreground lg:flex lg:min-h-[640px] lg:flex-col lg:h-[86svh] lg:max-h-[860px]">
    <div className="relative z-10 w-full container-custom pt-28 pb-8 sm:pt-36 lg:flex lg:flex-1 lg:items-center lg:pt-24 lg:pb-12">
      <div className="max-w-[640px] lg:-translate-y-2">
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-primary-foreground/75 sm:mb-5 lg:text-[11px]">
          {city} Digital Marketing
        </p>

        <h1 className="mb-5 font-serif text-[2.75rem] font-normal leading-[0.98] tracking-normal sm:text-6xl lg:max-w-[620px] lg:text-[4.25rem]">
          {headline}
        </h1>

        <p className="mb-7 max-w-[500px] text-[15px] leading-relaxed text-primary-foreground/85 sm:text-lg">
          {intro}
        </p>

        <div className="flex flex-col items-stretch gap-4 sm:items-start">
          <Button asChild variant="secondary" size="lg" className="h-14 rounded-full px-8 text-[13px] font-semibold uppercase tracking-[0.14em] sm:min-w-[210px]">
            <Link to="/book">
              Book a call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Link
            to={secondaryHref}
            className="inline-flex w-fit items-center py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-primary-foreground/85 transition-colors hover:text-primary-foreground"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>

    {photo ? (
      <picture>
        <source media="(min-width: 1024px)" type="image/webp" srcSet={`${photo.base}-1130.webp 1130w, ${photo.base}-2260.webp 2260w`} sizes="70vw" />
        <source media="(min-width: 1024px)" srcSet={`${photo.base}-2260.jpg`} />
        <source type="image/webp" srcSet={`${photo.base}-m750.webp`} />
        <img
          aria-hidden="true"
          src={`${photo.base}-m750.webp`}
          alt=""
          width={750}
          height={780}
          {...{ fetchpriority: 'high' }}
          decoding="async"
          style={photo.position ? ({ '--city-pos': photo.position } as React.CSSProperties) : undefined}
          className="pointer-events-none relative block h-[90vw] w-full select-none object-cover object-bottom [mask-image:linear-gradient(to_bottom,transparent_0%,#000_20%)] sm:h-[60vw] lg:absolute lg:inset-y-0 lg:right-0 lg:left-[max(30%,560px)] lg:h-full lg:w-auto lg:object-[var(--city-pos,78%_bottom)] lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_30%)]"
        />
      </picture>
    ) : (
      /* No photograph for this city yet. Rather than leave dead space, the
         right-hand side carries the neighbourhoods the page is actually about,
         which is the thing a local visitor scans for. Swap in a CityPhoto and
         this disappears. */
      neighbourhoods?.length ? (
        <div
          aria-hidden="true"
          className="pointer-events-none hidden select-none lg:absolute lg:inset-y-0 lg:right-0 lg:left-[max(58%,740px)] lg:flex lg:flex-col lg:items-end lg:justify-center lg:gap-3 lg:bg-[radial-gradient(ellipse_at_75%_55%,rgba(255,255,255,0.09),transparent_62%)] lg:pr-[max(2rem,6vw)] lg:text-right"
        >
          {neighbourhoods.map((n) => (
            <span key={n} className="font-serif text-[2rem] leading-none text-primary-foreground/25 xl:text-[2.5rem]">
              {n}
            </span>
          ))}
        </div>
      ) : null
    )}
  </section>
);

export default CityHero;
