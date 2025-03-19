
import { useRecentlyViewedStore } from "../lib/store";
import ProductCard from "./ProductCard";
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecentlyViewed() {
  const { items } = useRecentlyViewedStore();
  
  // Don't show if we have less than 2 recently viewed products
  if (items.length < 2) {
    return null;
  }
  
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Clock className="text-enzobay-blue h-5 w-5" />
            <h2 className="text-xl md:text-2xl font-bold text-enzobay-brown">
              Recently Viewed
            </h2>
          </div>
          <Link 
            to="/products" 
            className="text-enzobay-blue hover:underline flex items-center text-sm font-medium"
          >
            Browse All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4">
            {items.map((product, index) => (
              <div key={product.id} className="min-w-[200px] md:min-w-[220px] max-w-[280px] flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
