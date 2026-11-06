import IndustryGrid from './IndustryGrid';
import { INDUSTRY_COUNT } from '@/lib/industries';

/** Industry band for the city and service pages. The homepage sets its own heading. */
const IndustriesWeServe = () => (
  <section className="bg-white py-24">
    {/* The grid needs the page container; without it the last column ran off
        the right edge on the city pages. */}
    <div className="container-custom">
      <h2 className="mb-3 text-center font-serif text-3xl font-medium text-foreground md:text-4xl">
        Industries We Serve
      </h2>
      {/* This said "Fourteen verticals" while the list held fifteen, so the
          number is counted from the list now rather than typed out. */}
      <p className="mx-auto mb-12 max-w-[48ch] text-center text-muted-foreground">
        {INDUSTRY_COUNT} verticals, each with its own playbook. Find yours.
      </p>
      <IndustryGrid className="mx-auto max-w-5xl" />
    </div>
  </section>
);

export default IndustriesWeServe;
