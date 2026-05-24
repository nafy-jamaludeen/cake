export interface MenuItem {
  id: string;
  name: string;
  category: 'cakes' | 'mini-delights' | 'tea-cakes' | 'signature';
  priceRange: string;
  priceMin: number; // For interactive checkout calculating
  priceMax: number;
  isPopular: boolean;
  description: string;
  image: string;
  rating: number;
  availableWeights: string[]; // e.g., ["0.5kg", "1kg", "1.5kg", "2kg"]
  flavors: string[]; // e.g., ["Chocolate", "Vanilla Cream", "Butterscotch", "Strawberry"]
}

export interface Testimonial {
  id: string;
  author: string;
  text: string;
  rating: number;
  date: string;
  location: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: 'birthdays' | 'weddings' | 'cupcakes' | 'custom-cakes' | 'fruit-cakes';
  description: string;
}

export interface CartItem {
  id: string; // unique combination of item.id + weight + flavor
  item: MenuItem;
  quantity: number;
  selectedWeight: string;
  selectedFlavor: string;
  customWriting?: string;
  calculatedPrice: number; // price based on selection
}

export interface ContactForm {
  name: string;
  phone: string;
  message: string;
}
