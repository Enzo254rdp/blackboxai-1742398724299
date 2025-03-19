import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScrollPosition } from "../hooks/use-scroll";
import { useWishlistStore, useCartStore } from "../lib/store";
import { Heart, ShoppingCart, User, Search, Menu, X, ChevronDown } from "lucide-react";
import EnzoBayLogo from "./EnzoBayLogo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { pathname } = useLocation();
  const scrollPosition = useScrollPosition();
  
  const { items: cartItems, getItemCount } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  
  const cartCount = getItemCount();
  const wishlistCount = wishlistItems.length;
  
  const navigationItems = [
    {
      name: "Home",
      path: "/",
      role: "primary",
    },
    {
      name: "Products",
      path: "/products",
      role: "primary",
    },
    {
      name: "Categories",
      path: "/categories",
      role: "primary",
    },
    {
      name: "Sale",
      path: "/sale",
      role: "primary",
    },
    {
      name: "About",
      path: "/about",
      role: "primary",
    },
    {
      name: "Contact",
      path: "/contact",
      role: "primary",
    },
    {
      name: "Sell on EnzoBay",
      path: "/seller",
      role: "special",
    },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  useEffect(() => {
    setIsScrolled(scrollPosition > 10);
  }, [scrollPosition]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };
  
  const isActivePath = (path: string, exact = false) => {
    if (exact) return pathname === path;
    return pathname === path || pathname.startsWith(`${path}/`);
  };
  
  return (
    <header 
      className={`sticky top-0 z-50 bg-white ${
        isScrolled ? "shadow-md" : ""
      } transition-shadow duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-enzobay-neutral-600 hover:text-enzobay-brown transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          
          <div className="flex-shrink-0 flex items-center">
            <EnzoBayLogo variant={isScrolled ? "default" : "default"} animated={true} />
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`nav-link ${isActivePath(item.path, item.role === "primary") ? "text-enzobay-orange" : "text-enzobay-neutral-700"}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                type="button"
                className="text-enzobay-neutral-600 hover:text-enzobay-brown transition-colors duration-200"
                onClick={() => setShowSearch(!showSearch)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              
              {showSearch && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg p-2 z-50 animate-fade-in">
                  <form onSubmit={handleSearchSubmit} className="flex">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="flex-1 border-enzobay-neutral-300 rounded-l-md shadow-sm focus:ring-enzobay-blue focus:border-enzobay-blue sm:text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="bg-enzobay-blue text-white px-3 py-2 rounded-r-md hover:bg-enzobay-blue-dark transition-colors duration-200"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>
            
            <div className="relative group">
              <Link 
                to="/login" 
                className="text-enzobay-neutral-600 hover:text-enzobay-brown transition-colors duration-200"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-enzobay-neutral-700 hover:bg-enzobay-neutral-100 transition-colors duration-200"
                    role="menuitem"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-sm text-enzobay-neutral-700 hover:bg-enzobay-neutral-100 transition-colors duration-200"
                    role="menuitem"
                  >
                    Register
                  </Link>
                  <hr className="my-1 border-enzobay-neutral-200" />
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-enzobay-neutral-700 hover:bg-enzobay-neutral-100 transition-colors duration-200"
                    role="menuitem"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-enzobay-neutral-700 hover:bg-enzobay-neutral-100 transition-colors duration-200"
                    role="menuitem"
                  >
                    My Orders
                  </Link>
                </div>
              </div>
            </div>
            
            <Link 
              to="/wishlist" 
              className="text-enzobay-neutral-600 hover:text-enzobay-brown relative transition-colors duration-200"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-enzobay-orange text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>
            
            <Link 
              to="/cart" 
              className="text-enzobay-neutral-600 hover:text-enzobay-brown relative transition-colors duration-200"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-enzobay-orange text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      
      <div 
        className={`fixed inset-0 flex z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div 
          className="fixed inset-0 bg-black bg-opacity-50" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        <div 
          className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition-transform ease-in-out duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="text-enzobay-neutral-600 hover:text-enzobay-brown transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="pt-5 pb-4 px-4">
            <div className="flex items-center">
              <EnzoBayLogo size="sm" />
            </div>
          </div>
          
          <div className="mt-5 px-4 border-t border-enzobay-neutral-200">
            <nav className="flex-1 mt-4 space-y-4">
              {navigationItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`block text-base font-medium ${isActivePath(item.path, item.role === "primary") ? "text-enzobay-orange" : "text-enzobay-neutral-700"} hover:text-enzobay-orange transition-colors duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="px-4 py-6 border-t border-enzobay-neutral-200">
            <div className="flex items-center justify-around">
              <Link 
                to="/login" 
                className="text-enzobay-blue hover:text-enzobay-blue-dark transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex flex-col items-center">
                  <User className="h-6 w-6" />
                  <span className="mt-1 text-xs">Account</span>
                </div>
              </Link>
              <Link 
                to="/wishlist" 
                className="text-enzobay-blue hover:text-enzobay-blue-dark relative transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex flex-col items-center">
                  <Heart className="h-6 w-6" />
                  <span className="mt-1 text-xs">Wishlist</span>
                </div>
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-5 bg-enzobay-orange text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>
              <Link 
                to="/cart" 
                className="text-enzobay-blue hover:text-enzobay-blue-dark relative transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex flex-col items-center">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="mt-1 text-xs">Cart</span>
                </div>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-5 bg-enzobay-orange text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
