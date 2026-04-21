import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const location = useLocation();

  const toggleSection = (section: string) => {
    setOpenSection(prev => prev === section ? null : section);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { href: '/services/paid-ads', label: 'Paid Ads' },
    { href: '/services/content-creation', label: 'Content Creation' },
    { href: '/services/web-design', label: 'Web Design' },
    { href: '/services/seo', label: 'SEO' },
    { href: '/services/social-media', label: 'Social Media' },
    { href: '/services/lead-generation', label: 'Lead Generation' },
  ];

  const locations = [
    { href: '/surrey', label: 'Surrey' },
    { href: '/burnaby', label: 'Burnaby' },
    { href: '/langley', label: 'Langley' },
    { href: '/coquitlam', label: 'Coquitlam' },
  ];

  const industries = [
    { href: '/salon-marketing', label: 'Salons & Beauty', external: false },
    { href: '/real-estate-marketing', label: 'Real Estate', external: false },
    { href: '/coaching-marketing', label: 'Coaching & Consulting', external: false },
    { href: 'https://trades.ap-digital.ca', label: 'Trades Marketing BC', external: true },
    { href: 'https://contractor.ap-digital.ca', label: 'Contractor Marketing BC', external: true },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-card/95 backdrop-blur-md shadow-custom-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className={`font-display font-bold text-xl md:text-2xl transition-colors duration-300 ${
              isScrolled ? 'text-primary' : 'text-primary-foreground'
            }`}>
              <span className="text-teal">AP</span> DIGITAL
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 hover:text-teal ${
                isScrolled ? 'text-foreground' : 'text-primary-foreground/90'
              }`}
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-teal ${
                isScrolled ? 'text-foreground' : 'text-primary-foreground/90'
              }`}>
                Services <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                {services.map((service) => (
                  <DropdownMenuItem key={service.href} asChild>
                    <Link to={service.href} className="cursor-pointer">
                      {service.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-teal ${
                isScrolled ? 'text-foreground' : 'text-primary-foreground/90'
              }`}>
                Industries <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                {industries.map((industry) => (
                  <DropdownMenuItem key={industry.href} asChild>
                    {industry.external ? (
                      <a href={industry.href} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                        {industry.label}
                      </a>
                    ) : (
                      <Link to={industry.href} className="cursor-pointer">
                        {industry.label}
                      </Link>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-teal ${
                isScrolled ? 'text-foreground' : 'text-primary-foreground/90'
              }`}>
                Locations <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                {locations.map((loc) => (
                  <DropdownMenuItem key={loc.href} asChild>
                    <Link to={loc.href} className="cursor-pointer">{loc.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors duration-200 hover:text-teal ${
                isScrolled ? 'text-foreground' : 'text-primary-foreground/90'
              }`}
            >
              About
            </Link>

            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors duration-200 hover:text-teal ${
                isScrolled ? 'text-foreground' : 'text-primary-foreground/90'
              }`}
            >
              Blog
            </Link>

            <a
              href="/#digital-arsenal"
              className={`text-sm font-medium transition-colors duration-200 hover:text-teal flex items-center gap-1.5 ${
                isScrolled ? 'text-foreground' : 'text-primary-foreground/90'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              Digital Arsenal
            </a>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors duration-200 hover:text-teal ${
                isScrolled ? 'text-foreground' : 'text-primary-foreground/90'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button variant="hero" size="default" asChild>
              <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer">Book Free Call</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? 'text-foreground' : 'text-primary-foreground'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[57px] bg-card z-40 overflow-y-auto animate-fade-in">
            <nav className="flex flex-col pb-8">

              {/* Primary links */}
              <div className="px-4 pt-4 pb-2 space-y-1">
                <Link
                  to="/"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground font-medium hover:bg-muted hover:text-teal transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>

                <Link
                  to="/about"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground font-medium hover:bg-muted hover:text-teal transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>

                <Link
                  to="/blog"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground font-medium hover:bg-muted hover:text-teal transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>

                <a
                  href="/#digital-arsenal"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal font-semibold hover:bg-teal/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="w-2 h-2 rounded-full bg-teal animate-pulse flex-shrink-0" />
                  Digital Arsenal
                </a>

                <Link
                  to="/contact"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground font-medium hover:bg-muted hover:text-teal transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>

              {/* Divider */}
              <div className="mx-4 my-2 border-t border-border" />

              {/* Services accordion */}
              <div className="px-4 py-1">
                <button
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-foreground font-semibold hover:bg-muted transition-colors"
                  onClick={() => toggleSection('services')}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${openSection === 'services' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'services' && (
                  <div className="mt-1 ml-2 space-y-0.5">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        to={service.href}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-muted-foreground hover:text-teal hover:bg-teal/5 transition-colors text-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <ChevronRight className="w-3 h-3 flex-shrink-0 opacity-50" />
                        {service.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Industries accordion */}
              <div className="px-4 py-1">
                <button
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-foreground font-semibold hover:bg-muted transition-colors"
                  onClick={() => toggleSection('industries')}
                >
                  <span>Industries</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${openSection === 'industries' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'industries' && (
                  <div className="mt-1 ml-2 space-y-0.5">
                    {industries.map((industry) => (
                      industry.external ? (
                        <a
                          key={industry.href}
                          href={industry.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-muted-foreground hover:text-teal hover:bg-teal/5 transition-colors text-sm"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <ChevronRight className="w-3 h-3 flex-shrink-0 opacity-50" />
                          {industry.label}
                        </a>
                      ) : (
                        <Link
                          key={industry.href}
                          to={industry.href}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-muted-foreground hover:text-teal hover:bg-teal/5 transition-colors text-sm"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <ChevronRight className="w-3 h-3 flex-shrink-0 opacity-50" />
                          {industry.label}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>

              {/* Locations accordion */}
              <div className="px-4 py-1">
                <button
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-foreground font-semibold hover:bg-muted transition-colors"
                  onClick={() => toggleSection('locations')}
                >
                  <span>Locations</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${openSection === 'locations' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'locations' && (
                  <div className="mt-1 ml-2 space-y-0.5">
                    {locations.map((loc) => (
                      <Link
                        key={loc.href}
                        to={loc.href}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-muted-foreground hover:text-teal hover:bg-teal/5 transition-colors text-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <ChevronRight className="w-3 h-3 flex-shrink-0 opacity-50" />
                        {loc.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="px-4 pt-4 mt-2">
                <Button variant="hero" className="w-full" size="lg" asChild>
                  <a href="https://calendly.com/apdigital-core/30min" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                    Book Free Call
                  </a>
                </Button>
              </div>

            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
