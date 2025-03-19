
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../lib/types";
import { Percent, ChevronRight, Clock, ShoppingBag, Tag, Filter, ArrowRight } from "lucide-react";
import BannerManager from "../components/BannerManager";

export default function SalePage() {
  const [discountProducts, setDiscountProducts] = useState(PRODUCTS.filter(p => p.discount));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleProducts, setVisibleProducts] = useState(discountProducts);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [minDiscount, setMinDiscount] = useState<number | null>(null);
  const timerRef = useRef<any>(null);
  
  // Filter products when category or discount filter changes
  useEffect(() => {
    let filtered = discountProducts;
    
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category === selectedCategory.toLowerCase() || 
        product.tags.includes(selectedCategory.toLowerCase())
      );
    }
    
    if (minDiscount !== null) {
      filtered = filtered.filter(product => 
        (product.discount || 0) >= minDiscount
      );
    }
    
    setVisibleProducts(filtered);
  }, [selectedCategory, minDiscount, discountProducts]);
  
  // Group products by discount percentage for better display
  const discountGroups = [
    { label: "50% Off & More", min: 50, max: 100 },
    { label: "30-49% Off", min: 30, max: 49 },
    { label: "20-29% Off", min: 20, max: 29 },
    { label: "10-19% Off", min: 10, max: 19 },
    { label: "Under 10% Off", min: 1, max: 9 }
  ];

  // Calculate remaining time for sale countdown (5 days from now)
  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5);
    
    const difference = targetDate.getTime() - now.getTime();
    
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return { days, hours, minutes, seconds };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Get unique brands from discount products
  const brands = Array.from(new Set(discountProducts.map(product => product.brand)))
    .filter(Boolean)
    .sort() as string[];

  return (
    <div className="min-h-screen bg-enzobay-neutral-50">
      <Navbar />
      
      <main>
        {/* Add BannerManager at the top */}
        <BannerManager position="site_wide" variant="compact" />
        
        {/* Hero Banner */}
        <div className="relative overflow-hidden">
          {/* Background image with gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-500/80 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ 
              backgroundImage: `url(https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          
          <div className="relative z-20 py-16 md:py-24 px-4">
            <div className="container mx-auto text-center text-white">
              {/* Sale badge */}
              <div className="inline-block animate-bounce bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-white text-sm font-medium mb-4">
                Limited Time Offers
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">Sale Season</h1>
              <p className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto opacity-90 animate-fade-in">
                Incredible deals on thousands of products. Hurry, while stocks last!
              </p>
              
              {/* Quick links to discount groups */}
              <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in">
                {discountGroups.map((group, index) => {
                  const count = discountProducts.filter(p => 
                    (p.discount || 0) >= group.min && (p.discount || 0) <= group.max
                  ).length;
                  
                  if (count === 0) return null;
                  
                  return (
                    <a 
                      key={index}
                      href={`#group-${group.min}`}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-colors flex items-center"
                    >
                      <Tag className="h-3 w-3 mr-1.5" />
                      {group.label} 
                      <span className="ml-1.5 bg-white/20 px-1.5 py-0.5 text-xs rounded-full">
                        {count}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Breadcrumb */}
        <div className="bg-white">
          <div className="container mx-auto px-4">
            <nav className="flex py-3 text-sm" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-enzobay-neutral-500 hover:text-enzobay-orange">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-enzobay-neutral-400" />
                    <span className="ml-1 text-enzobay-neutral-800 font-medium">Sale</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        
        {/* Category Pills and Filters */}
        <div className="bg-white sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="py-4 overflow-x-auto flex gap-2 scrollbar-none snap-x">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors snap-start ${
                    !selectedCategory 
                      ? "bg-enzobay-orange text-white" 
                      : "bg-enzobay-neutral-100 text-enzobay-neutral-700 hover:bg-enzobay-neutral-200"
                  }`}
                >
                  All Categories
                </button>
                
                {CATEGORIES.filter(cat => 
                  discountProducts.some(p => 
                    p.category === cat.name.toLowerCase() || 
                    p.tags.includes(cat.name.toLowerCase())
                  )
                ).map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors snap-start ${
                      selectedCategory === category.name 
                        ? "bg-enzobay-orange text-white" 
                        : "bg-enzobay-neutral-100 text-enzobay-neutral-700 hover:bg-enzobay-neutral-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              {/* Filters button */}
              <button
                onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                className="ml-4 px-3 py-2 rounded-full bg-enzobay-neutral-100 text-enzobay-neutral-700 flex items-center text-sm font-medium hover:bg-enzobay-neutral-200 transition-colors"
              >
                <Filter className="h-4 w-4 mr-1" />
                Filters
              </button>
            </div>
            
            {/* Filters Panel */}
            {isFiltersVisible && (
              <div className="py-4 border-t border-enzobay-neutral-200 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Discount range filter */}
                  <div>
                    <h3 className="text-sm font-medium text-enzobay-brown mb-3">Discount Range</h3>
                    <div className="space-y-2">
                      {[null, 10, 20, 30, 50].map((discount, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="radio"
                            name="discount"
                            checked={minDiscount === discount}
                            onChange={() => setMinDiscount(discount)}
                            className="h-4 w-4 text-enzobay-orange focus:ring-enzobay-orange-light"
                          />
                          <span className="ml-2 text-sm text-enzobay-neutral-600">
                            {discount === null ? 'All Discounts' : `${discount}% or more`}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Brands filter */}
                  <div>
                    <h3 className="text-sm font-medium text-enzobay-brown mb-3">Brands</h3>
                    <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                      {brands.map((brand, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            id={`brand-${index}`}
                            type="checkbox"
                            className="h-4 w-4 text-enzobay-orange focus:ring-enzobay-orange-light"
                          />
                          <label htmlFor={`brand-${index}`} className="ml-2 text-sm text-enzobay-neutral-600">
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price range filter placeholder - not fully implemented */}
                  <div>
                    <h3 className="text-sm font-medium text-enzobay-brown mb-3">Price Range</h3>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Min"
                        className="border-enzobay-neutral-300 rounded-md shadow-sm focus:border-enzobay-orange focus:ring-enzobay-orange text-sm py-1.5 w-full"
                      />
                      <span className="text-enzobay-neutral-400">to</span>
                      <input
                        type="text"
                        placeholder="Max"
                        className="border-enzobay-neutral-300 rounded-md shadow-sm focus:border-enzobay-orange focus:ring-enzobay-orange text-sm py-1.5 w-full"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => {
                      setSelectedCategory(null);
                      setMinDiscount(null);
                    }}
                    className="text-sm text-enzobay-neutral-600 mr-2 px-3 py-1.5"
                  >
                    Reset Filters
                  </button>
                  <button 
                    onClick={() => setIsFiltersVisible(false)}
                    className="bg-enzobay-orange text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-enzobay-orange-dark transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Sale Countdown - Moved up for better visibility */}
        <section className="py-10 bg-gradient-to-r from-red-50 to-orange-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-3">Sale Ends In</h2>
            <div className="flex justify-center gap-4 mb-8">
              <div className="bg-white px-4 py-3 rounded-lg shadow-md text-center min-w-[80px] border border-red-100">
                <span className="block text-red-600 text-2xl md:text-3xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</span>
                <span className="text-xs text-enzobay-neutral-600 uppercase tracking-wider">Days</span>
              </div>
              <div className="bg-white px-4 py-3 rounded-lg shadow-md text-center min-w-[80px] border border-red-100">
                <span className="block text-red-600 text-2xl md:text-3xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-xs text-enzobay-neutral-600 uppercase tracking-wider">Hours</span>
              </div>
              <div className="bg-white px-4 py-3 rounded-lg shadow-md text-center min-w-[80px] border border-red-100">
                <span className="block text-red-600 text-2xl md:text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-xs text-enzobay-neutral-600 uppercase tracking-wider">Minutes</span>
              </div>
              <div className="bg-white px-4 py-3 rounded-lg shadow-md text-center min-w-[80px] border border-red-100">
                <span className="block text-red-600 text-2xl md:text-3xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-xs text-enzobay-neutral-600 uppercase tracking-wider">Seconds</span>
              </div>
            </div>
            <p className="text-enzobay-neutral-600 max-w-2xl mx-auto">
              Don't miss out on these amazing deals! Our sale is for a limited time only. 
              Shop now and save big on your favorite products.
            </p>
            <div className="mt-4">
              <Link
                to="/flash-sale"
                className="inline-flex items-center bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-md text-base font-medium hover:from-red-600 hover:to-red-700 transition-colors shadow-md"
              >
                Check Flash Sale <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Sale Banner */}
        <section className="bg-white py-10">
          <div className="container mx-auto px-4">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-enzobay-blue/80 to-enzobay-blue/40"></div>
                <img 
                  src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Featured sale items" 
                  className="w-full object-cover h-64 md:h-72"
                />
                <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-16">
                  <div className="max-w-lg">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 animate-fadeInUp opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                      Featured Brand Sale
                    </h2>
                    <p className="text-white/90 text-lg mb-4 animate-fadeInUp opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                      Exclusive deals on premium watches and accessories.
                    </p>
                    <Link 
                      to="/products?category=watches" 
                      className="inline-flex items-center bg-white text-enzobay-blue px-4 py-2 rounded-md font-medium hover:bg-enzobay-neutral-100 transition-colors animate-fadeInUp opacity-0" 
                      style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
                    >
                      Shop Watches <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Product Sections by Discount Groups */}
        {discountGroups.map((group, index) => {
          const groupProducts = visibleProducts.filter(p => 
            (p.discount || 0) >= group.min && (p.discount || 0) <= group.max
          );
          
          if (groupProducts.length === 0) return null;
          
          return (
            <section 
              key={index} 
              id={`group-${group.min}`} 
              className={`py-12 ${index % 2 === 0 ? 'bg-white' : 'bg-enzobay-neutral-50'}`}
            >
              <div className="container mx-auto px-4">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <Percent className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-enzobay-brown">
                    {group.label}
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {groupProducts.map((product, productIndex) => (
                    <div 
                      key={product.id} 
                      className="animate-fade-in"
                      style={{ animationDelay: `${productIndex * 0.05}s` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
                
                {groupProducts.length >= 10 && (
                  <div className="text-center mt-8">
                    <Link 
                      to={`/products?discount=${group.min}`}
                      className="inline-flex items-center text-enzobay-blue hover:text-enzobay-blue-dark"
                    >
                      View All {group.label} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                )}
              </div>
            </section>
          );
        })}
        
        {/* No Products Message */}
        {visibleProducts.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Percent className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-enzobay-brown mb-2">No sale items found</h3>
            <p className="text-enzobay-neutral-600 max-w-md mx-auto mb-6">
              There are currently no sale items in the selected category. Please check back later or browse other categories.
            </p>
            <button 
              onClick={() => {
                setSelectedCategory(null);
                setMinDiscount(null);
              }}
              className="btn-primary bg-enzobay-orange text-white px-4 py-2 rounded-md font-medium hover:bg-enzobay-orange-dark transition-colors"
            >
              View All Sale Items
            </button>
          </div>
        )}
        
        {/* Sale Benefits */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-enzobay-brown text-center mb-10">
              Why Shop Our Sale
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Tag className="h-7 w-7 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-enzobay-brown mb-2">Best Prices</h3>
                <p className="text-enzobay-neutral-600">
                  Get the best deals on premium products with discounts up to 50% off.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="h-7 w-7 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-enzobay-brown mb-2">Authentic Products</h3>
                <p className="text-enzobay-neutral-600">
                  All our sale items are 100% authentic with full warranty.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-7 w-7 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-enzobay-brown mb-2">Limited Time</h3>
                <p className="text-enzobay-neutral-600">
                  These deals won't last long! Shop now before your favorites sell out.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sale FAQs */}
        <section className="py-12 bg-enzobay-neutral-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-enzobay-brown text-center mb-8">
              Sale FAQs
            </h2>
            
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm divide-y divide-enzobay-neutral-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-2">
                  How long will the sale last?
                </h3>
                <p className="text-enzobay-neutral-600">
                  Our current sale will run for the next 5 days. However, popular items may sell out before the sale ends, so we recommend shopping early!
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-2">
                  Can I return sale items?
                </h3>
                <p className="text-enzobay-neutral-600">
                  Yes! All sale items come with our standard 30-day return policy. Please see our returns page for more details.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-2">
                  Do you offer discounts on shipping for sale items?
                </h3>
                <p className="text-enzobay-neutral-600">
                  Orders over KSh 5,000 qualify for free shipping, including sale items. This is a great way to maximize your savings!
                </p>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <Link 
                to="/faq" 
                className="text-enzobay-blue hover:text-enzobay-blue-dark inline-flex items-center"
              >
                View all FAQs <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
