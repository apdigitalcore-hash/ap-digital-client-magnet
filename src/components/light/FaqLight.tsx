import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import SectionLabel from './SectionLabel';

interface FaqItem {
  question: string;
  answer: string;
}

const FaqLight = ({ faqs }: { faqs: FaqItem[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-custom">
        <div className="mb-14 text-center">
          <SectionLabel label="FAQs" />
          <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Common <span className="italic">Questions</span>
          </h2>
        </div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? 'bg-white ring-1 ring-indigo-300/70 shadow-[0_0_0_6px_hsl(250_80%_70%/0.08),0_18px_40px_-24px_hsl(250_60%_40%/0.35)]'
                    : 'bg-[#EDEFF2] hover:bg-[#E6E9ED]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7"
                >
                  <span className="w-5 shrink-0 text-xs text-foreground/45">{i + 1}</span>
                  <span className="flex-1 text-sm font-medium text-foreground sm:text-base">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? 'border border-foreground/15 text-foreground' : 'bg-foreground text-background'
                    }`}
                  >
                    {isOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="px-5 pb-6 pl-14 pr-14 text-sm leading-relaxed text-foreground/70 sm:px-7 sm:pl-16">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Have any other questions?{' '}
          <Link to="/contact" className="text-foreground underline underline-offset-4">Contact Us</Link>
        </p>
      </div>
    </section>
  );
};

export default FaqLight;
