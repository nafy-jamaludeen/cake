import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';

export default function Gallery() {
  const [selectedItemIdx, setSelectedItemIdx] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | GalleryItem['category']>('all');

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'birthdays', label: 'Birthdays' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'custom-cakes', label: 'Theme Cakes' },
    { id: 'cupcakes', label: 'Gourmet Cupcakes' },
    { id: 'fruit-cakes', label: 'Fruit Bakes' },
  ];

  const filteredGallery = selectedFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedFilter);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIdx === null) return;
    setSelectedItemIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredGallery.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIdx === null) return;
    setSelectedItemIdx((prev) => (prev !== null && prev < filteredGallery.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Block */}
        <div id="gallery-header" className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span id="gallery-sub-label" className="text-xs uppercase tracking-[0.25em] font-bold text-gold-600 block">
            Visual Showroom
          </span>
          <h2 id="gallery-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight">
            Inspired Designs Baked to Life
          </h2>
          <p id="gallery-desc" className="text-stone-500 font-sans text-sm sm:text-base leading-relaxed">
            Feast your eyes on some of our favorite custom projects. From delicate wedding flowers to playful children&apos;s parties, we can construct the cake of your dreams.
          </p>
        </div>

        {/* Categories filters for Gallery */}
        <div id="gallery-filters" className="flex flex-wrap justify-center gap-2 mb-12 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              id={`gallery-filter-btn-${cat.id}`}
              key={cat.id}
              onClick={() => {
                setSelectedFilter(cat.id as any);
                setSelectedItemIdx(null); // Clear idx since order shifts
              }}
              className={`px-4 py-2 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
                selectedFilter === cat.id
                  ? 'bg-gold-100 text-gold-800 border-2 border-gold-400'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-500 border-2 border-transparent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Bento Grid layout */}
        <div id="gallery-bento-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, idx) => (
              <motion.div
                id={`gallery-item-card-${item.id}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => setSelectedItemIdx(idx)}
                className="relative aspect-square group rounded-[1.5rem] overflow-hidden shadow-xs hover:shadow-xl cursor-pointer border border-stone-155 bg-stone-100"
              >
                {/* Image */}
                <img
                  id={`gallery-item-img-${item.id}`}
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Glassy hover panel */}
                <div id={`gallery-overlay-${item.id}`} className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                  
                  {/* Floating Action eye */}
                  <div id={`gallery-panel-eye-${item.id}`} className="absolute top-4 right-4 bg-white/30 backdrop-blur-md p-2.5 rounded-full text-white scale-90 group-hover:scale-100 transition-transform duration-300 border border-white/20">
                    <Maximize2 className="w-4.5 h-4.5 text-white" />
                  </div>

                  <span id={`gallery-panel-cat-${item.id}`} className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold-300 mb-1">
                    {item.category.replace('-', ' ')}
                  </span>
                  
                  <h3 id={`gallery-panel-title-${item.id}`} className="font-serif text-lg sm:text-lg font-bold text-white leading-tight">
                    {item.title}
                  </h3>

                  <p id={`gallery-panel-desc-${item.id}`} className="text-xs text-stone-200 mt-2 font-sans font-light line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox pop layout */}
        <AnimatePresence>
          {selectedItemIdx !== null && (
            <div
              id="gallery-lightbox-overlay"
              style={{ contentVisibility: 'auto' }}
              onClick={() => setSelectedItemIdx(null)}
              className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col justify-center items-center p-4 sm:p-8"
            >
              
              {/* Close Button top-right */}
              <button
                id="lightbox-close-cross"
                onClick={() => setSelectedItemIdx(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors cursor-pointer border border-white/15"
                aria-label="Close Gallery dialog"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Showcase Container box */}
              <div
                id="lightbox-showcase-box"
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl max-h-[75vh] sm:max-h-[80vh] flex items-center justify-center aspect-square sm:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              >
                {/* Navigation arrows absolute on desktop */}
                <button
                  id="lightbox-arrow-left"
                  onClick={handlePrev}
                  className="absolute left-4 z-10 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-colors font-bold cursor-pointer"
                  aria-label="Click previous gallery photo"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <img
                  id="lightbox-display-photo"
                  src={filteredGallery[selectedItemIdx].image}
                  alt={filteredGallery[selectedItemIdx].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain bg-black/50"
                />

                <button
                  id="lightbox-arrow-right"
                  onClick={handleNext}
                  className="absolute right-4 z-10 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-colors font-bold cursor-pointer"
                  aria-label="Click next gallery photo"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Meta details bottom panel */}
              <div id="lightbox-bottom-panel" className="mt-6 text-center text-white max-w-xl">
                <span id="lightbox-meta-cat" className="text-xs font-sans tracking-widest font-bold uppercase text-gold-400">
                  {filteredGallery[selectedItemIdx].category.replace('-', ' ')}
                </span>
                
                <h3 id="lightbox-meta-title" className="font-serif text-xl sm:text-2xl font-black mt-1 text-white">
                  {filteredGallery[selectedItemIdx].title}
                </h3>
                
                <p id="lightbox-meta-desc" className="text-sm text-stone-300 font-sans font-light mt-2 max-w-lg mx-auto">
                  {filteredGallery[selectedItemIdx].description}
                </p>

                <p id="lightbox-photo-counter" className="text-[10px] text-stone-500 font-mono tracking-widest uppercase mt-4">
                  Creations {selectedItemIdx + 1} of {filteredGallery.length}
                </p>
              </div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
