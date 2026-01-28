import { Link } from 'react-router-dom';
import { Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { label: 'Salon Marketing', href: '/salon-marketing' },
    { label: 'Real Estate Marketing', href: '/real-estate-marketing' },
    { label: 'Trades Marketing', href: '/trades-marketing' },
    { label: 'Local Marketing (BC)', href: '/local-marketing' },
  ];

  const company = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
  ];

  const legal = [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://www.instagram.com/ap.digimarket/',
      label: 'Instagram'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/company/110553927/',
      label: 'LinkedIn'
    }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display font-bold text-2xl">
                <span className="text-teal">AP</span> DIGITAL
              </span>
            </Link>
            <p className="text-primary-foreground/70 mb-4 max-w-xs">
              Digital marketing agency helping local businesses across Canada generate leads and grow revenue.
            </p>
            <p className="text-primary-foreground/70 text-sm mb-6">
              Based in Pitt Meadows, BC
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-teal/20 hover:text-teal transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-teal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-teal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-6">Contact</h4>
            <ul className="space-y-3 text-primary-foreground/70">
              <li>
                <a href="tel:+17786825772" className="hover:text-teal transition-colors">
                  +1 (778) 682-5772
                </a>
              </li>
              <li>
                <a href="mailto:apdigital.core@gmail.com" className="hover:text-teal transition-colors">
                  apdigital.core@gmail.com
                </a>
              </li>
              <li className="pt-2">
                <span className="text-sm">Pitt Meadows, BC, Canada</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {currentYear} AP DIGITAL. All rights reserved.
            </p>
            <div className="flex gap-6">
              {legal.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-primary-foreground/60 text-sm hover:text-teal transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
