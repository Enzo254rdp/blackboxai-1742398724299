
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import VerticalProductScroll from "../components/VerticalProductScroll";
import Footer from "../components/Footer";
import { useToast } from "@/hooks/use-toast";
import { PRODUCTS, CATEGORIES } from "../lib/types";
import { ArrowRight, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import BannerManager from "../components/BannerManager";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Welcome toast notification
    const hasShownWelcome = sessionStorage.getItem("hasShownWelcome");
    
    if (!hasShownWelcome) {
      setTimeout(() => {
        toast({
          title: "Welcome to EnzoBay",
          description: "Experience luxury shopping at its finest",
          variant: "default",
        });
        sessionStorage.setItem("hasShownWelcome", "true");
      }, 1500);
    }
  }, [toast]);

  // Group products by category for Jumia-style sections
  const groupedProducts = CATEGORIES.map(category => ({
    category,
    products: PRODUCTS.filter(product => product.category === category.id.toLowerCase() || product.category === category.name.toLowerCase())
  })).filter(group => group.products.length > 0);

  return (
    <div className="min-h-screen bg-enzobay-neutral-50">
      <Navbar />
      
      {/* Site-wide Banner */}
      <BannerManager position="site_wide" variant="compact" />
      
      <main>
        {/* Top Banner */}
        <BannerManager position="home_top" variant="full" />
        
        {/* Featured Products Section - Displaying products immediately on load */}
        <section className="py-6 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-enzobay-brown flex items-center">
                <span className="mr-2 inline-block w-3 h-6 bg-enzobay-orange"></span>
                Top Picks For You
              </h2>
              <Link 
                to="/products?sort=popular" 
                className="text-enzobay-orange hover:underline flex items-center text-sm font-medium"
              >
                See All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {PRODUCTS.slice(0, 6).map((product, index) => (
                <div key={product.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <ProductCard product={product} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <Hero />
        
        {/* Middle Banner */}
        <BannerManager position="home_middle" variant="full" />
        
        {/* Main Content with Vertical Scroll */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Vertical Scrolling Product Lists */}
              <div className="hidden lg:block">
                <VerticalProductScroll 
                  title="Trending Now"
                  products={PRODUCTS.sort((a, b) => b.rating - a.rating).slice(0, 10)}
                  viewAllLink="/products?sort=trending"
                />
              </div>
              
              <div className="col-span-1 lg:col-span-3">
                {/* Top Deals - Jumia Style */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl md:text-2xl font-bold text-enzobay-brown flex items-center">
                      <span className="mr-2 inline-block w-3 h-6 bg-enzobay-orange"></span>
                      Top Deals
                    </h2>
                    <Link 
                      to="/products?sort=deals" 
                      className="text-enzobay-orange hover:underline flex items-center text-sm font-medium"
                    >
                      See All <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {PRODUCTS.filter(p => p.discount).slice(0, 8).map((product, index) => (
                      <div key={product.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                        <ProductCard product={product} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Flash Sale Banner */}
                <div className="mb-8">
                  <div className="p-4 rounded-lg bg-white shadow-sm animate-fadeInUp bg-gradient-to-r from-enzobay-orange/10 to-enzobay-red/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 flex items-center justify-center bg-enzobay-orange rounded-full text-white text-xl font-bold mr-4">
                          %
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-enzobay-brown">Flash Sale</h3>
                          <p className="text-sm text-enzobay-neutral-600">Limited time offers on premium products</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="bg-enzobay-neutral-100 px-2 py-1 rounded-md text-center">
                          <span className="block text-enzobay-orange text-base font-bold">12</span>
                          <span className="text-xs text-enzobay-neutral-600">Hours</span>
                        </div>
                        <div className="bg-enzobay-neutral-100 px-2 py-1 rounded-md text-center">
                          <span className="block text-enzobay-orange text-base font-bold">45</span>
                          <span className="text-xs text-enzobay-neutral-600">Min</span>
                        </div>
                        <div className="bg-enzobay-neutral-100 px-2 py-1 rounded-md text-center">
                          <span className="block text-enzobay-orange text-base font-bold">30</span>
                          <span className="text-xs text-enzobay-neutral-600">Sec</span>
                        </div>
                      </div>
                      <Link 
                        to="/flash-sale" 
                        className="bg-enzobay-orange text-white py-1.5 px-4 rounded-md hover:bg-enzobay-orange-dark transition-colors duration-300 whitespace-nowrap text-sm font-medium"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Featured Products */}
                <FeaturedProducts />
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories Grid - More Jumia-like */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-enzobay-brown flex items-center">
                <span className="mr-2 inline-block w-3 h-6 bg-enzobay-blue"></span>
                Shop By Category
              </h2>
              <Link 
                to="/categories" 
                className="text-enzobay-blue hover:underline flex items-center text-sm font-medium"
              >
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {CATEGORIES.map((category, index) => (
                <Link 
                  key={category.id}
                  to={`/products?category=${category.name.toLowerCase()}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col items-center p-3 group animate-fade-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden mb-2">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  <h3 className="text-xs md:text-sm font-medium text-center group-hover:text-enzobay-orange transition-colors">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Product Sections by Category - With Vertical Scroll Option */}
        <section className="py-8 bg-enzobay-neutral-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Another Vertical Scrolling List */}
              <div className="hidden lg:block">
                <VerticalProductScroll 
                  title="New Arrivals"
                  products={[...PRODUCTS].sort(() => Math.random() - 0.5).slice(0, 12)}
                  viewAllLink="/products?sort=newest"
                />
              </div>
              
              <div className="col-span-1 lg:col-span-3">
                {groupedProducts.slice(0, 2).map((group, groupIndex) => (
                  <div key={group.category.id} className={`mb-8 ${groupIndex % 2 === 0 ? '' : ''}`}>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl md:text-2xl font-bold text-enzobay-brown flex items-center">
                        <span className="mr-2 inline-block w-3 h-6 bg-enzobay-orange"></span>
                        {group.category.name}
                      </h2>
                      <Link 
                        to={`/products?category=${group.category.name.toLowerCase()}`} 
                        className="text-enzobay-orange hover:underline flex items-center text-sm font-medium"
                      >
                        See All <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {group.products.slice(0, 8).map((product, index) => (
                        <div key={product.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                          <ProductCard product={product} size="sm" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Promotional Banner - Smaller and more compact */}
        <section className="py-6 relative overflow-hidden bg-enzobay-brown">
          <div className="absolute inset-0 z-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2070&auto=format&fit=crop" 
              alt="Luxury promotional background" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between animate-fadeInUp">
              <div className="text-white max-w-xl mb-6 md:mb-0">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-enzobay-orange text-white mb-2">
                  New Collection
                </span>
                <h2 className="text-xl md:text-2xl font-bold mb-2">Elegance Redefined</h2>
                <p className="text-white/90 text-sm">
                  Discover our exclusive new arrivals for those who appreciate the extraordinary.
                </p>
                <Link 
                  to="/products?collection=new" 
                  className="mt-3 inline-flex items-center gap-1 text-white border border-white/30 bg-white/10 px-3 py-1.5 text-sm rounded hover:bg-white/20 transition-colors"
                >
                  Shop Now <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="w-full md:w-1/3 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 animate-fadeInRight">
                <img 
                  src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=2025&auto=format&fit=crop" 
                  alt="Luxury collection preview" 
                  className="w-full h-auto rounded-lg shadow-lg" 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section - More compact */}
        <section className="py-8 bg-enzobay-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6 animate-fade-in">
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-enzobay-blue/10 text-enzobay-blue mb-1">
                Client Experiences
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-enzobay-brown">What Our Customers Say</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Testimonial 1 */}
              <div className="bg-white p-4 rounded-lg border border-enzobay-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in transform hover:-translate-y-1">
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-enzobay-orange"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-enzobay-neutral-700 text-sm mb-3">
                  "The attention to detail in their products is outstanding. Each item exceeds my expectations in quality and elegance."
                </p>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-enzobay-blue/20 flex items-center justify-center text-enzobay-blue font-semibold text-xs">
                    MK
                  </div>
                  <div className="ml-2">
                    <h4 className="font-medium text-enzobay-brown text-sm">Maria K.</h4>
                    <p className="text-xs text-enzobay-neutral-500">Loyal Customer</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white p-4 rounded-lg border border-enzobay-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in transform hover:-translate-y-1" style={{animationDelay: "0.1s"}}>
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-enzobay-orange"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-enzobay-neutral-700 text-sm mb-3">
                  "Their shipping is impressively fast, and the packaging is as luxurious as the products themselves."
                </p>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-enzobay-orange/20 flex items-center justify-center text-enzobay-orange font-semibold text-xs">
                    JT
                  </div>
                  <div className="ml-2">
                    <h4 className="font-medium text-enzobay-brown text-sm">James T.</h4>
                    <p className="text-xs text-enzobay-neutral-500">Frequent Shopper</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white p-4 rounded-lg border border-enzobay-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in transform hover:-translate-y-1" style={{animationDelay: "0.2s"}}>
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-enzobay-orange"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-enzobay-neutral-700 text-sm mb-3">
                  "Customer service was exceptional. They helped me select the perfect piece and ensured it arrived on time."
                </p>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-enzobay-blue/20 flex items-center justify-center text-enzobay-blue font-semibold text-xs">
                    SL
                  </div>
                  <div className="ml-2">
                    <h4 className="font-medium text-enzobay-brown text-sm">Sarah L.</h4>
                    <p className="text-xs text-enzobay-neutral-500">New Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section - More compact */}
        <section className="py-6 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-gradient-to-r from-enzobay-blue/10 to-enzobay-orange/10 rounded-lg p-4 text-center animate-fade-in">
              <h2 className="text-lg font-bold text-enzobay-brown mb-2">Join Our Newsletter</h2>
              <p className="text-sm text-enzobay-neutral-700 mb-3">Get updates on new products and exclusive offers.</p>
              
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 py-1.5 px-3 text-sm rounded-lg border border-enzobay-neutral-200 focus:outline-none focus:border-enzobay-blue focus:ring-1 focus:ring-enzobay-blue/20"
                />
                <button className="bg-enzobay-blue hover:bg-enzobay-blue-dark text-white py-1.5 px-3 rounded-lg text-sm font-medium transition-colors">
                  Subscribe Now
                </button>
              </div>
              <p className="text-xs text-enzobay-neutral-500 mt-2">By subscribing, you agree to our Privacy Policy.</p>
            </div>
          </div>
        </section>
        
        {/* Float Banner (Mini) */}
        <BannerManager position="site_wide" variant="mini" maxBanners={1} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
