
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../lib/types";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";

export default function ProductsPage() {
  const location = useLocation();
  const [products, setProducts] = useState(PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300000]);
  const [sortOption, setSortOption] = useState("featured");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const sort = params.get("sort");
    const featured = params.get("featured");
    const collection = params.get("collection");
    const tag = params.get("tag");
    
    // Set filter states based on URL params
    if (category) setSelectedCategory(category.toLowerCase());
    if (sort) setSortOption(sort);
    
    // Apply initial filters
    let filtered = [...PRODUCTS];
    
    if (category) {
      filtered = filtered.filter(p => 
        p.category.toLowerCase() === category.toLowerCase() || 
        p.tags.includes(category.toLowerCase())
      );
    }
    
    if (featured === "true") {
      filtered = filtered.filter(p => p.isFeatured);
    }
    
    if (collection === "new") {
      filtered = filtered.filter(p => p.isNew);
    }
    
    if (tag) {
      filtered = filtered.filter(p => p.tags.includes(tag.toLowerCase()));
    }
    
    if (sort === "deals") {
      filtered = filtered.filter(p => p.discount).sort((a, b) => (b.discount || 0) - (a.discount || 0));
    } else if (sort === "trending") {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    }
    
    setProducts(filtered);
    setFilteredProducts(filtered);
  }, [location.search]);

  // Apply filters and search
  useEffect(() => {
    let result = [...products];
    
    // Apply search
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(p => 
        p.category.toLowerCase() === selectedCategory.toLowerCase() || 
        p.tags.includes(selectedCategory.toLowerCase())
      );
    }
    
    // Apply price range
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    // Apply sorting
    if (sortOption === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "newest") {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortOption === "discount") {
      result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, priceRange, sortOption]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setPriceRange([0, 300000]);
    setSortOption("featured");
    setFilteredProducts(PRODUCTS);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-enzobay-neutral-50">
      <Navbar />
      <main className="pb-12">
        {/* Page Header */}
        <div className="bg-white border-b border-enzobay-neutral-200 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-enzobay-brown">
              {selectedCategory 
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`
                : "All Products"}
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mt-6 gap-4">
              {/* Search */}
              <div className="relative max-w-md w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-enzobay-neutral-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-enzobay-neutral-100 w-full py-2 pl-10 pr-4 rounded-md border border-enzobay-neutral-200 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-enzobay-neutral-400 hover:text-enzobay-neutral-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              
              {/* Mobile Filter Toggle */}
              <div className="md:hidden">
                <button 
                  onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-enzobay-blue text-white rounded-md"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                  Filters
                </button>
              </div>
              
              {/* Sort Options */}
              <div className="flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-enzobay-neutral-500 whitespace-nowrap">Sort by:</span>
                  <div className="relative w-48">
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="appearance-none w-full bg-white border border-enzobay-neutral-200 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest</option>
                      <option value="discount">Biggest Discount</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-enzobay-neutral-500">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 mt-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg border border-enzobay-neutral-200 p-5 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-enzobay-brown">Filters</h3>
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-enzobay-blue hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium text-enzobay-brown mb-3">Categories</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {CATEGORIES.map(category => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category.name.toLowerCase()}
                          onChange={() => setSelectedCategory(category.name.toLowerCase())}
                          className="h-4 w-4 text-enzobay-orange focus:ring-enzobay-orange border-enzobay-neutral-300"
                        />
                        <span className="ml-2 text-sm text-enzobay-neutral-700">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-enzobay-brown mb-3">Price Range</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-enzobay-neutral-600">
                        {formatPrice(priceRange[0])}
                      </span>
                      <span className="text-sm text-enzobay-neutral-600">
                        {formatPrice(priceRange[1])}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="300000"
                      step="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-enzobay-neutral-200 rounded-lg appearance-none cursor-pointer accent-enzobay-orange"
                    />
                  </div>
                </div>
                
                {/* Additional Filters */}
                <div>
                  <h4 className="font-medium text-enzobay-brown mb-3">Product Status</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-enzobay-orange focus:ring-enzobay-orange border-enzobay-neutral-300 rounded"
                      />
                      <span className="ml-2 text-sm text-enzobay-neutral-700">In Stock</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-enzobay-orange focus:ring-enzobay-orange border-enzobay-neutral-300 rounded"
                      />
                      <span className="ml-2 text-sm text-enzobay-neutral-700">On Sale</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-enzobay-orange focus:ring-enzobay-orange border-enzobay-neutral-300 rounded"
                      />
                      <span className="ml-2 text-sm text-enzobay-neutral-700">New Arrivals</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Filters Menu */}
            <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${isFilterMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
              <div className="flex justify-between items-center p-4 border-b border-enzobay-neutral-200">
                <h3 className="font-semibold text-enzobay-brown text-lg">Filters</h3>
                <button 
                  onClick={() => setIsFilterMenuOpen(false)}
                  className="text-enzobay-neutral-500 hover:text-enzobay-neutral-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
                <div className="mb-6">
                  <button 
                    onClick={() => {
                      clearFilters();
                      setIsFilterMenuOpen(false);
                    }}
                    className="text-sm text-enzobay-blue hover:underline"
                  >
                    Clear All Filters
                  </button>
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium text-enzobay-brown mb-3">Categories</h4>
                  <div className="space-y-3">
                    {CATEGORIES.map(category => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category-mobile"
                          checked={selectedCategory === category.name.toLowerCase()}
                          onChange={() => {
                            setSelectedCategory(category.name.toLowerCase());
                          }}
                          className="h-5 w-5 text-enzobay-orange focus:ring-enzobay-orange border-enzobay-neutral-300"
                        />
                        <span className="ml-2 text-enzobay-neutral-700">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-enzobay-brown mb-3">Price Range</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-enzobay-neutral-600">
                        {formatPrice(priceRange[0])}
                      </span>
                      <span className="text-enzobay-neutral-600">
                        {formatPrice(priceRange[1])}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="300000"
                      step="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-3 bg-enzobay-neutral-200 rounded-lg appearance-none cursor-pointer accent-enzobay-orange"
                    />
                  </div>
                </div>
                
                {/* Additional Filters */}
                <div className="mb-6">
                  <h4 className="font-medium text-enzobay-brown mb-3">Product Status</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-5 w-5 text-enzobay-orange focus:ring-enzobay-orange border-enzobay-neutral-300 rounded"
                      />
                      <span className="ml-2 text-enzobay-neutral-700">In Stock</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-5 w-5 text-enzobay-orange focus:ring-enzobay-orange border-enzobay-neutral-300 rounded"
                      />
                      <span className="ml-2 text-enzobay-neutral-700">On Sale</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-5 w-5 text-enzobay-orange focus:ring-enzobay-orange border-enzobay-neutral-300 rounded"
                      />
                      <span className="ml-2 text-enzobay-neutral-700">New Arrivals</span>
                    </label>
                  </div>
                </div>
                
                {/* Apply Button */}
                <button
                  onClick={() => setIsFilterMenuOpen(false)}
                  className="w-full py-3 bg-enzobay-orange text-white font-medium rounded-md hover:bg-enzobay-orange-dark transition-colors duration-300"
                >
                  Apply Filters
                </button>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="flex-1">
              <div className="mb-4">
                <p className="text-enzobay-neutral-600">
                  Showing {filteredProducts.length} products
                </p>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredProducts.map(product => (
                    <div key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-enzobay-neutral-100 p-4 rounded-full mb-4">
                    <Search className="h-8 w-8 text-enzobay-neutral-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-enzobay-brown mb-2">No products found</h3>
                  <p className="text-enzobay-neutral-600 max-w-md mb-6">
                    We couldn't find any products matching your filters. Try adjusting your search criteria or browse our categories.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn-primary"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
