import React, { useState, useEffect } from 'react';
import { Tag, Clock, Sparkles } from 'lucide-react';

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  badge?: string;
  active: boolean;
}

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('goldenCakesOffers');
    if (stored) {
      const all: Offer[] = JSON.parse(stored);
      setOffers(all.filter((o) => o.active));
    }
  }, []);

  if (offers.length === 0) return null;

  return (
    <section id="offers" className="py-16 px-4 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Special Offers
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 font-serif">
            Today's Sweet Deals 🎂
          </h2>
          <p className="text-stone-500 mt-2 text-sm">Limited time offers — grab them before they're gone!</p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-100 overflow-hidden group"
            >
              {/* Top accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />

              {/* Badge */}
              {offer.badge && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                  {offer.badge}
                </div>
              )}

              <div className="p-6">
                {/* Discount pill */}
                <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 font-bold text-lg px-3 py-1 rounded-xl mb-3">
                  <Tag className="w-4 h-4" />
                  {offer.discount}
                </div>

                <h3 className="text-lg font-bold text-stone-800 mb-2 group-hover:text-amber-700 transition-colors">
                  {offer.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">
                  {offer.description}
                </p>

                {/* Valid Until */}
                <div className="flex items-center gap-1.5 text-xs text-stone-400 border-t border-stone-100 pt-3">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Valid until: <strong className="text-stone-600">{offer.validUntil}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
