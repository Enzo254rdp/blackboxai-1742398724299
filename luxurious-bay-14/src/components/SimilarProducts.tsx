
import { Product } from "../lib/types";
import { getSimilarProducts } from "../lib/utils";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "../lib/types";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SimilarProductsProps {
  product: Product;
  limit?: number;
}

export default function SimilarProducts({ product, limit = 4 }: SimilarProductsProps) {
  const similarProducts = getSimilarProducts(product, PRODUCTS, limit);
  
  if (similarProducts.length === 0) {
    return null;
  }
  
  return (
    <section className="py-8 bg-enzobay-neutral-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-enzobay-brown flex items-center">
            <span className="mr-2 inline-block w-3 h-6 bg-enzobay-blue"></span>
            Similar Products
          </h2>
          <Link 
            to={`/products?category=${product.category}`} 
            className="text-enzobay-blue hover:underline flex items-center text-sm font-medium"
          >
            View More <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {similarProducts.map((product, index) => (
            <div key={product.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
