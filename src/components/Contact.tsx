import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { BUSINESS_DETAILS } from '../data';

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Address
  const ADDRESS = BUSINESS_DETAILS.addressFull;

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setMsg('');
    setSubmitted(false);
  };

  const handleWhatsAppSend = () => {
    // Generate prefilled WhatsApp Inquiry message block
    const textPart = `Hi Golden Cakes and Bakes, my name is ${name || 'Customer'}. %0A%0A*Contact Phone:* ${phone || 'N/A'}%0A*Inquiry Message:* ${msg || 'Interested in ordering a customized gourmet pastry / cake!'}`;
    const url = `https://wa.me/${BUSINESS_DETAILS.whatsappNumber}?text=${textPart}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-gold-50/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div id="contact-header" className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span id="contact-sub-label" className="text-xs uppercase tracking-[0.25em] font-bold text-gold-600 block">
            Visit &amp; Order
          </span>
          <h2 id="contact-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight">
            We&apos;d Love to Hear From You
          </h2>
          <p id="contact-desc" className="text-stone-500 font-sans text-sm sm:text-base leading-relaxed">
            Reach out to lock your celebration date, design a custom wedding tier, or ask details about delivery options. Visit us at Kurikkal Bazar or chat instantly on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-main-grid">
          
          {/* Left: Contact Info and Google Maps Embed */}
          <div id="contact-details-span" className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            <div id="contact-info-cards" className="space-y-6">
              
              {/* Card Address */}
              <div id="contact-addr-block" className="flex gap-4 p-5 rounded-2xl bg-white border border-stone-200/60 shadow-xs text-left">
                <div id="contact-addr-icon" className="bg-gold-50 text-gold-600 p-3 rounded-xl h-fit border border-gold-200/50">
                  <MapPin className="w-5 h-5 text-gold-700" />
                </div>
                <div id="contact-addr-text" className="space-y-1">
                  <h4 className="font-sans font-bold text-stone-800 text-sm sm:text-base">Our Bakery Location</h4>
                  <p className="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed">
                    {ADDRESS}
                  </p>
                  <p className="text-[11px] text-gold-600 font-sans font-medium hover:underline">
                    Kurikkal Bazar, Parappur, Kottakkal
                  </p>
                </div>
              </div>

              {/* Card Phone */}
              <div id="contact-phone-block" className="flex gap-4 p-5 rounded-2xl bg-white border border-stone-200/60 shadow-xs text-left">
                <div id="contact-phone-icon" className="bg-gold-50 text-gold-600 p-3 rounded-xl h-fit border border-gold-200/50">
                  <Phone className="w-5 h-5 text-gold-700" />
                </div>
                <div id="contact-phone-text" className="space-y-1">
                  <h4 className="font-sans font-bold text-stone-800 text-sm sm:text-base">Give Us A Call</h4>
                  <p className="font-sans text-xs sm:text-sm text-stone-500">
                    Order Line: <a href={`tel:${BUSINESS_DETAILS.phone.replace(/\s+/g, '')}`} className="font-bold text-stone-800 hover:text-gold-700 transition-colors">{BUSINESS_DETAILS.phone}</a>
                  </p>
                  <p className="text-[11px] text-stone-400 font-sans">
                    Call Hours: {BUSINESS_DETAILS.openHours}
                  </p>
                </div>
              </div>

              {/* Card Delivery */}
              <div id="contact-delivery-block" className="flex gap-4 p-5 rounded-2xl bg-white border border-stone-200/60 shadow-xs text-left">
                <div id="contact-delivery-icon" className="bg-gold-50 text-gold-600 p-3 rounded-xl h-fit border border-gold-200/50">
                  <MessageCircle className="w-5 h-5 text-gold-700" />
                </div>
                <div id="contact-delivery-text" className="space-y-1">
                  <h4 className="font-sans font-bold text-stone-800 text-sm sm:text-base">WhatsApp Chat Support</h4>
                  <p className="font-sans text-xs sm:text-sm text-stone-500 leading-tight">
                    Instant message and design reviews!
                  </p>
                  <button
                    id="contact-wa-chat"
                    onClick={() => {
                      const url = `https://wa.me/${BUSINESS_DETAILS.whatsappNumber}?text=Hi%20Golden%20Cakes%20and%20Bakes!%20Interested%20in%20looking%20at%20your%20cake%20catalogue.`;
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                    className="mt-2 inline-flex items-center gap-1 bg-[#25D366] text-white text-[11px] font-sans px-3 py-1.5 rounded-lg font-bold hover:bg-[#20ba59] cursor-pointer"
                  >
                    <span>Message Now</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Google Maps embed frame */}
            <div id="contact-maps-frame-outer" className="w-full aspect-[16/10] lg:aspect-square max-h-[300px] rounded-[1.5rem] overflow-hidden shadow-md border-4 border-white bg-stone-100">
              <iframe
                id="contact-google-maps"
                title="Golden Cakes and Bakes location on map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.4851214349375!2d75.97547077461413!3d11.00216668811467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba43db48caaa915%3A0xe54e60df08272da6!2sKurikkal%20Bazar%2C%20Parappur%2C%20Kerala%20676503!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Right: Contact Form Cards Pane */}
          <div id="contact-form-span" className="lg:col-span-7">
            <div id="contact-form-glass-box" className="glass-card p-6 sm:p-10 rounded-[2rem] border border-gold-200/50 shadow-xl h-full flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {submitted ? (
                  // Success layout screen
                  <motion.div
                    id="contact-form-success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 px-4 space-y-6 flex flex-col items-center"
                  >
                    <div id="contact-tick-decor" className="bg-gradient-to-tr from-gold-500 to-gold-600 text-white p-5 rounded-full shadow-lg animate-bounce">
                      <CheckCircle2 className="w-10 h-10 text-white stroke-[2.5px]" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl sm:text-3xl font-black text-stone-900" id="contact-form-success-heading">
                        Thank You, {name}!
                      </h3>
                      <p className="font-sans text-stone-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                        We have recorded your details. Our friendly chef typically replies or calls within 15–20 minutes to finalize details.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm pt-4" id="success-cta-row">
                      <button
                        id="success-whatsapp-forward"
                        onClick={handleWhatsAppSend}
                        className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-sans font-bold py-3.5 px-4 rounded-xl text-center text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle className="w-4.5 h-4.5 text-white" />
                        <span>Send to WhatsApp</span>
                      </button>
                      <button
                        id="success-write-another"
                        onClick={handleReset}
                        className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-600 font-sans font-semibold py-3.5 px-4 rounded-xl text-center text-xs sm:text-sm cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>

                  </motion.div>
                ) : (
                  // Normal Form Screen
                  <motion.div
                    id="contact-form-interactive"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6 text-left"
                  >
                    <div id="contact-form-title-wrap">
                      <h3 className="font-serif text-xl sm:text-2xl font-black text-stone-800">
                        Inquire About Custom Cakes
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-500 font-sans">
                        Fill in your coordinates and preferred theme, and we will get cooking!
                      </p>
                    </div>

                    <form id="contact-html-form" onSubmit={handleSubmitContact} className="space-y-4">
                      
                      {/* Name input */}
                      <div className="space-y-1.5" id="cnt-input-name-wrap">
                        <label className="text-xs font-bold text-stone-700 font-sans tracking-wide uppercase">Your Full Name</label>
                        <input
                          id="cnt-input-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Rahul Kumar"
                          className="w-full bg-white/70 text-stone-800 font-sans text-sm py-3 px-4 rounded-xl border border-stone-205 outline-none focus:border-gold-500 focus:bg-white transition-all shadow-inner"
                        />
                      </div>

                      {/* Phone input */}
                      <div className="space-y-1.5" id="cnt-input-phone-wrap">
                        <label className="text-xs font-bold text-stone-700 font-sans tracking-wide uppercase">Your Phone Number</label>
                        <input
                          id="cnt-input-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 080756 99838"
                          className="w-full bg-white/70 text-stone-800 font-sans text-sm py-3 px-4 rounded-xl border border-stone-205 outline-none focus:border-gold-500 focus:bg-white transition-all shadow-inner"
                        />
                      </div>

                      {/* Message input */}
                      <div className="space-y-1.5" id="cnt-input-msg-wrap">
                        <label className="text-xs font-bold text-stone-700 font-sans tracking-wide uppercase">Message / Order Requirements</label>
                        <textarea
                          id="cnt-input-msg"
                          rows={4}
                          value={msg}
                          onChange={(e) => setMsg(e.target.value)}
                          placeholder="e.g. Need a 2kg KitKat Cake on 26th May for a Birthday party with name writing 'Happy 5th Anwin'. Please deliver to Kottakkal at 6:00 PM."
                          className="w-full bg-white/70 text-stone-800 font-sans text-sm py-3 px-4 rounded-xl border border-stone-205 outline-none focus:border-gold-500 focus:bg-white transition-all shadow-inner"
                        />
                      </div>

                      {/* Dual trigger CTA support buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-3" id="cnt-trigger-buttons">
                        {/* Normal Submit in form state */}
                        <button
                          id="cnt-submit-btn"
                          type="submit"
                          className="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-sans font-bold py-3.5 px-6 rounded-xl text-center text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        >
                          <Send className="w-4.5 h-4.5 text-stone-300" />
                          <span>Submit Form Inquiry</span>
                        </button>

                        {/* Direct bypass to WhatsApp */}
                        <button
                          id="cnt-bypass-wa-btn"
                          type="button"
                          onClick={handleWhatsAppSend}
                          className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-sans font-bold py-3.5 px-6 rounded-xl text-center text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        >
                          <MessageCircle className="w-4.5 h-4.5 text-white" />
                          <span>Quick Send via WhatsApp</span>
                        </button>
                      </div>

                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
