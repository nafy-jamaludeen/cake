import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Cake, Clock } from 'lucide-react';
import { BUSINESS_DETAILS } from '../data';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link detection
      const sections = ['hero', 'about', 'menu', 'gallery', 'services', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Our Story', href: '#about' },
    { name: 'Gourmet Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Services', href: '#services' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Location & Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-header py-3 shadow-md'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a
              id="header-logo-lnk"
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              className="flex items-center gap-2 group"
            >
              <div id="header-logo-wrap" className="bg-gradient-to-br from-gold-400 to-gold-600 text-white p-2.5 rounded-full shadow-lg group-hover:rotate-12 transition-transform duration-300">
                <Cake className="w-5 h-5" id="header-cake-icon" />
              </div>
              <div id="header-title-wrap" className="flex flex-col">
                <span
                  id="header-brand-name"
                  className="font-serif text-lg sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-gold-800 to-amber-950 bg-clip-text text-transparent"
                >
                  Golden Cakes
                </span>
                <span id="header-brand-sub" className="text-[10px] uppercase tracking-[0.2em] font-medium text-gold-600 leading-none">
                  &amp; Bakes Parappur
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav id="desktop-nav" className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    id={`nav-link-${link.name.toLowerCase()}`}
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative text-sm font-medium tracking-wide transition-colors py-1 ${
                      isActive
                        ? 'text-gold-700 font-semibold'
                        : 'text-stone-600 hover:text-gold-600'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        id={`nav-active-dot-${link.name}`}
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Actions / Shopping Cart */}
            <div id="header-actions" className="flex items-center gap-3 sm:gap-4">
              {/* Quick Hours Indicator */}
              <div id="quick-hours-badge" className="hidden md:flex items-center gap-1.5 bg-gold-100/60 border border-gold-200 px-3 py-1.5 rounded-full text-xs text-gold-800 font-medium font-sans">
                <Clock className="w-3.5 h-3.5 text-gold-600" />
                <span>Open till 11:00 PM</span>
              </div>

              {/* Shopping Bag Button */}
              <button
                id="cart-bag-btn"
                onClick={onOpenCart}
                className="relative p-2.5 rounded-full text-stone-700 bg-white hover:bg-gold-100 hover:text-gold-700 border border-stone-200 transition-colors shadow-sm flex items-center justify-center cursor-pointer group"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" id="header-cart-icon" />
                {cartCount > 0 && (
                  <motion.span
                    id="cart-item-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-rose-600 text-white font-sans text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Toggler */}
              <button
                id="mobile-menu-toggler"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-full text-stone-700 hover:text-gold-700 bg-white border border-stone-200 transition-colors shadow-sm flex items-center justify-center"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" id="close-menu-icon" /> : <Menu className="w-5 h-5" id="open-menu-icon" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[68px] z-30 lg:hidden glass-header shadow-xl border-t border-gold-100 text-center py-6 px-4"
          >
            <div id="mobile-links-container" className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    id={`mobile-link-${link.name.toLowerCase()}`}
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`block py-2 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-gold-100 text-gold-800 font-semibold shadow-sm'
                        : 'text-stone-600 hover:bg-gold-50/50 hover:text-gold-600'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              
              <div id="mobile-menu-divider" className="border-t border-gold-100 my-2 pt-4">
                <div id="mobile-menu-hours" className="text-xs text-gold-700 flex items-center justify-center gap-1.5 font-medium mb-3">
                  <Clock className="w-4.5 h-4.5 text-gold-500" />
                  <span>Open Everyday: {BUSINESS_DETAILS.openHours}</span>
                </div>
                <a
                  id="mobile-menu-call-cta"
                  href={`tel:${BUSINESS_DETAILS.phone.replace(/\s+/g, '')}`}
                  className="inline-flex justify-center items-center w-full bg-gold-600 text-white font-medium text-sm py-3 px-4 rounded-xl shadow-lg hover:bg-gold-700 active:scale-95 transition-all"
                >
                  Call Now: {BUSINESS_DETAILS.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
