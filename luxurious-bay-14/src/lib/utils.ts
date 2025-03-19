
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format price to currency
export function formatPrice(price: number, currency: string = "KES", locale: string = "en-KE") {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

// Calculate discounted price
export function getDiscountedPrice(price: number, discountPercentage?: number) {
  if (!discountPercentage) return price;
  return price * (1 - discountPercentage / 100);
}

// Format date
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

// Truncate text to a certain length
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Get similar products based on category and tags
export function getSimilarProducts(product: Product, allProducts: Product[], limit: number = 4): Product[] {
  if (!product) return [];
  
  const filtered = allProducts
    .filter(p => 
      p.id !== product.id && (
        p.category === product.category ||
        p.tags.some(tag => product.tags.includes(tag))
      )
    )
    .sort((a, b) => {
      // Count matching tags
      const aMatchingTags = a.tags.filter(tag => product.tags.includes(tag)).length;
      const bMatchingTags = b.tags.filter(tag => product.tags.includes(tag)).length;
      
      // Sort by matching tags, then by rating
      if (aMatchingTags !== bMatchingTags) {
        return bMatchingTags - aMatchingTags;
      }
      
      return b.rating - a.rating;
    })
    .slice(0, limit);
    
  return filtered;
}

// Validate email
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
