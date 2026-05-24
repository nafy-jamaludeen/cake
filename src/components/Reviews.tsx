import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquareCode, Quote, CheckCircle2, PenLine } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import { Testimonial } from '../types';

interface ReviewsProps {
  testimonials: Testimonial[];
  onAddTestimonial: (testimonial: Testimonial) => void;
}

export default function Reviews({ testimonials, onAddTestimonial }: ReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorLoc, setAuthorLoc] = useState('');
  const [starCount, setStarCount] = useState(5);
  const [reviewTxt, setReviewTxt] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewTxt.trim()) return;

    const newReview: Testimonial = {
      id: `custom-rev-${Date.now()}`,
      author: authorName,
      text: reviewTxt,
      rating: starCount,
      date: 'Just now',
      location: authorLoc.trim() || 'Kottakkal, Kerala'
    };

    onAddTestimonial(newReview);
    setSubmitSuccess(true);
    setAuthorName('');
    setAuthorLoc('');
    setReviewTxt('');
    setStarCount(5);

    setTimeout(() => {
      setSubmitSuccess(false);
      setShowReviewForm(false);
    }, 2500);
  };

  // Recalculating state-backed stars summary statistics
  const totalReviewsCount = testimonials.length;
  const averageStars = (testimonials.reduce((acc, t) => acc + t.rating, 0) / totalReviewsCount).toFixed(1);

  return (
    <section id="reviews" className="py-20 bg-white relative">
      <div id="reviews-top-border" className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Double Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left panel: General stats and CTA review launcher */}
          <div id="reviews-summary-column" className="lg:col-span-4 space-y-6 text-left">
            <span id="reviews-tag" className="text-xs uppercase tracking-[0.25em] font-bold text-gold-600 block">
              Tested &amp; Loved
            </span>
            <h2 id="reviews-heading" className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
              What Our Customers Say
            </h2>
            <p id="reviews-intro-p" className="text-stone-500 font-sans text-sm leading-relaxed">
              We are honored to have served hundreds of families across Parappur, Kotakkal, and Malappuram district. Here is a snapshot of our high ratings:
            </p>

            {/* Micro rating board card */}
            <div id="reviews-stats-board" className="bg-gradient-to-tr from-gold-50 to-gold-100/50 border border-gold-200 p-6 rounded-2xl space-y-3">
              <div className="flex items-baseline gap-2" id="reviews-averages-line">
                <span className="font-serif text-5xl font-black text-gold-800" id="reviews-stars-avg">{averageStars}</span>
                <span className="text-sm font-sans text-stone-500 font-medium">/ 5.0 Rating</span>
              </div>
              <div id="reviews-stars-visualizer" className="flex items-center gap-0.5 text-gold-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                ))}
              </div>
              <p className="text-xs text-stone-600 font-sans font-medium" id="reviews-recap-stats">
                Verified score across <strong>{totalReviewsCount} orders</strong> and public customer feedback.
              </p>
            </div>

            {/* Launch writing dialog CTA */}
            <button
              id="reviews-pen-cta"
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="inline-flex items-center gap-2 text-gold-700 bg-gold-50 hover:bg-gold-100 border border-gold-300 font-sans font-semibold text-xs sm:text-sm py-3 px-5 rounded-xl transition-all cursor-pointer shadow-xs"
            >
              <PenLine className="w-4 h-4 text-gold-600" />
              <span>{showReviewForm ? 'Cancel Review Editor' : 'Write a Public Review'}</span>
            </button>
          </div>

          {/* Right panel: Roster of customer cards OR the interactive editor container */}
          <div id="reviews-display-column" className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {showReviewForm ? (
                // REVIEW COMPOSER SCREEN
                <motion.div
                  id="reviews-composer-box"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-stone-50 border border-gold-300/60 p-6 sm:p-8 rounded-3xl text-left"
                >
                  <h3 id="composer-title" className="font-serif text-xl sm:text-2xl font-black text-stone-800">
                    A Share of Sweet Words
                  </h3>
                  <p id="composer-desc" className="text-stone-500 text-xs sm:text-sm font-sans mt-1">
                    Your feedback motivates our home bakers to deliver golden standards every day.
                  </p>

                  <AnimatePresence mode="wait">
                    {submitSuccess ? (
                      <motion.div
                        id="composer-success-banner"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="py-12 flex flex-col items-center justify-center text-center space-y-3"
                      >
                        <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full" id="comp-success-icon-wrap">
                          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-800">Review Submitted!</h4>
                        <p className="text-xs text-stone-500 max-w-xs font-sans">
                          Thank you for sharing your sweets experience. Cooking love is what we do!
                        </p>
                      </motion.div>
                    ) : (
                      // FORM INPUTS
                      <form id="composer-form" onSubmit={handleSubmitReview} className="space-y-4 pt-6">
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="composer-inputs-row">
                          <div className="space-y-1.5" id="comp-input-name-wrap">
                            <label className="text-xs font-bold text-stone-700 font-sans">Your Name</label>
                            <input
                              id="comp-input-name"
                              type="text"
                              required
                              value={authorName}
                              onChange={(e) => setAuthorName(e.target.value)}
                              placeholder="e.g. John Doe"
                              className="w-full bg-white text-stone-800 font-sans text-sm py-2.5 px-3 rounded-xl border border-stone-200 outline-none focus:border-gold-500"
                            />
                          </div>
                          
                          <div className="space-y-1.5" id="comp-input-loc-wrap">
                            <label className="text-xs font-bold text-stone-700 font-sans">Your Town/City</label>
                            <input
                              id="comp-input-loc"
                              type="text"
                              value={authorLoc}
                              onChange={(e) => setAuthorLoc(e.target.value)}
                              placeholder="e.g. Kottakkal, Kerala"
                              className="w-full bg-white text-stone-800 font-sans text-sm py-2.5 px-3 rounded-xl border border-stone-200 outline-none focus:border-gold-500"
                            />
                          </div>
                        </div>

                        {/* Interactive Star Picker */}
                        <div className="space-y-1.5" id="comp-star-picker">
                          <label className="text-xs font-bold text-stone-700 block font-sans">Your Score</label>
                          <div className="flex items-center gap-1.5" id="composer-stars-picker-row">
                            {[1, 2, 3, 4, 5].map((idx) => (
                              <button
                                id={`star-picker-btn-${idx}`}
                                type="button"
                                key={idx}
                                onClick={() => setStarCount(idx)}
                                className="text-gold-500 hover:scale-110 transition-transform cursor-pointer"
                                aria-label={`Select ${idx} Stars rating`}
                              >
                                <Star
                                  className={`w-7 h-7 ${
                                    idx <= starCount ? 'fill-gold-500 text-gold-500' : 'text-stone-300'
                                  }`}
                                />
                              </button>
                            ))}
                            <span className="text-xs font-bold text-stone-600 ml-2 font-mono">({starCount} / 5)</span>
                          </div>
                        </div>

                        {/* Text description */}
                        <div className="space-y-1.5" id="comp-text-wrap">
                          <label className="text-xs font-bold text-stone-700 font-sans">Review Message</label>
                          <textarea
                            id="comp-text-area"
                            required
                            rows={3}
                            value={reviewTxt}
                            onChange={(e) => setReviewTxt(e.target.value)}
                            placeholder="Describe how soft, moist, or yummy the flavor was..."
                            className="w-full bg-white text-stone-800 font-sans text-sm py-2.5 px-3 rounded-xl border border-stone-200 outline-none focus:border-gold-500"
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          id="composer-submit-btn"
                          type="submit"
                          className="w-full bg-stone-900 hover:bg-gold-700 text-white font-sans font-semibold py-3 px-4 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          Submit Review
                        </button>

                      </form>
                    )}
                  </AnimatePresence>

                </motion.div>
              ) : (
                // TESTIMONIAL CARDS LISTING
                <motion.div
                  id="reviews-cards-stack"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {testimonials.map((testi, tIdx) => (
                    <div
                      id={`testimonial-bubble-${testi.id}`}
                      key={testi.id}
                      className="bg-stone-50/60 hover:bg-stone-50 border border-stone-200/50 p-6 sm:p-7 rounded-3xl hover:shadow-lg transition-all text-left flex flex-col justify-between"
                    >
                      <div id={`testimonial-card-main-${testi.id}`} className="space-y-4">
                        {/* Rating stars and quote header */}
                        <div className="flex justify-between items-center" id={`testimonial-card-header-${testi.id}`}>
                          <div className="flex items-center gap-0.5 text-gold-500" id={`testimonial-card-stars-${testi.id}`}>
                            {[...Array(testi.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                            ))}
                            {[...Array(5 - testi.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-stone-200" />
                            ))}
                          </div>
                          <Quote className="w-6 h-6 text-gold-200/80 rotate-180" />
                        </div>

                        {/* Authentic Message text */}
                        <p id={`testimonial-card-msg-${testi.id}`} className="text-stone-700 font-sans text-xs sm:text-sm italic leading-relaxed">
                          &ldquo;{testi.text}&rdquo;
                        </p>
                      </div>

                      {/* Author metadata bottom */}
                      <div id={`testimonial-card-author-${testi.id}`} className="flex justify-between items-center mt-6 pt-4 border-t border-stone-155">
                        <div id={`testimonial-author-names-${testi.id}`}>
                          <h4 className="font-sans font-bold text-xs sm:text-sm text-stone-800 leading-none">
                            {testi.author}
                          </h4>
                          <span className="text-[10px] text-stone-400 font-sans tracking-wide mt-1 block">
                            {testi.location}
                          </span>
                        </div>
                        <span id={`testimonial-card-date-${testi.id}`} className="text-[10px] text-stone-400 font-mono">
                          {testi.date}
                        </span>
                      </div>

                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
        
      </div>
    </section>
  );
}
