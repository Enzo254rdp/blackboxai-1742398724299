
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCartStore } from "../lib/store";
import { useScrollToTop } from "../hooks/use-scroll";
import { toast } from "@/components/ui/use-toast";

// MPesa payment processing simulation
const processMpesaPayment = (phoneNumber: string) => {
  return new Promise<string>((resolve, reject) => {
    // Simulate the payment process
    setTimeout(() => {
      // 90% success rate for demonstration
      if (Math.random() < 0.9) {
        resolve("MPESA" + Math.floor(Math.random() * 1000000));
      } else {
        reject(new Error("Payment failed. Please try again."));
      }
    }, 3000);
  });
};

// Get saved checkout information
const getSavedCheckoutInfo = () => {
  try {
    const savedInfo = localStorage.getItem('enzobay-checkout-info');
    return savedInfo ? JSON.parse(savedInfo) : null;
  } catch (error) {
    console.error('Error retrieving saved checkout info:', error);
    return null;
  }
};

const CheckoutPage = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [useSavedInfo, setUseSavedInfo] = useState(false);
  const savedCheckoutInfo = getSavedCheckoutInfo();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    shippingAddress: {
      street: "",
      city: "",
      postalCode: "",
      country: "Kenya"
    },
    billingAddress: {
      sameAsShipping: true,
      street: "",
      city: "",
      postalCode: "",
      country: "Kenya"
    },
    paymentMethod: "mpesa",
    mpesaPhone: "",
    saveInfo: true,
    notes: ""
  });
  
  const [mpesaStatus, setMpesaStatus] = useState<"idle" | "pending" | "success" | "failed">("idle");
  const [transactionCode, setTransactionCode] = useState("");
  
  // Load saved checkout info if available
  useEffect(() => {
    if (savedCheckoutInfo && useSavedInfo) {
      setFormData(prev => ({
        ...prev,
        ...savedCheckoutInfo,
        firstName: savedCheckoutInfo.firstName || prev.firstName,
        lastName: savedCheckoutInfo.lastName || prev.lastName,
        email: savedCheckoutInfo.email || prev.email,
        phone: savedCheckoutInfo.phone || prev.phone,
        shippingAddress: savedCheckoutInfo.shippingAddress || prev.shippingAddress,
        billingAddress: {
          ...savedCheckoutInfo.billingAddress,
          sameAsShipping: savedCheckoutInfo.billingAddress?.sameAsShipping ?? true
        },
        paymentMethod: savedCheckoutInfo.paymentMethod || prev.paymentMethod,
        mpesaPhone: savedCheckoutInfo.mpesaPhone || prev.mpesaPhone
      }));
    }
  }, [savedCheckoutInfo, useSavedInfo]);
  
  // Cart total and shipping cost
  const cartTotal = getCartTotal();
  const shippingCost = cartTotal > 10000 ? 0 : 500;
  const orderTotal = cartTotal + shippingCost;

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    
    if (name === "sameAsShipping") {
      setFormData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          sameAsShipping: checked as boolean
        }
      }));
    } else if (name.startsWith("shipping.")) {
      const field = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          [field]: value
        }
      }));
    } else if (name.startsWith("billing.")) {
      const field = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Add some products to your cart before checking out.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Save checkout information if requested
      if (formData.saveInfo) {
        const checkoutInfo = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          shippingAddress: formData.shippingAddress,
          billingAddress: formData.billingAddress,
          paymentMethod: formData.paymentMethod,
          mpesaPhone: formData.mpesaPhone
        };
        
        localStorage.setItem('enzobay-checkout-info', JSON.stringify(checkoutInfo));
      }
      
      // For M-Pesa, simulate payment push
      if (formData.paymentMethod === "mpesa") {
        setMpesaStatus("pending");
        
        // Simulate M-Pesa push notification
        toast({
          title: "M-Pesa Push Sent",
          description: "Please check your phone and enter your M-Pesa PIN to complete the payment.",
        });
        
        // Simulate waiting for payment
        const transactionId = await processMpesaPayment(formData.mpesaPhone);
        setMpesaStatus("success");
        setTransactionCode(transactionId);
        
        // Automatically proceed after payment
        setTimeout(() => {
          // Clear cart and redirect to success page
          clearCart();
          navigate("/order-success", { 
            state: { 
              orderNumber: "ORD" + Math.floor(Math.random() * 1000000),
              transactionId 
            } 
          });
        }, 2000);
      } else {
        // For other payment methods, just process the order
        // In a real app, you would integrate with a payment gateway here
        
        // Simulate processing delay
        setTimeout(() => {
          clearCart();
          navigate("/order-success", { 
            state: { 
              orderNumber: "ORD" + Math.floor(Math.random() * 1000000) 
            } 
          });
        }, 2000);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setMpesaStatus("failed");
      
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
      
      setIsLoading(false);
    }
  };

  // Handle manual transaction code entry
  const handleManualCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transactionCode.trim()) {
      toast({
        title: "Transaction Code Required",
        description: "Please enter a valid M-Pesa transaction code.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate verifying the transaction code
    setTimeout(() => {
      setMpesaStatus("success");
      
      // Clear cart and redirect to success page
      setTimeout(() => {
        clearCart();
        navigate("/order-success", { 
          state: { 
            orderNumber: "ORD" + Math.floor(Math.random() * 1000000),
            transactionId: transactionCode
          } 
        });
      }, 1000);
    }, 2000);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-8">
            Checkout
          </h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form Section */}
            <div className="flex-grow">
              {savedCheckoutInfo && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div>
                      <input
                        type="checkbox"
                        id="use-saved-info"
                        checked={useSavedInfo}
                        onChange={(e) => setUseSavedInfo(e.target.checked)}
                        className="h-5 w-5 text-enzobay-blue focus:ring-enzobay-blue border-enzobay-neutral-300 rounded"
                      />
                    </div>
                    <div>
                      <label htmlFor="use-saved-info" className="font-medium text-enzobay-brown cursor-pointer">
                        Use Saved Information
                      </label>
                      <p className="text-sm text-enzobay-neutral-600 mt-1">
                        Fill the form with your previously saved checkout information
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                {/* Contact Information */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-enzobay-brown mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Shipping Address */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-enzobay-brown mb-4">Shipping Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="shipping.street" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        id="shipping.street"
                        name="shipping.street"
                        value={formData.shippingAddress.street}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="shipping.city" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                          City/Town *
                        </label>
                        <input
                          type="text"
                          id="shipping.city"
                          name="shipping.city"
                          value={formData.shippingAddress.city}
                          onChange={handleInputChange}
                          required
                          className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="shipping.postalCode" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          id="shipping.postalCode"
                          name="shipping.postalCode"
                          value={formData.shippingAddress.postalCode}
                          onChange={handleInputChange}
                          required
                          className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="shipping.country" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                        Country *
                      </label>
                      <select
                        id="shipping.country"
                        name="shipping.country"
                        value={formData.shippingAddress.country}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                      >
                        <option value="Kenya">Kenya</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Ethiopia">Ethiopia</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Billing Address */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-enzobay-brown">Billing Address</h2>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sameAsShipping"
                        name="sameAsShipping"
                        checked={formData.billingAddress.sameAsShipping}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-enzobay-blue focus:ring-enzobay-blue border-enzobay-neutral-300 rounded"
                      />
                      <label htmlFor="sameAsShipping" className="ml-2 text-sm text-enzobay-neutral-700">
                        Same as shipping address
                      </label>
                    </div>
                  </div>
                  
                  {!formData.billingAddress.sameAsShipping && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="billing.street" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          id="billing.street"
                          name="billing.street"
                          value={formData.billingAddress.street}
                          onChange={handleInputChange}
                          required={!formData.billingAddress.sameAsShipping}
                          className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="billing.city" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                            City/Town *
                          </label>
                          <input
                            type="text"
                            id="billing.city"
                            name="billing.city"
                            value={formData.billingAddress.city}
                            onChange={handleInputChange}
                            required={!formData.billingAddress.sameAsShipping}
                            className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="billing.postalCode" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                            Postal Code *
                          </label>
                          <input
                            type="text"
                            id="billing.postalCode"
                            name="billing.postalCode"
                            value={formData.billingAddress.postalCode}
                            onChange={handleInputChange}
                            required={!formData.billingAddress.sameAsShipping}
                            className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="billing.country" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                          Country *
                        </label>
                        <select
                          id="billing.country"
                          name="billing.country"
                          value={formData.billingAddress.country}
                          onChange={handleInputChange}
                          required={!formData.billingAddress.sameAsShipping}
                          className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                        >
                          <option value="Kenya">Kenya</option>
                          <option value="Uganda">Uganda</option>
                          <option value="Tanzania">Tanzania</option>
                          <option value="Rwanda">Rwanda</option>
                          <option value="Ethiopia">Ethiopia</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Payment Method */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-enzobay-brown mb-4">Payment Method</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="mpesa"
                        name="paymentMethod"
                        value="mpesa"
                        checked={formData.paymentMethod === "mpesa"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-enzobay-blue focus:ring-enzobay-blue border-enzobay-neutral-300"
                      />
                      <label htmlFor="mpesa" className="ml-3 block text-sm font-medium text-enzobay-neutral-700">
                        M-Pesa
                      </label>
                    </div>
                    
                    {formData.paymentMethod === "mpesa" && (
                      <div className="ml-7 mt-2">
                        <label htmlFor="mpesaPhone" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                          M-Pesa Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="mpesaPhone"
                          name="mpesaPhone"
                          value={formData.mpesaPhone}
                          onChange={handleInputChange}
                          placeholder="e.g. 07XX XXX XXX"
                          required={formData.paymentMethod === "mpesa"}
                          className="w-full sm:w-64 border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                        />
                        <p className="text-sm text-enzobay-neutral-500 mt-1">
                          You will receive a push notification to complete the payment
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-enzobay-blue focus:ring-enzobay-blue border-enzobay-neutral-300"
                      />
                      <label htmlFor="card" className="ml-3 block text-sm font-medium text-enzobay-neutral-700">
                        Credit/Debit Card
                      </label>
                    </div>
                    
                    {formData.paymentMethod === "card" && (
                      <div className="ml-7 mt-2 p-3 bg-enzobay-neutral-100 rounded-md">
                        <p className="text-sm text-enzobay-neutral-700">
                          Card payment will be implemented on the next release. Please use M-Pesa for now.
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="paypal"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === "paypal"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-enzobay-blue focus:ring-enzobay-blue border-enzobay-neutral-300"
                      />
                      <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-enzobay-neutral-700">
                        PayPal
                      </label>
                    </div>
                    
                    {formData.paymentMethod === "paypal" && (
                      <div className="ml-7 mt-2 p-3 bg-enzobay-neutral-100 rounded-md">
                        <p className="text-sm text-enzobay-neutral-700">
                          PayPal payment will be implemented on the next release. Please use M-Pesa for now.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Order Notes */}
                <div className="mb-8">
                  <label htmlFor="notes" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Special instructions for delivery or any other notes"
                    className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                  ></textarea>
                </div>
                
                {/* Save Information */}
                <div className="mb-8">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="saveInfo"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-enzobay-blue focus:ring-enzobay-blue border-enzobay-neutral-300 rounded"
                    />
                    <label htmlFor="saveInfo" className="ml-2 text-sm text-enzobay-neutral-700">
                      Save this information for future checkout
                    </label>
                  </div>
                </div>
                
                {/* MPesa Status and Transaction Code Entry */}
                {mpesaStatus === "pending" && (
                  <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <h3 className="font-medium text-enzobay-brown mb-2">M-Pesa Payment in Progress</h3>
                    <p className="text-sm text-enzobay-neutral-700 mb-4">
                      Please check your phone and enter your M-Pesa PIN to complete the payment.
                      This page will automatically update once your payment is confirmed.
                    </p>
                    <div className="flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-enzobay-blue border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span className="text-sm font-medium text-enzobay-neutral-700">Waiting for payment...</span>
                    </div>
                  </div>
                )}
                
                {mpesaStatus === "failed" && (
                  <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-md">
                    <h3 className="font-medium text-red-700 mb-2">M-Pesa Payment Failed</h3>
                    <p className="text-sm text-enzobay-neutral-700 mb-4">
                      We couldn't confirm your M-Pesa payment. You can try again or enter your transaction code manually below.
                    </p>
                    <form onSubmit={handleManualCodeSubmit} className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={transactionCode}
                        onChange={(e) => setTransactionCode(e.target.value)}
                        placeholder="Enter M-Pesa transaction code"
                        className="flex-grow border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                      />
                      <button
                        type="submit"
                        className="bg-enzobay-blue hover:bg-enzobay-blue-dark text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                      >
                        Verify Payment
                      </button>
                    </form>
                  </div>
                )}
                
                {/* Terms Agreement */}
                <div className="mb-8">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="h-4 w-4 mt-1 text-enzobay-blue focus:ring-enzobay-blue border-enzobay-neutral-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-enzobay-neutral-700">
                      I have read and agree to the website's <Link to="/terms" className="text-enzobay-blue hover:underline">terms and conditions</Link> and <Link to="/privacy" className="text-enzobay-blue hover:underline">privacy policy</Link>
                    </label>
                  </div>
                </div>
                
                {/* Submit Button */}
                {mpesaStatus !== "success" && (
                  <button
                    type="submit"
                    disabled={isLoading || mpesaStatus === "pending"}
                    className={`w-full bg-enzobay-orange hover:bg-enzobay-orange-dark text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 ${
                      (isLoading || mpesaStatus === "pending") ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Order...
                      </span>
                    ) : (
                      `Place Order - ${formatCurrency(orderTotal)}`
                    )}
                  </button>
                )}
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-enzobay-brown mb-4">Order Summary</h2>
                
                {/* Items */}
                <div className="mb-6">
                  <div className="max-h-60 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2 border-b border-enzobay-neutral-200 last:border-b-0">
                        <div className="flex items-center">
                          <span className="bg-enzobay-neutral-100 text-enzobay-neutral-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-2">
                            {item.quantity}
                          </span>
                          <span className="text-sm text-enzobay-neutral-700 line-clamp-1">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium text-enzobay-neutral-700">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {items.length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-enzobay-neutral-500">Your cart is empty</p>
                      <Link to="/products" className="text-enzobay-blue hover:underline text-sm mt-2 inline-block">
                        Browse Products
                      </Link>
                    </div>
                  )}
                </div>
                
                {/* Pricing Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-enzobay-neutral-600">Subtotal</span>
                    <span className="font-medium">{formatCurrency(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-enzobay-neutral-600">Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}
                    </span>
                  </div>
                  <div className="border-t border-enzobay-neutral-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-enzobay-brown">Total</span>
                      <span className="font-bold text-enzobay-brown">{formatCurrency(orderTotal)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Back to Cart Link */}
                <div className="text-center">
                  <Link to="/cart" className="text-enzobay-blue hover:underline text-sm">
                    ← Back to Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;
