import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageSquareCode, Truck, Landmark } from 'lucide-react';
import { BUSINESS_DETAILS } from '../data';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQty,
  onClearCart,
}: CartDrawerProps) {
  const [deliveryType, setDeliveryType] = useState<'takeaway' | 'delivery'>('takeaway');
  const [deliveryArea, setDeliveryArea] = useState(BUSINESS_DETAILS.deliveryAreas[0]);
  const [specificAddress, setSpecificAddress] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.calculatedPrice * item.quantity, 0);
  const deliveryCharge = deliveryType === 'delivery' ? BUSINESS_DETAILS.defaultDeliveryCharge : 0;
  const cartTotal = cartSubtotal + deliveryCharge;

  const handleCheckoutWhatsApp = () => {
    if (cartItems.length === 0) return;

    // Compile comprehensive order message text block
    let msg = `*New Order - Golden Cakes and Bakes*%0A`;
    msg += `=========================%0A%0A`;
    
    cartItems.forEach((item, idx) => {
      msg += `*${idx + 1}. ${item.item.name}*%0A`;
      msg += `  - Size/Weight: *${item.selectedWeight}*%0A`;
      msg += `  - Flavor: ${item.selectedFlavor}%0A`;
      if (item.customWriting) {
        msg += `  - Custom Text: _"${item.customWriting}"_%0A`;
      }
      msg += `  - Qty: ${item.quantity} x ₹${item.calculatedPrice}%0A`;
      msg += `  - Price: *₹${item.calculatedPrice * item.quantity}*%0A%0A`;
    });

    msg += `=========================%0A`;
    msg += `*Subtotal:* ₹${cartSubtotal}%0A`;
    msg += `*Shipping/Service:* ${deliveryType === 'delivery' ? `Delivery (₹${deliveryCharge})` : 'Takeaway (Free)'}%0A`;
    msg += `*Grand Total Price:* *₹${cartTotal}*%0A%0A`;

    msg += `*Delivery Details:*%0A`;
    msg += `- Option: ${deliveryType === 'delivery' ? 'Home Delivery' : 'Pickup Takeaway'}%0A`;
    if (deliveryType === 'delivery') {
      msg += `- Sector/Area: ${deliveryArea}%0A`;
      if (specificAddress) msg += `- Address: ${specificAddress}%0A`;
    }
    if (deliveryPhone) msg += `- Phone Contact: ${deliveryPhone}%0A`;
    msg += `=========================%0A`;
    msg += `Please confirm availability and baking hours slot. Thank you!`;

    const url = `https://wa.me/${BUSINESS_DETAILS.whatsappNumber}?text=${msg}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Gray Shading Backdrop Overlay */}
          <motion.div
            id="cart-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-xs"
          />

          {/* Sliding Right Drawer Panel */}
          <motion.div
            id="cart-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            className="fixed top-0 bottom-0 right-0 z-50 w-full max-w-md bg-white border-l border-gold-200 shadow-2xl flex flex-col justify-between"
          >
            {/* Header section */}
            <div id="cart-drawer-header" className="p-5 sm:p-6 border-b border-stone-155 flex justify-between items-center bg-stone-50">
              <div className="flex items-center gap-2" id="cart-header-title-box">
                <div className="bg-gold-100 p-2 rounded-xl text-gold-800" id="cart-icon-outer">
                  <ShoppingBag className="w-5 h-5 text-gold-700" />
                </div>
                <div className="text-left" id="cart-meta-labels">
                  <h3 className="font-serif text-lg font-black text-stone-800">Your Basket</h3>
                  <p className="text-[10px] text-stone-400 uppercase font-sans tracking-wide">
                    {cartItems.length} Gourmet configuration{cartItems.length !== 1 ? 's' : ''} Selected
                  </p>
                </div>
              </div>

              {/* Close Cross button */}
              <button
                id="cart-drawer-close"
                onClick={onClose}
                className="p-2 text-stone-400 hover:text-stone-800 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Close basket drawer"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Main scrollable body panel */}
            <div id="cart-drawer-body" className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              
              <AnimatePresence mode="popLayout">
                {cartItems.length === 0 ? (
                  // EMPTY Basket layout
                  <motion.div
                    id="cart-empty-visualizer"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center space-y-4"
                  >
                    <div id="empty-icon-circle" className="bg-gold-50 text-gold-400 p-6 rounded-full w-fit mx-auto border border-gold-200/50">
                      <ShoppingBag className="w-10 h-10 text-gold-300" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-800">Your Basket is Empty</h4>
                      <p className="text-xs text-stone-500 font-sans max-w-xs mx-auto">
                        Explore our gourmet menu and customize a delicious cake to kickstart your Kottakkal celebration!
                      </p>
                    </div>
                    <button
                      id="empty-keep-shopping"
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-sans font-bold text-gold-700 bg-gold-50 hover:bg-gold-100 px-4 py-2 rounded-lg border border-gold-200 transition-colors mt-2 cursor-pointer"
                    >
                      <span>Browse Menu Options</span>
                      <ArrowRight className="w-4 h-4 text-gold-600" />
                    </button>
                  </motion.div>
                ) : (
                  // ITEM TILES ROSTER
                  <div id="cart-items-roster" className="space-y-4">
                    {cartItems.map((item) => (
                      <motion.div
                        id={`cart-item-tile-${item.id}`}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        key={item.id}
                        className="flex gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200/50 hover:border-gold-200 hover:bg-white transition-all text-left group"
                      >
                        {/* Tiny image frame */}
                        <div id={`cart-img-frame-${item.id}`} className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100 border border-stone-200">
                          <img
                            id={`cart-tile-img-${item.id}`}
                            src={item.item.image}
                            alt={item.item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Text descriptions */}
                        <div id={`cart-tile-content-${item.id}`} className="flex-1 flex flex-col justify-between">
                          <div id={`cart-tile-titles-row-${item.id}`} className="flex justify-between items-start gap-2">
                            <div className="text-left">
                              <h4 id={`cart-tile-heading-${item.id}`} className="font-sans font-bold text-xs sm:text-sm text-stone-800 leading-tight">
                                {item.item.name}
                              </h4>
                              <p id={`cart-tile-specs-${item.id}`} className="text-[10px] text-stone-500 font-sans mt-1">
                                {item.selectedWeight} • {item.selectedFlavor}
                              </p>
                              {item.customWriting && (
                                <p id={`cart-tile-writing-${item.id}`} className="text-[10px] text-rose-600 font-sans italic mt-0.5 max-w-[200px] line-clamp-1">
                                  Text: &ldquo;{item.customWriting}&rdquo;
                                </p>
                              )}
                            </div>

                            {/* Trash button */}
                            <button
                              id={`cart-trash-btn-${item.id}`}
                              onClick={() => onRemoveItem(item.id)}
                              className="text-stone-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price and count regulators row */}
                          <div id={`cart-tile-prices-row-${item.id}`} className="flex justify-between items-center mt-3">
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-1.5 bg-white border border-stone-200 p-0.5 rounded-lg" id={`cart-tile-qty-controls-${item.id}`}>
                              <button
                                id={`cart-decr-btn-${item.id}`}
                                disabled={item.quantity <= 1}
                                onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                                className="w-6 h-6 bg-stone-50 hover:bg-stone-100 rounded text-xs font-bold font-sans disabled:opacity-40"
                              >
                                -
                              </button>
                              <span id={`cart-tile-qty-${item.id}`} className="w-5 text-center text-xs font-bold text-stone-700 font-mono">
                                {item.quantity}
                              </span>
                              <button
                                id={`cart-incr-btn-${item.id}`}
                                onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                                className="w-6 h-6 bg-stone-50 hover:bg-stone-100 rounded text-xs font-bold font-sans"
                              >
                                +
                              </button>
                            </div>

                            {/* Calculated Price */}
                            <span id={`cart-tile-price-val-${item.id}`} className="font-sans font-bold text-sm text-gold-800">
                              ₹{item.calculatedPrice * item.quantity}
                            </span>
                          </div>

                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {/* Delivery and area selectors form, ONLY when cart has items */}
              {cartItems.length > 0 && (
                <div id="cart-configs-form" className="border-t border-stone-155 pt-6 space-y-4">
                  <h4 className="font-serif text-sm font-bold text-stone-800 text-left">Fulfillment Preferences</h4>
                  
                  {/* Fulfillment Type selector pills */}
                  <div className="grid grid-cols-2 gap-2" id="cart-fulfillment-pills-row">
                    <button
                      id="pill-fulfillment-takeaway"
                      type="button"
                      onClick={() => setDeliveryType('takeaway')}
                      className={`py-2 px-3 rounded-xl text-xs font-sans font-bold flex items-center justify-center gap-1.5 cursor-pointer border transition-colors ${
                        deliveryType === 'takeaway'
                          ? 'bg-gold-50 text-gold-800 border-gold-400'
                          : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <Landmark className="w-4 h-4" />
                      <span>Takeaway (Free)</span>
                    </button>
                    
                    <button
                      id="pill-fulfillment-delivery"
                      type="button"
                      onClick={() => setDeliveryType('delivery')}
                      className={`py-2 px-3 rounded-xl text-xs font-sans font-bold flex items-center justify-center gap-1.5 cursor-pointer border transition-colors ${
                        deliveryType === 'delivery'
                          ? 'bg-gold-50 text-gold-800 border-gold-400'
                          : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <Truck className="w-4 h-4" />
                      <span>Home Delivery</span>
                    </button>
                  </div>

                  {/* Delivery specifications, shown conditionally */}
                  {deliveryType === 'delivery' && (
                    <motion.div
                      id="cart-delivery-specs-wrap"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3 text-left overflow-hidden"
                    >
                      {/* Area selector */}
                      <div className="space-y-1.5" id="cart-area-selector">
                        <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block font-sans">
                          Sectors / Delivery Area
                        </label>
                        <select
                          id="cart-area-dropdown"
                          value={deliveryArea}
                          onChange={(e) => setDeliveryArea(e.target.value)}
                          className="w-full bg-stone-50 text-stone-800 font-sans text-xs py-2 px-3 rounded-xl border border-stone-200 focus:border-gold-500 outline-none"
                        >
                          {BUSINESS_DETAILS.deliveryAreas.map((area) => (
                            <option key={area} value={area}>{area}</option>
                          ))}
                        </select>
                      </div>

                      {/* Explicit Address */}
                      <div className="space-y-1.5" id="cart-addr-input-wrap">
                        <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block font-sans">
                          Specific Landmark / Street address
                        </label>
                        <input
                          id="cart-addr-input"
                          type="text"
                          required
                          value={specificAddress}
                          onChange={(e) => setSpecificAddress(e.target.value)}
                          placeholder="e.g. Near Parappur Juma Masjid / Gate No 3"
                          className="w-full bg-stone-50 text-stone-800 font-sans text-xs py-2 px-3 rounded-xl border border-stone-200 focus:border-gold-500 outline-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Phone contact always good */}
                  <div className="space-y-1.5 text-left" id="cart-phone-input-wrap">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block font-sans">
                      Recipient Contact Phone
                    </label>
                    <input
                      id="cart-contact-phone-input"
                      type="tel"
                      required
                      value={deliveryPhone}
                      onChange={(e) => setDeliveryPhone(e.target.value)}
                      placeholder="e.g. 080756 99838"
                      className="w-full bg-stone-50 text-stone-800 font-sans text-xs py-2 px-3 rounded-xl border border-stone-200 focus:border-gold-500 outline-none"
                    />
                  </div>

                </div>
              )}

            </div>

            {/* Calculations and trigger footer, ONLY when cart has items */}
            {cartItems.length > 0 && (
              <div id="cart-drawer-checkout-footer" className="p-5 sm:p-6 bg-stone-50 border-t border-stone-155 space-y-4">
                
                {/* Cost breakdown summary */}
                <div id="cart-bill-breakdown" className="space-y-2 text-sm font-sans text-stone-600">
                  <div className="flex justify-between items-center" id="cart-row-subtotal">
                    <span>Gourmet cakes subtotal</span>
                    <span className="font-bold text-stone-800 font-mono">₹{cartSubtotal}</span>
                  </div>
                  
                  <div className="flex justify-between items-center" id="cart-row-delivery">
                    <span>
                      {deliveryType === 'delivery' ? `Delivery fee to ${deliveryArea}` : 'Takeaway fee'}
                    </span>
                    <span className="font-bold text-stone-800 font-mono">
                      {deliveryType === 'delivery' ? `₹${deliveryCharge}` : 'Free'}
                    </span>
                  </div>

                  <div className="border-t border-stone-200 pt-2 flex justify-between items-center text-base" id="cart-row-grandtotal">
                    <span className="font-serif font-bold text-stone-900">Total Price</span>
                    <span className="font-black text-gold-800 text-lg font-mono">₹{cartTotal}</span>
                  </div>
                </div>

                {/* Clear and Checkouts buttons row */}
                <div id="cart-action-pills-row" className="flex gap-2">
                  <button
                    id="cart-drawer-clear-all"
                    onClick={onClearCart}
                    className="bg-stone-200 hover:bg-stone-300 text-stone-600 font-sans text-xs px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                  
                  <button
                    id="cart-drawer-checkout-wa"
                    onClick={handleCheckoutWhatsApp}
                    className="flex-1 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-white font-sans font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 cursor-pointer leading-none"
                  >
                    <MessageSquareCode className="w-4 h-4 text-gold-150" />
                    <span>Proceed to WhatsApp Checkout</span>
                  </button>
                </div>

                <p id="whatsapp-order-note" className="text-[10px] text-stone-400 font-sans text-center">
                  Your preformatted customized order menu opens immediately inside WhatsApp. 
                  Golden Bakes cooks freshly upon coordinate confirmation!
                </p>

              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
