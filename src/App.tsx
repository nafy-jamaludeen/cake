import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Services from './components/Services';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import Offers from './components/Offers';
import AdminPanel from './components/AdminPanel';

import { BUSINESS_DETAILS, TESTIMONIALS } from './data';
import { CartItem, MenuItem, Testimonial } from './types';
import { MessageCircle, ChevronUp, Cake } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Simple client-side routing for /admin
  const isAdmin = window.location.pathname === '/admin';

  // Monitoring scroll pos to show floating stickies
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateItemPrice = (item: MenuItem, weight: string) => {
    let base = item.priceMin;
    if (weight === '1.0kg' || weight === 'Box of 6') {
      base = item.priceMin + (item.priceMax - item.priceMin) * 0.45;
    } else if (weight === '1.5kg') {
      base = item.priceMin + (item.priceMax - item.priceMin) * 0.75;
    } else if (weight === '2.0kg' || weight === 'Box of 12') {
      base = item.priceMax;
    }
    return Math.round(base);
  };

  const handleAddToCart = (
    item: MenuItem,
    weight: string,
    flavor: string,
    customWriting: string,
    quantity: number
  ) => {
    const calculatedPrice = calculateItemPrice(item, weight);
    const uniqueId = `${item.id}-${weight}-${flavor}-${customWriting}`;

    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex((ci) => ci.id === uniqueId);
      if (existingIdx !== -1) {
        const copy = [...prevItems];
        copy[existingIdx].quantity += quantity;
        return copy;
      } else {
        const newItem: CartItem = {
          id: uniqueId,
          item,
          quantity,
          selectedWeight: weight,
          selectedFlavor: flavor,
          customWriting: customWriting.trim() || undefined,
          calculatedPrice,
        };
        return [...prevItems, newItem];
      }
    });

    // Auto-open cart for delightful feedback!
    setCartOpen(true);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateCartQty = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddTestimonial = (newReview: Testimonial) => {
    setTestimonials((prev) => [newReview, ...prev]);
  };

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFloatingOrderNow = () => {
    scrollToSection('menu');
  };

  // ── Admin Route ───────────────────────────────────────────────────
  if (isAdmin) {
    return <AdminPanel />;
  }

  // ── Main Website ──────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-gold-200 selection:text-gold-950" id="main-application-wrap">
      {/* Structural Header Navigation */}
      <Header cartCount={cartItems.reduce((acc, ci) => acc + ci.quantity, 0)} onOpenCart={() => setCartOpen(true)} />

      {/* Pages/Sections body container */}
      <main className="flex-1" id="main-content-render">
        
        {/* HERO SECTION */}
        <Hero
          onOrderNowClick={handleFloatingOrderNow}
          onViewMenuClick={() => scrollToSection('menu')}
        />

        {/* ABOUT US SECTION */}
        <AboutUs />

        {/* ✅ SPECIAL OFFERS SECTION — shows only when offers exist */}
        <Offers />

        {/* MENU SECTION */}
        <Menu onAddToCart={handleAddToCart} />

        {/* GALLERY SECTION */}
        <Gallery />

        {/* SERVICES SECTION */}
        <Services />

        {/* REVIEWS SECTION */}
        <Reviews testimonials={testimonials} onAddTestimonial={handleAddTestimonial} />

        {/* CONTACT SECTION */}
        <Contact />

      </main>

      {/* FOOTER SECTION */}
      <Footer />

      {/* OFF CANVAS CART SHOPPING BAG */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQty={handleUpdateCartQty}
        onClearCart={handleClearCart}
      />

      {/* Sticky Floating Action Buttons Overlay (WhatsApp + Scroll To Top) */}
      <div id="sticky-floater-actions-container" className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
        
        {/* Sticky Floating order trigger pill */}
        {showScrollTop && (
          <button
            id="floating-order-now-pill"
            onClick={handleFloatingOrderNow}
            className="flex items-center gap-1.5 bg-gradient-to-r from-gold-600 to-gold-700 text-white font-sans text-xs font-bold py-3 px-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer whitespace-nowrap animate-float border border-white/20"
          >
            <Cake className="w-3.5 h-3.5" />
            <span>Order Custom Cake</span>
          </button>
        )}

        {/* Floating WhatsApp chat shortcut */}
        <button
          id="floating-whatsapp-direct"
          onClick={() => {
            const presetText = "Hi Golden Cakes and Bakes, in Kurikkal Bazar. I visited your website and would like to ask questions about custom menu options!";
            const url = `https://wa.me/${BUSINESS_DETAILS.whatsappNumber}?text=${presetText}`;
            window.open(url, '_blank', 'noreferrer,noopener');
          }}
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20ba59] hover:-translate-y-1 active:scale-90 transition-all flex items-center justify-center cursor-pointer group border border-white/10"
          aria-label="Direct Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 text-white group-hover:scale-105 transition-transform" />
        </button>

        {/* Floating Scroll To Top button */}
        {showScrollTop && (
          <button
            id="floating-scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-stone-700 hover:text-gold-700 p-3 rounded-full shadow-xl border border-stone-155 hover:bg-gold-50 transition-all flex items-center justify-center cursor-pointer"
            aria-label="Scroll back to top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}
        
      </div>

    </div>
  );
}
