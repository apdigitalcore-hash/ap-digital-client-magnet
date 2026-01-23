import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How long does it take to see results?',
    answer: 'Most clients start seeing measurable improvements within 30-60 days, with significant results typically achieved by 90 days. The timeline depends on your starting point, budget, and chosen services. We set realistic expectations during your strategy call and provide regular updates on progress.',
  },
  {
    question: 'What makes AP DIGITAL different from other agencies?',
    answer: "We specialize in specific niches—salons, real estate, trades, and coaching—which means we understand your industry inside and out. We're not generalists guessing what might work. Plus, our 90-day results guarantee means we're invested in your success. If we don't deliver, you don't pay for the next month.",
  },
  {
    question: 'How much do I need to spend on ads?',
    answer: "Ad spend varies based on your goals and market. We recommend starting with at least $500-1,000/month for local businesses. Our team optimizes every dollar to maximize ROI. The ad spend is separate from our management fee, and we provide full transparency on where every dollar goes.",
  },
  {
    question: 'Can I cancel anytime?',
    answer: "Yes, we operate on month-to-month agreements after an initial 90-day commitment. We believe in earning your business every month. However, most clients stay with us for years because the results speak for themselves.",
  },
  {
    question: 'Do you work with businesses outside of your core niches?',
    answer: "While we specialize in salons, real estate, trades, and coaching, we do work with other service-based businesses on a case-by-case basis. If you're outside our core niches, we recommend booking a call to discuss whether we're the right fit.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-teal font-semibold text-sm uppercase tracking-wider mb-4 block">
              FAQ
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Got Questions?{' '}
              <span className="text-gradient">We've Got Answers</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about working with us.
            </p>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border px-6 data-[state=open]:shadow-custom-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-teal py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're happy to help.
            </p>
            <a
              href="#contact"
              className="text-teal font-semibold hover:underline"
            >
              Contact us →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
