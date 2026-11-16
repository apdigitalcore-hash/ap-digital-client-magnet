import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { CONTACT, PAID_ADS, TERMS } from '@/lib/companyFacts';

/**
 * A conversion point directly under the intro.
 *
 * Every niche and city page carried exactly one CTA, at 99% of the page — past
 * the FAQs and the "cities we serve" list. Someone arriving from Google on
 * "plumber marketing vancouver" had no phone number and no booking link until
 * they scrolled the whole thing. These pages hold page-one positions and
 * produced no enquiries, and that gap is the likeliest reason.
 *
 * Deliberately compact: a band, not a hero. It sits between the intro and the
 * body, so it must not read as the end of the page or push the content that
 * earns the ranking below the fold.
 */
const InlineCTA = ({ context }: { context?: string }) => (
  <aside className="my-10 rounded-2xl border border-border bg-card p-5 sm:p-6">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-foreground">
          {context ? `Want this handled for your ${context}?` : 'Want this handled for you?'}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {PAID_ADS.price}{PAID_ADS.period}. {TERMS.contract} {TERMS.notice}
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-3">
        {/* /book, not calendly.com. This band is the most prominent call to
            action on every niche and city page, and it used to hand the visitor
            straight to Calendly — off the site, and past the embed on /book
            whose event_scheduled message is the only thing that fires the Lead
            event on the free plan. Every booking that started here was
            invisible to both GA4 and the Meta pixel. */}
        <Link
          to="/book"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
        >
          Book a 20-min call
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <a
          href={CONTACT.phoneHref}
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          {CONTACT.phone}
        </a>
      </div>
    </div>
  </aside>
);

export default InlineCTA;
