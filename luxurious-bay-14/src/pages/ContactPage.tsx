
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin, Clock, ArrowRight, Send } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setSubmitSuccess(false);
    setSubmitError(false);
    setIsSubmitting(true);
    
    // Simulate form submission with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };
  
  return (
    <div className="bg-enzobay-neutral-50 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-enzobay-blue py-16 md:py-24">
          <div className="absolute inset-0 pattern-dots pattern-blue-500 pattern-bg-white pattern-size-4 pattern-opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Contact Us</h1>
              <p className="mt-4 text-xl text-enzobay-blue-50 max-w-3xl mx-auto">
                We'd love to hear from you. Our team is always ready to assist you with any questions or concerns.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-enzobay-neutral-50 rounded-lg p-6 text-center flex flex-col items-center">
                <div className="w-14 h-14 bg-enzobay-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-enzobay-blue" />
                </div>
                <h3 className="text-lg font-semibold text-enzobay-brown mb-2">Phone</h3>
                <p className="text-enzobay-neutral-600 mb-4">Reach out to our customer service team</p>
                <a href="tel:+254792012904" className="text-enzobay-blue font-medium hover:text-enzobay-blue-dark">
                  +254 792 012 904
                </a>
              </div>
              
              <div className="bg-enzobay-neutral-50 rounded-lg p-6 text-center flex flex-col items-center">
                <div className="w-14 h-14 bg-enzobay-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-enzobay-blue" />
                </div>
                <h3 className="text-lg font-semibold text-enzobay-brown mb-2">Email</h3>
                <p className="text-enzobay-neutral-600 mb-4">Send us an email and we'll respond within 24 hours</p>
                <a href="mailto:support@enzobay.com" className="text-enzobay-blue font-medium hover:text-enzobay-blue-dark">
                  support@enzobay.com
                </a>
              </div>
              
              <div className="bg-enzobay-neutral-50 rounded-lg p-6 text-center flex flex-col items-center">
                <div className="w-14 h-14 bg-enzobay-blue-50 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-enzobay-blue" />
                </div>
                <h3 className="text-lg font-semibold text-enzobay-brown mb-2">Office</h3>
                <p className="text-enzobay-neutral-600 mb-4">Visit our store in Nairobi</p>
                <p className="text-enzobay-blue font-medium">
                  456 EnzoBay Plaza, Nairobi, Kenya
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Form and Map */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-4">Get In Touch</h2>
              <p className="text-enzobay-neutral-600 max-w-2xl mx-auto">
                Have a question or need assistance? Fill out the form below and our team will get back to you as soon as possible.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="block w-full rounded-md border-enzobay-neutral-300 shadow-sm focus:border-enzobay-blue focus:ring-enzobay-blue sm:text-sm"
                        placeholder="John Doe"
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
                        required
                        className="block w-full rounded-md border-enzobay-neutral-300 shadow-sm focus:border-enzobay-blue focus:ring-enzobay-blue sm:text-sm"
                        placeholder="your@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md border-enzobay-neutral-300 shadow-sm focus:border-enzobay-blue focus:ring-enzobay-blue sm:text-sm"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="block w-full rounded-md border-enzobay-neutral-300 shadow-sm focus:border-enzobay-blue focus:ring-enzobay-blue sm:text-sm"
                      placeholder="Please provide details about your inquiry..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center rounded-md border border-transparent bg-enzobay-blue px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-enzobay-blue-dark focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:ring-offset-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                    
                    {submitSuccess && (
                      <div className="mt-4 bg-green-50 text-green-800 p-3 rounded-md text-sm">
                        Thank you for your message! We'll get back to you soon.
                      </div>
                    )}
                    
                    {submitError && (
                      <div className="mt-4 bg-red-50 text-red-800 p-3 rounded-md text-sm">
                        There was an error sending your message. Please try again.
                      </div>
                    )}
                  </div>
                </form>
              </div>
              
              {/* Map and Business Hours */}
              <div>
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-lg font-medium text-enzobay-brown mb-4">Business Hours</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-enzobay-neutral-600">Monday - Friday</span>
                      <span className="font-medium text-enzobay-neutral-900">8:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-enzobay-neutral-600">Saturday</span>
                      <span className="font-medium text-enzobay-neutral-900">9:00 AM - 5:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-enzobay-neutral-600">Sunday</span>
                      <span className="font-medium text-enzobay-neutral-900">10:00 AM - 4:00 PM</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6 border-t border-enzobay-neutral-200 pt-6 flex items-center">
                    <Clock className="h-5 w-5 text-enzobay-neutral-500" />
                    <span className="ml-2 text-enzobay-neutral-600 text-sm">
                      Customer service available during business hours
                    </span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg overflow-hidden shadow-sm h-[300px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.36143129881!2d36.70730566026228!3d-1.3031933855189707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1645532312831!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="EnzoBay location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-4">Frequently Asked Questions</h2>
              <p className="text-enzobay-neutral-600 max-w-2xl mx-auto">
                Have questions? We've got answers. If you don't find what you're looking for, feel free to contact us.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-enzobay-neutral-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-enzobay-brown mb-2">What are your shipping rates?</h3>
                <p className="text-enzobay-neutral-600">
                  We offer free shipping on all orders over KSh 5,000. For orders under this amount, shipping rates vary based on location and package size.
                </p>
              </div>
              
              <div className="bg-enzobay-neutral-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-enzobay-brown mb-2">How can I track my order?</h3>
                <p className="text-enzobay-neutral-600">
                  Once your order ships, you will receive a confirmation email with a tracking number and instructions on how to track your package.
                </p>
              </div>
              
              <div className="bg-enzobay-neutral-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-enzobay-brown mb-2">What is your return policy?</h3>
                <p className="text-enzobay-neutral-600">
                  We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Please visit our Returns page for more information.
                </p>
              </div>
              
              <div className="bg-enzobay-neutral-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-enzobay-brown mb-2">Do you offer international shipping?</h3>
                <p className="text-enzobay-neutral-600">
                  Yes, we ship to select countries internationally. Shipping rates and delivery times vary by location. Contact us for specific information.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link
                to="/faq"
                className="inline-flex items-center text-enzobay-blue font-medium hover:text-enzobay-blue-dark"
              >
                View all FAQs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
