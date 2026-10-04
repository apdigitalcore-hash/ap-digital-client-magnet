import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CalendarCheck, ArrowRight } from 'lucide-react';

import { track } from '@/lib/pixel';
import { CONTACT } from '@/lib/companyFacts';

const TITLE = "You're booked in | AP Digital";

/**
 * Calendly redirect target — the 20-minute event type's confirmation redirect
 * ("Redirect to an external site") points here, so a booking completes on our
 * own page rather than on calendly.com where the pixel cannot see it.
 *
 * This is now the only place a booking Lead fires. lib/calendly.ts used to fire
 * a second one from the embed's `calendly.event_scheduled` message, which
 * double-counted every booking made through the widget — one booking and two
 * Leads on both 29 Sep and 4 Oct. That listener is gone; this page covers the
 * embed and direct calendly.com links alike.
 *
 * CTA clicks fire Contact instead, so a click that never becomes a booking is
 * never counted as a conversion. ADvice fires its own AdviceReportViewed and
 * AdviceSignup custom events, so free-tool signups stay out of this bucket.
 *
 * Because the Lead depends on the redirect, it is load-bearing configuration:
 * if the redirect is ever removed in Calendly, bookings stop being counted.
 */
const ThankYou = () => {
  useEffect(() => {
    track('Lead', { content_name: 'free-pilot' });
  }, []);

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content="Your call is booked. Check your email for the calendar invite." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main
        id="main-content"
        className="flex flex-col items-center justify-center bg-[#EDEFF2] px-5 py-20 text-center sm:min-h-[100svh]"
      >
        <span className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#0C0E11]">
          <CalendarCheck className="h-7 w-7 text-white" strokeWidth={1.5} />
        </span>

        <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl">
          You're <span className="italic">booked in</span>
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-foreground/70">
          Check your email for the calendar invite. If it hasn't arrived in a few minutes,
          look in spam — then email us and we'll sort it.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-foreground/85"
          >
            Back to site
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-sm text-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
          >
            {CONTACT.email}
          </a>
        </div>
      </main>
    </>
  );
};

export default ThankYou;
