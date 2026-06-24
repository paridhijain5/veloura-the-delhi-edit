import { useState, useEffect, useRef } from "react";
import {
  Search, MapPin, ArrowRight, Check,
  Menu, X, Heart, Clock, SlidersHorizontal,
  Sparkles, Calendar, Award, Instagram, Mail, MessageCircle,
  Palette, Gift, ChevronLeft, Scissors, Droplets,
  Flower2, Sun, RotateCcw, ChevronRight, Star, Filter,
  ChevronDown, Bot, BookOpen, Bookmark, Bell, User, Camera
} from "lucide-react";

// ─── TYPES ───────────────────────────────────────────────────────────────────

type Page = "home" | "explore" | "neighborhoods" | "journal" | "concierge" | "quiz" | "account";

type Salon = {
  id: number;
  name: string;
  location: string;
  neighborhood: "south" | "hauzkhas" | "west" | "north";
  rating: number;
  reviews: number;
  priceRange: string;
  priceMin: number;
  priceMax: number;
  tags: string[];
  verified: boolean;
  bookings: string;
  image: string;
  description: string;
  specialty: string;
  services: string[];
  isNew?: boolean;
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const SALONS: Salon[] = [
  {
    id: 1,
    name: "Affinity Salon",
    location: "Hauz Khas, South Delhi",
    neighborhood: "hauzkhas",
    rating: 4.8,
    reviews: 312,
    priceRange: "₹₹₹",
    priceMin: 2500,
    priceMax: 12000,
    tags: ["Balayage", "Bridal", "Hair Color"],
    verified: true,
    bookings: "2.4k",
    image: "1522337360788-8b13dee7a37e",
    description: "Known for soft balayage and natural bridal styling. A sanctuary for those who seek understated, editorial hair.",
    specialty: "Hair Color & Bridal",
    services: ["Balayage", "Bridal Hair", "Highlights", "Keratin"],
  },
  {
    id: 2,
    name: "Bellissimo Beauty Studio",
    location: "Greater Kailash I, South Delhi",
    neighborhood: "south",
    rating: 4.7,
    reviews: 289,
    priceRange: "₹₹₹₹",
    priceMin: 4000,
    priceMax: 18000,
    tags: ["Skin", "Facials", "Anti-aging"],
    verified: true,
    bookings: "1.8k",
    image: "1540555700478-4be289fbecef",
    description: "Award-winning skin studio offering European facials and advanced anti-aging treatments for a luminous glow.",
    specialty: "Skin & Wellness",
    services: ["Hydrafacial", "Chemical Peel", "LED Therapy", "Microneedling"],
  },
  {
    id: 3,
    name: "The Nail Loft",
    location: "Lajpat Nagar, South Delhi",
    neighborhood: "south",
    rating: 4.9,
    reviews: 456,
    priceRange: "₹₹",
    priceMin: 800,
    priceMax: 4500,
    tags: ["Nail Art", "Gel", "Extensions"],
    verified: true,
    bookings: "3.1k",
    image: "1595476108010-b4d1f102b1b1",
    description: "Delhi's most-loved nail studio. Intricate nail art, gel overlays, and Korean-inspired designs that last.",
    specialty: "Nail Artistry",
    services: ["Gel Polish", "Nail Extensions", "Nail Art", "Pedicure"],
  },
  {
    id: 4,
    name: "Studio Lumière",
    location: "Hauz Khas Village",
    neighborhood: "hauzkhas",
    rating: 4.8,
    reviews: 198,
    priceRange: "₹₹₹₹",
    priceMin: 5000,
    priceMax: 25000,
    tags: ["Korean Hair", "Color", "Treatment"],
    verified: true,
    bookings: "1.2k",
    image: "1616394584738-fc6e612e71b9",
    description: "Award-winning color specialists with Korean hair treatments. European-trained team in the heart of HKV.",
    specialty: "Korean Hair Treatments",
    services: ["Korean Perm", "Scalp Treatment", "Hair Color", "Glossing"],
    isNew: true,
  },
  {
    id: 5,
    name: "Stein Aesthetics Clinic",
    location: "Saket, South Delhi",
    neighborhood: "south",
    rating: 4.9,
    reviews: 542,
    priceRange: "₹₹₹₹",
    priceMin: 6000,
    priceMax: 35000,
    tags: ["Medical Aesthetic", "Laser", "Glow"],
    verified: true,
    bookings: "2.8k",
    image: "1570172619644-dfd03ed5d881",
    description: "Delhi's premier aesthetic clinic with board-certified dermatologists. Specialists in skin brightening and laser treatments.",
    specialty: "Medical Aesthetics",
    services: ["Botox", "Fillers", "Laser", "PRP Therapy"],
  },
  {
    id: 6,
    name: "Maison de Beauté",
    location: "Rajouri Garden, West Delhi",
    neighborhood: "west",
    rating: 4.6,
    reviews: 267,
    priceRange: "₹₹₹",
    priceMin: 2000,
    priceMax: 10000,
    tags: ["Bridal", "Makeup", "Hair"],
    verified: true,
    bookings: "1.9k",
    image: "1487412947147-5cebf100ffc2",
    description: "West Delhi's most celebrated bridal destination. Expert airbrush makeup and intricate bridal hair.",
    specialty: "Bridal & Makeup",
    services: ["Bridal Makeup", "Airbrush", "HD Makeup", "Saree Draping"],
  },
  {
    id: 7,
    name: "Gloss & Co.",
    location: "GK II, South Delhi",
    neighborhood: "hauzkhas",
    rating: 4.7,
    reviews: 334,
    priceRange: "₹₹₹",
    priceMin: 1500,
    priceMax: 8000,
    tags: ["Haircut", "Styling", "Blowout"],
    verified: true,
    bookings: "2.2k",
    image: "1562322140-8baeececf3df",
    description: "The go-to for effortlessly chic haircuts and blowouts. Minimalist studio beloved by Delhi's creative class.",
    specialty: "Hair Styling",
    services: ["Haircut", "Blowout", "Styling", "Treatments"],
  },
  {
    id: 8,
    name: "Ora Wellness Spa",
    location: "Pitampura, North Delhi",
    neighborhood: "north",
    rating: 4.5,
    reviews: 189,
    priceRange: "₹₹₹",
    priceMin: 2500,
    priceMax: 12000,
    tags: ["Spa", "Massage", "Wellness"],
    verified: false,
    bookings: "980",
    image: "1519014816548-bf5fe059798b",
    description: "North Delhi's hidden gem for holistic wellness. Rooted in Ayurvedic traditions with a modern luxury approach.",
    specialty: "Spa & Wellness",
    services: ["Ayurvedic Massage", "Body Wrap", "Facial", "Aromatherapy"],
    isNew: true,
  },
  {
    id: 9,
    name: "Lumière Skin Studio",
    location: "Vasant Kunj, South Delhi",
    neighborhood: "south",
    rating: 4.8,
    reviews: 221,
    priceRange: "₹₹₹",
    priceMin: 3000,
    priceMax: 15000,
    tags: ["Glass Skin", "K-Beauty", "Glow"],
    verified: true,
    bookings: "1.5k",
    image: "1604654894610-df63bc536371",
    description: "Seoul-trained aestheticians specialising in the Korean glass skin protocol, adapted for Delhi's climate.",
    specialty: "Korean Skincare",
    services: ["Glass Skin Protocol", "Gua Sha", "LED Mask", "Ampoule Treatment"],
    isNew: true,
  },
  {
    id: 10,
    name: "The Colour Bar",
    location: "Kamla Nagar, North Delhi",
    neighborhood: "north",
    rating: 4.6,
    reviews: 178,
    priceRange: "₹₹",
    priceMin: 1200,
    priceMax: 6000,
    tags: ["Hair Color", "Highlights", "Ombre"],
    verified: true,
    bookings: "1.3k",
    image: "1527799820374-87571c0db000",
    description: "North Delhi's favourite for creative hair colour. From subtle highlights to bold fashion colours at honest prices.",
    specialty: "Hair Colour",
    services: ["Highlights", "Ombre", "Balayage", "Fashion Color"],
  },
];

const ARTICLES = [
  {
    id: 1,
    title: "Summer Haircare Guide: 12 Rituals for Monsoon-Ready Hair",
    category: "Haircare",
    readTime: "6 min read",
    date: "June 18, 2026",
    image: "1532170579297-6b26578c84f6",
    excerpt: "As humidity levels climb in Delhi, your hair routine needs a seasonal shift. Five of the city's top colorists share their non-negotiable summer rituals.",
    featured: true,
    author: "Riya Mehta",
  },
  {
    id: 2,
    title: "Monsoon Skin Essentials: A Delhi Dermatologist's Survival Guide",
    category: "Skincare",
    readTime: "8 min read",
    date: "June 14, 2026",
    image: "1596462502278-27bfdc403348",
    excerpt: "Excess sebum, fungal flare-ups, clogged pores — monsoon season is genuinely tough on Delhi skin. Dr. Priya Sharma breaks down the essential edit.",
    featured: true,
    author: "Dr. Priya Sharma",
  },
  {
    id: 3,
    title: "The Bridal Timeline: Your 12-Month Beauty Countdown",
    category: "Bridal",
    readTime: "10 min read",
    date: "June 10, 2026",
    image: "1634449571010-02389ed0f9b0",
    excerpt: "From the first skin consultation to the morning of your wedding, here is the definitive guide to planning your bridal beauty journey.",
    featured: false,
    author: "Neha Kapoor",
  },
  {
    id: 4,
    title: "Trending Nail Art of 2026: Aura Tips & Geometric Minimalism",
    category: "Nails",
    readTime: "5 min read",
    date: "June 8, 2026",
    image: "1612817288484-6f916006741a",
    excerpt: "The nail art world has entered a new era of quiet luxury. Meet the Delhi nail studios leading on aura tips, negative space, and chromatic gradients.",
    featured: false,
    author: "Ananya Singh",
  },
  {
    id: 5,
    title: "Korean Glass Skin: 10 Steps That Actually Work in Delhi's Climate",
    category: "Skincare",
    readTime: "7 min read",
    date: "June 5, 2026",
    image: "1604654894610-df63bc536371",
    excerpt: "The K-beauty glass skin method is famously humidity-tolerant — but Delhi's extreme heat requires some intelligent adaptation.",
    featured: false,
    author: "Seo-Yeon Park",
  },
  {
    id: 6,
    title: "Delhi's Most Underrated Beauty Districts: A Local's Edit",
    category: "Editor's Pick",
    readTime: "9 min read",
    date: "June 1, 2026",
    image: "1560066984-138dadb4c035",
    excerpt: "Move beyond Khan Market and Hauz Khas. We spent three weeks visiting Delhi's overlooked beauty corridors and the finds are remarkable.",
    featured: false,
    author: "Aditi Verma",
  },
];

const QUIZ_QUESTIONS = [
  {
    question: "What's your preferred beauty aesthetic?",
    options: ["Natural & Understated", "Bold & Glamorous", "Minimal & Clean", "Classic Elegance"],
    icons: ["🌿", "✨", "◻️", "💎"],
  },
  {
    question: "What's your beauty budget per visit?",
    options: ["₹2,000 – ₹8,000", "₹8,000 – ₹15,000", "₹15,000 and above"],
    icons: ["🌸", "💐", "🌺"],
  },
  {
    question: "What's the occasion you're dressing for?",
    options: ["Everyday Glam", "Wedding Season", "Party & Events", "Professional Setting"],
    icons: ["☀️", "💍", "🎉", "💼"],
  },
  {
    question: "Which Delhi neighbourhood are you based in?",
    options: ["South Delhi", "Hauz Khas & GK", "West Delhi", "North Delhi"],
    icons: ["🗺️", "🌿", "⭐", "🏙️"],
  },
  {
    question: "What's your primary beauty focus right now?",
    options: ["Hair Transformation", "Skin & Glow", "Nail Artistry", "Full Bridal Look"],
    icons: ["✂️", "🌟", "💅", "👰"],
  },
];

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const full = Math.floor(rating);
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className={`flex items-center gap-0.5 ${size === "md" ? "text-base" : "text-sm"}`}>
      {stars.map((s) => (
        <span key={s} style={{ color: s <= full ? "#8B6544" : "#D4C4B0" }}>★</span>
      ))}
      <span
        className="ml-1 font-medium tabular-nums"
        style={{ color: "#8B6544", fontSize: size === "md" ? "0.9rem" : "0.75rem" }}
      >
        {rating}
      </span>
    </div>
  );
}

function VerifiedBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: "rgba(139,101,68,0.12)", color: "#8B6544" }}
    >
      <Check size={10} strokeWidth={3} /> Verified
    </span>
  );
}

function SalonCard({ salon, onClick }: { salon: Salon; onClick?: () => void }) {
  const [liked, setLiked] = useState(false);
  return (
    <div
      className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: "#FAF8F4",
        boxShadow: "0 2px 24px rgba(46,42,39,0.07)",
      }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden" style={{ height: 220 }}>
        <img
          src={`https://images.unsplash.com/photo-${salon.image}?w=600&h=440&fit=crop&auto=format&q=80`}
          alt={salon.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(46,42,39,0.35) 0%, transparent 60%)" }} />
        {salon.isNew && (
          <span
            className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: "#8B6544", color: "#FAF8F4" }}
          >
            New
          </span>
        )}
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
          style={{ background: liked ? "#8B6544" : "rgba(250,248,244,0.9)" }}
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
        >
          <Heart size={14} fill={liked ? "#FAF8F4" : "none"} stroke={liked ? "#FAF8F4" : "#8B6544"} />
        </button>
        <div className="absolute bottom-3 left-3">
          <StarRating rating={salon.rating} />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-medium text-base" style={{ color: "#2E2A27", fontFamily: "'Playfair Display', serif" }}>
            {salon.name}
          </h3>
          <span className="text-sm font-medium ml-2 shrink-0" style={{ color: "#9B8B7A" }}>{salon.priceRange}</span>
        </div>
        <div className="flex items-center gap-1 mb-2">
          <MapPin size={11} style={{ color: "#9B8B7A" }} />
          <span className="text-xs" style={{ color: "#9B8B7A" }}>{salon.location}</span>
        </div>
        <p className="text-xs leading-relaxed mb-3" style={{ color: "#6B5E55" }}>{salon.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {salon.tags.slice(0, 2).map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#EDE8DF", color: "#8B6544" }}>
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {salon.verified && <VerifiedBadge />}
          </div>
        </div>
        <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: "1px solid rgba(139,101,68,0.1)" }}>
          <span className="text-xs" style={{ color: "#9B8B7A" }}>{salon.bookings} bookings</span>
          <button
            className="text-xs font-medium flex items-center gap-1 transition-all duration-200 hover:gap-2"
            style={{ color: "#8B6544" }}
          >
            Book Now <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────

function Nav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Explore", page: "explore" },
    { label: "Neighbourhoods", page: "neighborhoods" },
    { label: "Journal", page: "journal" },
    { label: "AI Concierge", page: "concierge" },
    { label: "Account", page: "account" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(247,244,239,0.95)" : "#F7F4EF",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(139,101,68,0.12)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-2"
        >
          <span
            className="text-xl tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27", fontWeight: 600 }}
          >
            Veloura
          </span>
          <span className="text-xs tracking-widest uppercase mt-0.5" style={{ color: "#9B8B7A" }}>
            The Delhi Edit
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => setPage(l.page)}
              className="text-sm transition-all duration-200 relative pb-0.5"
              style={{
                color: page === l.page ? "#8B6544" : "#6B5E55",
                fontWeight: page === l.page ? 500 : 400,
              }}
            >
              {l.label}
              {page === l.page && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: "#8B6544" }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setPage("quiz")}
            className="text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 hover:opacity-90"
            style={{ background: "#8B6544", color: "#FAF8F4" }}
          >
            Style Quiz
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} style={{ color: "#2E2A27" }} /> : <Menu size={22} style={{ color: "#2E2A27" }} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 py-4 space-y-3" style={{ background: "#FAF8F4", borderTop: "1px solid rgba(139,101,68,0.12)" }}>
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => { setPage(l.page); setMobileOpen(false); }}
              className="block w-full text-left text-sm py-2"
              style={{ color: page === l.page ? "#8B6544" : "#2E2A27", fontWeight: page === l.page ? 500 : 400 }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { setPage("quiz"); setMobileOpen(false); }}
            className="w-full text-sm px-4 py-2.5 rounded-full font-medium mt-2"
            style={{ background: "#8B6544", color: "#FAF8F4" }}
          >
            Style Quiz
          </button>
        </div>
      )}
    </nav>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer style={{ background: "#2E2A27", color: "#EDE8DF" }} className="mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="mb-4">
              <span className="text-2xl tracking-tight" style={{ fontFamily: "'Playfair Display', serif", color: "#FAF8F4", fontWeight: 600 }}>
                Veloura
              </span>
              <span className="text-xs tracking-widest uppercase ml-2" style={{ color: "#9B8B7A" }}>The Delhi Edit</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "#9B8B7A" }}>
              Delhi's curated beauty marketplace. Discover exceptional salons, skin clinics, and beauty experiences tailored to your aesthetic.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80" style={{ background: "rgba(255,255,255,0.1)" }}>
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80" style={{ background: "rgba(255,255,255,0.1)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" /></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80" style={{ background: "rgba(255,255,255,0.1)" }}>
                <Mail size={16} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-4" style={{ color: "#FAF8F4" }}>Discover</h4>
            <ul className="space-y-2.5">
              {["Explore Salons", "Neighbourhoods", "Journal", "AI Concierge", "Style Quiz"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm transition-all duration-200 hover:text-white" style={{ color: "#9B8B7A" }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-4" style={{ color: "#FAF8F4" }}>Company</h4>
            <ul className="space-y-2.5">
              {["About Us", "For Salons", "Privacy Policy", "Terms of Service", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm transition-all duration-200 hover:text-white" style={{ color: "#9B8B7A" }}>{item}</a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-xs mb-2" style={{ color: "#9B8B7A" }}>Stay in the edit</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 text-xs px-3 py-2 rounded-lg outline-none"
                  style={{ background: "rgba(255,255,255,0.1)", color: "#EDE8DF", border: "1px solid rgba(255,255,255,0.1)" }}
                />
                <button className="px-3 py-2 rounded-lg text-xs font-medium" style={{ background: "#8B6544", color: "#FAF8F4" }}>
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-xs" style={{ color: "#6B5E55" }}>© 2026 Veloura Beauty Pvt. Ltd. All rights reserved.</p>
          <p className="text-xs" style={{ color: "#6B5E55" }}>Crafted with care in New Delhi, India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const categories = [
    { icon: Scissors, label: "Hair" },
    { icon: Droplets, label: "Skin" },
    { icon: Palette, label: "Nails" },
    { icon: Flower2, label: "Bridal" },
    { icon: Sun, label: "Spa" },
    { icon: Sparkles, label: "Wellness" },
  ];
  const trending = ["Balayage", "Korean Glass Skin", "Nail Extensions", "Hydrafacial", "Bridal Packages", "Scalp Treatments"];

  const testimonials = [
    { name: "Priya S.", neighbourhood: "Hauz Khas", text: "Veloura found me the perfect bridal makeup artist. The AI Concierge was incredibly accurate.", rating: 5, avatar: "1494790108377-be9c29b29330" },
    { name: "Ananya M.", neighbourhood: "Greater Kailash", text: "I discovered my new favourite nail studio through Veloura. The reviews are so reliable.", rating: 5, avatar: "1534528741775-53994a69daeb" },
    { name: "Isha R.", neighbourhood: "Vasant Kunj", text: "Finally a beauty platform that understands Delhi. Booked my skin appointment in under two minutes.", rating: 5, avatar: "1438761681033-6461ffad8d80" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="pt-28 pb-20 px-6" style={{ background: "#F7F4EF" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-block text-xs tracking-widest uppercase mb-5 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(139,101,68,0.1)", color: "#8B6544" }}
            >
              The Delhi Beauty Edit — Est. 2026
            </span>
            <h1
              className="text-5xl md:text-6xl leading-tight mb-5"
              style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27", fontWeight: 600, lineHeight: 1.15 }}
            >
              Delhi's Curated<br />
              <em style={{ fontStyle: "italic" }}>Beauty</em> Marketplace
            </h1>
            <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: "#6B5E55" }}>
              Discover exceptional salons, skin clinics, nail studios, and beauty experiences tailored to your style — curated for Delhi's most discerning.
            </p>
            {/* Search */}
            <div
              className="flex items-center gap-3 p-2 rounded-2xl mb-6"
              style={{ background: "#FAF8F4", border: "1px solid rgba(139,101,68,0.15)", boxShadow: "0 4px 24px rgba(46,42,39,0.08)" }}
            >
              <Search size={18} className="ml-2 shrink-0" style={{ color: "#9B8B7A" }} />
              <input
                type="text"
                placeholder="Search salons, treatments, or neighbourhoods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "#2E2A27" }}
              />
              <button
                className="px-5 py-2.5 rounded-xl text-sm font-medium shrink-0"
                style={{ background: "#8B6544", color: "#FAF8F4" }}
              >
                Search
              </button>
            </div>
            {/* Trending pills */}
            <div>
              <span className="text-xs mr-2" style={{ color: "#9B8B7A" }}>Trending:</span>
              <div className="inline-flex flex-wrap gap-2 mt-1">
                {trending.slice(0, 4).map((t) => (
                  <button
                    key={t}
                    onClick={() => setPage("explore")}
                    className="text-xs px-3 py-1 rounded-full transition-all duration-200 hover:opacity-80"
                    style={{ background: "#EDE8DF", color: "#6B5E55" }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Hero imagery collage */}
          <div className="relative hidden md:block" style={{ height: 480 }}>
            <div className="absolute top-0 right-0 w-64 h-72 rounded-3xl overflow-hidden" style={{ boxShadow: "0 8px 40px rgba(46,42,39,0.15)" }}>
              <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=512&h=576&fit=crop&auto=format&q=80" alt="Luxury salon" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-4 left-0 w-52 h-64 rounded-3xl overflow-hidden" style={{ boxShadow: "0 8px 40px rgba(46,42,39,0.15)" }}>
              <img src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=416&h=512&fit=crop&auto=format&q=80" alt="Nail artistry" className="w-full h-full object-cover" />
            </div>
            <div
              className="absolute top-40 right-40 px-4 py-3 rounded-2xl"
              style={{ background: "#FAF8F4", boxShadow: "0 4px 24px rgba(46,42,39,0.12)" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=64&h=64&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: "#2E2A27" }}>Priya just booked</p>
                  <p className="text-xs" style={{ color: "#9B8B7A" }}>Balayage at Affinity</p>
                </div>
              </div>
            </div>
            <div
              className="absolute bottom-20 right-4 px-4 py-3 rounded-2xl"
              style={{ background: "#8B6544", boxShadow: "0 4px 24px rgba(139,101,68,0.3)" }}
            >
              <p className="text-xs font-medium" style={{ color: "#FAF8F4" }}>480+ verified salons</p>
              <p className="text-xs" style={{ color: "rgba(250,248,244,0.7)" }}>across Delhi NCR</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-14 px-6" style={{ background: "#FAF8F4" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#8B6544" }}>Browse By</p>
              <h2 className="text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>Popular Categories</h2>
            </div>
            <button onClick={() => setPage("explore")} className="text-sm flex items-center gap-1 transition-all hover:gap-2" style={{ color: "#8B6544" }}>
              View all <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => setPage("explore")}
                className="flex flex-col items-center gap-3 py-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ background: "#F7F4EF", border: "1px solid rgba(139,101,68,0.1)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(139,101,68,0.1)" }}>
                  <Icon size={20} style={{ color: "#8B6544" }} />
                </div>
                <span className="text-sm font-medium" style={{ color: "#2E2A27" }}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Salons */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#8B6544" }}>Handpicked</p>
              <h2 className="text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>Featured Salons</h2>
            </div>
            <button onClick={() => setPage("explore")} className="text-sm flex items-center gap-1" style={{ color: "#8B6544" }}>
              Explore all <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SALONS.slice(0, 3).map((salon) => (
              <SalonCard key={salon.id} salon={salon} onClick={() => setPage("explore")} />
            ))}
          </div>
        </div>
      </section>

      {/* Editor's Picks — asymmetric layout */}
      <section className="py-14 px-6" style={{ background: "#FAF8F4" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#8B6544" }}>This Month</p>
            <h2 className="text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>Editor's Picks</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Large card */}
            <div
              className="md:col-span-3 relative rounded-3xl overflow-hidden cursor-pointer group"
              style={{ height: 400 }}
              onClick={() => setPage("explore")}
            >
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&h=800&fit=crop&auto=format&q=80"
                alt="Bellissimo studio"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(46,42,39,0.7) 0%, transparent 50%)" }} />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs px-2.5 py-1 rounded-full mb-3 inline-block" style={{ background: "#8B6544", color: "#FAF8F4" }}>Skin & Glow</span>
                <h3 className="text-2xl font-medium mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#FAF8F4" }}>
                  Bellissimo Beauty Studio
                </h3>
                <p className="text-sm mb-3" style={{ color: "rgba(250,248,244,0.8)" }}>Greater Kailash I · ₹₹₹₹ · 4.7 ★</p>
                <p className="text-sm" style={{ color: "rgba(250,248,244,0.7)" }}>Award-winning European facials and advanced anti-aging in the heart of GK.</p>
              </div>
            </div>
            {/* Two small cards */}
            <div className="md:col-span-2 flex flex-col gap-6">
              {SALONS.slice(3, 5).map((salon) => (
                <div
                  key={salon.id}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group flex-1"
                  style={{ minHeight: 180 }}
                  onClick={() => setPage("explore")}
                >
                  <img
                    src={`https://images.unsplash.com/photo-${salon.image}?w=600&h=360&fit=crop&auto=format&q=80`}
                    alt={salon.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(46,42,39,0.65) 0%, transparent 55%)" }} />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-base font-medium mb-0.5" style={{ fontFamily: "'Playfair Display', serif", color: "#FAF8F4" }}>{salon.name}</h3>
                    <p className="text-xs" style={{ color: "rgba(250,248,244,0.75)" }}>{salon.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending This Week */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#8B6544" }}>Right Now</p>
              <h2 className="text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>Trending This Week</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {SALONS.slice(5, 9).map((salon) => (
              <SalonCard key={salon.id} salon={salon} onClick={() => setPage("explore")} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 px-6" style={{ background: "#FAF8F4" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#8B6544" }}>Trusted by Delhi</p>
            <h2 className="text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>What Our Members Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl" style={{ background: "#F7F4EF", border: "1px solid rgba(139,101,68,0.1)" }}>
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => <span key={s} style={{ color: "#8B6544" }}>★</span>)}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#4A3F38" }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-muted shrink-0">
                    <img src={`https://images.unsplash.com/photo-${t.avatar}?w=72&h=72&fit=crop&auto=format`} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#2E2A27" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "#9B8B7A" }}>{t.neighbourhood}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6" style={{ background: "#2E2A27" }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#8B6544" }}>Stay Informed</p>
          <h2 className="text-3xl mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#FAF8F4" }}>
            The Veloura Weekly Edit
          </h2>
          <p className="text-sm mb-7" style={{ color: "#9B8B7A" }}>
            Curated beauty news, new salon openings, exclusive offers, and journal essays — delivered every Sunday.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.08)", color: "#EDE8DF", border: "1px solid rgba(255,255,255,0.12)" }}
            />
            <button className="px-5 py-3 rounded-xl text-sm font-medium shrink-0" style={{ background: "#8B6544", color: "#FAF8F4" }}>
              Subscribe
            </button>
          </div>
          <p className="text-xs mt-3" style={{ color: "#6B5E55" }}>14,000+ subscribers. No spam, ever.</p>
        </div>
      </section>
    </div>
  );
}

// ─── EXPLORE PAGE ─────────────────────────────────────────────────────────────

function ExplorePage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Popular");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 35000]);
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const serviceFilters = ["Hair Color", "Balayage", "Bridal", "Skin", "Nails", "Spa", "Laser", "Korean", "Makeup"];
  const neighbourhoods = ["All", "South Delhi", "Hauz Khas", "West Delhi", "North Delhi"];
  const sortOptions = ["Popular", "Top Rated", "Price: Low", "Price: High", "Newest"];

  const toggleFilter = (f: string) => {
    setActiveFilters((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);
  };

  const popularStylists = [
    { name: "Kavita Sharma", specialty: "Balayage & Color", salon: "Affinity Salon", rating: 4.9, image: "1494790108377-be9c29b29330" },
    { name: "Meera Nair", specialty: "Korean Skincare", salon: "Studio Lumière", rating: 4.8, image: "1534528741775-53994a69daeb" },
    { name: "Pooja Rao", specialty: "Bridal Makeup", salon: "Maison de Beauté", rating: 4.9, image: "1438761681033-6461ffad8d80" },
    { name: "Anjali Singh", specialty: "Nail Art", salon: "The Nail Loft", rating: 4.9, image: "1544005313-94ddf0286df2" },
  ];

  const recentlyOpened = SALONS.filter((s) => s.isNew);

  return (
    <div className="pt-20">
      {/* Top bar */}
      <div className="sticky top-16 z-40 px-6 py-3" style={{ background: "rgba(247,244,239,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(139,101,68,0.1)" }}>
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{ background: filtersOpen ? "#8B6544" : "#EDE8DF", color: filtersOpen ? "#FAF8F4" : "#2E2A27" }}
          >
            <SlidersHorizontal size={15} /> Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </button>
          <div className="flex gap-2 overflow-x-auto pb-1 flex-1" style={{ scrollbarWidth: "none" }}>
            {serviceFilters.map((f) => (
              <button
                key={f}
                onClick={() => toggleFilter(f)}
                className="shrink-0 text-xs px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: activeFilters.includes(f) ? "#8B6544" : "#FAF8F4",
                  color: activeFilters.includes(f) ? "#FAF8F4" : "#6B5E55",
                  border: "1px solid rgba(139,101,68,0.15)",
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm px-3 py-2 rounded-xl outline-none"
            style={{ background: "#FAF8F4", color: "#2E2A27", border: "1px solid rgba(139,101,68,0.15)" }}
          >
            {sortOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {/* Filter panel */}
      {filtersOpen && (
        <div className="px-6 py-6" style={{ background: "#FAF8F4", borderBottom: "1px solid rgba(139,101,68,0.1)" }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-medium mb-3" style={{ color: "#2E2A27" }}>Neighbourhood</h4>
              <div className="flex flex-wrap gap-2">
                {neighbourhoods.map((n) => (
                  <button
                    key={n}
                    onClick={() => setSelectedNeighbourhood(n)}
                    className="text-xs px-3 py-1.5 rounded-full transition-all"
                    style={{
                      background: selectedNeighbourhood === n ? "#8B6544" : "#EDE8DF",
                      color: selectedNeighbourhood === n ? "#FAF8F4" : "#6B5E55",
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3" style={{ color: "#2E2A27" }}>Minimum Rating</h4>
              <div className="flex gap-2">
                {[0, 4, 4.5, 4.8].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className="text-xs px-3 py-1.5 rounded-full transition-all"
                    style={{
                      background: minRating === r ? "#8B6544" : "#EDE8DF",
                      color: minRating === r ? "#FAF8F4" : "#6B5E55",
                    }}
                  >
                    {r === 0 ? "Any" : `${r}+`}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3" style={{ color: "#2E2A27" }}>Price Range</h4>
              <div className="flex gap-2">
                {["₹", "₹₹", "₹₹₹", "₹₹₹₹"].map((p) => (
                  <button
                    key={p}
                    className="text-xs px-3 py-1.5 rounded-full transition-all"
                    style={{ background: "#EDE8DF", color: "#6B5E55" }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-4 flex justify-end">
            <button
              onClick={() => { setActiveFilters([]); setFiltersOpen(false); setSelectedNeighbourhood("All"); setMinRating(0); }}
              className="text-xs flex items-center gap-1"
              style={{ color: "#9B8B7A" }}
            >
              <RotateCcw size={12} /> Clear all filters
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: "#6B5E55" }}>
            Showing <span style={{ color: "#2E2A27", fontWeight: 500 }}>{SALONS.length} salons</span> across Delhi
          </p>
          <div className="flex gap-2">
            {["grid", "list"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as "grid" | "list")}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{ background: viewMode === mode ? "#8B6544" : "#EDE8DF", color: viewMode === mode ? "#FAF8F4" : "#6B5E55" }}
              >
                {mode === "grid" ? (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="6" height="6" rx="1" /><rect x="10" y="0" width="6" height="6" rx="1" /><rect x="0" y="10" width="6" height="6" rx="1" /><rect x="10" y="10" width="6" height="6" rx="1" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="1" width="16" height="3" rx="1" /><rect x="0" y="7" width="16" height="3" rx="1" /><rect x="0" y="13" width="16" height="3" rx="1" /></svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Salon grid */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" : "flex flex-col gap-4 mb-12"}>
          {SALONS.map((salon) => (
            viewMode === "grid" ? (
              <SalonCard key={salon.id} salon={salon} />
            ) : (
              <div
                key={salon.id}
                className="flex gap-4 p-4 rounded-2xl transition-all duration-200 hover:shadow-md"
                style={{ background: "#FAF8F4", border: "1px solid rgba(139,101,68,0.1)" }}
              >
                <div className="w-28 h-24 rounded-xl overflow-hidden shrink-0">
                  <img src={`https://images.unsplash.com/photo-${salon.image}?w=224&h=192&fit=crop&auto=format&q=80`} alt={salon.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-sm" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>{salon.name}</h3>
                    <span className="text-xs ml-2" style={{ color: "#9B8B7A" }}>{salon.priceRange}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 mb-1">
                    <StarRating rating={salon.rating} />
                    <span className="text-xs" style={{ color: "#9B8B7A" }}>({salon.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <MapPin size={11} style={{ color: "#9B8B7A" }} />
                    <span className="text-xs" style={{ color: "#9B8B7A" }}>{salon.location}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#6B5E55" }}>{salon.description}</p>
                </div>
                <div className="flex flex-col items-end justify-between shrink-0">
                  {salon.verified && <VerifiedBadge />}
                  <button className="text-xs px-4 py-1.5 rounded-full" style={{ background: "#8B6544", color: "#FAF8F4" }}>Book</button>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Map section */}
        <div className="mb-12">
          <h2 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>Map View</h2>
          <div
            className="w-full rounded-3xl overflow-hidden relative"
            style={{ height: 340, background: "#EDE8DF", border: "1px solid rgba(139,101,68,0.15)" }}
          >
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
              <MapPin size={32} style={{ color: "#8B6544" }} />
              <p className="text-sm font-medium" style={{ color: "#2E2A27" }}>Interactive Map</p>
              <p className="text-xs" style={{ color: "#9B8B7A" }}>10 salons pinned across Delhi NCR</p>
              <button className="px-4 py-2 rounded-full text-sm" style={{ background: "#8B6544", color: "#FAF8F4" }}>Open Full Map</button>
            </div>
            {/* Decorative dots representing salon pins */}
            {[{ top: "30%", left: "45%" }, { top: "55%", left: "60%" }, { top: "40%", left: "30%" }, { top: "65%", left: "35%" }, { top: "25%", left: "65%" }].map((pos, i) => (
              <div
                key={i}
                className="absolute w-6 h-6 rounded-full flex items-center justify-center"
                style={{ top: pos.top, left: pos.left, background: "#8B6544", border: "2px solid #FAF8F4", boxShadow: "0 2px 8px rgba(139,101,68,0.4)" }}
              >
                <span className="text-xs text-white" style={{ color: "#FAF8F4", fontSize: 8, fontWeight: 700 }}>{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Opened */}
        <div className="mb-12">
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#8B6544" }}>Just Arrived</p>
              <h2 className="text-2xl" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>Recently Opened</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentlyOpened.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </div>
        </div>

        {/* Popular Stylists */}
        <div className="mb-12">
          <div className="mb-5">
            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#8B6544" }}>The Talent</p>
            <h2 className="text-2xl" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>Popular Stylists</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {popularStylists.map((stylist) => (
              <div
                key={stylist.name}
                className="p-5 rounded-2xl text-center transition-all duration-200 hover:-translate-y-1"
                style={{ background: "#FAF8F4", border: "1px solid rgba(139,101,68,0.1)", boxShadow: "0 2px 16px rgba(46,42,39,0.06)" }}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border-2" style={{ borderColor: "#8B6544" }}>
                  <img src={`https://images.unsplash.com/photo-${stylist.image}?w=128&h=128&fit=crop&auto=format`} alt={stylist.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-medium text-sm mb-0.5" style={{ color: "#2E2A27" }}>{stylist.name}</h4>
                <p className="text-xs mb-1" style={{ color: "#9B8B7A" }}>{stylist.specialty}</p>
                <p className="text-xs mb-2" style={{ color: "#8B6544" }}>{stylist.salon}</p>
                <StarRating rating={stylist.rating} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── NEIGHBOURHOODS PAGE ──────────────────────────────────────────────────────

function NeighborhoodsPage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeArea, setActiveArea] = useState("south");

  const areas = [
    { id: "south", label: "South Delhi", subtitle: "Khan Market · Lajpat Nagar · Saket · Vasant Kunj", image: "1570172619644-dfd03ed5d881", priceLevel: "₹₹₹ – ₹₹₹₹", trending: ["Glass Skin Facials", "Balayage", "Laser Treatments"], hiddenGem: "Noor Beauty Collective, Safdarjung", salons: SALONS.filter((s) => s.neighborhood === "south"), description: "South Delhi's beauty corridor is defined by clinical precision and quiet luxury. From Khan Market's boutique studios to Saket's medical aesthetic clinics, this is where Delhi's most discerning clients come for results." },
    { id: "hauzkhas", label: "Hauz Khas & GK", subtitle: "HKV · GK I · GK II · Defence Colony", image: "1522337360788-8b13dee7a37e", priceLevel: "₹₹₹₹", trending: ["Korean Treatments", "Creative Color", "Scalp Health"], hiddenGem: "Atelier Glow Studio, Def Col Market", salons: SALONS.filter((s) => s.neighborhood === "hauzkhas"), description: "The creative heartbeat of Delhi's beauty scene. HKV and GK attract international-trained stylists, K-beauty specialists, and colour artisans in a neighbourhood that blends bohemian energy with genuine luxury." },
    { id: "west", label: "West Delhi", subtitle: "Rajouri Garden · Janakpuri · Punjabi Bagh", image: "1487412947147-5cebf100ffc2", priceLevel: "₹₹ – ₹₹₹", trending: ["Bridal Packages", "Airbrush Makeup", "Mehendi"], hiddenGem: "Sheen Beauty Parlour, Tagore Garden", salons: SALONS.filter((s) => s.neighborhood === "west"), description: "West Delhi's bridal beauty ecosystem is unmatched. Generations of wedding expertise, community recommendations, and artisan craftsmanship make this the destination for brides across the capital." },
    { id: "north", label: "North Delhi", subtitle: "Kamla Nagar · Pitampura · Model Town · Civil Lines", image: "1519014816548-bf5fe059798b", priceLevel: "₹₹ – ₹₹₹", trending: ["Ayurvedic Spa", "Nail Art", "Hair Color"], hiddenGem: "Ora Wellness Spa, Pitampura", salons: SALONS.filter((s) => s.neighborhood === "north"), description: "North Delhi's beauty scene is rising fast. Wellness-forward spas rooted in Ayurvedic tradition sit alongside contemporary nail studios and accessible colour bars — all without the South Delhi price tag." },
  ];

  const currentArea = areas.find((a) => a.id === activeArea)!;

  const mostBookedTreatments = [
    { name: "Hydrafacial", bookings: "8.2k", icon: "✨" },
    { name: "Balayage", bookings: "6.4k", icon: "✂️" },
    { name: "Bridal Makeup", bookings: "5.1k", icon: "💍" },
    { name: "Gel Nail Art", bookings: "4.8k", icon: "💅" },
    { name: "Korean Perm", bookings: "3.9k", icon: "🌿" },
    { name: "PRP Therapy", bookings: "2.7k", icon: "🔬" },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="px-6 py-14" style={{ background: "#FAF8F4" }}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#8B6544" }}>Discover by Area</p>
            <h1 className="text-5xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27", lineHeight: 1.15, fontWeight: 600 }}>
              Delhi's Beauty <em style={{ fontStyle: "italic" }}>Destinations</em>
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "#6B5E55" }}>
              Every neighbourhood in Delhi has its own beauty culture. Explore curated local experiences, hidden gems, and top-rated studios — by the area you know and love.
            </p>
          </div>
        </div>
      </section>

      {/* Area tabs */}
      <div className="sticky top-16 z-30 px-6" style={{ background: "rgba(247,244,239,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(139,101,68,0.1)" }}>
        <div className="max-w-7xl mx-auto flex gap-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {areas.map((area) => (
            <button
              key={area.id}
              onClick={() => setActiveArea(area.id)}
              className="shrink-0 py-4 px-5 text-sm font-medium transition-all duration-200 relative"
              style={{ color: activeArea === area.id ? "#8B6544" : "#6B5E55" }}
            >
              {area.label}
              {activeArea === area.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "#8B6544" }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Area content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Area header with hero image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 items-start">
          <div>
            <h2 className="text-4xl mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27", fontWeight: 600 }}>
              {currentArea.label}
            </h2>
            <p className="text-sm mb-4" style={{ color: "#9B8B7A" }}>{currentArea.subtitle}</p>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#4A3F38" }}>{currentArea.description}</p>
            <div className="flex items-center gap-4 mb-5">
              <div className="px-4 py-2 rounded-xl" style={{ background: "#EDE8DF" }}>
                <p className="text-xs mb-0.5" style={{ color: "#9B8B7A" }}>Avg. Price</p>
                <p className="text-sm font-medium" style={{ color: "#2E2A27" }}>{currentArea.priceLevel}</p>
              </div>
              <div className="px-4 py-2 rounded-xl" style={{ background: "#EDE8DF" }}>
                <p className="text-xs mb-0.5" style={{ color: "#9B8B7A" }}>Salons</p>
                <p className="text-sm font-medium" style={{ color: "#2E2A27" }}>{currentArea.salons.length} listed</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium mb-2" style={{ color: "#2E2A27" }}>Trending Treatments</p>
              <div className="flex flex-wrap gap-2">
                {currentArea.trending.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(139,101,68,0.1)", color: "#8B6544" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 p-4 rounded-xl" style={{ background: "#FAF8F4", border: "1px solid rgba(139,101,68,0.12)" }}>
              <p className="text-xs font-medium mb-1" style={{ color: "#8B6544" }}>💎 Hidden Gem</p>
              <p className="text-sm" style={{ color: "#2E2A27" }}>{currentArea.hiddenGem}</p>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden" style={{ height: 380 }}>
            <img
              src={`https://images.unsplash.com/photo-${currentArea.image}?w=800&h=760&fit=crop&auto=format&q=80`}
              alt={currentArea.label}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Featured salons in this area */}
        <div className="mb-12">
          <h3 className="text-2xl mb-5" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>
            Featured in {currentArea.label}
          </h3>
          {currentArea.salons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {currentArea.salons.map((salon) => (
                <SalonCard key={salon.id} salon={salon} />
              ))}
            </div>
          ) : (
            <div className="py-10 text-center rounded-2xl" style={{ background: "#FAF8F4", border: "1px solid rgba(139,101,68,0.1)" }}>
              <p className="text-sm" style={{ color: "#9B8B7A" }}>More salons coming soon to this area.</p>
            </div>
          )}
        </div>

        {/* Local recommendations */}
        <div className="p-6 rounded-3xl mb-12" style={{ background: "#FAF8F4", border: "1px solid rgba(139,101,68,0.1)" }}>
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#8B6544" }}>Local Insight</p>
          <h3 className="text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>
            What the Locals Know
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { tip: "Book Tues–Thurs for shorter waits and often better rates on weekday specials.", label: "Best Days to Visit" },
              { tip: "Ask your stylist for the 'consultation upgrade' — most salons offer extended pre-service consultations at no extra cost.", label: "Insider Tip" },
              { tip: "Loyalty cards at independent salons in this area often include a complimentary treatment after 5 visits.", label: "Loyalty Perks" },
            ].map((item) => (
              <div key={item.label} className="flex gap-3">
                <div className="w-1 rounded-full shrink-0" style={{ background: "#8B6544", minHeight: 40 }} />
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: "#8B6544" }}>{item.label}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#4A3F38" }}>{item.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most booked treatments across Delhi */}
        <div>
          <div className="mb-5">
            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#8B6544" }}>Delhi-Wide</p>
            <h3 className="text-2xl" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>Most Booked Treatments</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {mostBookedTreatments.map((t) => (
              <div
                key={t.name}
                className="p-4 rounded-2xl text-center transition-all duration-200 hover:-translate-y-1"
                style={{ background: "#FAF8F4", border: "1px solid rgba(139,101,68,0.1)" }}
              >
                <div className="text-2xl mb-2">{t.icon}</div>
                <p className="text-xs font-medium mb-1" style={{ color: "#2E2A27" }}>{t.name}</p>
                <p className="text-xs" style={{ color: "#8B6544" }}>{t.bookings} bookings</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── JOURNAL PAGE ─────────────────────────────────────────────────────────────

function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Haircare", "Skincare", "Nails", "Bridal", "Editor's Pick"];
  const featured = ARTICLES.filter((a) => a.featured);
  const rest = ARTICLES.filter((a) => !a.featured);

  const filtered = activeCategory === "All" ? rest : rest.filter((a) => a.category === activeCategory);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="px-6 py-14" style={{ background: "#FAF8F4" }}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#8B6544" }}>The Veloura Journal</p>
            <h1 className="text-5xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27", fontWeight: 600, lineHeight: 1.15 }}>
              Beauty, Observed
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "#6B5E55" }}>
              Expert guides, seasonal edits, bridal timelines, and trend reports — written for Delhi's most curious beauty clients.
            </p>
          </div>
        </div>
      </section>

      {/* Featured — magazine hero layout */}
      <section className="px-6 pb-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6" style={{ height: "auto" }}>
            {/* Main feature — fixed height so right column can match */}
            <div className="md:col-span-3 rounded-3xl overflow-hidden cursor-pointer group relative" style={{ height: 520 }}>
              <img
                src={`https://images.unsplash.com/photo-${featured[0].image}?w=900&h=1040&fit=crop&auto=format&q=80`}
                alt={featured[0].title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(46,42,39,0.85) 0%, rgba(46,42,39,0.1) 60%, transparent 100%)" }} />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-xs px-2.5 py-1 rounded-full inline-block mb-3" style={{ background: "#8B6544", color: "#FAF8F4" }}>
                  {featured[0].category}
                </span>
                <h2 className="text-3xl mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#FAF8F4", lineHeight: 1.2 }}>
                  {featured[0].title}
                </h2>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: "rgba(250,248,244,0.75)" }}>{featured[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: "rgba(250,248,244,0.6)" }}>By {featured[0].author}</span>
                    <span style={{ color: "rgba(250,248,244,0.3)" }}>·</span>
                    <span className="text-xs flex items-center gap-1" style={{ color: "rgba(250,248,244,0.6)" }}>
                      <Clock size={11} /> {featured[0].readTime}
                    </span>
                  </div>
                  <span className="text-xs flex items-center gap-1 transition-all duration-200 group-hover:gap-2" style={{ color: "rgba(250,248,244,0.8)" }}>
                    Read <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            </div>

            {/* Right column — matches main feature height exactly */}
            <div className="md:col-span-2 flex flex-col gap-5" style={{ height: 520 }}>
              {/* Secondary feature image — takes 60% of column height */}
              <div className="rounded-3xl overflow-hidden cursor-pointer group relative" style={{ flex: "0 0 300px" }}>
                <img
                  src={`https://images.unsplash.com/photo-${featured[1].image}?w=600&h=600&fit=crop&auto=format&q=80`}
                  alt={featured[1].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(46,42,39,0.8) 0%, transparent 55%)" }} />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-xs px-2.5 py-1 rounded-full inline-block mb-2" style={{ background: "#8B6544", color: "#FAF8F4" }}>
                    {featured[1].category}
                  </span>
                  <h3 className="text-lg mb-1.5" style={{ fontFamily: "'Playfair Display', serif", color: "#FAF8F4", lineHeight: 1.25 }}>
                    {featured[1].title}
                  </h3>
                  <p className="text-xs flex items-center justify-between" style={{ color: "rgba(250,248,244,0.65)" }}>
                    <span>By {featured[1].author} · {featured[1].readTime}</span>
                    <ArrowRight size={12} style={{ color: "rgba(250,248,244,0.5)" }} />
                  </p>
                </div>
              </div>

              {/* Quote card — fills remaining height */}
              <div className="p-6 rounded-3xl flex flex-col justify-between flex-1" style={{ background: "#2E2A27" }}>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#8B6544" }}>Editor's Note · June 2026</p>
                  <p className="text-base leading-relaxed" style={{ fontFamily: "'Playfair Display', serif", color: "#EDE8DF", fontStyle: "italic" }}>
                    "The best beauty routine is one that fits your life — not the one in the magazine. This month, we're editing down, not up."
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-xs" style={{ color: "#9B8B7A" }}>— Aditi Verma, Editor-in-Chief</p>
                  <button className="text-xs flex items-center gap-1" style={{ color: "#8B6544" }}>
                    Read column <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <div className="px-6 py-4" style={{ background: "#FAF8F4", borderTop: "1px solid rgba(139,101,68,0.1)", borderBottom: "1px solid rgba(139,101,68,0.1)" }}>
        <div className="max-w-7xl mx-auto flex gap-6 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className="shrink-0 text-sm pb-1 transition-all duration-200 relative"
              style={{
                color: activeCategory === c ? "#8B6544" : "#6B5E55",
                fontWeight: activeCategory === c ? 500 : 400,
              }}
            >
              {c}
              {activeCategory === c && <span className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "#8B6544" }} />}
            </button>
          ))}
        </div>
      </div>

      {/* Article grid */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="py-20 text-center rounded-3xl" style={{ background: "#FAF8F4", border: "1px solid rgba(139,101,68,0.1)" }}>
              <p className="text-4xl mb-4">📖</p>
              <p className="text-base font-medium mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>
                Nothing in this category yet
              </p>
              <p className="text-sm" style={{ color: "#9B8B7A" }}>
                Check back soon — new essays are published every week.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="mt-4 text-sm px-4 py-2 rounded-full"
                style={{ background: "rgba(139,101,68,0.1)", color: "#8B6544" }}
              >
                View all articles
              </button>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 gap-8"
              style={{
                gridTemplateColumns: filtered.length === 1
                  ? "1fr"
                  : filtered.length === 2
                    ? "repeat(2, 1fr)"
                    : "repeat(3, 1fr)",
              }}
            >
              {filtered.map((article) => (
                <div key={article.id} className="group cursor-pointer flex flex-col">
                  <div className="rounded-2xl overflow-hidden mb-4" style={{ height: 240, background: "#EDE8DF" }}>
                    <img
                      src={`https://images.unsplash.com/photo-${article.image}?w=600&h=480&fit=crop&auto=format&q=80`}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(139,101,68,0.1)", color: "#8B6544" }}
                    >
                      {article.category}
                    </span>
                    <span className="text-xs flex items-center gap-1" style={{ color: "#9B8B7A" }}>
                      <Clock size={10} /> {article.readTime}
                    </span>
                  </div>
                  <h3
                    className="text-xl mb-2 leading-tight flex-1"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B5E55" }}>{article.excerpt}</p>
                  <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(139,101,68,0.1)" }}>
                    <div className="flex items-center gap-2 text-xs" style={{ color: "#9B8B7A" }}>
                      <span>By {article.author}</span>
                      <span>·</span>
                      <span>{article.date}</span>
                    </div>
                    <span className="text-xs flex items-center gap-1 font-medium transition-all duration-200 group-hover:gap-2" style={{ color: "#8B6544" }}>
                      Read <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Beauty trends strip */}
      <section className="px-6 py-12" style={{ background: "#FAF8F4" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#8B6544" }}>June 2026</p>
            <h2 className="text-2xl" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>Beauty Trends on Our Radar</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { trend: "Glazed Skin", desc: "The dewy, glass-like finish that defined 2025 is evolving into a more matte luminosity.", tag: "Skincare" },
              { trend: "Copper Tones", desc: "Warm copper balayage is replacing ash as Delhi's favourite autumn hair colour direction.", tag: "Hair" },
              { trend: "Negative Space Nails", desc: "Clean, minimal nail art that leaves strategic bare sections. Less is definitively more.", tag: "Nails" },
              { trend: "Soft Bridal", desc: "The 2026 bride is choosing skin-forward looks over heavy coverage. Freckles are in.", tag: "Bridal" },
            ].map((item) => (
              <div
                key={item.trend}
                className="p-5 rounded-2xl cursor-pointer transition-all duration-200 hover:-translate-y-1"
                style={{ background: "#F7F4EF", border: "1px solid rgba(139,101,68,0.1)" }}
              >
                <span className="text-xs px-2 py-0.5 rounded-full inline-block mb-3" style={{ background: "rgba(139,101,68,0.1)", color: "#8B6544" }}>
                  {item.tag}
                </span>
                <h4 className="text-base font-medium mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>
                  {item.trend}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "#6B5E55" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── AI CONCIERGE PAGE ────────────────────────────────────────────────────────

function AIConciergePage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    { role: "ai", text: "Hello! I'm your personal Veloura Beauty Concierge. I can help you find the perfect salon, recommend treatments, build a skincare routine, or plan your bridal timeline. What can I help you with today?" },
  ]);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const aiCards = [
    { icon: "☀️", title: "Summer Hair Rescue", desc: "Beat the Delhi heat with expert haircare rituals for monsoon season.", prompt: "Give me a summer hair rescue plan for Delhi's monsoon season." },
    { icon: "💍", title: "Bridal Beauty Timeline", desc: "Your personalised 12-month countdown to wedding-day perfection.", prompt: "Create a 12-month bridal beauty timeline for me." },
    { icon: "🌿", title: "Korean Glass Skin Guide", desc: "Adapt the K-beauty method to Delhi's climate and water quality.", prompt: "Help me build a Korean glass skin routine for Delhi's climate." },
    { icon: "✂️", title: "Hair Color Simulator", desc: "Find your perfect hair colour match based on skin tone and lifestyle.", prompt: "Help me find the best hair colour for my skin tone." },
    { icon: "📍", title: "Trending Near You", desc: "Discover what's hot this week in your preferred neighbourhood.", prompt: "What's trending in South Delhi beauty salons this week?" },
    { icon: "🎨", title: "Nail Inspiration Finder", desc: "Curated nail art ideas matched to your aesthetic and occasion.", prompt: "I need nail art inspiration for a wedding I'm attending." },
    { icon: "🧴", title: "Product Routine Builder", desc: "A personalised morning and evening skincare routine for your skin type.", prompt: "Build me a personalised skincare routine for combination skin." },
    { icon: "🤖", title: "Beauty Chat Assistant", desc: "Open-ended beauty Q&A — ask me anything about treatments and salons.", prompt: "I want to ask you some beauty questions." },
  ];

  const canned: Record<string, string> = {
    "Give me a summer hair rescue plan for Delhi's monsoon season.": "For Delhi's monsoon, I recommend: 1) Switch to a sulphate-free shampoo to prevent moisture loss, 2) Apply a keratin-based serum before stepping out, 3) Book a deep-conditioning treatment at Affinity Salon in Hauz Khas every 3 weeks, 4) Use a silk pillowcase to prevent frizz overnight. Shall I book you an appointment?",
    "Create a 12-month bridal beauty timeline for me.": "Here's your personalised timeline:\n\n• 12 months out: Begin skin consultations and any laser treatments at Stein Aesthetics.\n• 9 months: Start bridal hair growth treatments. First trial run.\n• 6 months: Lock in your makeup artist. Begin monthly facials.\n• 3 months: Teeth whitening, brow shaping, final colour treatments.\n• 1 month: Bridal trial. Body polishing spa.\n• 1 week: Nails, threading, waxing.\n• Wedding day: Relax — you're glowing. ✨",
    default: "That's a great question! Based on your profile, I'd suggest exploring the salons in South Delhi — particularly Bellissimo Beauty Studio in GK for skin and Affinity Salon in Hauz Khas for hair. Would you like me to find you an appointment?",
  };

  const handleSend = () => {
    if (!message.trim()) return;
    const userMsg = message;
    setMessage("");
    setChat((prev) => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      const response = canned[userMsg] || canned["default"];
      setChat((prev) => [...prev, { role: "ai", text: response }]);
    }, 800);
  };

  const handleCardClick = (card: typeof aiCards[0], index: number) => {
    setActiveCard(index);
    setChat((prev) => [...prev, { role: "user", text: card.prompt }]);
    setTimeout(() => {
      const response = canned[card.prompt] || canned["default"];
      setChat((prev) => [...prev, { role: "ai", text: response }]);
    }, 800);
  };

  const recentConversations = [
    { title: "Bridal package recommendation for December", time: "2 days ago" },
    { title: "Best salons for Korean perm in HKV", time: "5 days ago" },
    { title: "Glass skin routine for oily skin", time: "1 week ago" },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="px-6 py-14" style={{ background: "linear-gradient(135deg, #2E2A27 0%, #4A3F38 100%)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-5" style={{ background: "rgba(139,101,68,0.3)", color: "#D4A76A" }}>
              <Sparkles size={12} /> Powered by Veloura AI
            </span>
            <h1 className="text-5xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#FAF8F4", lineHeight: 1.15, fontWeight: 600 }}>
              Discover Delhi's Best<br />
              <em style={{ color: "#D4A76A", fontStyle: "italic" }}>Beauty Experiences,</em><br />
              <span style={{ color: "#FAF8F4" }}>Personalised by AI</span>
            </h1>
            <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(250,248,244,0.7)" }}>
              AI-powered recommendations trained on 480+ Delhi salons, 50,000+ reviews, and the expertise of the city's finest beauty professionals.
            </p>
            <div className="flex items-center gap-5">
              <div>
                <p className="text-2xl font-semibold" style={{ color: "#FAF8F4" }}>50k+</p>
                <p className="text-xs" style={{ color: "#9B8B7A" }}>Recommendations made</p>
              </div>
              <div className="h-8 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div>
                <p className="text-2xl font-semibold" style={{ color: "#FAF8F4" }}>96%</p>
                <p className="text-xs" style={{ color: "#9B8B7A" }}>Satisfaction rate</p>
              </div>
              <div className="h-8 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div>
                <p className="text-2xl font-semibold" style={{ color: "#FAF8F4" }}>24/7</p>
                <p className="text-xs" style={{ color: "#9B8B7A" }}>Always available</p>
              </div>
            </div>
          </div>
          {/* Recent conversations */}
          <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <p className="text-xs font-medium mb-3" style={{ color: "#9B8B7A" }}>Recent Conversations</p>
            {recentConversations.map((rc) => (
              <div key={rc.title} className="flex items-center gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(139,101,68,0.3)" }}>
                  <MessageCircle size={13} style={{ color: "#D4A76A" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate" style={{ color: "#EDE8DF" }}>{rc.title}</p>
                  <p className="text-xs" style={{ color: "#6B5E55" }}>{rc.time}</p>
                </div>
                <ChevronRight size={14} style={{ color: "#6B5E55" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Feature Cards */}
      <section className="px-6 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#8B6544" }}>Start With</p>
            <h2 className="text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>Concierge Features</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {aiCards.map((card, i) => (
              <button
                key={card.title}
                onClick={() => handleCardClick(card, i)}
                className="p-5 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: activeCard === i ? "#8B6544" : "#FAF8F4",
                  border: "1px solid",
                  borderColor: activeCard === i ? "#8B6544" : "rgba(139,101,68,0.12)",
                  boxShadow: activeCard === i ? "0 8px 32px rgba(139,101,68,0.25)" : "0 2px 16px rgba(46,42,39,0.06)",
                }}
              >
                <div className="text-2xl mb-3">{card.icon}</div>
                <h4 className="text-sm font-medium mb-1.5" style={{ color: activeCard === i ? "#FAF8F4" : "#2E2A27" }}>
                  {card.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: activeCard === i ? "rgba(250,248,244,0.8)" : "#6B5E55" }}>
                  {card.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="px-6 pb-14">
        <div className="max-w-3xl mx-auto">
          <div className="mb-5">
            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#8B6544" }}>Live Chat</p>
            <h2 className="text-2xl" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>Beauty Chat Assistant</h2>
          </div>
          <div
            className="rounded-3xl overflow-hidden"
            style={{ border: "1px solid rgba(139,101,68,0.15)", boxShadow: "0 8px 40px rgba(46,42,39,0.08)" }}
          >
            {/* Chat header */}
            <div className="px-5 py-4 flex items-center gap-3" style={{ background: "#FAF8F4", borderBottom: "1px solid rgba(139,101,68,0.1)" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#8B6544" }}>
                <Sparkles size={16} style={{ color: "#FAF8F4" }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "#2E2A27" }}>Veloura AI Concierge</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: "#4CAF50" }} />
                  <span className="text-xs" style={{ color: "#9B8B7A" }}>Online — responds instantly</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-5 space-y-4 overflow-y-auto" style={{ minHeight: 320, maxHeight: 420, background: "#F7F4EF" }}>
              {chat.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}>
                  {msg.role === "ai" && (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#8B6544" }}>
                      <Sparkles size={12} style={{ color: "#FAF8F4" }} />
                    </div>
                  )}
                  <div
                    className="max-w-xs md:max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed"
                    style={{
                      background: msg.role === "user" ? "#8B6544" : "#FAF8F4",
                      color: msg.role === "user" ? "#FAF8F4" : "#2E2A27",
                      boxShadow: "0 2px 8px rgba(46,42,39,0.08)",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Suggested prompts — only shown when chat is at initial state */}
            {chat.length <= 1 && (
              <div className="px-4 pt-3 pb-0 flex flex-wrap gap-2" style={{ background: "#FAF8F4" }}>
                {[
                  "Find a bridal makeup package",
                  "Recommend a Korean skincare routine",
                  "Best salons in South Delhi",
                  "Help me choose a haircut",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setChat((prev) => [...prev, { role: "user", text: prompt }]);
                      setTimeout(() => {
                        setChat((prev) => [
                          ...prev,
                          { role: "ai", text: canned[prompt] || canned["default"] },
                        ]);
                      }, 800);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:opacity-80"
                    style={{
                      border: "1px solid rgba(139,101,68,0.2)",
                      color: "#8B6544",
                      background: "rgba(139,101,68,0.05)",
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 flex gap-3" style={{ background: "#FAF8F4", borderTop: "1px solid rgba(139,101,68,0.1)" }}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about salons, treatments, routines..."
                className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: "#EDE8DF", color: "#2E2A27" }}
              />
              <button
                onClick={handleSend}
                className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-90"
                style={{ background: "#8B6544", color: "#FAF8F4" }}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Personalised Insights */}
      <section className="px-6 pb-14">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#8B6544" }}>For You</p>
            <h2 className="text-2xl" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>Recommended Treatments</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { treatment: "Hydrafacial MD", reason: "Ideal for combination skin during monsoon", salon: "Bellissimo Beauty Studio", price: "From ₹5,500", icon: "💧" },
              { treatment: "Copper Balayage", reason: "Trending colour that complements warm skin tones", salon: "Affinity Salon", price: "From ₹7,000", icon: "🌟" },
              { treatment: "Glass Skin Protocol", reason: "Deep hydration + brightening for pre-event prep", salon: "Lumière Skin Studio", price: "From ₹4,200", icon: "✨" },
            ].map((item) => (
              <div
                key={item.treatment}
                className="p-5 rounded-2xl"
                style={{ background: "#FAF8F4", border: "1px solid rgba(139,101,68,0.12)", boxShadow: "0 2px 16px rgba(46,42,39,0.06)" }}
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4 className="font-medium mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>{item.treatment}</h4>
                <p className="text-xs mb-2 leading-relaxed" style={{ color: "#6B5E55" }}>{item.reason}</p>
                <p className="text-xs mb-1" style={{ color: "#8B6544" }}>{item.salon}</p>
                <p className="text-xs font-medium" style={{ color: "#2E2A27" }}>{item.price}</p>
                <button className="mt-3 text-xs px-3 py-1.5 rounded-full w-full text-center" style={{ background: "rgba(139,101,68,0.1)", color: "#8B6544" }}>
                  Book This Treatment
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── STYLE QUIZ ───────────────────────────────────────────────────────────────

function StyleQuizPage({ setPage }: { setPage: (p: Page) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [step]: answer }));
    if (step < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const matches = [
      {
        salon: SALONS[0],
        match: 98,
        reason: "Your preference for natural aesthetics and Hauz Khas location makes this a perfect match. Expert in soft balayage exactly within your budget.",
      },
      {
        salon: SALONS[3],
        match: 94,
        reason: "Award-winning Korean color specialists with techniques that pair beautifully with your natural and understated aesthetic preference.",
      },
      {
        salon: SALONS[1],
        match: 91,
        reason: "Your skin focus aligns perfectly with Bellissimo's European facial treatments. Premium, results-driven, and within your stated budget.",
      },
    ];

    return (
      <div className="min-h-screen pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-xs tracking-widest uppercase mb-3 px-3 py-1 rounded-full" style={{ background: "rgba(139,101,68,0.1)", color: "#8B6544" }}>
              Style Quiz Results
            </span>
            <h1 className="text-4xl mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>
              Perfect Picks <em style={{ fontStyle: "italic" }}>For You</em>
            </h1>
            <p className="text-sm" style={{ color: "#6B5E55" }}>Based on your style profile, we've curated your ideal beauty matches.</p>
          </div>

          <div className="space-y-5 mb-10">
            {matches.map(({ salon, match, reason }, idx) => (
              <div
                key={salon.id}
                className="flex flex-col md:flex-row gap-0 rounded-3xl overflow-hidden"
                style={{
                  background: "#FAF8F4",
                  border: idx === 0 ? "1.5px solid #8B6544" : "1px solid rgba(139,101,68,0.12)",
                  boxShadow: idx === 0 ? "0 8px 40px rgba(139,101,68,0.15)" : "0 2px 24px rgba(46,42,39,0.07)",
                }}
              >
                <div className="md:w-56 h-52 md:h-auto shrink-0 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${salon.image}?w=448&h=416&fit=crop&auto=format&q=80`}
                    alt={salon.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-medium mb-0.5" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>
                        {salon.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "#9B8B7A" }}>
                        <MapPin size={11} /> {salon.location}
                      </div>
                    </div>
                    <div
                      className="px-3 py-1.5 rounded-full text-sm font-semibold shrink-0"
                      style={{
                        background: idx === 0 ? "#8B6544" : "rgba(139,101,68,0.1)",
                        color: idx === 0 ? "#FAF8F4" : "#8B6544",
                      }}
                    >
                      {match}% Match
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <StarRating rating={salon.rating} />
                    <span className="text-xs" style={{ color: "#9B8B7A" }}>({salon.reviews} reviews)</span>
                    {salon.verified && <VerifiedBadge />}
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "#4A3F38" }}>{reason}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs" style={{ color: "#9B8B7A" }}>{salon.bookings} bookings · {salon.priceRange}</span>
                      <span className="text-xs font-medium" style={{ color: "#8B6544" }}>Verified Partner</span>
                    </div>
                    <button
                      className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:opacity-90"
                      style={{ background: "#8B6544", color: "#FAF8F4" }}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2"
              style={{ border: "1px solid rgba(139,101,68,0.25)", color: "#8B6544" }}
            >
              <RotateCcw size={14} /> Retake Quiz
            </button>
            <button
              onClick={() => setPage("explore")}
              className="px-6 py-3 rounded-full text-sm font-medium"
              style={{ background: "#8B6544", color: "#FAF8F4" }}
            >
              Explore All Salons
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[step];
  const progress = ((step) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen pt-20 pb-10 flex flex-col" style={{ background: "#F7F4EF" }}>
      {/* Progress */}
      <div className="sticky top-16 z-30 px-6 py-4" style={{ background: "rgba(247,244,239,0.95)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs" style={{ color: "#9B8B7A" }}>Step {step + 1} of {QUIZ_QUESTIONS.length}</span>
            <span className="text-xs" style={{ color: "#8B6544" }}>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#EDE8DF" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "#8B6544" }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-10">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#8B6544" }}>Style Quiz</p>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27", lineHeight: 1.25 }}>
              {q.question}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {q.options.map((option, i) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="p-5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg group"
                style={{
                  background: answers[step] === option ? "#8B6544" : "#FAF8F4",
                  border: "1px solid",
                  borderColor: answers[step] === option ? "#8B6544" : "rgba(139,101,68,0.12)",
                  boxShadow: "0 2px 16px rgba(46,42,39,0.06)",
                }}
              >
                <div className="text-2xl mb-3">{q.icons[i]}</div>
                <p
                  className="text-base font-medium"
                  style={{
                    color: answers[step] === option ? "#FAF8F4" : "#2E2A27",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {option}
                </p>
              </button>
            ))}
          </div>

          {step > 0 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setStep(step - 1)}
                className="text-sm flex items-center gap-1 mx-auto"
                style={{ color: "#9B8B7A" }}
              >
                <ChevronLeft size={14} /> Go back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ACCOUNT PAGE ─────────────────────────────────────────────────────────────

function AccountPage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState("upcoming");

  const tabs = [
    { id: "upcoming", label: "Upcoming" },
    { id: "saved", label: "Saved" },
    { id: "history", label: "History" },
  ];

  const upcoming = [
    { salon: "Affinity Salon", service: "Balayage + Toner", date: "June 28, 2026", time: "11:00 AM", image: "1522337360788-8b13dee7a37e", status: "Confirmed" },
    { salon: "Bellissimo Beauty Studio", service: "Hydrafacial MD", date: "July 5, 2026", time: "2:30 PM", image: "1540555700478-4be289fbecef", status: "Pending" },
  ];

  const saved = SALONS.slice(0, 4);

  const history = [
    { salon: "The Nail Loft", service: "Gel Extensions + Nail Art", date: "June 12, 2026", price: "₹3,200", image: "1595476108010-b4d1f102b1b1", rating: 5 },
    { salon: "Gloss & Co.", service: "Haircut + Blowout", date: "May 28, 2026", price: "₹2,500", image: "1562322140-8baeececf3df", rating: 4 },
    { salon: "Stein Aesthetics Clinic", service: "Chemical Peel + PRP", date: "May 10, 2026", price: "₹12,000", image: "1570172619644-dfd03ed5d881", rating: 5 },
  ];

  return (
    <div className="pt-20">
      {/* Profile header */}
      <section className="px-6 py-10" style={{ background: "#FAF8F4", borderBottom: "1px solid rgba(139,101,68,0.1)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="flex items-center gap-5">
            <div
              className="w-20 h-20 rounded-full overflow-hidden border-2"
              style={{ borderColor: "#8B6544" }}
            >
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&auto=format" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-medium mb-0.5" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>
                Priya Malhotra
              </h1>
              <p className="text-sm mb-1" style={{ color: "#9B8B7A" }}>priya.malhotra@gmail.com</p>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full" style={{ background: "rgba(139,101,68,0.12)", color: "#8B6544" }}>
                  Gold Member
                </span>
                <span className="text-xs" style={{ color: "#9B8B7A" }}>· Member since March 2025</span>
              </div>
            </div>
          </div>

          {/* Beauty Profile Card */}
          <div className="md:ml-auto p-5 rounded-2xl" style={{ background: "#F7F4EF", border: "1px solid rgba(139,101,68,0.12)", minWidth: 280 }}>
            <p className="text-xs font-medium mb-3" style={{ color: "#8B6544" }}>✨ Your Beauty Profile</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Style", value: "Natural & Minimal" },
                { label: "Budget", value: "₹8k – ₹15k" },
                { label: "Concern", value: "Skin & Glow" },
                { label: "Neighbourhood", value: "South Delhi" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs" style={{ color: "#9B8B7A" }}>{item.label}</p>
                  <p className="text-xs font-medium" style={{ color: "#2E2A27" }}>{item.value}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setPage("quiz")}
              className="mt-3 text-xs px-3 py-1.5 rounded-full w-full"
              style={{ background: "rgba(139,101,68,0.1)", color: "#8B6544" }}
            >
              Update Profile →
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-6" style={{ background: "#F7F4EF", borderBottom: "1px solid rgba(139,101,68,0.1)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Appointments", value: "12", icon: Calendar },
            { label: "Saved Salons", value: "8", icon: Heart },
            { label: "Reviews Written", value: "7", icon: Star },
            { label: "Loyalty Points", value: "2,340", icon: Gift },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: "#FAF8F4", border: "1px solid rgba(139,101,68,0.1)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(139,101,68,0.1)" }}>
                <Icon size={16} style={{ color: "#8B6544" }} />
              </div>
              <div>
                <p className="text-xl font-semibold" style={{ color: "#2E2A27" }}>{value}</p>
                <p className="text-xs" style={{ color: "#9B8B7A" }}>{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <div className="px-6" style={{ background: "#FAF8F4", borderBottom: "1px solid rgba(139,101,68,0.1)" }}>
        <div className="max-w-7xl mx-auto flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="py-4 px-5 text-sm font-medium transition-all duration-200 relative"
              style={{ color: activeTab === tab.id ? "#8B6544" : "#6B5E55" }}
            >
              {tab.label}
              {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "#8B6544" }} />}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "upcoming" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>Upcoming Appointments</h2>
            </div>
            {upcoming.map((apt) => (
              <div key={apt.service} className="flex gap-4 p-5 rounded-2xl" style={{ background: "#FAF8F4", border: "1px solid rgba(139,101,68,0.1)" }}>
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <img src={`https://images.unsplash.com/photo-${apt.image}?w=160&h=160&fit=crop&auto=format`} alt={apt.salon} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium" style={{ color: "#2E2A27" }}>{apt.salon}</h3>
                      <p className="text-sm" style={{ color: "#6B5E55" }}>{apt.service}</p>
                    </div>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        background: apt.status === "Confirmed" ? "rgba(76,175,80,0.1)" : "rgba(255,152,0,0.1)",
                        color: apt.status === "Confirmed" ? "#388E3C" : "#F57C00",
                      }}
                    >
                      {apt.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs flex items-center gap-1" style={{ color: "#9B8B7A" }}>
                      <Calendar size={11} /> {apt.date}
                    </span>
                    <span className="text-xs flex items-center gap-1" style={{ color: "#9B8B7A" }}>
                      <Clock size={11} /> {apt.time}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs px-3 py-1 rounded-full" style={{ background: "#8B6544", color: "#FAF8F4" }}>Reschedule</button>
                    <button className="text-xs px-3 py-1 rounded-full" style={{ border: "1px solid rgba(139,101,68,0.2)", color: "#6B5E55" }}>Cancel</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "saved" && (
          <div>
            <h2 className="text-xl mb-5" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>Saved Salons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {saved.map((salon) => (
                <div key={salon.id} className="flex gap-4 p-4 rounded-2xl" style={{ background: "#FAF8F4", border: "1px solid rgba(139,101,68,0.1)" }}>
                  <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0">
                    <img src={`https://images.unsplash.com/photo-${salon.image}?w=192&h=160&fit=crop&auto=format`} alt={salon.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-0.5 truncate" style={{ color: "#2E2A27" }}>{salon.name}</h3>
                    <p className="text-xs mb-1" style={{ color: "#9B8B7A" }}>{salon.location}</p>
                    <StarRating rating={salon.rating} />
                    <button className="mt-2 text-xs px-3 py-1 rounded-full" style={{ background: "#8B6544", color: "#FAF8F4" }}>Book</button>
                  </div>
                  <button className="shrink-0">
                    <Heart size={16} fill="#8B6544" stroke="#8B6544" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div>
            <h2 className="text-xl mb-5" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>Past Bookings</h2>
            <div className="space-y-4">
              {history.map((apt) => (
                <div key={apt.service} className="flex gap-4 p-5 rounded-2xl" style={{ background: "#FAF8F4", border: "1px solid rgba(139,101,68,0.1)" }}>
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <img src={`https://images.unsplash.com/photo-${apt.image}?w=160&h=160&fit=crop&auto=format`} alt={apt.salon} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-sm" style={{ color: "#2E2A27" }}>{apt.salon}</h3>
                        <p className="text-xs" style={{ color: "#6B5E55" }}>{apt.service}</p>
                        <p className="text-xs mt-0.5" style={{ color: "#9B8B7A" }}>{apt.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium" style={{ color: "#2E2A27" }}>{apt.price}</p>
                        <div className="flex gap-0.5 mt-1 justify-end">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <span key={s} style={{ color: s <= apt.rating ? "#8B6544" : "#D4C4B0", fontSize: 12 }}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(139,101,68,0.1)", color: "#8B6544" }}>Book Again</button>
                      <button className="text-xs px-3 py-1 rounded-full" style={{ border: "1px solid rgba(139,101,68,0.2)", color: "#6B5E55" }}>Write Review</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loyalty rewards */}
        <div className="mt-10 p-6 rounded-3xl" style={{ background: "linear-gradient(135deg, #2E2A27 0%, #4A3F38 100%)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#8B6544" }}>Gold Membership</p>
              <h3 className="text-xl" style={{ fontFamily: "'Playfair Display', serif", color: "#FAF8F4" }}>Loyalty Rewards</h3>
            </div>
            <Award size={32} style={{ color: "#D4A76A" }} />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div>
              <p className="text-3xl font-semibold" style={{ color: "#FAF8F4" }}>2,340</p>
              <p className="text-xs" style={{ color: "#9B8B7A" }}>Points earned</p>
            </div>
            <div className="h-10 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
            <div>
              <p className="text-3xl font-semibold" style={{ color: "#FAF8F4" }}>660</p>
              <p className="text-xs" style={{ color: "#9B8B7A" }}>Until Platinum</p>
            </div>
          </div>
          <div className="h-2 rounded-full mb-3" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div className="h-full rounded-full" style={{ width: "78%", background: "linear-gradient(90deg, #8B6544, #D4A76A)" }} />
          </div>
          <p className="text-xs" style={{ color: "#6B5E55" }}>Earn 1 point per ₹100 spent. Redeem for exclusive treatments and partner benefits.</p>
        </div>

        {/* Recently Viewed */}
        <div className="mt-8">
          <h3 className="text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27" }}>Recently Viewed</h3>
          <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {SALONS.slice(4, 8).map((salon) => (
              <div key={salon.id} className="shrink-0 w-44">
                <div className="w-44 h-32 rounded-xl overflow-hidden mb-2">
                  <img src={`https://images.unsplash.com/photo-${salon.image}?w=352&h=256&fit=crop&auto=format`} alt={salon.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-medium truncate" style={{ color: "#2E2A27" }}>{salon.name}</p>
                <p className="text-xs" style={{ color: "#9B8B7A" }}>{salon.priceRange}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const isQuiz = page === "quiz";

  return (
    <div className="min-h-screen font-sans" style={{ background: "#F7F4EF" }}>
      <Nav page={page} setPage={setPage} />

      {page === "home" && <HomePage setPage={setPage} />}
      {page === "explore" && <ExplorePage />}
      {page === "neighborhoods" && <NeighborhoodsPage setPage={setPage} />}
      {page === "journal" && <JournalPage />}
      {page === "concierge" && <AIConciergePage />}
      {page === "quiz" && <StyleQuizPage setPage={setPage} />}
      {page === "account" && <AccountPage setPage={setPage} />}

      {!isQuiz && <Footer setPage={setPage} />}
    </div>
  );
}
