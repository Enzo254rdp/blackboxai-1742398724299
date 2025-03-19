
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetail from "../components/ProductDetail";
import { PRODUCTS, Product } from "../lib/types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRecentlyViewedStore } from "../lib/store";
import { useScrollToTop } from "../hooks/use-scroll";
import { useIsMobile } from "../hooks/use-mobile";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useRecentlyViewedStore();
  const isMobile = useIsMobile();
  
  // Scroll to top on page navigation
  useScrollToTop();

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      const foundProduct = PRODUCTS.find(p => p.id === id) || null;
      
      if (foundProduct) {
        setProduct(foundProduct);
        // Add to recently viewed
        addItem(foundProduct);
        // Set page title to product name
        document.title = `${foundProduct.name} | EnzoBay`;
      } else {
        setError("Product not found");
        document.title = "Product Not Found | EnzoBay";
      }
      
      setLoading(false);
    }, 300);
  }, [id, addItem]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-enzobay-neutral-200 border-t-enzobay-orange rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-enzobay-brown mb-4">Product Not Found</h2>
          <p className="text-xl text-enzobay-neutral-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <a href="/" className="btn-primary">Back to Home</a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={isMobile ? "product-page-mobile" : "product-page-desktop"}>
      <Navbar />
      <ProductDetail product={product} />
      <Footer />
    </div>
  );
}
