
import { useState } from "react";
import { Heart } from "lucide-react";
import { useWishlistStore } from "../lib/store";
import { Product } from "../lib/types";

interface WishlistButtonProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function WishlistButton({ product, size = 'md', showText = false, className = "" }: WishlistButtonProps) {
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  const [isHovered, setIsHovered] = useState(false);
  
  const inWishlist = isInWishlist(product.id);
  
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };
  
  const buttonSizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5'
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };
  
  return (
    <button
      className={`${buttonSizes[size]} ${
        inWishlist 
          ? 'bg-red-50 text-red-500 hover:bg-red-100' 
          : 'bg-white text-enzobay-neutral-700 hover:text-red-500'
      } rounded-full transition-colors ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <div className="flex items-center gap-1.5">
        <Heart 
          className={`${iconSizes[size]} ${inWishlist ? 'fill-red-500' : isHovered ? 'fill-red-100' : ''}`} 
        />
        {showText && (
          <span className={`text-sm font-medium ${inWishlist ? 'text-red-500' : ''}`}>
            {inWishlist ? 'Saved' : 'Wishlist'}
          </span>
        )}
      </div>
    </button>
  );
}
