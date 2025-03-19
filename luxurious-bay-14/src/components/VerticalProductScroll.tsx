
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronUp, ChevronDown, ArrowRight } from "lucide-react";
import { Product } from "../lib/types";
import { formatPrice } from "../lib/utils";

interface VerticalProductScrollProps {
  title: string;
  products: Product[];
  viewAllLink: string;
  className?: string;
}

export default function VerticalProductScroll({ 
  title, 
  products, 
  viewAllLink,
  className = "" 
}: VerticalProductScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showTopButton, setShowTopButton] = useState(false);
  const [showBottomButton, setShowBottomButton] = useState(true);
  
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    setShowTopButton(scrollTop > 0);
    setShowBottomButton(scrollTop + clientHeight < scrollHeight - 10);
  };
  
  const scrollUp = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ top: -200, behavior: 'smooth' });
  };
  
  const scrollDown = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ top: 200, behavior: 'smooth' });
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-enzobay-neutral-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-enzobay-brown">{title}</h2>
          <Link 
            to={viewAllLink} 
            className="text-enzobay-blue hover:text-enzobay-blue-dark flex items-center text-sm font-medium"
          >
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
      
      <div className="relative">
        {/* Scroll buttons */}
        {showTopButton && (
          <button 
            onClick={scrollUp}
            className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-white rounded-full shadow-md p-1 transform -translate-y-1/2 hover:bg-enzobay-neutral-100 transition-colors"
            aria-label="Scroll up"
          >
            <ChevronUp className="h-5 w-5 text-enzobay-neutral-600" />
          </button>
        )}
        
        {/* Products container */}
        <div 
          ref={scrollContainerRef}
          className="max-h-[550px] overflow-y-auto px-4 py-2 scrollbar-thin scrollbar-thumb-enzobay-neutral-200 scrollbar-track-transparent"
          onScroll={handleScroll}
        >
          <div className="space-y-4">
            {products.map((product) => (
              <Link 
                key={product.id}
                to={`/product/${product.id}`}
                className="block group"
              >
                <div className="flex items-center py-2 group-hover:bg-enzobay-neutral-50 p-2 rounded-lg transition-colors">
                  <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border border-enzobay-neutral-200">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="ml-3 flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-enzobay-brown line-clamp-2 group-hover:text-enzobay-blue transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="mt-1 flex items-baseline">
                      {product.discount ? (
                        <>
                          <span className="text-sm font-medium text-enzobay-brown">
                            {formatPrice(product.price * (1 - product.discount / 100))}
                          </span>
                          <span className="ml-1 text-xs text-enzobay-neutral-500 line-through">
                            {formatPrice(product.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-medium text-enzobay-brown">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {showBottomButton && (
          <button 
            onClick={scrollDown}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 bg-white rounded-full shadow-md p-1 transform translate-y-1/2 hover:bg-enzobay-neutral-100 transition-colors"
            aria-label="Scroll down"
          >
            <ChevronDown className="h-5 w-5 text-enzobay-neutral-600" />
          </button>
        )}
      </div>
    </div>
  );
}
