import React from 'react';
import { Cake, Phone, MapPin, Mail, Instagram, Facebook, MessageCircle, Clock } from 'lucide-react';
import { BUSINESS_DETAILS } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Our Story', href: '#about' },
    { name: 'Gourmet Menu', href: '#menu' },
    { name: 'Showroom Gallery', href: '#gallery' },
    { name: 'Services', href: '#services' },
    { name: 'Customer Reviews', href: '#reviews' },
    { name: 'Contact & Location', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer id="app-footer" className="bg-stone-950 text-stone-200 border-t border-stone-900 pt-16 pb-8 relative overflow-hidden">
      
      {/* Golden accent glow vector background */}
      <div id="footer-accent-glow" className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-gold-900/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Column blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-stone-900" id="footer-upper">
          
          {/* Column 1: Descriptor & Socials */}
          <div id="f-col-brand" className="lg:col-span-4 space-y-5 text-left">
            <a
              id="footer-brand-link"
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              className="flex items-center gap-2 group"
            >
              <div id="f-logo-wrap" className="bg-gradient-to-br from-gold-400 to-gold-600 text-white p-2.5 rounded-full shadow-lg">
                <Cake className="w-5 h-5 text-white" />
              </div>
              <div id="f-brand-txt-wrap">
                <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-white block">
                  Golden Cakes
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gold-500 block">
                  &amp; Bakes Parappur
                </span>
              </div>
            </a>
            
            <p className="text-xs sm:text-sm text-stone-400 font-sans font-light leading-relaxed max-w-sm" id="f-desc text">
              Bespoke cake craft located in Parappur, Kottakkal. We bring culinary magic into your high-importance birthdays, romantic weddings, and sweet daily indulgences.
            </p>

            {/* Social handles rows */}
            <div className="flex items-center gap-3" id="f-socials-row">
              <a
                id="footer-social-ig"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-stone-900 hover:bg-gold-750 text-stone-400 hover:text-white rounded-xl border border-stone-850 hover:border-gold-500 transition-all cursor-pointer"
                aria-label="Instagram handle"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                id="footer-social-fb"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-stone-900 hover:bg-gold-750 text-stone-400 hover:text-white rounded-xl border border-stone-850 hover:border-gold-500 transition-all cursor-pointer"
                aria-label="Facebook handle"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                id="footer-social-wa"
                href={`https://wa.me/${BUSINESS_DETAILS.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-stone-900 hover:bg-gold-750 text-stone-400 hover:text-white rounded-xl border border-stone-850 hover:border-gold-500 transition-all cursor-pointer"
                aria-label="WhatsApp handle"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div id="f-col-links" className="lg:col-span-3 text-left">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-5">Quick Sitemap</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-400 font-sans font-light">
              {quickLinks.map((link) => (
                <li key={link.name} id={`f-link-item-${link.name.toLowerCase()}`}>
                  <a
                    id={`f-lnk-${link.name.toLowerCase()}`}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-gold-400 hover:translate-x-1 inline-block transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Trading area */}
          <div id="f-col-areas" className="lg:col-span-2 text-left">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-5">Delivery Sectors</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-400 font-sans font-light" id="f-areas-list">
              {BUSINESS_DETAILS.deliveryAreas.map((area) => (
                <li key={area} className="flex items-center gap-2" id={`f-area-item-${area.toLowerCase()}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div id="f-col-contacts" className="lg:col-span-3 text-left space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-5">Talk To Bakers</h4>
            
            <div className="space-y-3 text-xs sm:text-sm text-stone-400 font-sans" id="f-contacts-box">
              
              <div id="f-contact-phone" className="flex gap-2.5 items-start">
                <Phone className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                <p>
                  Order Line: <br />
                  <a href={`tel:${BUSINESS_DETAILS.phone.replace(/\s+/g, '')}`} className="font-sans font-bold text-white hover:text-gold-400">{BUSINESS_DETAILS.phone}</a>
                </p>
              </div>

              <div id="f-contact-hours" className="flex gap-2.5 items-start">
                <Clock className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                <p>
                  Cooking Hours: <br />
                  <span>Everyday {BUSINESS_DETAILS.openHours}</span>
                </p>
              </div>

              <div id="f-contact-loc" className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0 mt-1" />
                <p className="text-stone-400">
                  {BUSINESS_DETAILS.pincode}, Parappur,<br />
                  Kottakkal, Kerala, India
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div id="footer-lower" className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500 font-sans">
          <p id="f-copy text">
            &copy; {currentYear} <strong>Golden Cakes and Bakes</strong>. Delicious Moments, Baked Fresh Everyday.
          </p>
          <div className="flex gap-6 text-stone-500 font-sans" id="f-legallinks-row">
            <span id="f-fct-takeaway">Takeaway &amp; Cradled Delivery</span>
            <span id="f-fct-certified">Hygienic Cooking standards assured</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
