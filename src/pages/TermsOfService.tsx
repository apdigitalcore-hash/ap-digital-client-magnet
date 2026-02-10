import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-near-black">
      <SEOHead
        title="Terms of Service | AP DIGITAL"
        description="Terms of Service for AP DIGITAL - the terms governing use of our website and services."
        canonicalUrl="/terms-of-service"
      />
      <Header />

      <section className="pt-32 pb-20">
        <div className="container-custom max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-8">
            Terms of Service
          </h1>
          <p className="text-gray-400 mb-6">Last updated: February 10, 2026</p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-primary-foreground mb-3">1. Agreement to Terms</h2>
              <p>By accessing or using the AP DIGITAL website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-foreground mb-3">2. Services</h2>
              <p>AP DIGITAL provides digital marketing services including but not limited to paid advertising, content creation, web design, search engine optimization (SEO), social media management, and lead generation. All services are provided on a month-to-month basis unless otherwise agreed upon in a written contract.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-foreground mb-3">3. Client Responsibilities</h2>
              <p>Clients agree to provide accurate business information, timely feedback, and necessary access to accounts and platforms required for service delivery. Delays caused by client non-responsiveness may impact project timelines and results.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-foreground mb-3">4. Payment Terms</h2>
              <p>Payment is due as outlined in your service agreement. Late payments may result in service suspension. All fees are in Canadian Dollars (CAD) unless otherwise specified. Refunds are handled on a case-by-case basis.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-foreground mb-3">5. Intellectual Property</h2>
              <p>All content, designs, strategies, and materials created by AP DIGITAL remain our intellectual property until full payment is received. Upon full payment, deliverables are transferred to the client. AP DIGITAL retains the right to showcase work in portfolios unless otherwise agreed.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-foreground mb-3">6. Results Disclaimer</h2>
              <p>While we strive for exceptional results, AP DIGITAL does not guarantee specific outcomes such as exact lead counts, revenue figures, or search engine rankings. Marketing results depend on various factors including market conditions, competition, and client cooperation. Our 90-day results guarantee is subject to the specific terms outlined in your service agreement.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-foreground mb-3">7. Limitation of Liability</h2>
              <p>AP DIGITAL shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by the client in the three months preceding the claim.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-foreground mb-3">8. Termination</h2>
              <p>Either party may terminate services with 30 days written notice. Upon termination, the client is responsible for payment of all services rendered up to the termination date. Any outstanding deliverables will be provided upon receipt of final payment.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-foreground mb-3">9. Governing Law</h2>
              <p>These terms shall be governed by and construed in accordance with the laws of the Province of British Columbia, Canada, without regard to conflict of law principles.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-foreground mb-3">10. Contact</h2>
              <p>For questions about these Terms of Service, contact us at <a href="mailto:apdigital.core@gmail.com" className="text-teal hover:underline">apdigital.core@gmail.com</a> or call <a href="tel:+17786825772" className="text-teal hover:underline">+1 (778) 682-5772</a>.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TermsOfService;
