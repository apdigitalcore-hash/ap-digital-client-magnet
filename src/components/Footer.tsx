import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import PreferredSourceButton from '@/components/PreferredSourceButton';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { label: 'Paid Ads', href: '/services/paid-ads' },
    { label: 'Social Media', href: '/services/social-media' },
    { label: 'SEO', href: '/services/seo' },
    { label: 'Web Design', href: '/services/web-design' },
    { label: 'Content Creation', href: '/services/content-creation' },
    { label: 'Lead Generation', href: '/services/lead-generation' },
  ];

  const company = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Our Approach', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ];

  const nichePages = [
    { label: 'Salon Marketing', href: '/salon-marketing' },
    { label: 'Trades Marketing', href: '/trades-marketing' },
    { label: 'Real Estate Marketing', href: '/real-estate-marketing' },
    { label: 'Coaching Marketing', href: '/coaching-marketing' },
    { label: 'Dental Marketing', href: '/dental-marketing' },
    { label: 'HVAC Marketing', href: '/hvac-marketing' },
    { label: 'Fitness Marketing', href: '/fitness-marketing' },
    { label: 'Restaurant Marketing', href: '/restaurant-marketing' },
    { label: 'Law Firm Marketing', href: '/law-firm-marketing' },
    { label: 'Plumber Marketing', href: '/plumber-marketing' },
    { label: 'Electrician Marketing', href: '/electrician-marketing' },
    { label: 'Roofer Marketing', href: '/roofer-marketing' },
    { label: 'Contractor Marketing', href: '/contractor-marketing' },
    { label: 'Agency Hiring Guide', href: '/how-to-choose-a-marketing-agency-vancouver' },
  ];


  const locations = [
    { label: 'Vancouver', href: '/vancouver' },
    { label: 'Surrey', href: '/surrey' },
    { label: 'Burnaby', href: '/burnaby' },
    { label: 'Richmond', href: '/richmond' },
    { label: 'Langley', href: '/langley' },
    { label: 'Coquitlam', href: '/coquitlam' },
    { label: 'Abbotsford', href: '/abbotsford' },
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
      href: 'https://www.linkedin.com/company/theapdigital/?viewAsMember=true',
      label: 'LinkedIn'
    }
  ];

  return (
    <footer className="bg-secondary text-foreground border-t border-foreground/10">
      {/* Main Footer */}
      <div className="container-custom py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display font-bold text-2xl">
                <span className="text-foreground">AP</span> DIGITAL
              </span>
            </Link>
            <p className="text-foreground/70 mb-4 max-w-xs">
              Performance marketing agency helping Canadian service businesses generate leads and scale revenue.
            </p>
            <p className="text-foreground/70 text-sm mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-foreground" />
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
                  className="w-10 h-10 rounded-xl bg-background shadow-custom-sm flex items-center justify-center hover:text-foreground transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Company</h4>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Niche Pages */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Industries</h4>
            <ul className="space-y-3">
              {nichePages.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Locations</h4>
            <ul className="space-y-3">
              {locations.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Contact</h4>
            <ul className="space-y-4 text-foreground/70">
              <li>
                <a href="tel:+17786825772" className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4 text-foreground" />
                  +1 (778) 682-5772
                </a>
              </li>
              <li>
                <a href="mailto:apdigital.core@gmail.com" className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <Mail className="w-4 h-4 text-foreground" />
                  apdigital.core@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reader-controlled visibility: someone who adds us as a preferred source
          sees our pages badged in Top Stories, AI Mode and AI Overviews. */}
      <div className="border-t border-foreground/10">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
            <p className="text-foreground/70 text-sm max-w-md">
              Find our guides useful? Add us as a preferred source on Google and
              our pages get prioritised in your results.
            </p>
            <PreferredSourceButton />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-foreground/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground/70 text-sm">
              © {currentYear} AP DIGITAL. All rights reserved.
            </p>
            <div className="flex gap-6">
              {legal.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-foreground/70 text-sm hover:text-foreground transition-colors"
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
