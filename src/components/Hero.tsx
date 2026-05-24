import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, ShoppingBag, Flame, Sparkles } from 'lucide-react';
import { BUSINESS_DETAILS } from '../data';

interface HeroProps {
  onOrderNowClick: () => void;
  onViewMenuClick: () => void;
}

const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop",
    title: "Double Chocolate Royale",
    subtitle: "Drizzled with dark Belgian silk",
  },
  {
    url: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=1200&auto=format&fit=crop",
    title: "Artisanal Custom Bakes",
    subtitle: "Baked with love & gold-standard ingredients",
  },
  {
    url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop",
    title: "Gourmet Honey & Fruit Sponge",
    subtitle: "Freshness infused inside every single slice",
  },
];

export default function Hero({ onOrderNowClick, onViewMenuClick }: HeroProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 flex items-center bg-gradient-to-b from-gold-100 via-white to-gold-50/30 overflow-hidden"
    >
      {/* Decorative Blur Spheres */}
      <div id="hero-blur-1" className="absolute top-1/4 -left-32 w-96 h-96 bg-gold-200/50 rounded-full blur-3xl -z-10" />
      <div id="hero-blur-2" className="absolute bottom-10 -right-32 w-96 h-96 bg-rose-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Content Text Panel */}
          <div id="hero-text-panel" className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-8 text-left">
            
            {/* Tagline Pill */}
            <motion.div
              id="hero-tagline-badge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-gold-50 to-gold-100 border border-gold-300 text-gold-900 font-sans text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
              <span>Best Bakery in Kottakkal, Kerala</span>
            </motion.div>

            {/* Main Headline */}
            <div id="hero-headline-wrap" className="space-y-4">
              <motion.h1
                id="hero-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-stone-900 leading-[1.1]"
              >
                Delicious Moments, <br />
                <span className="bg-gradient-to-r from-gold-600 via-gold-500 to-amber-700 bg-clip-text text-transparent">
                  Baked Fresh
                </span>{" "}
                Everyday.
              </motion.h1>

              <motion.p
                id="hero-para"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-stone-600 text-base sm:text-lg max-w-xl font-sans font-light leading-relaxed"
              >
                Indulge in our exquisite collection of premium melt-in-your-mouth gourmet cakes, custom birthday masterworks, and delightful morning confections baked daily in Parappur.
              </motion.p>
            </div>

            {/* Quick Rating and Reviews */}
            <motion.div
              id="hero-rating-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4 bg-white/70 backdrop-blur-xs py-2 px-4 rounded-2xl border border-gold-200/50 shadow-xs"
            >
              <div id="hero-stars-container" className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                ))}
              </div>
              <div id="hero-review-numbers" className="text-sm font-medium text-stone-800">
                <span className="font-bold text-base text-gold-800">{BUSINESS_DETAILS.rating} stars</span>{" "}
                <span className="text-xs text-stone-500">({BUSINESS_DETAILS.reviewsCount} Google Reviews)</span>
              </div>
            </motion.div>

            {/* Core Calls to Action */}
            <motion.div
              id="hero-actions-panel"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              {/* Primary: Order now */}
              <button
                id="hero-cta-order"
                onClick={onOrderNowClick}
                className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-white font-sans font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
              >
                <ShoppingBag className="w-5 h-5 text-gold-200 group-hover:scale-110 transition-transform" />
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4 text-gold-100 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary: View Menu */}
              <button
                id="hero-cta-menu"
                onClick={onViewMenuClick}
                className="flex items-center justify-center gap-2 bg-white hover:bg-gold-50 text-stone-800 hover:text-gold-800 border-2 border-gold-300 font-sans font-semibold py-4 px-8 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <span>View Menu</span>
              </button>
            </motion.div>

            {/* Quick bullet points */}
            <motion.div
              id="hero-bullets"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-2 pt-2 border-t border-gold-100 w-full max-w-md text-stone-600 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2" id="bullet-takeaway">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Takeaway Available</span>
              </div>
              <div className="flex items-center gap-2" id="bullet-delivery">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Kottakkal Area Delivery</span>
              </div>
              <div className="flex items-center gap-2" id="bullet-prices">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Price: ₹600 – ₹1,400</span>
              </div>
              <div className="flex items-center gap-2" id="bullet-timing">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>9:00 AM – 11:00 PM</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Immersive Image Slider Showcase */}
          <div id="hero-image-pane" className="lg:col-span-5 flex justify-center items-center relative">
            
            {/* Visual Frame Backings */}
            <div id="hero-image-backdrop" className="absolute -inset-4 bg-gradient-to-tr from-gold-200 to-amber-200 rounded-[2.5rem] opacity-30 blur-2xl -z-10 rotate-3" />

            {/* Floating Trust Badge */}
            <motion.div
              id="hero-floating-badge"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 bg-white border border-gold-300 p-3 rounded-2xl shadow-xl z-20 flex items-center gap-2 max-w-[160px]"
            >
              <div className="bg-rose-50 p-2 rounded-xl text-rose-500" id="fl-badge-icon-wrap">
                <Flame className="w-5 h-5 fill-rose-500 animate-pulse" />
              </div>
              <div className="text-left" id="fl-badge-text">
                <p className="text-[10px] text-stone-400 font-semibold uppercase leading-none">Fresh out of</p>
                <p className="text-xs font-bold text-stone-800 font-sans mt-0.5 leading-tight">The Oven daily!</p>
              </div>
            </motion.div>

            {/* Image Frame Wrapper */}
            <div id="hero-pic-frame" className="relative w-full max-w-[380px] sm:max-w-[450px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/95 bg-stone-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIdx}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  {/* Actual Cake Image */}
                  <img
                    id={`hero-slide-img-${currentIdx}`}
                    src={HERO_IMAGES[currentIdx].url}
                    alt={HERO_IMAGES[currentIdx].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Icing Plate Bottom overlay */}
                  <div id="hero-slide-overlay" className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-900/10 to-transparent flex flex-col justify-end p-6 sm:p-8 text-left" />
                  
                  {/* Floating slide descriptions */}
                  <div id="hero-slide-meta" className="absolute bottom-6 left-6 right-6 text-white z-10">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-gold-150"
                    >
                      {HERO_IMAGES[currentIdx].title}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-xs sm:text-sm text-stone-200 font-sans font-light mt-0.5"
                    >
                      {HERO_IMAGES[currentIdx].subtitle}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Dots indicators */}
              <div id="hero-slider-dots" className="absolute top-4 right-4 z-10 flex gap-1.5 bg-black/30 backdrop-blur-xs py-1.5 px-3 rounded-full">
                {HERO_IMAGES.map((_, idx) => (
                  <button
                    id={`dot-indicator-${idx}`}
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentIdx ? 'bg-white scale-125 w-4' : 'bg-white/50'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
