
import { PRODUCTS } from "../lib/types";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function FeaturedProducts() {
  // Get featured products
  const featuredProducts = PRODUCTS.filter(product => product.isFeatured).slice(0, 8);
  
  return (
    <section className="py-10 bg-enzobay-neutral-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-enzobay-brown flex items-center">
            <span className="mr-2 inline-block w-3 h-6 bg-enzobay-blue"></span>
            Featured Products
          </h2>
          <Link 
            to="/products?featured=true" 
            className="text-enzobay-blue hover:underline flex items-center text-sm font-medium"
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
