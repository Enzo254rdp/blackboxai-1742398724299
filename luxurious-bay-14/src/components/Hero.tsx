
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Star, Clock, ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const heroSlides = [
    {
      title: "Premium Quality",
      subtitle: "Luxury Products",
      description: "Discover our exclusive collection of luxury items at unbeatable prices. Refined elegance for the discerning customer.",
      cta: "Shop Now",
      badge: "Limited Time Sale • Up to 50% Off",
      imageSrc: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      imageAlt: "Luxury shopping experience with high-end products",
      overlayColor: "from-black/70 to-transparent"
    },
    {
      title: "New Arrivals",
      subtitle: "Summer Collection",
      description: "Explore our latest arrivals for the season. Fresh styles to keep you ahead of the trends.",
      cta: "Discover More",
      badge: "Just Arrived",
      imageSrc: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      imageAlt: "Summer collection fashion accessories",
      overlayColor: "from-black/70 via-black/50 to-transparent"
    },
    {
      title: "Exclusive Deals",
      subtitle: "For Members Only",
      description: "Join our membership program and get access to exclusive products and special discounts.",
      cta: "Join Now",
      badge: "Members Save 15% Extra",
      imageSrc: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      imageAlt: "VIP membership exclusive shopping",
      overlayColor: "from-enzobay-brown/80 to-transparent"
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        goToNextSlide();
      }
    }, 5000);
    
    return () => clearInterval(timer);
  }, [currentSlide, isTransitioning]);

  const goToNextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToPrevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const slide = heroSlides[currentSlide];

  return (
    <>
      {/* Advanced Hero Section with Better Text Visibility */}
      <section className="relative bg-white overflow-hidden">
        {/* Dark Overlay for Text Readability with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10"></div>
        
        {/* Additional Gradient Overlay for Better Visibility */}
        <div className={`absolute inset-0 bg-gradient-to-t ${slide.overlayColor} z-10 opacity-70`}></div>
        
        {/* Slide Background with Animation */}
        <div 
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ 
            backgroundImage: `url(${slide.imageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: isTransitioning ? 0.5 : 1
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="pt-16 pb-24 md:pt-20 md:pb-32 lg:pt-24 lg:pb-40 min-h-[500px] md:min-h-[600px] flex flex-col justify-center">
            <div className="max-w-xl bg-black/30 backdrop-blur-sm p-6 md:p-8 rounded-lg">
              <span 
                className="inline-block bg-enzobay-orange text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 animate-fadeInUp opacity-0"
                style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
              >
                {slide.badge}
              </span>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white">
                <span 
                  className="block animate-fadeInUp opacity-0 drop-shadow-lg" 
                  style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
                >
                  {slide.title}
                </span>
                <span 
                  className="block text-enzobay-orange animate-fadeInUp opacity-0 drop-shadow-lg" 
                  style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
                >
                  {slide.subtitle}
                </span>
              </h1>
              
              <p 
                className="mt-4 text-base md:text-lg text-white max-w-md animate-fadeInUp opacity-0 drop-shadow" 
                style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
              >
                {slide.description}
              </p>
              
              <div 
                className="mt-8 flex flex-wrap gap-4 animate-fadeInUp opacity-0" 
                style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
              >
                <Link
                  to="/flash-sale"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-enzobay-orange hover:bg-enzobay-orange-dark transition-colors shadow-md"
                >
                  {slide.cta}
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white/20 transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Slide Navigation Controls */}
        <div className="absolute z-30 bottom-4 left-0 right-0 flex justify-center">
          <div className="flex space-x-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentSlide 
                    ? "w-8 bg-enzobay-orange" 
                    : "bg-white/60 hover:bg-white"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Arrow Navigation */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 backdrop-blur-sm text-enzobay-neutral-800 p-2 rounded-full hover:bg-white/50 transition-colors hidden md:flex"
          onClick={goToPrevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 backdrop-blur-sm text-enzobay-neutral-800 p-2 rounded-full hover:bg-white/50 transition-colors hidden md:flex"
          onClick={goToNextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </section>
      
      {/* Promotional Banner */}
      <section className="bg-enzobay-blue text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="hidden sm:flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              <span className="font-medium">Free shipping on orders over KSh 5,000</span>
            </div>
            <div className="mx-6 hidden lg:block">•</div>
            <div className="hidden lg:flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-medium">30-day money-back guarantee</span>
            </div>
            <div className="mx-6 hidden xl:block">•</div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              <span className="font-medium">Sign up and get 10% off your first order</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Categories Showcase */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-enzobay-brown">Shop by Category</h2>
            <p className="mt-4 text-lg text-enzobay-neutral-600">Explore our wide range of premium products</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {/* Category 1 */}
            <Link to="/products?category=watches" className="group">
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1633934542430-0905ccb5f050?q=80&w=1887&auto=format&fit=crop"
                  alt="Watches"
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Watches</h3>
                  <span className="inline-flex items-center text-sm text-white/90 mt-1 group-hover:translate-x-1 transition-transform">
                    Shop Now <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
            
            {/* Category 2 */}
            <Link to="/products?category=bags" className="group">
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2036&auto=format&fit=crop"
                  alt="Bags"
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Bags</h3>
                  <span className="inline-flex items-center text-sm text-white/90 mt-1 group-hover:translate-x-1 transition-transform">
                    Shop Now <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
            
            {/* Category 3 */}
            <Link to="/products?category=clothing" className="group">
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1908&auto=format&fit=crop"
                  alt="Clothing"
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Clothing</h3>
                  <span className="inline-flex items-center text-sm text-white/90 mt-1 group-hover:translate-x-1 transition-transform">
                    Shop Now <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
            
            {/* Category 4 */}
            <Link to="/products?category=electronics" className="group">
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=1964&auto=format&fit=crop"
                  alt="Electronics"
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Electronics</h3>
                  <span className="inline-flex items-center text-sm text-white/90 mt-1 group-hover:translate-x-1 transition-transform">
                    Shop Now <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="text-center mt-10">
            <Link
              to="/categories"
              className="inline-flex items-center text-enzobay-blue hover:text-enzobay-blue-dark font-medium"
            >
              View All Categories <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="bg-enzobay-neutral-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Benefit 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-enzobay-blue-50 mb-4">
                <ShoppingBag className="h-8 w-8 text-enzobay-blue" />
              </div>
              <h3 className="text-lg font-semibold text-enzobay-brown">Free Shipping</h3>
              <p className="mt-2 text-sm text-enzobay-neutral-600">On all orders over KSh 5,000</p>
            </div>
            
            {/* Benefit 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-enzobay-blue-50 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-enzobay-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-enzobay-brown">Quality Guarantee</h3>
              <p className="mt-2 text-sm text-enzobay-neutral-600">100% authentic products</p>
            </div>
            
            {/* Benefit 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-enzobay-blue-50 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-enzobay-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-enzobay-brown">Secure Payments</h3>
              <p className="mt-2 text-sm text-enzobay-neutral-600">M-Pesa and other methods</p>
            </div>
            
            {/* Benefit 4 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-enzobay-blue-50 mb-4">
                <Clock className="h-8 w-8 text-enzobay-blue" />
              </div>
              <h3 className="text-lg font-semibold text-enzobay-brown">24/7 Support</h3>
              <p className="mt-2 text-sm text-enzobay-neutral-600">Call us at 0792012904</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sale Banner */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80" 
                alt="Sale background" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-enzobay-blue/80 to-enzobay-blue/40"></div>
            </div>
            
            <div className="relative py-16 px-6 sm:py-24 sm:px-12 lg:px-16">
              <div className="max-w-lg">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl animate-fadeInUp opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                  Summer Sale
                </h2>
                <p className="mt-4 text-xl text-white animate-fadeInUp opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                  Get up to 50% off on selected items. Limited time offer.
                </p>
                <Link
                  to="/flash-sale"
                  className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-enzobay-blue bg-white hover:bg-enzobay-neutral-100 animate-fadeInUp opacity-0"
                  style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
                >
                  Shop the Sale <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
