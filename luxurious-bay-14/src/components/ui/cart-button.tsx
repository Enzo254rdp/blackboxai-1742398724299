
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../../lib/store";

interface CartButtonProps {
  itemCount?: number;
  onClick?: () => void;
}

export function CartButton({ onClick }: CartButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { getItemCount } = useCartStore();
  const itemCount = getItemCount();

  // Trigger animation when item count changes
  useEffect(() => {
    if (itemCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  return (
    <button
      className="relative p-2 rounded-full transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <ShoppingCart
        className={`h-6 w-6 transition-colors duration-300 ${
          isHovered ? "text-enzobay-orange" : "text-enzobay-brown"
        } ${isAnimating ? "animate-wiggle" : ""}`}
      />
      {itemCount > 0 && (
        <span 
          className={`absolute -top-1 -right-1 bg-enzobay-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ${
            isAnimating ? "animate-ping-once" : ""
          }`}
        >
          {itemCount}
        </span>
      )}
    </button>
  );
}
