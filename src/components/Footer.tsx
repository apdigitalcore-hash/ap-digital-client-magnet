import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    services: [{
      label: 'Digital Marketing',
      href: '#services'
    }, {
      label: 'Social Media',
      href: '#services'
    }, {
      label: 'Paid Advertising',
      href: '#services'
    }, {
      label: 'SEO',
      href: '#services'
    }, {
      label: 'Brand Strategy',
      href: '#services'
    }],
    company: [{
      label: 'About Us',
      href: '#'
    }, {
      label: 'Case Studies',
      href: '#testimonials'
    }, {
      label: 'Pricing',
      href: '#pricing'
    }, {
      label: 'Contact',
      href: '#contact'
    }],
    legal: [{
      label: 'Privacy Policy',
      href: '#privacy'
    }, {
      label: 'Terms of Service',
      href: '#terms'
    }, {
      label: 'Cookie Policy',
      href: '#cookies'
    }]
  };
  const socialLinks = [{
    icon: Facebook,
    href: 'https://facebook.com',
    label: 'Facebook'
  }, {
    icon: Instagram,
    href: 'https://instagram.com',
    label: 'Instagram'
  }, {
    icon: Linkedin,
    href: 'https://linkedin.com',
    label: 'LinkedIn'
  }, {
    icon: Twitter,
    href: 'https://twitter.com',
    label: 'Twitter'
  }];
  return <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="inline-block mb-6">
              <span className="font-display font-bold text-2xl">
                <span className="text-teal">AP</span> DIGITAL
              </span>
            </a>
            <p className="text-primary-foreground/70 mb-6 max-w-xs">
              Helping local businesses grow with data-driven digital marketing strategies.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map(social => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-teal/20 hover:text-teal transition-colors" aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </a>)}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map(link => <li key={link.label}>
                  <a href={link.href} className="text-primary-foreground/70 hover:text-teal transition-colors">
                    {link.label}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map(link => <li key={link.label}>
                  <a href={link.href} className="text-primary-foreground/70 hover:text-teal transition-colors">
                    {link.label}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-6">Contact</h4>
            <ul className="space-y-3 text-primary-foreground/70">
              <li>
                <a href="tel:+15551234567" className="hover:text-teal transition-colors">+1 (778) 682-5772</a>
              </li>
              <li>
                <a href="mailto:hello@apdigital.com" className="hover:text-teal transition-colors">apdigital.core@gmail.com
              </a>
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
              {footerLinks.legal.map(link => <a key={link.label} href={link.href} className="text-primary-foreground/60 text-sm hover:text-teal transition-colors">
                  {link.label}
                </a>)}
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;