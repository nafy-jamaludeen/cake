import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, EyeOff, Lock, LogOut, Sparkles, CheckCircle } from 'lucide-react';
import { Offer } from './Offers';

// ✅ Change this password to whatever you want
const ADMIN_PASSWORD = 'goldencakes2024';

const emptyOffer = (): Omit<Offer, 'id'> => ({
  title: '',
  description: '',
  discount: '',
  validUntil: '',
  badge: '',
  active: true,
});

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [offers, setOffers] = useState<Offer[]>([]);
  const [form, setForm] = useState(emptyOffer());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('goldenCakesOffers');
    if (stored) setOffers(JSON.parse(stored));
  }, []);

  const persist = (updated: Offer[]) => {
    localStorage.setItem('goldenCakesOffers', JSON.stringify(updated));
    setOffers(updated);
  };

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthed(true);
      setPasswordError('');
    } else {
      setPasswordError('Wrong password. Try again.');
    }
  };

  const handleAdd = () => {
    if (!form.title || !form.discount || !form.validUntil) return;
    const newOffer: Offer = {
      ...form,
      id: Date.now().toString(),
    };
    persist([...offers, newOffer]);
    setForm(emptyOffer());
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDelete = (id: string) => {
    persist(offers.filter((o) => o.id !== id));
  };

  const handleToggle = (id: string) => {
    persist(offers.map((o) => (o.id === id ? { ...o, active: !o.active } : o)));
  };

  // ─── Login Screen ───────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm border border-amber-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-2xl mb-3">
              <Lock className="w-7 h-7 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-stone-800 font-serif">Admin Panel</h1>
            <p className="text-stone-400 text-sm mt-1">Golden Cakes & Bakes</p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
            {passwordError && (
              <p className="text-red-500 text-xs">{passwordError}</p>
            )}
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold py-3 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all shadow-md"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Admin Dashboard ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-amber-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-stone-800 font-serif flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-500" />
              Manage Offers
            </h1>
            <p className="text-stone-400 text-sm">Golden Cakes & Bakes Admin</p>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-1.5 text-stone-500 hover:text-red-500 text-sm transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Add New Offer Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 mb-6">
          <h2 className="font-bold text-stone-700 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-amber-500" />
            Add New Offer
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-stone-500 mb-1 block">Offer Title *</label>
              <input
                type="text"
                placeholder="e.g. Buy 1 Get 1 Free on Birthday Cakes"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-stone-500 mb-1 block">Description</label>
              <textarea
                placeholder="Short description of the offer..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-500 mb-1 block">Discount / Tag *</label>
              <input
                type="text"
                placeholder="e.g. 20% OFF or ₹200 OFF"
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
                className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-500 mb-1 block">Valid Until *</label>
              <input
                type="date"
                value={form.validUntil}
                onChange={(e) => setForm({ ...form, validUntil: e.target.value })}
                className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-500 mb-1 block">Badge (optional)</label>
              <input
                type="text"
                placeholder="e.g. HOT 🔥 or NEW"
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={handleAdd}
              disabled={!form.title || !form.discount || !form.validUntil}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold px-6 py-2.5 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              Add Offer
            </button>
            {saved && (
              <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                Offer saved!
              </span>
            )}
          </div>
        </div>

        {/* Existing Offers List */}
        <div className="space-y-3">
          <h2 className="font-bold text-stone-700 mb-2">
            All Offers ({offers.length})
          </h2>

          {offers.length === 0 && (
            <div className="text-center py-12 text-stone-400 bg-white rounded-2xl border border-amber-100">
              No offers yet. Add your first one above!
            </div>
          )}

          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`bg-white rounded-2xl border p-4 flex items-start gap-4 transition-all ${
                offer.active ? 'border-amber-100' : 'border-stone-200 opacity-60'
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-amber-600 text-sm">{offer.discount}</span>
                  {offer.badge && (
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                      {offer.badge}
                    </span>
                  )}
                  {!offer.active && (
                    <span className="bg-stone-100 text-stone-500 text-xs px-2 py-0.5 rounded-full">Hidden</span>
                  )}
                </div>
                <p className="font-semibold text-stone-800 text-sm mt-0.5">{offer.title}</p>
                {offer.description && (
                  <p className="text-stone-400 text-xs mt-0.5 truncate">{offer.description}</p>
                )}
                <p className="text-stone-400 text-xs mt-1">Valid: {offer.validUntil}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggle(offer.id)}
                  title={offer.active ? 'Hide offer' : 'Show offer'}
                  className="p-2 rounded-lg hover:bg-amber-50 text-stone-400 hover:text-amber-600 transition"
                >
                  {offer.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDelete(offer.id)}
                  title="Delete offer"
                  className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back to site link */}
        <div className="text-center mt-8">
          <a href="/" className="text-amber-600 hover:text-amber-700 text-sm font-medium underline underline-offset-2">
            ← Back to Website
          </a>
        </div>

      </div>
    </div>
  );
}
