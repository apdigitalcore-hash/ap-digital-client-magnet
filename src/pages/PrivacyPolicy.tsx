import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-near-black">
      <Helmet>
        <title>Privacy Policy | AP DIGITAL</title>
        <meta name="description" content="Privacy Policy for AP DIGITAL - how we collect, use, and protect your information." />
        <link rel="canonical" href="https://ap-digital.ca/privacy-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ap-digital.ca/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | AP DIGITAL" />
        <meta property="og:description" content="Privacy Policy for AP DIGITAL - how we collect, use, and protect your information." />
      </Helmet>
      <Header />

      <section className="pt-32 pb-20">
        <div className="container-custom max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-8">
            Privacy Policy
          </h1>
          <p className="text-gray-400 mb-6">Last updated: February 10, 2026</p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-primary-foreground mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly, including your name, email address, phone number, and business name when you submit a contact form or request a strategy call. We also collect usage data such as pages visited, time spent on site, and referring URLs through analytics tools.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-foreground mb-3">2. How We Use Your Information</h2>
              <p>We use your information to respond to inquiries, provide marketing services, send relevant communications about our offerings, improve our website experience, and analyze site performance. We never sell your personal information to third parties.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-foreground mb-3">3. Cookies & Tracking</h2>
              <p>We use cookies and similar technologies (such as Google Analytics) to understand how visitors interact with our website. You can control cookie preferences through your browser settings. These tools help us improve user experience and measure the effectiveness of our marketing campaigns.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-foreground mb-3">4. Data Sharing</h2>
              <p>We may share your information with trusted third-party service providers who assist us in operating our website, conducting business, or servicing you (e.g., email marketing platforms, CRM tools, advertising platforms like Google and Meta). These parties are obligated to keep your information confidential.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-foreground mb-3">5. Data Security</h2>
              <p>We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-foreground mb-3">6. Your Rights</h2>
              <p>You have the right to access, update, or delete your personal information at any time. You may also opt out of marketing communications by clicking the unsubscribe link in any email or contacting us directly.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary-foreground mb-3">7. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:apdigital.core@gmail.com" className="text-teal hover:underline">apdigital.core@gmail.com</a> or call <a href="tel:+17786825772" className="text-teal hover:underline">+1 (778) 682-5772</a>.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
