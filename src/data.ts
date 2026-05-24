import { MenuItem, Testimonial, GalleryItem } from './types';

export const BUSINESS_DETAILS = {
  name: "Golden Cakes and Bakes",
  tagline: "Delicious Moments, Baked Fresh Everyday",
  location: "Kurikkal Bazar, Parappur, Kottakkal, Kerala, India",
  pincode: "676503",
  addressFull: "Kurikkal Bazar, Parappur, Kottakkal, Kerala 676503",
  rating: 4.9,
  reviewsCount: 205,
  priceRange: "₹600–₹1,400",
  services: ["Takeaway Available", "Contactless Home Delivery"],
  phone: "080756 99838",
  phoneFormatted: "+91 80756 99838",
  openHours: "9:00 AM – 11:00 PM",
  whatsappNumber: "918075699838", // with country code
  deliveryAreas: ["Kottakkal", "Parappur", "Kurikkal Bazar", "Changuvetty", "Puthanangadi", "Edarikkode"],
  defaultDeliveryCharge: 40,
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    name: "Black Forest Cake",
    category: "cakes",
    priceRange: "₹600 - ₹1,100",
    priceMin: 600,
    priceMax: 1100,
    isPopular: true,
    description: "Layers of moist, fluffy chocolate sponge filled with fresh vanilla whipped cream and sweet dark cherries, decorated with fine chocolate curls and sour cherries.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop",
    rating: 4.9,
    availableWeights: ["0.5kg", "1.0kg", "1.5kg", "2.0kg"],
    flavors: ["Classic Dark Chocolate", "White Chocolate Forest", "Cherry infused Royale"],
  },
  {
    id: "m2",
    name: "KitKat Crunch Cake",
    category: "signature",
    priceRange: "₹850 - ₹1,400",
    priceMin: 850,
    priceMax: 1400,
    isPopular: true,
    description: "A dream come true for chocolate lovers. Rich double-chocolate sponge enveloped in thick chocolate ganache, walled with crisp KitKat bars and topped with colorful gems.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop",
    rating: 5.0,
    availableWeights: ["0.5kg", "1.0kg", "1.5kg", "2.0kg"],
    flavors: ["Fudge Truffle", "Hazelnut Caramel Cream"],
  },
  {
    id: "m3",
    name: "Red Velvet Velvetine Cake",
    category: "cakes",
    priceRange: "₹750 - ₹1,250",
    priceMin: 750,
    priceMax: 1250,
    isPopular: true,
    description: "Deep scarlet sponge layers frosted with our signature luxury cream cheese buttercream, finished with red velvet cake crumbs and fine chocolate curls.",
    image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=600&auto=format&fit=crop",
    rating: 4.9,
    availableWeights: ["0.5kg", "1.0kg", "1.5kg", "2.0kg"],
    flavors: ["Cream Cheese Classic", "Berry infusion Cream", "White Chocolate Truffle"],
  },
  {
    id: "m4",
    name: "Chocolate Nut Delight",
    category: "signature",
    priceRange: "₹800 - ₹1,350",
    priceMin: 800,
    priceMax: 1350,
    isPopular: true,
    description: "Super moist fudge cake layered with smooth milk chocolate cream, sprinkled generously with roasted cashew nuts and whole crushed hazelnuts for a delightful crunch.",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=600&auto=format&fit=crop",
    rating: 4.9,
    availableWeights: ["0.5kg", "1.0kg", "1.5kg", "2.0kg"],
    flavors: ["Roasted Cashew Fudge", "Almond Hazelnut Feast", "Nutella Swirl"],
  },
  {
    id: "m5",
    name: "Pineapple Delight Cake",
    category: "cakes",
    priceRange: "₹650 - ₹1,150",
    priceMin: 650,
    priceMax: 1150,
    isPopular: false,
    description: "A refreshing tropical classic. Light vanilla sponge filled with juicy pineapple chunks, fresh-whipped cream, and elegant white chocolate shards.",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop",
    rating: 4.8,
    availableWeights: ["0.5kg", "1.0kg", "1.5kg", "2.0kg"],
    flavors: ["Pineapple Cream", "Pineapple Coconut Bliss"],
  },
  {
    id: "m6",
    name: "Mini Celebration Bento Cakes",
    category: "mini-delights",
    priceRange: "₹500 - ₹900",
    priceMin: 500,
    priceMax: 900,
    isPopular: false,
    description: "Cute and trendy Korean bento cakes! Perfectly portioned double-layered mini cakes for special celebrations. Frosted with custom pastel buttercream styles.",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=600&auto=format&fit=crop",
    rating: 4.9,
    availableWeights: ["Box of 1", "Box of 2"],
    flavors: ["Pastel Vanilla Dream", "Retro Chocolate Fudge", "Strawberry Watercolor Blush"],
  },
  {
    id: "m7",
    name: "Golden Honey Almond Cake",
    category: "tea-cakes",
    priceRange: "₹600 - ₹950",
    priceMin: 600,
    priceMax: 950,
    isPopular: true,
    description: "An incredibly moist butter cake soaked in golden organic honey syrup and crowned with a thick crispy layer of toasted honeyed almonds.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop",
    rating: 5.0,
    availableWeights: ["0.5kg", "1.0kg"],
    flavors: ["Aromatique Almond", "Saffron Honey Infusion"],
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "r1",
    author: "Shibin K.",
    text: "Good service, affordable price and yummy cakes. The finishing of their custom birthday cakes is truly outstanding. Highly recommended in Kottakkal!",
    rating: 5,
    date: "2 weeks ago",
    location: "Kottakkal, Kerala"
  },
  {
    id: "r2",
    author: "Fathima Minha",
    text: "Golden Cakes and Bakes made a custom floral cake for my sister's wedding. It was exceptionally soft, moist, and full of taste! Everyone loved the hazelnut filling.",
    rating: 5,
    date: "1 month ago",
    location: "Parappur"
  },
  {
    id: "r3",
    author: "Vishnu Prasad",
    text: "Perfect sweetness and fluffy texture. Their home delivery to Parappur was right on time, and the cake box arrived immaculate. Truly quality baking.",
    rating: 5,
    date: "3 weeks ago",
    location: "Malappuram"
  },
  {
    id: "r4",
    author: "Nisha P.",
    text: "Amazing custom cakes and cupcakes. Last minute order handled so seamlessly! Friendly contact on phone and fast WhatsApp response.",
    rating: 5,
    date: "3 days ago",
    location: "Kurikkal Bazar"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop",
    title: "Vibrant Celebration Cake",
    category: "birthdays",
    description: "Double layered cake with pastel cream art and chocolate drip for birthdays."
  },
  {
    id: "g2",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800&auto=format&fit=crop",
    title: "Tiered Rose Wedding Masterpiece",
    category: "weddings",
    description: "Three-tiered smooth white chocolate frosting with fresh, organic roses and pearls."
  },
  {
    id: "g3",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop",
    title: "Vanilla Flower Garden Cake",
    category: "custom-cakes",
    description: "Elegant modern vanilla bean cake adorned with delicate buttercream spring flowers and sweet glazed strawberries."
  },
  {
    id: "g4",
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=800&auto=format&fit=crop",
    title: "Gourmet Party Cupcakes",
    category: "cupcakes",
    description: "Soft velvet sponges topped with generous swirls of strawberry and dark chocolate buttercream."
  },
  {
    id: "g5",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop",
    title: "Exotic Fruit Summer Cake",
    category: "fruit-cakes",
    description: "Zesty orange sponge baked with glazed berries, kiwi, sweet mango, and mint."
  },
  {
    id: "g6",
    image: "https://images.unsplash.com/photo-1516685018646-549198525c1b?q=80&w=800&auto=format&fit=crop",
    title: "Gold Foil Custom Engagement Cake",
    category: "weddings",
    description: "Deluxe engagement layout decorated with genuine edible gold sheets and geometric design."
  }
];
