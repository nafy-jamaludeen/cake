import React from 'react';
import { motion } from 'motion/react';
import { Truck, ShoppingBag, Clock, ShieldAlert, Sparkles, Navigation } from 'lucide-react';
import { BUSINESS_DETAILS } from '../data';

export default function Services() {
  const serviceCards = [
    {
      icon: <ShoppingBag className="w-6 h-6 text-gold-700" />,
      title: "Premium Takeaway",
      description: "Pick up your orders directly at Kurikkal Bazar, Parappur. Carefully wrapped in thick thermal boxes with moisture absorbers to prevent melting on your drive back.",
      points: ["9:00 AM – 11:00 PM", "Insulated packaging", "Hassle-free parking access"]
    },
    {
      icon: <Truck className="w-6 h-6 text-gold-700" />,
      title: "Contactless Home Delivery",
      description: "Direct-to-door delivery across Kottakkal, Parappur, and nearby locations. Handled in specialized vertical cradles to keep triple-layered frosting perfectly vertical.",
      points: ["Safe transit systems", "Real-time updates", "Affordable rates (₹40 avg)"]
    },
    {
      icon: <Clock className="w-6 h-6 text-gold-700" />,
      title: "Emergency Rescue Cakes",
      description: "Forgot a milestone date? Don't worry! We offer expedited cake preparation and same-day delivery in under 3 hours on specific popular gourmet recipes.",
      points: ["Prepared under 3 Hours", "Till 11:00 PM", "Pre-writing customizable"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gold-100/50 via-white to-gold-50/30 relative">
      {/* Decorative Blur sphere */}
      <div id="services-blur" className="absolute top-1/2 left-1/3 w-80 h-80 bg-gold-200/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div id="services-header" className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span id="services-sub-label" className="text-xs uppercase tracking-[0.25em] font-bold text-gold-600 block">
            What We Offer
          </span>
          <h2 id="services-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight">
            Designed for Perfect Celebrations
          </h2>
          <p id="services-desc" className="text-stone-500 font-sans text-sm sm:text-base leading-relaxed">
            From the raw kitchen counter until the plate in your hand, we ensure an elite experience with professional pickup and transit solutions tailored to Kottakkal climates.
          </p>
        </div>

        {/* Services Cards grid */}
        <div id="services-cards-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {serviceCards.map((service, idx) => (
            <motion.div
              id={`service-card-${idx}`}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              key={idx}
              className="glass-card p-8 rounded-[2rem] text-left relative overflow-hidden shadow-xs hover:shadow-2xl transition-all border border-gold-200/30 flex flex-col justify-between"
            >
              {/* Highlight ribbon for emergency */}
              {idx === 2 && (
                <div id="last-minute-ribbon" className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-rose-600 text-white font-sans text-[9px] uppercase tracking-widest font-extrabold py-1.5 px-6 rounded-bl-2xl shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3 animate-spin" />
                  <span>Popular</span>
                </div>
              )}

              <div id={`service-main-content-${idx}`} className="space-y-6">
                {/* Icon wrapper */}
                <div id={`service-icon-wrap-${idx}`} className="bg-gradient-to-br from-gold-150 to-gold-200/60 p-3.5 rounded-2xl w-fit text-gold-800 shadow-inner">
                  {service.icon}
                </div>

                <div id={`service-meta-text-${idx}`} className="space-y-3">
                  <h3 id={`service-title-${idx}`} className="font-serif text-xl sm:text-2xl font-extrabold text-stone-900">
                    {service.title}
                  </h3>
                  <p id={`service-desc-${idx}`} className="text-stone-500 font-sans text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Checklists bullets info */}
              <ul id={`service-ticks-${idx}`} className="space-y-2 mt-6 pt-6 border-t border-stone-250 text-left">
                {service.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-center gap-2.5 text-xs text-stone-600 font-sans" id={`service-tick-item-${idx}-${pIdx}`}>
                    <div className="w-4 h-4 bg-lime-50 rounded-full flex items-center justify-center text-lime-600 border border-lime-200" id={`service-tick-icon-${idx}-${pIdx}`}>
                      ✓
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

            </motion.div>
          ))}
        </div>

        {/* Local Scope Cities quick banner */}
        <motion.div
          id="services-locations-banner"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 bg-stone-900 text-white rounded-3xl p-6 sm:p-8 text-left relative overflow-hidden shadow-lg flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Backing aesthetic circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/10 rounded-full blur-2xl" id="bann-decor-circle-1" />
          
          <div className="space-y-2 relative" id="bann-locations-txt">
            <h4 className="font-serif text-lg sm:text-2xl font-bold flex items-center gap-2 text-white">
              <Navigation className="w-5 h-5 text-gold-400 rotate-45 animate-pulse" />
              <span>Are you near Parappur or Kottakkal?</span>
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 font-sans font-light">
              We deliver to Kurikkal Bazar, Kottakkal Town, Changuvetty, Puthanangadi, Edarikkode, Parappur, and surrounding Kerala areas!
            </p>
          </div>

          <a
            id="services-map-short-cta"
            href={`tel:${BUSINESS_DETAILS.phone.replace(/\s+/g, '')}`}
            className="flex-shrink-0 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-sans font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer whitespace-nowrap"
          >
            Check Specific Area: {BUSINESS_DETAILS.phone}
          </a>
        </motion.div>

      </div>
    </section>
  );
}
