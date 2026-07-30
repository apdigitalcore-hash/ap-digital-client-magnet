import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";

// Eager load — shown on every visit
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AIChat from "./components/AIChat";
import ScrollToTop from "./components/ScrollToTop";


// Lazy load all other pages — loaded on demand
const Contact = lazy(() => import("./pages/Contact"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PaidAds = lazy(() => import("./pages/services/PaidAds"));
const SocialMedia = lazy(() => import("./pages/services/SocialMedia"));
const ContentCreation = lazy(() => import("./pages/services/ContentCreation"));
const SEO = lazy(() => import("./pages/services/SEO"));
const LeadGeneration = lazy(() => import("./pages/services/LeadGeneration"));
const WebDesign = lazy(() => import("./pages/services/WebDesign"));
const SalonMarketing = lazy(() => import("./pages/niches/SalonMarketing"));
const RealEstateMarketing = lazy(() => import("./pages/niches/RealEstateMarketing"));
const TradesMarketing = lazy(() => import("./pages/niches/TradesMarketing"));
const CoachingMarketing = lazy(() => import("./pages/niches/CoachingMarketing"));
const DentalMarketing = lazy(() => import("./pages/niches/DentalMarketing"));
const HVACMarketing = lazy(() => import("./pages/niches/HVACMarketing"));
const FitnessMarketing = lazy(() => import("./pages/niches/FitnessMarketing"));
const RestaurantMarketing = lazy(() => import("./pages/niches/RestaurantMarketing"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Surrey = lazy(() => import("./pages/locations/Surrey"));
const Burnaby = lazy(() => import("./pages/locations/Burnaby"));
const Langley = lazy(() => import("./pages/locations/Langley"));
const Coquitlam = lazy(() => import("./pages/locations/Coquitlam"));
const Vancouver = lazy(() => import("./pages/locations/Vancouver"));
const Richmond = lazy(() => import("./pages/locations/Richmond"));
const Abbotsford = lazy(() => import("./pages/locations/Abbotsford"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const HiringGuide = lazy(() => import("./pages/HiringGuide"));
const Login = lazy(() => import("./pages/Login"));
const OAuthConsent = lazy(() => import("./pages/OAuthConsent"));


const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-teal focus:text-accent-foreground focus:rounded-md focus:font-semibold"
          >
            Skip to main content
          </a>
          <ScrollToTop />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/services/paid-ads" element={<PaidAds />} />
              <Route path="/services/social-media" element={<SocialMedia />} />
              <Route path="/services/content-creation" element={<ContentCreation />} />
              <Route path="/services/seo" element={<SEO />} />
              <Route path="/services/lead-generation" element={<LeadGeneration />} />
              <Route path="/services/web-design" element={<WebDesign />} />
              <Route path="/salon-marketing" element={<SalonMarketing />} />
              <Route path="/real-estate-marketing" element={<RealEstateMarketing />} />
              <Route path="/trades-marketing" element={<TradesMarketing />} />
              <Route path="/coaching-marketing" element={<CoachingMarketing />} />
              <Route path="/dental-marketing" element={<DentalMarketing />} />
              <Route path="/hvac-marketing" element={<HVACMarketing />} />
              <Route path="/fitness-marketing" element={<FitnessMarketing />} />
              <Route path="/restaurant-marketing" element={<RestaurantMarketing />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/surrey" element={<Surrey />} />
              <Route path="/burnaby" element={<Burnaby />} />
              <Route path="/langley" element={<Langley />} />
              <Route path="/coquitlam" element={<Coquitlam />} />
              <Route path="/vancouver" element={<Vancouver />} />
              <Route path="/richmond" element={<Richmond />} />
              <Route path="/abbotsford" element={<Abbotsford />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:studyId" element={<CaseStudies />} />
              <Route path="/how-to-choose-a-marketing-agency-vancouver" element={<HiringGuide />} />
              <Route path="/login" element={<Login />} />
              <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <AIChat />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
