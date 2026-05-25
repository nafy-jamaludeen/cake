import { useMemo } from 'react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';
import { CustomProduct } from './AdminPanel';

export function useVisibleProducts(): MenuItem[] {
  return useMemo(() => {
    // Get hidden original product IDs
    const stored = localStorage.getItem('goldenCakesProductVisibility');
    const visibility: { [id: string]: boolean } = stored ? JSON.parse(stored) : {};

    // Get custom products
    const storedCustom = localStorage.getItem('goldenCakesCustomProducts');
    const customProducts: CustomProduct[] = storedCustom ? JSON.parse(storedCustom) : [];

    // Filter original products (hide if visibility is false)
    const visibleOriginals = MENU_ITEMS.filter((item) => visibility[item.id] !== false);

    // Convert active custom products to MenuItem shape
    const visibleCustom: MenuItem[] = customProducts
      .filter((p) => p.active)
      .map((p) => ({
        id: p.id,
        name: p.name,
        category: 'custom' as any,
        priceRange: p.price,
        priceMin: parseInt(p.price.replace(/[^0-9]/g, '')) || 0,
        priceMax: parseInt(p.price.replace(/[^0-9]/g, '')) || 0,
        isPopular: false,
        description: p.description,
        image: p.imageUrl,
        rating: 5.0,
        availableWeights: ['0.5kg', '1.0kg'],
        flavors: [],
      }));

    return [...visibleOriginals, ...visibleCustom];
  }, []);
}
