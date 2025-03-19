
import { useState } from "react";
import { ShoppingBag, Check, Loader2 } from "lucide-react";
import { useCartStore } from "../lib/store";
import { Product } from "../lib/types";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  size?: 'sm' | 'md' | 'lg' | 'full';
  variant?: 'primary' | 'outline' | 'minimal';
  showText?: boolean;
  className?: string;
}

export default function AddToCartButton({ 
  product, 
  quantity = 1, 
  size = 'md', 
  variant = 'primary',
  showText = true, 
  className = "" 
}: AddToCartButtonProps) {
  const { addItem } = useCartStore();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    full: 'h-5 w-5'
  };
  
  const buttonSizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
    full: 'text-sm py-3 w-full'
  };
  
  const variants = {
    primary: 'bg-enzobay-blue text-white hover:bg-enzobay-blue-dark',
    outline: 'border border-enzobay-neutral-300 text-enzobay-brown hover:bg-enzobay-neutral-100',
    minimal: 'text-enzobay-brown hover:bg-enzobay-neutral-100'
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (adding || added) return;
    
    setAdding(true);
    
    // Simulating a slight delay to show loading state
    setTimeout(() => {
      addItem(product, quantity);
      setAdding(false);
      setAdded(true);
      
      // Reset after showing success
      setTimeout(() => {
        setAdded(false);
      }, 2000);
    }, 600);
  };
  
  return (
    <button
      className={`rounded-md transition-colors flex items-center justify-center gap-2 ${buttonSizes[size]} ${variants[variant]} ${className}`}
      onClick={handleClick}
      disabled={adding || added}
      aria-label="Add to cart"
    >
      {adding ? (
        <>
          <Loader2 className={`${iconSizes[size]} animate-spin`} />
          {showText && <span>Adding...</span>}
        </>
      ) : added ? (
        <>
          <Check className={iconSizes[size]} />
          {showText && <span>Added</span>}
        </>
      ) : (
        <>
          <ShoppingBag className={iconSizes[size]} />
          {showText && <span>Add to Cart</span>}
        </>
      )}
    </button>
  );
}
