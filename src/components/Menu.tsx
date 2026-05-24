import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShoppingBag, Check, ChevronDown, Plus, MessageSquare } from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';

interface MenuProps {
  onAddToCart: (
    item: MenuItem,
    weight: string,
    flavor: string,
    customWriting: string,
    quantity: number
  ) => void;
}

export default function Menu({ onAddToCart }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | MenuItem['category']>('all');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  
  // Customization state
  const [selectedWeight, setSelectedWeight] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [customWriting, setCustomWriting] = useState('');
  const [qty, setQty] = useState(1);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Filter items
  const filteredItems = selectedCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Bakery Gems' },
    { id: 'cakes', label: 'Classic Cakes' },
    { id: 'signature', label: 'Signature Masterpieces' },
    { id: 'mini-delights', label: 'Mini Delights' },
    { id: 'tea-cakes', label: 'Tea Cakes' },
  ];

  const handleStartCustomizing = (item: MenuItem) => {
    setCustomizingItem(item);
    setSelectedWeight(item.availableWeights[0]);
    setSelectedFlavor(item.flavors[0]);
    setCustomWriting('');
    setQty(1);
  };

  const handleConfirmAdd = () => {
    if (!customizingItem) return;
    
    // Perform adding action to cart state
    onAddToCart(customizingItem, selectedWeight, selectedFlavor, customWriting, qty);
    
    // Display sweet micro-toast success
    setSuccessToast(`${customizingItem.name} added to order list!`);
    setTimeout(() => setSuccessToast(null), 3000);

    // Reset customize modal container State
    setCustomizingItem(null);
  };

  // Helper to dynamically estimate total depending on weight selection
  const calculateEstimatedPrice = (item: MenuItem, weight: string) => {
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

  return (
    <section id="menu" className="py-20 bg-gradient-to-b from-gold-50/30 to-gold-100/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div id="menu-header" className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span id="menu-sub-label" className="text-xs uppercase tracking-[0.25em] font-bold text-gold-600 block">
            The Golden Catalog
          </span>
          <h2 id="menu-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight">
            Indulge in Handcrafted Pastries
          </h2>
          <p id="menu-desc" className="text-stone-500 font-sans text-sm sm:text-base leading-relaxed">
            Every item is mixed, baked, hand-carved, and frosted in our Parappur workshop. Pick your favorite below and customize the size &amp; flavors to perfect your party.
          </p>
        </div>

        {/* Tab Filtration Buttons */}
        <div id="menu-tabs" className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              id={`cat-tab-btn-${cat.id}`}
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white shadow-md shadow-gold-600/25 scale-102'
                  : 'bg-white hover:bg-gold-50 text-stone-600 border border-stone-200/80 hover:border-gold-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Cards Grid */}
        <div id="menu-items-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                id={`menu-card-${item.id}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Product Image Panel with premium badge */}
                <div id={`menu-card-img-wrap-${item.id}`} className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    id={`menu-item-img-${item.id}`}
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Popular badge */}
                  {item.isPopular && (
                    <div id={`badge-popular-${item.id}`} className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-gold-600 text-white text-[10px] font-sans uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <span>Popular Choice</span>
                    </div>
                  )}

                  {/* Rating Bubble overlay */}
                  <div id={`rating-bubble-${item.id}`} className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs py-1 px-2.5 rounded-lg flex items-center gap-1 border border-stone-100 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-bold text-stone-800">{item.rating}</span>
                  </div>
                </div>

                {/* Info and price pane */}
                <div id={`menu-card-meta-${item.id}`} className="p-6 md:p-7 flex-1 flex flex-col items-start text-left">
                  
                  <div className="flex justify-between items-start w-full gap-3" id={`title-price-wrap-${item.id}`}>
                    <h3 id={`menu-item-name-${item.id}`} className="font-serif text-lg sm:text-xl font-extrabold text-stone-900 group-hover:text-gold-700 transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  <span id={`menu-item-price-${item.id}`} className="text-gold-700 font-sans font-bold text-sm sm:text-base mt-1.5 bg-gold-50 border border-gold-200/50 px-2.5 py-1 rounded-lg">
                    {item.priceRange}
                  </span>

                  <p id={`menu-item-desc-${item.id}`} className="text-stone-500 font-sans text-xs sm:text-sm leading-relaxed mt-4 flex-1">
                    {item.description}
                  </p>

                  {/* Specifications details mini checklist */}
                  <div id={`features-pills-${item.id}`} className="flex flex-wrap gap-1.5 mt-5 pb-5 border-b border-stone-100 w-full">
                    <span className="text-[10px] font-sans bg-stone-50 text-stone-500 px-2.5 py-1 rounded-md border border-stone-200/60">
                      🍰 Fresh Baked
                    </span>
                    <span className="text-[10px] font-sans bg-stone-50 text-stone-500 px-2.5 py-1 rounded-md border border-stone-200/60">
                      🧁 Customizable Options
                    </span>
                  </div>

                  {/* Add to order cart action bottom layout */}
                  <div id={`menu-card-action-wrap-${item.id}`} className="flex items-center justify-between w-full pt-4">
                    <button
                      id={`customize-btn-${item.id}`}
                      onClick={() => handleStartCustomizing(item)}
                      className="w-full bg-stone-900 hover:bg-gold-700 text-white font-sans text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer group/btn"
                    >
                      <ShoppingBag className="w-4 h-4 text-stone-300 group-hover/btn:scale-110 transition-transform" />
                      <span>Order &amp; Customize</span>
                    </button>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Customization Modal / Dialog */}
        <AnimatePresence>
          {customizingItem && (
            <div id="customize-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                id="customize-dialog-box"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-white w-full max-w-lg rounded-3xl overflow-hidden border border-gold-200 shadow-2xl text-left"
              >
                
                {/* Header Banner representing selected cake */}
                <div id="modal-banner-img" className="relative h-44 sm:h-52 bg-stone-100">
                  <img
                    id="modal-selected-cake-img"
                    src={customizingItem.image}
                    alt={customizingItem.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Backdrop shading */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6" id="modal-image-overlay" />
                  
                  {/* Title labels overlay */}
                  <div id="modal-title-wrap" className="absolute bottom-5 left-6 right-6 text-white">
                    <span id="modal-cake-cat" className="text-[10px] font-sans tracking-widest uppercase text-gold-300 font-bold">
                      {customizingItem.category} Delights
                    </span>
                    <h3 id="modal-cake-name" className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                      {customizingItem.name}
                    </h3>
                  </div>

                  {/* Close button top right */}
                  <button
                    id="modal-close-cross"
                    onClick={() => setCustomizingItem(null)}
                    className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors font-bold cursor-pointer font-sans"
                  >
                    ✕
                  </button>
                </div>

                {/* Form fields layout container */}
                <div id="modal-form-body" className="p-6 sm:p-7 space-y-5">
                  <p id="modal-cake-desc-short" className="text-stone-500 font-sans text-xs sm:text-sm">
                    {customizingItem.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4" id="modal-specs-grid">
                    {/* Weight options */}
                    <div id="modal-weight-selector-wrap" className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-stone-700 tracking-wide uppercase font-sans">
                        Size / Weight
                      </label>
                      <div className="relative" id="weight-dropdown-cell">
                        <select
                          id="weight-dropdown"
                          value={selectedWeight}
                          onChange={(e) => setSelectedWeight(e.target.value)}
                          className="w-full bg-stone-50 text-stone-800 font-sans text-sm py-2.5 pl-3.5 pr-8 rounded-xl border border-stone-200 outline-none focus:border-gold-500 focus:bg-white transition-all appearance-none cursor-pointer"
                        >
                          {customizingItem.availableWeights.map((w) => (
                            <option key={w} value={w}>{w}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Flavor options */}
                    <div id="modal-flavor-selector-wrap" className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-stone-700 tracking-wide uppercase font-sans">
                        Gourmet Flavor
                      </label>
                      <div className="relative" id="flavor-dropdown-cell">
                        <select
                          id="flavor-dropdown"
                          value={selectedFlavor}
                          onChange={(e) => setSelectedFlavor(e.target.value)}
                          className="w-full bg-stone-50 text-stone-800 font-sans text-sm py-2.5 pl-3.5 pr-8 rounded-xl border border-stone-200 outline-none focus:border-gold-500 focus:bg-white transition-all appearance-none cursor-pointer"
                        >
                          {customizingItem.flavors.map((f) => (
                            <option key={f} value={f}>{f}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Lettering / custom text written on top of the cake */}
                  <div id="modal-lettering-wrap" className="space-y-1.5 text-left">
                    <div className="flex justify-between items-center" id="lettering-label-row">
                      <label className="text-xs font-bold text-stone-700 tracking-wide uppercase font-sans flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-gold-600" />
                        <span>Writing on Cake</span>
                      </label>
                      <span className="text-[10px] text-stone-400 font-sans font-medium" id="lettering-character-note">Optional</span>
                    </div>
                    <input
                      id="cake-writing-input"
                      type="text"
                      maxLength={32}
                      value={customWriting}
                      onChange={(e) => setCustomWriting(e.target.value)}
                      placeholder="e.g. Happy Birthday Mary! (Max 32 letters)"
                      className="w-full bg-stone-50 text-stone-800 font-sans text-sm py-2.5 px-4 rounded-xl border border-stone-200 outline-none focus:border-gold-500 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Quantity selector and Estimated summary pricing */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100" id="modal-summary-line">
                    
                    {/* Quantity selectors */}
                    <div className="space-y-1 text-left" id="modal-qty-manager">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block font-sans">
                        Quantity
                      </label>
                      <div className="flex items-center gap-1 mt-1 bg-stone-100 p-1 rounded-lg" id="modal-qty-control-row">
                        <button
                          id="qty-decrement-btn"
                          disabled={qty <= 1}
                          onClick={() => setQty(prev => Math.max(1, prev - 1))}
                          className="w-7 h-7 bg-white hover:bg-stone-50 rounded text-stone-600 font-bold border border-stone-200/50 flex items-center justify-center disabled:opacity-40"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-stone-800 font-mono" id="modal-qty-txt">
                          {qty}
                        </span>
                        <button
                          id="qty-increment-btn"
                          onClick={() => setQty(prev => prev + 1)}
                          className="w-7 h-7 bg-white hover:bg-stone-50 rounded text-stone-600 font-bold border border-stone-200/50 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Calculated estimated price indicator */}
                    <div className="text-right" id="modal-price-calc-indicator">
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block font-sans font-semibold leading-none">Estimated Price</p>
                      <p className="text-2xl font-black font-sans text-gold-800 mt-1" id="modal-calculated-total">
                        ₹{calculateEstimatedPrice(customizingItem, selectedWeight) * qty}
                      </p>
                    </div>

                  </div>

                  {/* Actions buttons bottom dialog */}
                  <div className="flex gap-3 pt-3" id="modal-action-buttons-wrap">
                    <button
                      id="modal-cancel-btn"
                      onClick={() => setCustomizingItem(null)}
                      className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-600 font-sans font-semibold py-3.5 rounded-xl transition-colors text-center cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      id="modal-confirm-add-btn"
                      onClick={handleConfirmAdd}
                      className="flex-1 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-white font-sans font-semibold py-3.5 rounded-xl transition-all shadow-md shadow-gold-600/25 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-4 h-4 text-gold-100" />
                      <span>Add to Order Bag</span>
                    </button>
                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Dynamic Success micro Toast */}
        <AnimatePresence>
          {successToast && (
            <motion.div
              id="micro-toast-success"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 z-50 bg-stone-900 border border-gold-500/50 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3"
            >
              <div className="bg-gold-500 text-stone-950 p-1.5 rounded-full" id="toast-icon-circle">
                <Check className="w-3.5 h-3.5 text-stone-900 stroke-[3px]" />
              </div>
              <div className="text-left" id="toast-text-wrap">
                <p className="text-xs font-semibold text-stone-300 font-sans leading-none">Perfect Addition</p>
                <p className="text-sm font-bold text-white mt-1 leading-tight">{successToast}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
