import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import PaidAds from "./pages/services/PaidAds";
import SocialMedia from "./pages/services/SocialMedia";
import ContentCreation from "./pages/services/ContentCreation";
import SEO from "./pages/services/SEO";
import LeadGeneration from "./pages/services/LeadGeneration";
import WebDesign from "./pages/services/WebDesign";
import SalonMarketing from "./pages/niches/SalonMarketing";
import RealEstateMarketing from "./pages/niches/RealEstateMarketing";
import TradesMarketing from "./pages/niches/TradesMarketing";
import CoachingMarketing from "./pages/niches/CoachingMarketing";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<Contact />} />
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
