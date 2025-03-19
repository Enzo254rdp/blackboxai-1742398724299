
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCartStore } from "../lib/store";
import { formatPrice } from "../lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, Trash, Heart, Plus, Minus, ShoppingBag, ArrowRight, CreditCard, Shield, Truck } from "lucide-react";
import { PRODUCTS } from "../lib/types";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getCartTotal } = useCartStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [discount, setDiscount] = useState(0);
  
  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    updateQuantity(productId, quantity);
  };
  
  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId);
    
    toast({
      title: "Item removed",
      description: `${productName} has been removed from your cart`,
    });
  };
  
  const handleClearCart = () => {
    clearCart();
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };
  
  const handleApplyCoupon = () => {
    if (!couponCode) {
      setCouponError("Please enter a coupon code");
      return;
    }
    
    setIsApplyingCoupon(true);
    setCouponError("");
    
    // Simulate API call to validate coupon
    setTimeout(() => {
      if (couponCode.toLowerCase() === "enzobay10") {
        setDiscount(10);
        toast({
          title: "Coupon applied",
          description: "10% discount has been applied to your order",
        });
      } else if (couponCode.toLowerCase() === "enzobay20") {
        setDiscount(20);
        toast({
          title: "Coupon applied",
          description: "20% discount has been applied to your order",
        });
      } else {
        setCouponError("Invalid coupon code");
      }
      
      setIsApplyingCoupon(false);
    }, 1000);
  };
  
  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };
  
  // Calculate cart totals
  const subtotal = getCartTotal();
  const shippingEstimate = subtotal > 5000 ? 0 : 500; // Free shipping for orders over 5000
  const discountAmount = discount > 0 ? (subtotal * discount / 100) : 0;
  const tax = Math.round((subtotal - discountAmount) * 0.16); // 16% VAT
  const total = subtotal - discountAmount + shippingEstimate + tax;
  
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
              <li className="text-enzobay-neutral-800 font-medium">Shopping Cart</li>
            </ol>
          </nav>
          
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-enzobay-brown sm:text-3xl">
              Shopping Cart
            </h1>
            <Link 
              to="/products" 
              className="text-enzobay-blue hover:text-enzobay-blue-dark flex items-center text-sm font-medium"
            >
              Continue Shopping <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          {items.length > 0 ? (
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
              {/* Cart items */}
              <section aria-labelledby="cart-heading" className="lg:col-span-8">
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>

                <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8 lg:mb-0">
                  <ul role="list" className="divide-y divide-enzobay-neutral-200">
                    {items.map((product) => {
                      const price = product.price;
                      const discountedPrice = product.discount 
                        ? price * (1 - product.discount / 100) 
                        : price;
                      
                      return (
                        <li key={product.id} className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center">
                          <div className="flex-shrink-0 sm:mr-6">
                            <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-md border border-enzobay-neutral-200 bg-enzobay-neutral-50 overflow-hidden">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                          </div>

                          <div className="flex flex-1 flex-col mt-4 sm:mt-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-base sm:text-lg font-medium text-enzobay-brown">
                                  <Link to={`/product/${product.id}`} className="hover:text-enzobay-blue">
                                    {product.name}
                                  </Link>
                                </h3>
                                <div className="ml-4 flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveItem(product.id, product.name)}
                                    className="text-enzobay-neutral-400 hover:text-red-500"
                                  >
                                    <Trash className="h-5 w-5" />
                                  </button>
                                  <button
                                    type="button"
                                    className="text-enzobay-neutral-400 hover:text-red-500"
                                  >
                                    <Heart className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                              <p className="mt-1 text-sm text-enzobay-neutral-500">
                                {product.brand && <span>{product.brand} • </span>}
                                {product.category && <span className="capitalize">{product.category}</span>}
                              </p>
                              
                              {product.discount > 0 && (
                                <p className="mt-1 text-sm font-medium text-green-600">
                                  {product.discount}% off
                                </p>
                              )}
                            </div>

                            <div className="mt-4 flex justify-between items-end flex-wrap gap-4">
                              <div className="flex items-center border border-enzobay-neutral-300 rounded-md">
                                <button
                                  type="button"
                                  className="p-2 text-enzobay-neutral-600 hover:text-enzobay-blue"
                                  onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                                  disabled={product.quantity <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-2 text-sm font-medium text-enzobay-neutral-800">
                                  {product.quantity}
                                </span>
                                <button
                                  type="button"
                                  className="p-2 text-enzobay-neutral-600 hover:text-enzobay-blue"
                                  onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              
                              <div className="flex items-baseline">
                                <span className="text-lg font-medium text-enzobay-brown">
                                  {formatPrice(discountedPrice * product.quantity)}
                                </span>
                                
                                {product.discount > 0 && (
                                  <span className="ml-2 text-sm text-enzobay-neutral-500 line-through">
                                    {formatPrice(price * product.quantity)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  
                  <div className="border-t border-enzobay-neutral-200 p-6">
                    <button
                      type="button"
                      onClick={handleClearCart}
                      className="text-enzobay-neutral-600 hover:text-red-500 text-sm font-medium flex items-center"
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Clear Cart
                    </button>
                  </div>
                </div>
              </section>

              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-8 lg:mt-0 lg:col-span-4"
              >
                <div className="bg-white shadow-sm rounded-lg p-6">
                  <h2 id="summary-heading" className="text-lg font-medium text-enzobay-brown mb-6">
                    Order Summary
                  </h2>

                  <dl className="space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-enzobay-neutral-600">Subtotal</dt>
                      <dd className="text-sm font-medium text-enzobay-neutral-900">{formatPrice(subtotal)}</dd>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex items-center justify-between">
                        <dt className="text-sm text-enzobay-neutral-600">Discount ({discount}%)</dt>
                        <dd className="text-sm font-medium text-green-600">-{formatPrice(discountAmount)}</dd>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between border-t border-enzobay-neutral-200 pt-4">
                      <dt className="text-sm text-enzobay-neutral-600">Shipping estimate</dt>
                      <dd className="text-sm font-medium text-enzobay-neutral-900">
                        {shippingEstimate === 0 ? "Free" : formatPrice(shippingEstimate)}
                      </dd>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-enzobay-neutral-600">VAT (16%)</dt>
                      <dd className="text-sm font-medium text-enzobay-neutral-900">{formatPrice(tax)}</dd>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-enzobay-neutral-200 pt-4">
                      <dt className="text-base font-medium text-enzobay-neutral-900">Order total</dt>
                      <dd className="text-base font-medium text-enzobay-neutral-900">{formatPrice(total)}</dd>
                    </div>
                  </dl>
                  
                  <div className="mt-6">
                    <div className="flex items-center mb-4">
                      <div className="flex-grow">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter coupon code"
                          className="block w-full rounded-md border-enzobay-neutral-300 shadow-sm focus:border-enzobay-blue focus:ring-enzobay-blue sm:text-sm"
                        />
                        {couponError && (
                          <p className="mt-1 text-xs text-red-600">{couponError}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={isApplyingCoupon}
                        className="ml-4 rounded-md bg-enzobay-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-enzobay-blue-dark focus:outline-none disabled:opacity-70"
                      >
                        {isApplyingCoupon ? "Applying..." : "Apply"}
                      </button>
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleProceedToCheckout}
                      className="w-full rounded-md border border-transparent bg-enzobay-orange py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-enzobay-orange-dark focus:outline-none flex items-center justify-center"
                    >
                      Proceed to Checkout <ChevronRight className="ml-1 h-5 w-5" />
                    </button>
                    
                    <div className="mt-6 flex justify-between text-center">
                      <div className="flex flex-col items-center">
                        <CreditCard className="h-5 w-5 text-enzobay-neutral-500" />
                        <span className="mt-1 text-xs text-enzobay-neutral-500">Secure Payment</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Truck className="h-5 w-5 text-enzobay-neutral-500" />
                        <span className="mt-1 text-xs text-enzobay-neutral-500">Free Shipping</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Shield className="h-5 w-5 text-enzobay-neutral-500" />
                        <span className="mt-1 text-xs text-enzobay-neutral-500">Money-Back Guarantee</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 bg-enzobay-neutral-100 rounded-lg p-6">
                  <h3 className="text-sm font-medium text-enzobay-brown mb-4">We accept</h3>
                  <div className="flex gap-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/5977/5977576.png" alt="M-Pesa" className="h-8 w-auto" />
                    <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-8 w-auto" />
                    <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-8 w-auto" />
                    <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="PayPal" className="h-8 w-auto" />
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="bg-white shadow-sm rounded-lg p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-enzobay-neutral-100">
                <ShoppingBag className="h-8 w-8 text-enzobay-neutral-400" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-enzobay-brown">Your cart is empty</h3>
              <p className="mt-2 text-enzobay-neutral-500">
                Looks like you haven't added any products to your cart yet.
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
                <h4 className="text-base font-medium text-enzobay-brown mb-4">Recommended for you</h4>
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
