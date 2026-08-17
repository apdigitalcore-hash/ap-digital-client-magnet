import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle, X, Send, Sparkles, ArrowRight } from 'lucide-react';

type Suggestion = { label: string; intent: string };
type CTA = { label: string; to: string };
type Msg = {
  id: string;
  role: 'bot' | 'user';
  text: string;
  suggestions?: Suggestion[];
  cta?: CTA;
  streaming?: boolean;
};

const getGreeting = (pathname: string): Msg => {
  const base = {
    id: 'g1',
    role: 'bot' as const,
  };
  if (pathname.startsWith('/pricing')) {
    return {
      ...base,
      text: "Looking at pricing? Smart move. I can break down any service, walk you through what's included, or help you pick the right mix for your goals.",
      suggestions: [
        { label: 'Which service do I need?', intent: 'services' },
        { label: 'How much for SEO?', intent: 'seo-price' },
        { label: 'Is there a guarantee?', intent: 'guarantee' },
        { label: 'Book a free strategy call', intent: 'book' },
      ],
    };
  }
  if (pathname.startsWith('/services/seo')) {
    return {
      ...base,
      text: "SEO questions? You're in the right place. Ask about timelines, local SEO, pricing, or how we'll get you ranking.",
      suggestions: [
        { label: 'How long until I rank?', intent: 'timeline' },
        { label: 'How much for SEO?', intent: 'seo-price' },
        { label: 'Do you do local SEO?', intent: 'local' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }
  if (pathname.startsWith('/services/paid-ads')) {
    return {
      ...base,
      text: "Thinking about paid ads? I can help — ROAS, ad spend, platforms, or how fast you'll see leads. What do you want to know?",
      suggestions: [
        { label: 'How much ad spend?', intent: 'ad-spend' },
        { label: 'Service price?', intent: 'ads-price' },
        { label: 'How fast will I see results?', intent: 'timeline' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }
  if (pathname.startsWith('/contact')) {
    return {
      ...base,
      text: "About to reach out? Smart move. Want me to answer something first, or are you ready to book that call?",
      suggestions: [
        { label: 'What happens on the call?', intent: 'call-agenda' },
        { label: 'See pricing first', intent: 'pricing' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }
  if (pathname.startsWith('/about')) {
    return {
      ...base,
      text: "Hey 👋 I'm AP — the agency's AI assistant. Want to know more about how we work or what we deliver?",
      suggestions: [
        { label: 'What services do you offer?', intent: 'services' },
        { label: 'See pricing', intent: 'pricing' },
        { label: 'Your results', intent: 'results' },
      ],
    };
  }
  return {
    ...base,
    text: "Hey 👋 I'm AP — your AI marketing strategist. Ask me anything about our services, pricing, or how we get clients results.",
    suggestions: [
      { label: 'How much do you charge?', intent: 'pricing' },
      { label: 'What services do you offer?', intent: 'services' },
      { label: 'Do you guarantee results?', intent: 'guarantee' },
      { label: 'Book a free strategy call', intent: 'book' },
    ],
  };
};

const respond = (raw: string): Msg => {
  const t = raw.toLowerCase().trim();
  const id = `b-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  const has = (...words: string[]) => words.some((w) => t.includes(w));

  // SERVICE-SPECIFIC PRICING SHORTCUTS (must come before general PRICING)
  if (has('seo') && has('price', 'pricing', 'cost', 'how much', 'fee', 'rate', 'charge')) {
    return {
      id,
      role: 'bot',
      text: "SEO is $759/month. That covers technical audits, on-page optimization, local SEO (Google Business Profile), keyword research, content strategy, and link building.",
      cta: { label: 'See SEO details', to: '/services/seo' },
      suggestions: [
        { label: 'How long until results?', intent: 'timeline' },
        { label: 'Compare to other services', intent: 'pricing' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }
  if (
    has('ad', 'ads', 'paid ads', 'google ads', 'meta ads', 'facebook ads', 'tiktok ads', 'ppc') &&
    has('price', 'pricing', 'cost', 'how much', 'fee', 'rate', 'charge')
  ) {
    return {
      id,
      role: 'bot',
      text: "Paid Ads management is $1,470/month. That includes campaign builds on Google, Meta, and TikTok, audience research, creative testing, retargeting funnels, and weekly performance reporting. Ad spend is separate and you control the budget.",
      cta: { label: 'See Paid Ads details', to: '/services/paid-ads' },
      suggestions: [
        { label: 'What ad spend do I need?', intent: 'ad-spend' },
        { label: 'Compare to other services', intent: 'pricing' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }
  if (
    has('web', 'website', 'site', 'landing page') &&
    has('price', 'pricing', 'cost', 'how much', 'fee', 'rate', 'charge')
  ) {
    return {
      id,
      role: 'bot',
      text: "Web design is a one-time $2,100. You get a fast, mobile-first, conversion-focused site with SEO foundations, analytics, and A/B testing built in.",
      cta: { label: 'See Web Design details', to: '/services/web-design' },
      suggestions: [
        { label: 'How long does it take?', intent: 'timeline' },
        { label: 'Other services', intent: 'services' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }
  if (
    has('content', 'video', 'reel', 'tiktok', 'shorts', 'ugc') &&
    has('price', 'pricing', 'cost', 'how much', 'fee', 'rate', 'charge')
  ) {
    return {
      id,
      role: 'bot',
      text: "Content Creation is $939/month. Includes concept, scripting, filming guidance, professional editing, captions, and viral-hook strategy across Reels, TikToks, and Shorts.",
      cta: { label: 'See Content details', to: '/services/content-creation' },
      suggestions: [
        { label: 'Other services', intent: 'services' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }
  if (
    has('social', 'smm', 'instagram', 'linkedin') &&
    has('price', 'pricing', 'cost', 'how much', 'fee', 'rate', 'charge')
  ) {
    return {
      id,
      role: 'bot',
      text: "Social Media management is $849/month — content calendars, graphics, copywriting, community management, and growth across Instagram, Facebook, LinkedIn, and TikTok.",
      cta: { label: 'See full pricing', to: '/pricing' },
      suggestions: [
        { label: 'Other services', intent: 'services' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }
  if (
    has('lead', 'leadgen', 'lead gen', 'pipeline') &&
    has('price', 'pricing', 'cost', 'how much', 'fee', 'rate', 'charge')
  ) {
    return {
      id,
      role: 'bot',
      text: "Lead Generation systems are $1,290/month — paid ads + landing pages + email/SMS follow-ups + CRM automation built end-to-end.",
      cta: { label: 'See Lead Gen details', to: '/services/lead-generation' },
      suggestions: [
        { label: 'Other services', intent: 'services' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }

  // PRICING (general — fallback when no specific service mentioned)
  if (
    has('price', 'pricing', 'cost', 'how much', 'fee', 'rate', 'charge', 'budget', 'afford', 'expensive', 'cheap')
  ) {
    return {
      id,
      role: 'bot',
      text: "Great question. You pick the services you want — no bundles, no contracts. Pricing starts at $759/mo for SEO, and most clients spend between $759–$2,100/mo depending on what they need. Want to see the full breakdown?",
      cta: { label: 'See full pricing', to: '/pricing' },
      suggestions: [
        { label: 'How much for SEO?', intent: 'seo-price' },
        { label: 'Cost of paid ads?', intent: 'ads-price' },
        { label: 'Web design price?', intent: 'web-price' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }

  // SERVICES (general)
  if (has('service', 'offer', 'what do you do', 'what do you provide', 'help with', 'deliver')) {
    return {
      id,
      role: 'bot',
      text: "We're a full-stack digital marketing agency. We do: SEO, Paid Ads (Google/Meta/TikTok), Content Creation (Reels/TikToks/Shorts), Social Media management, Web Design, and Lead Generation systems. Pick one and I'll go deeper.",
      cta: { label: 'See all services', to: '/#services' },
      suggestions: [
        { label: 'Tell me about SEO', intent: 'seo' },
        { label: 'Tell me about Paid Ads', intent: 'ads' },
        { label: 'Tell me about Web Design', intent: 'web' },
        { label: 'Tell me about Lead Gen', intent: 'leadgen' },
      ],
    };
  }

  // SEO
  if (has('seo', 'rank', 'google search', 'organic', 'keyword')) {
    return {
      id,
      role: 'bot',
      text: "Our SEO service ranks you for high-intent keywords that bring in ready-to-buy customers. Includes technical audits, on-page optimization, local SEO, keyword research, content strategy, and quality backlinks. Starts at $759/month.",
      cta: { label: 'Full SEO breakdown', to: '/services/seo' },
      suggestions: [
        { label: 'How long until I rank?', intent: 'timeline' },
        { label: 'Do you do local SEO?', intent: 'local' },
        { label: 'See pricing', intent: 'pricing' },
      ],
    };
  }

  // PAID ADS
  if (has('ad', 'ads', 'ppc', 'google ads', 'meta', 'facebook ads', 'tiktok ads', 'roas')) {
    return {
      id,
      role: 'bot',
      text: "We run laser-targeted paid campaigns on Google, Meta, and TikTok. Includes audience research, creative testing, retargeting funnels, and weekly reporting. Our clients average 8.2× ROAS. Service is $1,470/month — ad spend is separate.",
      cta: { label: 'Full Paid Ads breakdown', to: '/services/paid-ads' },
      suggestions: [
        { label: 'How much ad spend?', intent: 'ad-spend' },
        { label: 'See pricing', intent: 'pricing' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }

  // CONTENT
  if (has('content', 'video', 'reel', 'tiktok', 'shorts', 'ugc')) {
    return {
      id,
      role: 'bot',
      text: "We produce scroll-stopping short-form video — Reels, TikToks, YouTube Shorts. From concept and scripting to filming and editing with viral hooks. Content creation is $939/month.",
      cta: { label: 'Full Content breakdown', to: '/services/content-creation' },
      suggestions: [
        { label: 'See samples', intent: 'samples' },
        { label: 'See pricing', intent: 'pricing' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }

  // SOCIAL MEDIA
  if (has('social media', 'smm', 'instagram', 'linkedin', 'facebook ', 'social ')) {
    return {
      id,
      role: 'bot',
      text: "Full social media management — content calendars, graphics, copywriting, community management, and growth strategy across Instagram, Facebook, LinkedIn, and TikTok. $849/month.",
      cta: { label: 'See pricing', to: '/pricing' },
      suggestions: [
        { label: 'See all services', intent: 'services' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }

  // LEAD GEN
  if (has('lead', 'leadgen', 'lead gen', 'pipeline', 'appointment', 'booking')) {
    return {
      id,
      role: 'bot',
      text: "We build end-to-end lead generation systems — paid ads + landing pages + email/SMS follow-ups + CRM automation. Result: a predictable pipeline of qualified prospects booking calls on autopilot. $1,290/month.",
      cta: { label: 'Full Lead Gen breakdown', to: '/services/lead-generation' },
      suggestions: [
        { label: 'How fast can I see leads?', intent: 'timeline' },
        { label: 'See pricing', intent: 'pricing' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }

  // WEB DESIGN
  if (has('web design', 'website', 'landing page', 'redesign', 'build a site')) {
    return {
      id,
      role: 'bot',
      text: "We build fast, mobile-first websites optimized for lead capture — conversion-focused pages, speed optimization, analytics, SEO foundations, and A/B testing. One-time $2,100.",
      cta: { label: 'Full Web Design breakdown', to: '/services/web-design' },
      suggestions: [
        { label: 'How long does it take?', intent: 'timeline' },
        { label: 'See pricing', intent: 'pricing' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }

  // GUARANTEE
  if (has('guarantee', 'refund', 'money back', 'promise', 'risk')) {
    return {
      id,
      role: 'bot',
      text: "Yes — every plan includes our 90-day results guarantee. If we don't move the needle in 90 days, we keep working for free until we do. No long-term contracts.",
      cta: { label: 'See guarantee details', to: '/pricing' },
      suggestions: [
        { label: 'Do you do contracts?', intent: 'contract' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }

  // CONTRACT
  if (has('contract', 'commit', 'lock in', 'long term', 'cancel')) {
    return {
      id,
      role: 'bot',
      text: "No long-term contracts — month-to-month. Cancel anytime. We earn your business every month with results.",
      suggestions: [
        { label: 'See pricing', intent: 'pricing' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }

  // BOOK / CALL / CONTACT
  if (has('book', 'call', 'meeting', 'consult', 'strategy session', 'talk to', 'speak with')) {
    return {
      id,
      role: 'bot',
      text: "Let's set it up. Free 30-minute strategy call — we'll audit your current marketing and give you a custom growth plan, no obligation.",
      cta: { label: 'Book free strategy call', to: '/contact' },
      suggestions: [
        { label: 'What will we discuss?', intent: 'call-agenda' },
        { label: 'See pricing first', intent: 'pricing' },
      ],
    };
  }
  if (has('contact', 'email', 'phone', 'reach', 'get in touch')) {
    return {
      id,
      role: 'bot',
      text: "Easiest way is to book a free 30-min strategy call or send a message via the contact page. We reply within 24 hours.",
      cta: { label: 'Go to contact page', to: '/contact' },
      suggestions: [
        { label: 'Book a call', intent: 'book' },
        { label: 'See pricing', intent: 'pricing' },
      ],
    };
  }

  // LOCATION
  if (has('where', 'location', 'based', 'office', 'city', 'canada', 'vancouver', 'serve')) {
    return {
      id,
      role: 'bot',
      text: "We're based in Vancouver, BC and serve businesses across Metro Vancouver and the Fraser Valley — Surrey, Burnaby, Richmond, Coquitlam, Langley, Abbotsford, North Vancouver. We also work remotely with clients across Canada.",
      cta: { label: 'See service areas', to: '/#cities' },
      suggestions: [
        { label: 'Do you serve my city?', intent: 'city' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }

  // ABOUT
  if (has('about', 'who are you', 'founder', 'team', 'arjun', 'who runs')) {
    return {
      id,
      role: 'bot',
      text: "AP Digital was founded by Arjun Sharma — a Vancouver-based marketer who built the agency around one promise: personal account management, no contracts, real results. We work with 200+ BC businesses.",
      cta: { label: 'Read founder story', to: '/about' },
      suggestions: [
        { label: 'See your results', intent: 'results' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }

  // NICHE: SALON
  if (has('salon', 'hair', 'beauty', 'spa', 'barber')) {
    return {
      id,
      role: 'bot',
      text: "We specialize in marketing for salons, spas, and beauty businesses. Fill empty chairs, drive bookings, and build a loyal client base.",
      cta: { label: 'See salon marketing', to: '/salon-marketing' },
      suggestions: [
        { label: 'See pricing', intent: 'pricing' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }
  if (has('real estate', 'realtor', 'agent', 'broker')) {
    return {
      id,
      role: 'bot',
      text: "We help realtors and real estate teams generate qualified buyer/seller leads on autopilot through paid ads, video content, and SEO.",
      cta: { label: 'See real estate marketing', to: '/real-estate-marketing' },
      suggestions: [
        { label: 'See pricing', intent: 'pricing' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }
  if (has('trades', 'plumb', 'electric', 'roof', 'hvac', 'contractor', 'construction')) {
    return {
      id,
      role: 'bot',
      text: "We help trades businesses — plumbers, electricians, roofers, HVAC, general contractors — book more jobs with local SEO, Google Ads, and lead gen funnels.",
      cta: { label: 'See trades marketing', to: '/trades-marketing' },
      suggestions: [
        { label: 'See pricing', intent: 'pricing' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }
  if (has('coach', 'coaching', 'consultant', 'course')) {
    return {
      id,
      role: 'bot',
      text: "We help coaches and consultants scale to 6 and 7 figures with high-converting funnels, paid ads, and content systems.",
      cta: { label: 'See coaching marketing', to: '/coaching-marketing' },
      suggestions: [
        { label: 'See pricing', intent: 'pricing' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }

  // TIMELINE
  if (has('how long', 'timeline', 'when', 'how fast', 'how soon', 'turnaround', 'results in')) {
    return {
      id,
      role: 'bot',
      text: "Paid ads can drive leads within 7–14 days of launch. SEO typically shows movement in 60–90 days and compounds from there. Web design projects ship in 3–4 weeks. Our 90-day guarantee covers all of it.",
      suggestions: [
        { label: 'See guarantee', intent: 'guarantee' },
        { label: 'See pricing', intent: 'pricing' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }

  // RESULTS / TESTIMONIALS
  if (has('result', 'case study', 'proof', 'success', 'testimonial', 'review')) {
    return {
      id,
      role: 'bot',
      text: "Our clients average 8.2× ROAS on paid ads, 2.5M+ views on content campaigns, and 3× lead volume within 90 days. 200+ BC businesses trust us.",
      cta: { label: 'See full results', to: '/#results' },
      suggestions: [
        { label: 'See pricing', intent: 'pricing' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }

  // AD SPEND
  if (has('ad spend', 'budget for ads', 'spend on ads', 'how much spend')) {
    return {
      id,
      role: 'bot',
      text: "We recommend a minimum of $1,000/month in ad spend to get statistically meaningful data. Most of our clients run $1,500–$5,000/month. You control your budget directly with the platforms — we manage strategy and optimization.",
      suggestions: [
        { label: 'See Paid Ads details', intent: 'ads' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }

  // HI / HELLO
  if (has('hi', 'hello', 'hey', 'yo', 'sup', 'gm', 'good morning', 'good afternoon')) {
    return {
      id,
      role: 'bot',
      text: "Hey 👋 happy to help. What would you like to know about AP Digital?",
      suggestions: [
        { label: 'Pricing', intent: 'pricing' },
        { label: 'Services', intent: 'services' },
        { label: 'Book a call', intent: 'book' },
      ],
    };
  }

  // THANKS
  if (has('thank', 'thanks', 'appreciate')) {
    return {
      id,
      role: 'bot',
      text: "Anytime. Want me to set up a quick strategy call so we can dig into your specific situation?",
      cta: { label: 'Book a free call', to: '/contact' },
      suggestions: [
        { label: 'See pricing first', intent: 'pricing' },
        { label: "I'm just browsing", intent: 'browse' },
      ],
    };
  }
  if (has('just browsing', 'just looking', 'browse')) {
    return {
      id,
      role: 'bot',
      text: "All good — take your time. I'll be here when you're ready. Want me to point you to the most popular pages?",
      suggestions: [
        { label: 'Pricing', intent: 'pricing' },
        { label: 'Services', intent: 'services' },
        { label: 'Results', intent: 'results' },
      ],
    };
  }

  // FALLBACK
  return {
    id,
    role: 'bot',
    text: "I'm not 100% sure I caught that — but a real human can help. Want to book a quick call, or pick one of these?",
    cta: { label: 'Book a free call', to: '/contact' },
    suggestions: [
      { label: 'See pricing', intent: 'pricing' },
      { label: 'See services', intent: 'services' },
      { label: 'Do you guarantee results?', intent: 'guarantee' },
    ],
  };
};

const STORAGE_KEY = 'ap-chat-history-v2';
const TEASER_DISMISSED_KEY = 'ap-chat-teaser-dismissed-v1';

const AIChat = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => [getGreeting(location.pathname)]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Msg[];
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) {
      setShowTeaser(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);

  // Teaser bubble: pops up after 6s unless dismissed this session or chat already opened
  useEffect(() => {
    const dismissed = sessionStorage.getItem(TEASER_DISMISSED_KEY);
    if (dismissed || open) return;
    const t = setTimeout(() => setShowTeaser(true), 6000);
    return () => clearTimeout(t);
  }, [open]);

  const dismissTeaser = () => {
    setShowTeaser(false);
    sessionStorage.setItem(TEASER_DISMISSED_KEY, '1');
  };

  const streamReply = (full: Msg) => {
    const placeholder: Msg = { ...full, text: '', streaming: true };
    setMessages((m) => [...m, placeholder]);
    setStreamingId(full.id);
    const chars = full.text.split('');
    let i = 0;
    const tick = () => {
      i = Math.min(chars.length, i + Math.max(1, Math.round(chars.length / 70)));
      setMessages((m) =>
        m.map((msg) =>
          msg.id === full.id ? { ...msg, text: full.text.slice(0, i), streaming: i < chars.length } : msg
        )
      );
      if (i < chars.length) {
        setTimeout(tick, 18);
      } else {
        setStreamingId(null);
      }
    };
    setTimeout(tick, 80);
  };

  const sendUser = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: text.trim(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const botMsg = respond(text);
      setTyping(false);
      streamReply(botMsg);
    }, 500 + Math.random() * 400);
  };

  const handleSuggestion = (s: Suggestion) => {
    sendUser(s.label);
  };

  const handleCTA = (cta: CTA) => {
    if (cta.to.startsWith('http')) {
      window.open(cta.to, '_blank', 'noopener,noreferrer');
      return;
    }
    if (cta.to.includes('#')) {
      const [path, hash] = cta.to.split('#');
      if (path === '' || path === window.location.pathname) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setOpen(false);
          return;
        }
      }
      navigate(cta.to);
      setOpen(false);
      return;
    }
    navigate(cta.to);
    setOpen(false);
  };

  const reset = () => {
    setMessages([getGreeting(location.pathname)]);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <>
      {/* Teaser bubble — proactive nudge */}
      <div
        className={`fixed bottom-24 right-5 z-[58] max-w-[260px] transition-all duration-500 ease-out ${
          showTeaser && !open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <div className="relative bg-card border border-border rounded-2xl rounded-br-md shadow-2xl p-4 backdrop-blur">
          <button
            onClick={dismissTeaser}
            aria-label="Dismiss"
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-secondary border border-border text-muted-foreground hover:text-foreground flex items-center justify-center"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center text-background font-bold text-xs flex-shrink-0">
              AP
            </div>
            <div>
              <p className="text-sm text-foreground leading-snug">
                Hey 👋 Got a question about pricing or services? I'm here to help.
              </p>
              <button
                onClick={() => {
                  setOpen(true);
                  dismissTeaser();
                }}
                className="mt-2 text-xs font-semibold text-foreground hover:underline"
              >
                Start chat →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className={`fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full shadow-2xl transition-all duration-300 group ${
          open
            ? 'h-12 w-12 bg-card border border-border text-foreground hover:bg-secondary'
            : 'h-14 px-5 bg-foreground text-background hover:scale-105'
        }`}
      >
        {open ? (
          <X className="w-5 h-5 mx-auto" />
        ) : (
          <>
            <span className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-60 animate-ping" />
              <MessageCircle className="w-5 h-5 relative" />
            </span>
            <span className="font-semibold text-sm hidden sm:inline">Ask AP</span>
          </>
        )}
      </button>

      {/* Chat panel */}
      <div
        className={`fixed z-[59] transition-all duration-300 ease-out origin-bottom-right ${
          open
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        } bottom-24 right-5 left-5 sm:left-auto sm:w-[400px] md:w-[420px] max-h-[calc(100vh-7rem)]`}
      >
        <div className="flex flex-col bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden h-[600px] max-h-[calc(100vh-7rem)] ring-1 ring-foreground/5">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-secondary border-b border-border">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background font-bold text-sm">
                  AP
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 ring-2 ring-card" />
              </div>
              <div>
                <div className="font-display font-bold text-foreground flex items-center gap-1.5">
                  AP Assistant
                  <Sparkles className="w-3.5 h-3.5 text-foreground" />
                </div>
                <div className="text-xs text-muted-foreground">Online · Replies instantly</div>
              </div>
            </div>
            <button
              onClick={reset}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Reset conversation"
            >
              Reset
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-background"
          >
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] ${
                    m.role === 'user'
                      ? 'bg-foreground text-background rounded-2xl rounded-br-md px-4 py-2.5'
                      : 'space-y-3'
                  }`}
                >
                  {m.role === 'bot' ? (
                    <>
                      <div className="bg-secondary text-foreground rounded-2xl rounded-bl-md px-4 py-2.5 text-sm leading-relaxed">
                        {m.text}
                        {m.streaming && (
                          <span className="inline-block w-1.5 h-3.5 bg-foreground ml-0.5 align-middle animate-pulse" />
                        )}
                      </div>
                      {!m.streaming && m.cta && (
                        <button
                          onClick={() => handleCTA(m.cta!)}
                          className="inline-flex items-center gap-1.5 bg-foreground text-background text-sm font-semibold px-4 py-2 rounded-full hover:gap-2.5 hover:shadow-lg transition-all animate-in fade-in slide-in-from-bottom-1 duration-300"
                        >
                          {m.cta.label}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {!m.streaming && m.suggestions && m.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1 animate-in fade-in slide-in-from-bottom-1 duration-300">
                          {m.suggestions.map((s, i) => (
                            <button
                              key={i}
                              onClick={() => handleSuggestion(s)}
                              className="text-xs px-3 py-1.5 rounded-full border border-border bg-card/80 text-foreground hover:border-foreground/30 hover:text-foreground hover:-translate-y-0.5 transition-all"
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <span className="text-sm leading-relaxed">{m.text}</span>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendUser(input);
            }}
            className="border-t border-border bg-card px-3 py-3 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about pricing, services…"
              className="flex-1 bg-secondary text-foreground placeholder:text-muted-foreground text-sm rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-foreground/20"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send"
              className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-muted-foreground text-center pb-2">
            Powered by AP Digital · For complex questions, <a href="/contact" className="text-foreground hover:underline">book a call</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChat;
