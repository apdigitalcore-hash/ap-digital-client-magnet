import IndustryGrid from './IndustryGrid';

/** Industry band for the city and service pages. The homepage sets its own heading. */
const IndustriesWeServe = () => (
  <section className="bg-white py-24">
    {/* The grid needs the page container; without it the fourth column ran off
        the right edge on the city pages. */}
    <div className="container-custom">
      <h2 className="mb-3 text-center font-serif text-3xl font-medium text-foreground md:text-4xl">Industries We Serve</h2>
      <p className="mx-auto mb-10 max-w-[48ch] text-center text-muted-foreground">
        Fourteen verticals, each with its own playbook. Find yours.
      </p>
      <IndustryGrid />
    </div>
  </section>
);

export default IndustriesWeServe;
