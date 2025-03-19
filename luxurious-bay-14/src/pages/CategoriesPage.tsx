
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CATEGORIES } from "../lib/types";
import { Search, X, ShoppingBag, ArrowRight, Filter } from "lucide-react";

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(CATEGORIES);
  const [selectedSort, setSelectedSort] = useState("popularity");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  useEffect(() => {
    const results = CATEGORIES.filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    let sortedResults = [...results];
    
    // Sort categories
    switch (selectedSort) {
      case "name-asc":
        sortedResults.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedResults.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "popularity":
        // Let's assume the original order is by popularity
        break;
      default:
        break;
    }
    
    setFilteredCategories(sortedResults);
  }, [searchTerm, selectedSort]);

  return (
    <div className="min-h-screen bg-enzobay-neutral-50">
      <Navbar />
      
      <main className="py-12">
        {/* Page Header Banner */}
        <div className="bg-enzobay-blue mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Shop by Category</h1>
              <p className="text-enzobay-blue-50 max-w-2xl mx-auto">
                Browse our wide range of categories to find exactly what you're looking for. From electronics to fashion, we've got you covered.
              </p>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          {/* Search and Filters */}
          <div className="mb-8 bg-white shadow-sm rounded-lg p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-enzobay-neutral-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white w-full py-3 pl-10 pr-10 rounded-md border border-enzobay-neutral-200 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
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
              
              {/* Sort Dropdown */}
              <div className="min-w-[200px]">
                <label htmlFor="sort" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                  Sort by
                </label>
                <select
                  id="sort"
                  name="sort"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="block w-full rounded-md border-enzobay-neutral-300 py-2 pl-3 pr-10 text-base focus:border-enzobay-blue focus:outline-none focus:ring-enzobay-blue sm:text-sm"
                >
                  <option value="popularity">Popularity</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                </select>
              </div>
              
              {/* Mobile filter button */}
              <button
                className="md:hidden flex items-center justify-center px-4 py-2 border border-enzobay-neutral-300 rounded-md text-enzobay-neutral-700"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-5 w-5 mr-2" />
                <span>Filters</span>
              </button>
            </div>
            
            {/* Mobile filters panel */}
            {isFilterOpen && (
              <div className="md:hidden mt-4 pt-4 border-t border-enzobay-neutral-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-enzobay-neutral-900 mb-2">Sort by</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="mobile-sort"
                          value="popularity"
                          checked={selectedSort === 'popularity'}
                          onChange={() => setSelectedSort('popularity')}
                          className="h-4 w-4 text-enzobay-blue focus:ring-enzobay-blue border-enzobay-neutral-300"
                        />
                        <span className="ml-2 text-sm text-enzobay-neutral-700">Popularity</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="mobile-sort"
                          value="name-asc"
                          checked={selectedSort === 'name-asc'}
                          onChange={() => setSelectedSort('name-asc')}
                          className="h-4 w-4 text-enzobay-blue focus:ring-enzobay-blue border-enzobay-neutral-300"
                        />
                        <span className="ml-2 text-sm text-enzobay-neutral-700">Name (A-Z)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="mobile-sort"
                          value="name-desc"
                          checked={selectedSort === 'name-desc'}
                          onChange={() => setSelectedSort('name-desc')}
                          className="h-4 w-4 text-enzobay-blue focus:ring-enzobay-blue border-enzobay-neutral-300"
                        />
                        <span className="ml-2 text-sm text-enzobay-neutral-700">Name (Z-A)</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-3">
                  <button
                    type="button"
                    className="flex-1 bg-enzobay-blue text-white py-2 px-4 rounded-md hover:bg-enzobay-blue-dark"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Apply Filters
                  </button>
                  <button
                    type="button"
                    className="flex-1 border border-enzobay-neutral-300 text-enzobay-neutral-700 py-2 px-4 rounded-md hover:bg-enzobay-neutral-100"
                    onClick={() => {
                      setSelectedSort('popularity');
                      setIsFilterOpen(false);
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Results count */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-enzobay-neutral-600">
              Showing {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'}
              {searchTerm && <span> for "<strong>{searchTerm}</strong>"</span>}
            </p>
            
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-sm text-enzobay-blue hover:text-enzobay-blue-dark flex items-center"
              >
                <X className="h-4 w-4 mr-1" />
                Clear search
              </button>
            )}
          </div>
          
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCategories.map(category => (
                <Link 
                  key={category.id}
                  to={`/products?category=${category.name.toLowerCase()}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group animate-fade-in"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-medium flex items-center">
                        View Products <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-enzobay-brown group-hover:text-enzobay-orange transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm text-enzobay-neutral-600 mt-2">
                      {category.description}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="inline-flex items-center text-xs font-medium text-enzobay-neutral-700 bg-enzobay-neutral-100 px-2.5 py-0.5 rounded-full">
                        <ShoppingBag className="h-3 w-3 mr-1" />
                        {Math.floor(Math.random() * 50) + 10} products
                      </span>
                      <span className="text-enzobay-blue text-sm font-medium group-hover:translate-x-1 transition-transform duration-300 flex items-center">
                        Browse <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-enzobay-neutral-100 p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-enzobay-neutral-500" />
              </div>
              <h3 className="text-xl font-semibold text-enzobay-brown mb-2">No categories found</h3>
              <p className="text-enzobay-neutral-600 max-w-md mb-6">
                We couldn't find any categories matching your search. Try a different search term.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-enzobay-blue px-4 py-2 text-sm font-medium text-white hover:bg-enzobay-blue-dark"
              >
                Show All Categories
              </button>
            </div>
          )}
          
          {/* Promotional Banner */}
          <div className="mt-16 relative overflow-hidden rounded-lg bg-gradient-to-r from-enzobay-blue to-blue-700">
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="white" strokeWidth="2" strokeDasharray="4,4"></path>
                <path d="M0,50 L100,50" fill="none" stroke="white" strokeWidth="2" strokeDasharray="4,4"></path>
                <path d="M50,0 L50,100" fill="none" stroke="white" strokeWidth="2" strokeDasharray="4,4"></path>
              </svg>
            </div>
            <div className="relative px-6 py-8 md:py-12 md:px-12 text-center flex flex-col items-center">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-3">Subscribe for Special Offers</h2>
              <p className="text-blue-100 text-base mb-6 max-w-2xl">
                Join our newsletter to receive exclusive deals, new arrivals updates, and special discount codes delivered right to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 w-full max-w-lg">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-md border-2 border-blue-200 focus:border-white focus:outline-none"
                />
                <button className="bg-white text-enzobay-blue font-medium px-6 py-3 rounded-md hover:bg-blue-50 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
