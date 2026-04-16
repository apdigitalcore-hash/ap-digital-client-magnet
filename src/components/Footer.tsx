import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { label: 'Paid Ads', href: '/#service-paid-ads' },
    { label: 'Content Creation', href: '/#service-content-creation' },
    { label: 'Web Design', href: '/#service-web-design' },
    { label: 'SEO', href: '/#service-seo' },
    { label: 'Social Media', href: '/#service-social-media' },
    { label: 'Lead Generation', href: '/#service-lead-gen' },
  ];

  const company = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
  ];

  const nichePages = [
    { label: 'Trades Marketing BC', href: 'https://trades.ap-digital.ca' },
    { label: 'Contractor Marketing BC', href: 'https://contractor.ap-digital.ca' },
    { label: 'Coaching Marketing BC', href: 'https://coach.ap-digital.ca' },
  ];

  const legal = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://www.instagram.com/theapdigital/',
      label: 'Instagram'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/company/ap-digitalmarketing/',
      label: 'LinkedIn'
    }
  ];

  return (
    <footer className="bg-near-black text-primary-foreground">
      {/* Main Footer */}
      <div className="container-custom py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display font-bold text-2xl">
                <span className="text-teal">AP</span> DIGITAL
              </span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-xs">
              Performance marketing agency helping Canadian service businesses generate leads and scale revenue.
            </p>
            <p className="text-gray-500 text-sm mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal" />
              Vancouver, BC, Canada
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-charcoal-light border border-gray-800 flex items-center justify-center hover:border-teal hover:text-teal transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-teal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-6">Company</h4>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-teal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Niche Pages */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-6">Industry Pages</h4>
            <ul className="space-y-3">
              {nichePages.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-teal transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a href="tel:+17786825772" className="flex items-center gap-3 hover:text-teal transition-colors">
                  <Phone className="w-4 h-4 text-teal" />
                  +1 (778) 682-5772
                </a>
              </li>
              <li>
                <a href="mailto:apdigital.core@gmail.com" className="flex items-center gap-3 hover:text-teal transition-colors">
                  <Mail className="w-4 h-4 text-teal" />
                  apdigital.core@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} AP DIGITAL. All rights reserved.
            </p>
            <div className="flex gap-6">
              {legal.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-gray-500 text-sm hover:text-teal transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
