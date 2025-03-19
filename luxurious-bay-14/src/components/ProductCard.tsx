
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, Eye, ShoppingBag } from "lucide-react";
import { formatPrice } from "../lib/utils";
import { Product } from "../lib/types";
import { useCartStore, useWishlistStore } from "../lib/store";

interface ProductCardProps {
  product: Product;
  size?: "sm" | "md" | "lg";
  layout?: "grid" | "list";
}

export default function ProductCard({ 
  product, 
  size = "md",
  layout = "grid" 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  
  const productInWishlist = isInWishlist(product.id);
  
  // Calculate discounted price if applicable
  const originalPrice = product.price;
  const discountedPrice = product.discount 
    ? originalPrice * (1 - product.discount / 100) 
    : originalPrice;
  
  const quickAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (productInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const sizeClasses = {
    sm: {
      card: "max-w-[180px]",
      imageContainer: "h-[160px]",
      title: "text-xs line-clamp-1",
      price: "text-sm",
    },
    md: {
      card: "max-w-[280px]",
      imageContainer: "h-[220px]",
      title: "text-sm line-clamp-2",
      price: "text-base",
    },
    lg: {
      card: "max-w-[340px]",
      imageContainer: "h-[280px]",
      title: "text-base line-clamp-2",
      price: "text-lg",
    },
  };
  
  if (layout === "list") {
    return (
      <Link 
        to={`/product/${product.id}`}
        className="group bg-white border border-enzobay-neutral-200 hover:border-enzobay-neutral-300 rounded-lg overflow-hidden flex transition-all duration-300 hover:shadow-md relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-[160px] w-[160px] flex-shrink-0">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          
          {product.discount && (
            <div className="absolute top-2 left-2 bg-enzobay-orange text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}
          
          {product.isNew && (
            <div className="absolute top-2 right-2 bg-enzobay-blue text-white text-xs font-bold px-2 py-1 rounded">
              NEW
            </div>
          )}
        </div>
        
        <div className="flex-1 p-4 flex flex-col">
          {/* Product title and rating */}
          <div className="mb-1">
            <h3 className="text-sm font-medium text-enzobay-brown line-clamp-2">
              {product.name}
            </h3>
            
            <div className="flex items-center mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating)
                        ? "text-enzobay-orange fill-enzobay-orange"
                        : "text-enzobay-neutral-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-1 text-xs text-enzobay-neutral-500">
                ({product.reviews})
              </span>
            </div>
          </div>
          
          {/* Product price */}
          <div className="flex items-baseline mt-1">
            <p className="text-base font-medium text-enzobay-brown">
              {formatPrice(discountedPrice)}
            </p>
            {product.discount && (
              <p className="ml-2 text-sm text-enzobay-neutral-500 line-through">
                {formatPrice(originalPrice)}
              </p>
            )}
          </div>
          
          <p className="mt-2 text-xs text-enzobay-neutral-600 line-clamp-2">
            {product.description}
          </p>
          
          {/* Action buttons - only shown on hover on desktop */}
          <div className="flex items-center justify-between mt-auto pt-4">
            <div className="flex items-center">
              {product.brand && (
                <span className="text-xs text-enzobay-neutral-600">
                  {product.brand}
                </span>
              )}
            </div>
            
            <div className={`flex space-x-1 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 md:opacity-0'}`}>
              <button
                onClick={toggleWishlist}
                className={`p-1.5 rounded-full ${
                  productInWishlist 
                    ? 'bg-red-50 text-red-500' 
                    : 'bg-enzobay-neutral-100 text-enzobay-neutral-700 hover:text-enzobay-blue'
                }`}
                aria-label={productInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`h-4 w-4 ${productInWishlist ? 'fill-red-500' : ''}`} />
              </button>
              
              <button
                onClick={quickAddToCart}
                className="p-1.5 rounded-full bg-enzobay-neutral-100 text-enzobay-neutral-700 hover:text-enzobay-blue"
                aria-label="Quick add to cart"
              >
                <ShoppingBag className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  return (
    <Link 
      to={`/product/${product.id}`}
      className={`group bg-white border border-enzobay-neutral-200 hover:border-enzobay-neutral-300 rounded-lg overflow-hidden block transition-all duration-300 hover:shadow-md relative ${sizeClasses[size].card}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative ${sizeClasses[size].imageContainer}`}>
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        
        {product.discount && (
          <div className="absolute top-2 left-2 bg-enzobay-orange text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
        
        {product.isNew && (
          <div className="absolute top-2 right-2 bg-enzobay-blue text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </div>
        )}
        
        {/* Quick action buttons - only shown on hover */}
        <div 
          className={`absolute inset-0 bg-black/5 flex items-center justify-center gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={toggleWishlist}
            className={`p-2 rounded-full backdrop-blur-sm ${
              productInWishlist 
                ? 'bg-red-50/90 text-red-500' 
                : 'bg-white/80 text-enzobay-neutral-700 hover:text-enzobay-blue'
            }`}
            aria-label={productInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`h-5 w-5 ${productInWishlist ? 'fill-red-500' : ''}`} />
          </button>
          
          <button
            onClick={quickAddToCart}
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-enzobay-neutral-700 hover:text-enzobay-blue"
            aria-label="Quick add to cart"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
          
          <Link
            to={`/product/${product.id}`}
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-enzobay-neutral-700 hover:text-enzobay-blue"
            onClick={(e) => e.stopPropagation()}
            aria-label="Quick view"
          >
            <Eye className="h-5 w-5" />
          </Link>
        </div>
      </div>
      
      <div className="p-3">
        {/* Product title and rating */}
        <div className="mb-1">
          <h3 className={`font-medium text-enzobay-brown ${sizeClasses[size].title}`}>
            {product.name}
          </h3>
          
          <div className="flex items-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? "text-enzobay-orange fill-enzobay-orange"
                      : "text-enzobay-neutral-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 text-xs text-enzobay-neutral-500">
              ({product.reviews})
            </span>
          </div>
        </div>
        
        {/* Product price */}
        <div className="flex items-baseline mt-1">
          <p className={`font-medium text-enzobay-brown ${sizeClasses[size].price}`}>
            {formatPrice(discountedPrice)}
          </p>
          {product.discount && (
            <p className="ml-2 text-sm text-enzobay-neutral-500 line-through">
              {formatPrice(originalPrice)}
            </p>
          )}
        </div>
        
        {/* Brand or category tag */}
        {product.brand && (
          <div className="mt-2">
            <span className="inline-block text-xs bg-enzobay-neutral-100 text-enzobay-neutral-700 px-2 py-0.5 rounded">
              {product.brand}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
