
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useWishlistStore, useCartStore } from "../lib/store";
import { Heart, ChevronRight, Trash, ShoppingBag, ArrowRight } from "lucide-react";
import { formatPrice } from "../lib/utils";
import { useToast } from "@/hooks/use-toast";
import { PRODUCTS } from "../lib/types";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const handleToggleSelect = (productId: string) => {
    setSelectedItems(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(item => item.id));
    }
  };
  
  const handleRemoveSelected = () => {
    selectedItems.forEach(id => {
      removeItem(id);
    });
    
    toast({
      title: "Items removed",
      description: `${selectedItems.length} item(s) removed from your wishlist`,
    });
    
    setSelectedItems([]);
  };
  
  const handleAddToCart = (productId: string) => {
    const product = items.find(item => item.id === productId);
    if (product) {
      addItem(product, 1);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    }
  };
  
  const handleAddAllToCart = () => {
    const itemsToAdd = items.filter(item => selectedItems.includes(item.id));
    
    itemsToAdd.forEach(item => {
      addItem(item, 1);
    });
    
    toast({
      title: "Items added to cart",
      description: `${itemsToAdd.length} item(s) added to your cart`,
    });
  };
  
  return (
    <div className="min-h-screen bg-enzobay-neutral-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-enzobay-neutral-500">
              <li>
                <Link to="/" className="hover:text-enzobay-blue">Home</Link>
              </li>
              <li>
                <span className="mx-2">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </li>
              <li className="text-enzobay-neutral-800 font-medium">Wishlist</li>
            </ol>
          </nav>
          
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-enzobay-brown sm:text-3xl">
              My Wishlist
            </h1>
            <Link 
              to="/products" 
              className="text-enzobay-blue hover:text-enzobay-blue-dark flex items-center text-sm font-medium"
            >
              Continue Shopping <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          {items.length > 0 ? (
            <>
              <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={handleSelectAll}
                        className="text-enzobay-blue hover:text-enzobay-blue-dark text-sm font-medium flex items-center"
                      >
                        {selectedItems.length === items.length ? "Deselect All" : "Select All"}
                      </button>
                      
                      {selectedItems.length > 0 && (
                        <>
                          <span className="text-enzobay-neutral-300">|</span>
                          <button 
                            onClick={handleRemoveSelected}
                            className="text-enzobay-brown hover:text-red-500 text-sm font-medium flex items-center"
                          >
                            <Trash className="h-4 w-4 mr-1" />
                            Remove Selected
                          </button>
                          <span className="text-enzobay-neutral-300">|</span>
                          <button 
                            onClick={handleAddAllToCart}
                            className="text-enzobay-blue hover:text-enzobay-blue-dark text-sm font-medium flex items-center"
                          >
                            <ShoppingBag className="h-4 w-4 mr-1" />
                            Add Selected to Cart
                          </button>
                        </>
                      )}
                    </div>
                    
                    <p className="text-sm text-enzobay-neutral-500">
                      {items.length} {items.length === 1 ? "item" : "items"} in your wishlist
                    </p>
                  </div>
                  
                  <div className="border-t border-enzobay-neutral-200">
                    <ul role="list" className="divide-y divide-enzobay-neutral-200">
                      {items.map((product) => (
                        <li key={product.id} className="flex py-6 sm:py-8">
                          <div className="flex items-center h-full pr-4">
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(product.id)}
                              onChange={() => handleToggleSelect(product.id)}
                              className="h-4 w-4 rounded border-enzobay-neutral-300 text-enzobay-blue focus:ring-enzobay-blue"
                            />
                          </div>
                          
                          <div className="flex-shrink-0">
                            <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-md border border-enzobay-neutral-200 bg-enzobay-neutral-50 overflow-hidden">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                          </div>

                          <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                            <div>
                              <div className="flex justify-between">
                                <h4 className="text-sm sm:text-base">
                                  <Link to={`/product/${product.id}`} className="font-medium text-enzobay-brown hover:text-enzobay-blue">
                                    {product.name}
                                  </Link>
                                </h4>
                                <button
                                  type="button"
                                  className="text-enzobay-neutral-400 hover:text-red-500"
                                  onClick={() => removeItem(product.id)}
                                >
                                  <Heart className="h-5 w-5 fill-red-500" />
                                </button>
                              </div>
                              <p className="mt-1 text-sm text-enzobay-neutral-500">
                                {product.brand && <span>{product.brand} • </span>}
                                {product.category && <span className="capitalize">{product.category}</span>}
                              </p>
                              <p className="mt-1 text-sm text-enzobay-neutral-500 line-clamp-2">
                                {product.description}
                              </p>
                            </div>

                            <div className="mt-4 flex flex-1 items-end justify-between">
                              <div>
                                <div className="flex items-baseline">
                                  {product.discount ? (
                                    <>
                                      <p className="text-lg font-medium text-enzobay-brown">
                                        {formatPrice(product.price * (1 - product.discount / 100))}
                                      </p>
                                      <p className="ml-2 text-sm text-enzobay-neutral-500 line-through">
                                        {formatPrice(product.price)}
                                      </p>
                                      <p className="ml-2 text-sm text-green-600">
                                        {product.discount}% off
                                      </p>
                                    </>
                                  ) : (
                                    <p className="text-lg font-medium text-enzobay-brown">
                                      {formatPrice(product.price)}
                                    </p>
                                  )}
                                </div>
                                
                                <p className="mt-1 text-sm text-enzobay-neutral-500">
                                  {product.inStock ? "In Stock" : "Out of Stock"}
                                </p>
                              </div>
                              
                              <button
                                type="button"
                                onClick={() => handleAddToCart(product.id)}
                                className="rounded-md bg-enzobay-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-enzobay-blue-dark focus:outline-none"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => {
                    clearWishlist();
                    toast({
                      title: "Wishlist cleared",
                      description: "All items have been removed from your wishlist",
                    });
                  }}
                  className="text-enzobay-neutral-600 hover:text-red-500 text-sm font-medium flex items-center"
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Clear Wishlist
                </button>
                
                <Link
                  to="/products"
                  className="rounded-md bg-enzobay-orange px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-enzobay-orange-dark focus:outline-none"
                >
                  Continue Shopping
                </Link>
              </div>
            </>
          ) : (
            <div className="bg-white shadow-sm rounded-lg p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-enzobay-neutral-100">
                <Heart className="h-8 w-8 text-enzobay-neutral-400" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-enzobay-brown">Your wishlist is empty</h3>
              <p className="mt-2 text-enzobay-neutral-500">
                Save items you love for later by clicking the heart icon on any product.
              </p>
              <div className="mt-8">
                <Link
                  to="/products"
                  className="inline-flex items-center rounded-md bg-enzobay-blue px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-enzobay-blue-dark focus:outline-none"
                >
                  Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="mt-12">
                <h4 className="text-base font-medium text-enzobay-brown mb-4">You might like</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {PRODUCTS.slice(0, 4).map(product => (
                    <div key={product.id} className="relative">
                      <div className="group aspect-square w-full overflow-hidden rounded-md bg-enzobay-neutral-100">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <div className="mt-2">
                        <h3 className="text-sm text-enzobay-brown font-medium line-clamp-1">
                          <Link to={`/product/${product.id}`}>
                            {product.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-enzobay-neutral-500">{formatPrice(product.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
