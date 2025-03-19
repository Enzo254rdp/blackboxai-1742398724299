
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './types';

// Define cart item interface
export interface CartItem extends Product {
  quantity: number;
}

// Define the cart store interface
interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

// Create the cart store
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        
        if (existingItem) {
          return {
            items: state.items.map(item => 
              item.id === product.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          };
        }
        
        return {
          items: [...state.items, { ...product, quantity }]
        };
      }),
      
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),
      
      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map(item => 
          item.id === productId 
            ? { ...item, quantity }
            : item
        )
      })),
      
      clearCart: () => set({ items: [] }),
      
      getCartTotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.price;
          const discountedPrice = item.discount 
            ? price * (1 - item.discount / 100) 
            : price;
          
          return total + (discountedPrice * item.quantity);
        }, 0);
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'enzobay-cart', // unique name for localStorage
    }
  )
);

// Define the wishlist store interface
interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

// Create the wishlist store
export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => set((state) => {
        if (state.items.some(item => item.id === product.id)) {
          return state; // Item already exists
        }
        
        return {
          items: [...state.items, product]
        };
      }),
      
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),
      
      clearWishlist: () => set({ items: [] }),
      
      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId);
      }
    }),
    {
      name: 'enzobay-wishlist', // unique name for localStorage
    }
  )
);

// Recently viewed products store
interface RecentlyViewedStore {
  items: Product[];
  addItem: (product: Product) => void;
  clearItems: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      items: [],
      
      addItem: (product) => set((state) => {
        // Remove product if it already exists (to move it to the front)
        const filteredItems = state.items.filter(item => item.id !== product.id);
        
        // Add product to front of array and limit to 8 items
        return {
          items: [product, ...filteredItems].slice(0, 8)
        };
      }),
      
      clearItems: () => set({ items: [] })
    }),
    {
      name: 'enzobay-recently-viewed',
    }
  )
);
