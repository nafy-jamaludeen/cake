import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';

export default function AboutUs() {
  const highlights = [
    {
      icon: <Sparkles className="w-5 h-5 text-gold-600" />,
      title: "100% From-Scratch Baking",
      desc: "We believe in authentic baking. No pre-made industrial mixes, artificial stabilizers, or stale sponge bases. Baked only following your custom order!"
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-gold-600" />,
      title: "The Golden Ingredient Standard",
      desc: "Pure cow's dairy cream, rich Belgian block chocolates, organic vanilla bean extracts, and fresh hand-picked local fruits from Kottakkal and nearby markets."
    },
    {
      icon: <Heart className="w-5 h-5 text-gold-600" />,
      title: "Unrivaled Customer Delights",
      desc: "Our dedication to quality is why Kottakkal rates us 4.9 stars. We focus on meticulous design finish, perfect moisture level, and carefully balanced sweetness."
    }
  ];

  return (
    <section
      id="about"
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Subtle organic gold line backgrounds to evoke cake layers */}
      <div id="about-decor-line" className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Beautiful bakery baking craftsmanship image */}
          <div id="about-image-column" className="lg:col-span-5 relative order-last lg:order-first">
            {/* Soft decorative shadow block */}
            <div id="about-img-bg-box" className="absolute -bottom-6 -left-6 w-full h-full bg-gold-100 rounded-[2rem] -z-10" />
            
            <div id="about-img-frame" className="relative aspect-square sm:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl border-4 border-white">
              <img
                id="about-bakery-img"
                src="https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=600&auto=format&fit=crop"
                alt="Artisanal Cake Crafting"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay with a nice quote */}
              <div id="about-img-overlay" className="absolute inset-0 bg-gradient-to-t from-gold-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-left">
                <div id="about-quote-box" className="border-l-2 border-gold-400 pl-4 text-white">
                  <p className="font-serif italic text-base sm:text-lg">
                    "A party without cake is just a meeting."
                  </p>
                  <p className="text-xs text-gold-300 font-sans tracking-widest uppercase mt-1">
                    – Julia Child
                  </p>
                </div>
              </div>
            </div>

            {/* Micro Rating Highlight Emblem */}
            <div id="about-emblem" className="absolute -bottom-2 -right-2 sm:-right-4 bg-gradient-to-br from-gold-500 to-gold-700 text-white p-4 sm:p-5 rounded-2xl shadow-2xl flex flex-col items-center justify-center animate-float text-center max-w-[130px]">
              <Award className="w-6 h-6 text-gold-100 mb-1" />
              <span className="font-serif text-2xl font-bold font-sans">100%</span>
              <span className="text-[9px] font-sans tracking-wide uppercase text-gold-100 leading-tight">Hygienic &amp; Fresh</span>
            </div>
          </div>

          {/* Right: Text and Key highlights */}
          <div id="about-text-column" className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8 text-left">
            
            <div id="about-title-block" className="space-y-3">
              <span id="about-subtitle" className="text-xs uppercase tracking-[0.25em] font-semibold text-gold-600 block">
                The Heritage of Pure Sweetness
              </span>
              <h2 id="about-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
                Crafting Delicious Moments in Parappur Since Day One
              </h2>
            </div>

            <div id="about-brand-story" className="space-y-4 text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
              <p>
                Nestled in the heart of Kurikkal Bazar, Parappur, <strong>Golden Cakes and Bakes</strong> is the neighborhood's home for exquisite, chef-inspired confectionery. What started as a passion for pure flavor has blossomed into Kottakkal's most trusted bakery, where custom celebrations find their edible matches.
              </p>
              <p>
                We do not believe in mass-produced, dry storage cakes. For us, cake making is a delicate ritual of moisture, flavor pairing, and gorgeous artistry. When you contact us to order a birthday centerpiece or a simple box of mini-cake treats, our bakers get to work picking raw, top-choice ingredients specifically for you.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div id="about-features-container" className="grid grid-cols-1 gap-5 pt-4">
              {highlights.map((item, idx) => (
                <motion.div
                  id={`about-highlight-${idx}`}
                  whileHover={{ x: 5 }}
                  key={idx}
                  className="flex gap-4 p-4 rounded-2xl hover:bg-gold-50/50 transition-colors border border-transparent hover:border-gold-200/40"
                >
                  <div id={`about-highlight-icon-${idx}`} className="flex-shrink-0 bg-gold-150 p-2.5 rounded-xl text-gold-800 h-fit">
                    {item.icon}
                  </div>
                  <div id={`about-highlight-text-${idx}`} className="space-y-1">
                    <h3 className="font-sans font-bold text-sm sm:text-base text-stone-800">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
