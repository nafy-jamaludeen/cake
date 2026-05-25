import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, EyeOff, Lock, LogOut, Sparkles, CheckCircle, ShoppingBag, Tag } from 'lucide-react';
import { Offer } from './Offers';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';

// ✅ Change this password to whatever you want
const ADMIN_PASSWORD = 'goldencakes2024';

// ─── Types ────────────────────────────────────────────────────────
export interface CustomProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  active: boolean;
  isCustom: true;
}

export interface ProductVisibility {
  [id: string]: boolean; // false = hidden
}

const emptyOffer = (): Omit<Offer, 'id'> => ({
  title: '',
  description: '',
  discount: '',
  validUntil: '',
  badge: '',
  active: true,
});

const emptyProduct = (): Omit<CustomProduct, 'id' | 'isCustom'> => ({
  name: '',
  description: '',
  price: '',
  imageUrl: '',
  active: true,
});

// ─── Main Component ───────────────────────────────────────────────
export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<'offers' | 'products'>('offers');

  // Offers state
  const [offers, setOffers] = useState<Offer[]>([]);
  const [offerForm, setOfferForm] = useState(emptyOffer());
  const [offerSaved, setOfferSaved] = useState(false);

  // Products state
  const [customProducts, setCustomProducts] = useState<CustomProduct[]>([]);
  const [productVisibility, setProductVisibility] = useState<ProductVisibility>({});
  const [productForm, setProductForm] = useState(emptyProduct());
  const [productSaved, setProductSaved] = useState(false);

  useEffect(() => {
    const storedOffers = localStorage.getItem('goldenCakesOffers');
    if (storedOffers) setOffers(JSON.parse(storedOffers));

    const storedCustom = localStorage.getItem('goldenCakesCustomProducts');
    if (storedCustom) setCustomProducts(JSON.parse(storedCustom));

    const storedVisibility = localStorage.getItem('goldenCakesProductVisibility');
    if (storedVisibility) setProductVisibility(JSON.parse(storedVisibility));
  }, []);

  // ─── Offer Handlers ──────────────────────────────────────────────
  const persistOffers = (updated: Offer[]) => {
    localStorage.setItem('goldenCakesOffers', JSON.stringify(updated));
    setOffers(updated);
  };

  const handleAddOffer = () => {
    if (!offerForm.title || !offerForm.discount || !offerForm.validUntil) return;
    persistOffers([...offers, { ...offerForm, id: Date.now().toString() }]);
    setOfferForm(emptyOffer());
    setOfferSaved(true);
    setTimeout(() => setOfferSaved(false), 2500);
  };

  const handleDeleteOffer = (id: string) => persistOffers(offers.filter((o) => o.id !== id));
  const handleToggleOffer = (id: string) =>
    persistOffers(offers.map((o) => (o.id === id ? { ...o, active: !o.active } : o)));

  // ─── Product Handlers ────────────────────────────────────────────
  const persistCustomProducts = (updated: CustomProduct[]) => {
    localStorage.setItem('goldenCakesCustomProducts', JSON.stringify(updated));
    setCustomProducts(updated);
  };

  const persistVisibility = (updated: ProductVisibility) => {
    localStorage.setItem('goldenCakesProductVisibility', JSON.stringify(updated));
    setProductVisibility(updated);
  };

  const handleAddProduct = () => {
    if (!productForm.name || !productForm.price) return;
    const newProduct: CustomProduct = { ...productForm, id: `custom-${Date.now()}`, isCustom: true };
    persistCustomProducts([...customProducts, newProduct]);
    setProductForm(emptyProduct());
    setProductSaved(true);
    setTimeout(() => setProductSaved(false), 2500);
  };

  const handleDeleteCustomProduct = (id: string) =>
    persistCustomProducts(customProducts.filter((p) => p.id !== id));

  const handleToggleCustomProduct = (id: string) =>
    persistCustomProducts(customProducts.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));

  // Toggle visibility of original MENU_ITEMS
  const handleToggleOriginal = (id: string) => {
    const updated = { ...productVisibility, [id]: productVisibility[id] === false ? true : false };
    persistVisibility(updated);
  };

  const isOriginalVisible = (id: string) => productVisibility[id] !== false;

  // ─── Login Screen ────────────────────────────────────────────────
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
              onKeyDown={(e) => e.key === 'Enter' && (() => {
                if (passwordInput === ADMIN_PASSWORD) { setAuthed(true); setPasswordError(''); }
                else setPasswordError('Wrong password. Try again.');
              })()}
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
            {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
            <button
              onClick={() => {
                if (passwordInput === ADMIN_PASSWORD) { setAuthed(true); setPasswordError(''); }
                else setPasswordError('Wrong password. Try again.');
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold py-3 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all shadow-md"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Dashboard ───────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-amber-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-stone-800 font-serif flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-500" />
              Admin Panel
            </h1>
            <p className="text-stone-400 text-sm">Golden Cakes & Bakes</p>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-1.5 text-stone-500 hover:text-red-500 text-sm transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-1.5 rounded-2xl border border-amber-100 shadow-sm">
          <button
            onClick={() => setActiveTab('offers')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'offers'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md'
                : 'text-stone-500 hover:text-amber-600'
            }`}
          >
            <Tag className="w-4 h-4" />
            Offers ({offers.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md'
                : 'text-stone-500 hover:text-amber-600'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Products ({MENU_ITEMS.length + customProducts.length})
          </button>
        </div>

        {/* ── OFFERS TAB ── */}
        {activeTab === 'offers' && (
          <>
            {/* Add Offer Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 mb-6">
              <h2 className="font-bold text-stone-700 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-500" />
                Add New Offer
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-500 mb-1 block">Offer Title *</label>
                  <input type="text" placeholder="e.g. Buy 1 Get 1 Free on Birthday Cakes"
                    value={offerForm.title} onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-500 mb-1 block">Description</label>
                  <textarea placeholder="Short description..." value={offerForm.description}
                    onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                    rows={2} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-500 mb-1 block">Discount / Tag *</label>
                  <input type="text" placeholder="e.g. 20% OFF" value={offerForm.discount}
                    onChange={(e) => setOfferForm({ ...offerForm, discount: e.target.value })}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-500 mb-1 block">Valid Until *</label>
                  <input type="date" value={offerForm.validUntil}
                    onChange={(e) => setOfferForm({ ...offerForm, validUntil: e.target.value })}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-500 mb-1 block">Badge (optional)</label>
                  <input type="text" placeholder="e.g. HOT 🔥" value={offerForm.badge}
                    onChange={(e) => setOfferForm({ ...offerForm, badge: e.target.value })}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-5">
                <button onClick={handleAddOffer}
                  disabled={!offerForm.title || !offerForm.discount || !offerForm.validUntil}
                  className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold px-6 py-2.5 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed">
                  <Plus className="w-4 h-4" /> Add Offer
                </button>
                {offerSaved && (
                  <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" /> Saved!
                  </span>
                )}
              </div>
            </div>

            {/* Offers List */}
            <div className="space-y-3">
              <h2 className="font-bold text-stone-700">All Offers ({offers.length})</h2>
              {offers.length === 0 && (
                <div className="text-center py-12 text-stone-400 bg-white rounded-2xl border border-amber-100">
                  No offers yet. Add your first one above!
                </div>
              )}
              {offers.map((offer) => (
                <div key={offer.id}
                  className={`bg-white rounded-2xl border p-4 flex items-start gap-4 transition-all ${offer.active ? 'border-amber-100' : 'border-stone-200 opacity-60'}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-amber-600 text-sm">{offer.discount}</span>
                      {offer.badge && <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{offer.badge}</span>}
                      {!offer.active && <span className="bg-stone-100 text-stone-500 text-xs px-2 py-0.5 rounded-full">Hidden</span>}
                    </div>
                    <p className="font-semibold text-stone-800 text-sm mt-0.5">{offer.title}</p>
                    <p className="text-stone-400 text-xs mt-1">Valid: {offer.validUntil}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => handleToggleOffer(offer.id)}
                      className="p-2 rounded-lg hover:bg-amber-50 text-stone-400 hover:text-amber-600 transition">
                      {offer.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button onClick={() => handleDeleteOffer(offer.id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── PRODUCTS TAB ── */}
        {activeTab === 'products' && (
          <>
            {/* Add Product Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 mb-6">
              <h2 className="font-bold text-stone-700 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-500" />
                Add New Product
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-500 mb-1 block">Product Name *</label>
                  <input type="text" placeholder="e.g. Mango Mousse Cake"
                    value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-500 mb-1 block">Price *</label>
                  <input type="text" placeholder="e.g. ₹650 - ₹1,100"
                    value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-500 mb-1 block">Description</label>
                  <textarea placeholder="Short product description..."
                    value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    rows={2} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-500 mb-1 block">Image URL</label>
                  <input type="text" placeholder="https://images.unsplash.com/..."
                    value={productForm.imageUrl} onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-5">
                <button onClick={handleAddProduct}
                  disabled={!productForm.name || !productForm.price}
                  className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold px-6 py-2.5 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed">
                  <Plus className="w-4 h-4" /> Add Product
                </button>
                {productSaved && (
                  <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" /> Saved!
                  </span>
                )}
              </div>
            </div>

            {/* Original Products */}
            <div className="space-y-3 mb-6">
              <h2 className="font-bold text-stone-700">Original Products ({MENU_ITEMS.length})</h2>
              {MENU_ITEMS.map((item) => (
                <div key={item.id}
                  className={`bg-white rounded-2xl border p-4 flex items-center gap-4 transition-all ${isOriginalVisible(item.id) ? 'border-amber-100' : 'border-stone-200 opacity-60'}`}>
                  {item.image && (
                    <img src={item.image} alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-100" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-stone-800 text-sm">{item.name}</p>
                    <p className="text-amber-600 text-xs font-bold mt-0.5">{item.priceRange}</p>
                    {!isOriginalVisible(item.id) && (
                      <span className="inline-block bg-stone-100 text-stone-500 text-xs px-2 py-0.5 rounded-full mt-1">Hidden</span>
                    )}
                  </div>
                  <button onClick={() => handleToggleOriginal(item.id)}
                    title={isOriginalVisible(item.id) ? 'Hide product' : 'Show product'}
                    className="p-2 rounded-lg hover:bg-amber-50 text-stone-400 hover:text-amber-600 transition shrink-0">
                    {isOriginalVisible(item.id) ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>

            {/* Custom Products */}
            {customProducts.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-bold text-stone-700">Added Products ({customProducts.length})</h2>
                {customProducts.map((product) => (
                  <div key={product.id}
                    className={`bg-white rounded-2xl border p-4 flex items-center gap-4 transition-all ${product.active ? 'border-amber-100' : 'border-stone-200 opacity-60'}`}>
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-100" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-stone-800 text-sm">{product.name}</p>
                      <p className="text-amber-600 text-xs font-bold mt-0.5">{product.price}</p>
                      {product.description && <p className="text-stone-400 text-xs mt-0.5 truncate">{product.description}</p>}
                      {!product.active && <span className="inline-block bg-stone-100 text-stone-500 text-xs px-2 py-0.5 rounded-full mt-1">Hidden</span>}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => handleToggleCustomProduct(product.id)}
                        className="p-2 rounded-lg hover:bg-amber-50 text-stone-400 hover:text-amber-600 transition">
                        {product.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button onClick={() => handleDeleteCustomProduct(product.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Back to site */}
        <div className="text-center mt-8">
          <a href="/" className="text-amber-600 hover:text-amber-700 text-sm font-medium underline underline-offset-2">
            ← Back to Website
          </a>
        </div>

      </div>
    </div>
  );
}
