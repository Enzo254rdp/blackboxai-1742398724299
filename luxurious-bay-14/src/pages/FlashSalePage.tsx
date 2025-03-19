
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../lib/types";
import { Zap, Timer, Search, X } from "lucide-react";

export default function FlashSalePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(45);
  const [seconds, setSeconds] = useState(30);
  
  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            clearInterval(timer);
          }
        }
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [hours, minutes, seconds]);
  
  // Get products with discounts for flash sale
  const flashSaleProducts = PRODUCTS.filter(product => product.discount && product.discount >= 15);
  
  // Filter products by search and category
  const filteredProducts = flashSaleProducts.filter(product => {
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = !selectedCategory || 
      product.category === selectedCategory.toLowerCase() || 
      product.tags.includes(selectedCategory.toLowerCase());
      
    return matchesSearch && matchesCategory;
  });
  
  // Get categories that have flash sale products
  const saleCategories = CATEGORIES.filter(category => 
    flashSaleProducts.some(product => 
      product.category === category.id.toLowerCase() || 
      product.category === category.name.toLowerCase() ||
      product.tags.includes(category.name.toLowerCase())
    )
  );
  
  // Group products by discount percentage for better display
  const discountGroups = [
    { label: "50% Off & More", min: 50, max: 100 },
    { label: "30-49% Off", min: 30, max: 49 },
    { label: "15-29% Off", min: 15, max: 29 }
  ];

  return (
    <div className="min-h-screen bg-enzobay-neutral-50">
      <Navbar />
      
      <main>
        {/* Hero Banner */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-90"></div>
          <div className="relative py-16 px-4 text-center text-white container mx-auto">
            <span className="inline-block animate-pulse bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-white text-sm font-medium mb-4">
              Limited Time Offers
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Flash Sale</h1>
            <p className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto">
              Incredible discounts on premium products. Hurry, while stocks last!
            </p>
            
            {/* Timer */}
            <div className="flex justify-center gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg text-center min-w-[100px]">
                <span className="block text-white text-3xl md:text-4xl font-bold">{hours.toString().padStart(2, '0')}</span>
                <span className="text-xs text-white/80 uppercase tracking-wider">Hours</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg text-center min-w-[100px]">
                <span className="block text-white text-3xl md:text-4xl font-bold">{minutes.toString().padStart(2, '0')}</span>
                <span className="text-xs text-white/80 uppercase tracking-wider">Minutes</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg text-center min-w-[100px]">
                <span className="block text-white text-3xl md:text-4xl font-bold">{seconds.toString().padStart(2, '0')}</span>
                <span className="text-xs text-white/80 uppercase tracking-wider">Seconds</span>
              </div>
            </div>
            
            {/* Search bar */}
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-red-300" />
              </div>
              <input
                type="text"
                placeholder="Search flash sale products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/10 backdrop-blur-sm w-full py-3 pl-10 pr-10 rounded-lg border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Category Pills */}
        <div className="bg-white sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="py-4 overflow-x-auto flex gap-2 scrollbar-none snap-x">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors snap-start flex items-center gap-1 ${
                  !selectedCategory 
                    ? "bg-red-500 text-white" 
                    : "bg-enzobay-neutral-100 text-enzobay-neutral-700 hover:bg-enzobay-neutral-200"
                }`}
              >
                <Zap className={`h-4 w-4 ${!selectedCategory ? "text-white" : "text-red-500"}`} />
                All Flash Deals
              </button>
              
              {saleCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors snap-start ${
                    selectedCategory === category.name 
                      ? "bg-red-500 text-white" 
                      : "bg-enzobay-neutral-100 text-enzobay-neutral-700 hover:bg-enzobay-neutral-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Top Flash Deals */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <Zap className="h-5 w-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-enzobay-brown">
                Top Flash Deals
              </h2>
            </div>
            
            {/* Horizontal Scrolling Products */}
            <div className="overflow-x-auto pb-6 -mx-4 px-4">
              <div className="flex gap-4 min-w-max">
                {filteredProducts
                  .sort((a, b) => (b.discount || 0) - (a.discount || 0))
                  .slice(0, 8)
                  .map(product => (
                    <div key={product.id} className="w-[220px] flex-shrink-0">
                      <ProductCard product={product} />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </section>
        
        {/* Product Sections by Discount Groups */}
        {discountGroups.map((group, index) => {
          const groupProducts = filteredProducts.filter(p => 
            (p.discount || 0) >= group.min && (p.discount || 0) <= group.max
          );
          
          if (groupProducts.length === 0) return null;
          
          return (
            <section 
              key={index} 
              className={`py-10 ${index % 2 === 0 ? 'bg-enzobay-neutral-50' : 'bg-white'}`}
            >
              <div className="container mx-auto px-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <Timer className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-enzobay-brown">
                    {group.label}
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {groupProducts.map(product => (
                    <div key={product.id} className="animate-fade-in">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
        
        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-enzobay-brown mb-2">No flash sale items found</h3>
            <p className="text-enzobay-neutral-600 max-w-md mx-auto mb-6">
              We couldn't find any flash sale items matching your search. Try different keywords or browse all flash deals.
            </p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory(null);
              }}
              className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition-colors duration-300"
            >
              View All Flash Deals
            </button>
          </div>
        )}
        
        {/* Coming Soon Flash Deals */}
        <section className="py-10 bg-red-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-3 text-center">Coming Soon</h2>
            <p className="text-center text-enzobay-neutral-600 mb-8 max-w-3xl mx-auto">
              Next flash sale starts tomorrow at 9 AM. Set a reminder to get the best deals before they're gone!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-lg overflow-hidden shadow-sm border border-red-100 p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-red-100 text-red-500 px-3 py-1 rounded-md text-sm font-medium">
                      Tomorrow's Flash Deal
                    </div>
                    <div className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                      Up to 60% Off
                    </div>
                  </div>
                  
                  <div className="aspect-video bg-red-100 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-red-500 font-semibold">Preview coming soon</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-4 bg-red-100 rounded-full w-3/4"></div>
                    <div className="h-4 bg-red-100 rounded-full w-1/2"></div>
                    <div className="flex gap-2 mt-4">
                      <div className="h-6 bg-red-100 rounded-full w-20"></div>
                      <div className="h-6 bg-red-100 rounded-full w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button className="bg-red-500 text-white py-3 px-8 rounded-md hover:bg-red-600 transition-colors duration-300 font-medium flex items-center gap-2 mx-auto">
                <Timer className="h-5 w-5" />
                Set Reminder
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
