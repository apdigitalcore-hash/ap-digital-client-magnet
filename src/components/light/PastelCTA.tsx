import { ArrowRight, Phone } from 'lucide-react';

interface PastelCTAProps {
  headline?: string;
  subheadline?: string;
  showPhone?: boolean;
}

const PastelCTA = ({
  headline = 'Ready to Scale Your Business?',
  subheadline = 'Book a free strategy call and see exactly how we can grow your leads and revenue.',
  showPhone = true,
}: PastelCTAProps) => (
  <section className="bg-background py-24 md:py-32">
    <div className="container-custom">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-[linear-gradient(110deg,#f8e9c9_0%,#f3d9e6_28%,#e6dcf7_55%,#d7e6f7_78%,#dff1ea_100%)] px-6 py-14 text-center sm:px-12">
        <span className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-full bg-white/70 backdrop-blur-sm">
          <Phone className="h-5 w-5 text-foreground" strokeWidth={1.5} />
        </span>

        <h2 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {headline}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-foreground/60 sm:text-base">{subheadline}</p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://calendly.com/apdigital-core/20min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-foreground/85"
          >
            Book a Free Strategy Call
            <ArrowRight className="h-4 w-4" />
          </a>

          {showPhone && (
            <a
              href="tel:+17786825772"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-white/50"
            >
              <Phone className="h-4 w-4" />
              +1 (778) 682-5772
            </a>
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.18em] text-foreground/50">
          {['No long-term contracts', '90-day results guarantee', 'Free strategy session'].map((item, i) => (
            <span key={item} className="flex items-center gap-6">
              {i > 0 && <span className="hidden h-3 w-px bg-foreground/20 sm:block" />}
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default PastelCTA;
