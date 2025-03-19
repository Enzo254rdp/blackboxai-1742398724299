import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useScrollToTop } from "../hooks/use-scroll";

// Mock user data
const USER = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+254 712 345 678",
  address: {
    street: "123 Mombasa Road",
    city: "Nairobi",
    postalCode: "00100",
    country: "Kenya"
  }
};

// Saved checkout information from local storage
const getSavedCheckoutInfo = () => {
  try {
    const savedInfo = localStorage.getItem('enzobay-checkout-info');
    return savedInfo ? JSON.parse(savedInfo) : null;
  } catch (error) {
    console.error('Error retrieving saved checkout info:', error);
    return null;
  }
};

const AccountPage = () => {
  useScrollToTop();
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: USER.name,
    email: USER.email,
    phone: USER.phone,
    street: USER.address.street,
    city: USER.address.city,
    postalCode: USER.address.postalCode,
    country: USER.address.country
  });
  
  const savedCheckoutInfo = getSavedCheckoutInfo();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Updated profile information:", formData);
    // For now, we'll just toggle off edit mode
    setEditMode(false);
  };

  const clearSavedCheckoutInfo = () => {
    try {
      localStorage.removeItem('enzobay-checkout-info');
      // Force re-render
      window.location.reload();
    } catch (error) {
      console.error('Error clearing saved checkout info:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="h-20 w-20 rounded-full bg-enzobay-blue text-white flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  {USER.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className="text-lg font-semibold text-enzobay-brown">{USER.name}</h2>
                <p className="text-sm text-enzobay-neutral-600">{USER.email}</p>
              </div>
              
              <nav>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`w-full text-left px-4 py-2 rounded-md ${
                        activeTab === "profile" 
                          ? "bg-enzobay-blue-light text-enzobay-blue font-medium" 
                          : "text-enzobay-neutral-700 hover:bg-enzobay-neutral-100"
                      }`}
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className={`w-full text-left px-4 py-2 rounded-md ${
                        activeTab === "orders" 
                          ? "bg-enzobay-blue-light text-enzobay-blue font-medium" 
                          : "text-enzobay-neutral-700 hover:bg-enzobay-neutral-100"
                      }`}
                    >
                      Orders
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("addresses")}
                      className={`w-full text-left px-4 py-2 rounded-md ${
                        activeTab === "addresses" 
                          ? "bg-enzobay-blue-light text-enzobay-blue font-medium" 
                          : "text-enzobay-neutral-700 hover:bg-enzobay-neutral-100"
                      }`}
                    >
                      Addresses
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("wishlist")}
                      className={`w-full text-left px-4 py-2 rounded-md ${
                        activeTab === "wishlist" 
                          ? "bg-enzobay-blue-light text-enzobay-blue font-medium" 
                          : "text-enzobay-neutral-700 hover:bg-enzobay-neutral-100"
                      }`}
                    >
                      Wishlist
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("security")}
                      className={`w-full text-left px-4 py-2 rounded-md ${
                        activeTab === "security" 
                          ? "bg-enzobay-blue-light text-enzobay-blue font-medium" 
                          : "text-enzobay-neutral-700 hover:bg-enzobay-neutral-100"
                      }`}
                    >
                      Security
                    </button>
                  </li>
                </ul>
              </nav>
              
              <div className="mt-6 pt-6 border-t border-enzobay-neutral-200">
                <button className="w-full bg-enzobay-neutral-100 hover:bg-enzobay-neutral-200 text-enzobay-neutral-700 px-4 py-2 rounded-md transition-colors duration-300">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-enzobay-brown">My Profile</h2>
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="text-enzobay-blue hover:text-enzobay-blue-dark"
                    >
                      {editMode ? "Cancel" : "Edit"}
                    </button>
                  </div>
                  
                  {editMode ? (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="street" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                            Street Address
                          </label>
                          <input
                            type="text"
                            id="street"
                            name="street"
                            value={formData.street}
                            onChange={handleInputChange}
                            className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                            Country
                          </label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-enzobay-blue hover:bg-enzobay-blue-dark text-white font-medium px-6 py-2 rounded-md transition-colors duration-300"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="text-sm font-medium text-enzobay-neutral-500">Full Name</h3>
                          <p className="mt-1">{USER.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-enzobay-neutral-500">Email Address</h3>
                          <p className="mt-1">{USER.email}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-enzobay-neutral-500">Phone Number</h3>
                          <p className="mt-1">{USER.phone}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-enzobay-neutral-500">Address</h3>
                          <p className="mt-1">
                            {USER.address.street}, {USER.address.city}, {USER.address.postalCode}, {USER.address.country}
                          </p>
                        </div>
                      </div>
                      
                      {/* Saved Checkout Information */}
                      {savedCheckoutInfo && (
                        <div className="mt-8 pt-6 border-t border-enzobay-neutral-200">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-enzobay-brown">Saved Checkout Information</h3>
                            <button 
                              onClick={clearSavedCheckoutInfo}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Clear
                            </button>
                          </div>
                          
                          <div className="bg-enzobay-neutral-50 rounded-md p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium text-enzobay-neutral-500">Shipping Address</h4>
                                <p className="mt-1 text-sm">
                                  {savedCheckoutInfo.shippingAddress.street}, {savedCheckoutInfo.shippingAddress.city}, {savedCheckoutInfo.shippingAddress.postalCode}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-enzobay-neutral-500">Billing Address</h4>
                                <p className="mt-1 text-sm">
                                  {savedCheckoutInfo.billingAddress.street}, {savedCheckoutInfo.billingAddress.city}, {savedCheckoutInfo.billingAddress.postalCode}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-enzobay-neutral-500">Payment Method</h4>
                                <p className="mt-1 text-sm">
                                  {savedCheckoutInfo.paymentMethod}
                                </p>
                              </div>
                            </div>
                            
                            <div className="mt-3">
                              <p className="text-xs text-enzobay-neutral-500">
                                This information will be used to pre-fill your checkout form. You can update it during checkout.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-enzobay-brown">My Orders</h2>
                  </div>
                  
                  <div className="border border-enzobay-neutral-200 rounded-md overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-enzobay-brown mb-4">Order History</h3>
                      <p className="text-enzobay-neutral-600 mb-6">
                        Track, view and manage all your orders in one place.
                      </p>
                      <Link
                        to="/orders"
                        className="inline-block bg-enzobay-blue hover:bg-enzobay-blue-dark text-white font-medium px-6 py-2 rounded-md transition-colors duration-300"
                      >
                        View Complete Order History
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-enzobay-brown">My Addresses</h2>
                    <button className="text-enzobay-blue hover:text-enzobay-blue-dark">
                      Add New
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-enzobay-neutral-200 rounded-md p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">Default Address</h3>
                        <div className="flex space-x-2">
                          <button className="text-enzobay-blue hover:text-enzobay-blue-dark text-sm">Edit</button>
                          <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                        </div>
                      </div>
                      <p className="text-sm text-enzobay-neutral-700">
                        {USER.name}<br />
                        {USER.address.street}<br />
                        {USER.address.city}, {USER.address.postalCode}<br />
                        {USER.address.country}<br />
                        {USER.phone}
                      </p>
                    </div>
                    
                    <div className="border border-dashed border-enzobay-neutral-300 rounded-md p-4 flex items-center justify-center">
                      <button className="text-enzobay-blue hover:text-enzobay-blue-dark">
                        + Add New Address
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-enzobay-brown">My Wishlist</h2>
                  </div>
                  
                  <div className="border border-enzobay-neutral-200 rounded-md overflow-hidden">
                    <div className="p-6 text-center">
                      <h3 className="text-lg font-medium text-enzobay-brown mb-4">View Your Wishlist</h3>
                      <p className="text-enzobay-neutral-600 mb-6">
                        See all the products you've saved for later.
                      </p>
                      <Link
                        to="/wishlist"
                        className="inline-block bg-enzobay-blue hover:bg-enzobay-blue-dark text-white font-medium px-6 py-2 rounded-md transition-colors duration-300"
                      >
                        View Wishlist
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Security Tab */}
              {activeTab === "security" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-enzobay-brown">Security</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-enzobay-brown mb-3">Change Password</h3>
                      <form className="space-y-4">
                        <div>
                          <label htmlFor="current-password" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            id="current-password"
                            className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="new-password" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="new-password"
                            className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="confirm-password" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="confirm-password"
                            className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                          />
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="bg-enzobay-blue hover:bg-enzobay-blue-dark text-white font-medium px-4 py-2 rounded-md transition-colors duration-300"
                          >
                            Update Password
                          </button>
                        </div>
                      </form>
                    </div>
                    
                    <div className="border-t border-enzobay-neutral-200 pt-6">
                      <h3 className="font-medium text-enzobay-brown mb-3">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-enzobay-neutral-600">Add an extra layer of security to your account</p>
                        </div>
                        <button className="bg-enzobay-neutral-100 hover:bg-enzobay-neutral-200 text-enzobay-neutral-700 px-4 py-2 rounded-md transition-colors duration-300">
                          Enable
                        </button>
                      </div>
                    </div>
                    
                    <div className="border-t border-enzobay-neutral-200 pt-6">
                      <h3 className="font-medium text-red-600 mb-3">Delete Account</h3>
                      <p className="text-enzobay-neutral-600 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <button className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md transition-colors duration-300">
                        Delete My Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountPage;
