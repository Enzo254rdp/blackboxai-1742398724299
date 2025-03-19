
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Truck, Clock, ShieldCheck, MapPin } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-enzobay-neutral-50">
      <Navbar />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-enzobay-brown mb-4">Shipping & Delivery</h1>
            <p className="text-lg text-enzobay-neutral-600 max-w-3xl mx-auto">
              Information about our shipping policies, delivery times, and how we ensure your purchases reach you safely and on time.
            </p>
          </div>
          
          {/* Shipping Services */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-enzobay-brown mb-8">Our Shipping Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Standard Shipping */}
              <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-enzobay-blue/10 rounded-full flex items-center justify-center text-enzobay-blue mr-4">
                    <Truck className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-enzobay-brown">Standard Shipping</h3>
                </div>
                <p className="text-enzobay-neutral-600 mb-4">
                  Our standard shipping service delivers your orders within 3-7 business days. Available nationwide with tracking provided for your convenience.
                </p>
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="text-enzobay-blue font-semibold mr-2">•</span>
                    <span className="text-enzobay-neutral-700">Nairobi: 1-3 business days</span>
                  </li>
                  <li className="flex">
                    <span className="text-enzobay-blue font-semibold mr-2">•</span>
                    <span className="text-enzobay-neutral-700">Major Towns: 2-5 business days</span>
                  </li>
                  <li className="flex">
                    <span className="text-enzobay-blue font-semibold mr-2">•</span>
                    <span className="text-enzobay-neutral-700">Other Locations: 3-7 business days</span>
                  </li>
                </ul>
              </div>
              
              {/* Express Shipping */}
              <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-enzobay-orange/10 rounded-full flex items-center justify-center text-enzobay-orange mr-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-enzobay-brown">Express Shipping</h3>
                </div>
                <p className="text-enzobay-neutral-600 mb-4">
                  Need your order quickly? Our express shipping service ensures delivery within 1-2 business days for most locations across Kenya.
                </p>
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="text-enzobay-orange font-semibold mr-2">•</span>
                    <span className="text-enzobay-neutral-700">Nairobi: Same day - next day</span>
                  </li>
                  <li className="flex">
                    <span className="text-enzobay-orange font-semibold mr-2">•</span>
                    <span className="text-enzobay-neutral-700">Major Towns: 1-2 business days</span>
                  </li>
                  <li className="flex">
                    <span className="text-enzobay-orange font-semibold mr-2">•</span>
                    <span className="text-enzobay-neutral-700">Other Locations: 2-3 business days</span>
                  </li>
                </ul>
              </div>
              
              {/* International Shipping */}
              <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-enzobay-blue/10 rounded-full flex items-center justify-center text-enzobay-blue mr-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-enzobay-brown">International Shipping</h3>
                </div>
                <p className="text-enzobay-neutral-600 mb-4">
                  We ship to select international destinations. Delivery times vary by location and shipping method chosen.
                </p>
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="text-enzobay-blue font-semibold mr-2">•</span>
                    <span className="text-enzobay-neutral-700">East Africa: 5-10 business days</span>
                  </li>
                  <li className="flex">
                    <span className="text-enzobay-blue font-semibold mr-2">•</span>
                    <span className="text-enzobay-neutral-700">Rest of Africa: 7-14 business days</span>
                  </li>
                  <li className="flex">
                    <span className="text-enzobay-blue font-semibold mr-2">•</span>
                    <span className="text-enzobay-neutral-700">International: 10-21 business days</span>
                  </li>
                </ul>
              </div>
              
              {/* Free Shipping */}
              <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-enzobay-orange/10 rounded-full flex items-center justify-center text-enzobay-orange mr-4">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-enzobay-brown">Free Shipping</h3>
                </div>
                <p className="text-enzobay-neutral-600 mb-4">
                  Enjoy free standard shipping on orders over KSH 5,000 within Kenya. No promo code needed, discount applies automatically at checkout.
                </p>
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="text-enzobay-orange font-semibold mr-2">•</span>
                    <span className="text-enzobay-neutral-700">Minimum order: KSH 5,000</span>
                  </li>
                  <li className="flex">
                    <span className="text-enzobay-orange font-semibold mr-2">•</span>
                    <span className="text-enzobay-neutral-700">Available for standard shipping only</span>
                  </li>
                  <li className="flex">
                    <span className="text-enzobay-orange font-semibold mr-2">•</span>
                    <span className="text-enzobay-neutral-700">Some restrictions apply for remote locations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Shipping Rates */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-enzobay-brown mb-6">Shipping Rates</h2>
            <div className="bg-white rounded-xl overflow-hidden border border-enzobay-neutral-200">
              <table className="w-full">
                <thead className="bg-enzobay-neutral-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-enzobay-brown">Location</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-enzobay-brown">Standard</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-enzobay-brown">Express</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-enzobay-neutral-200">
                  <tr>
                    <td className="px-4 py-3 text-enzobay-neutral-700">Nairobi CBD & Suburbs</td>
                    <td className="px-4 py-3 text-enzobay-neutral-700">KSH 200</td>
                    <td className="px-4 py-3 text-enzobay-neutral-700">KSH 350</td>
                  </tr>
                  <tr className="bg-enzobay-neutral-50">
                    <td className="px-4 py-3 text-enzobay-neutral-700">Greater Nairobi</td>
                    <td className="px-4 py-3 text-enzobay-neutral-700">KSH 300</td>
                    <td className="px-4 py-3 text-enzobay-neutral-700">KSH 450</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-enzobay-neutral-700">Major Towns</td>
                    <td className="px-4 py-3 text-enzobay-neutral-700">KSH 400</td>
                    <td className="px-4 py-3 text-enzobay-neutral-700">KSH 650</td>
                  </tr>
                  <tr className="bg-enzobay-neutral-50">
                    <td className="px-4 py-3 text-enzobay-neutral-700">Other Locations</td>
                    <td className="px-4 py-3 text-enzobay-neutral-700">KSH 500</td>
                    <td className="px-4 py-3 text-enzobay-neutral-700">KSH 800</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-enzobay-neutral-700">East Africa</td>
                    <td className="px-4 py-3 text-enzobay-neutral-700">KSH 1,500</td>
                    <td className="px-4 py-3 text-enzobay-neutral-700">KSH 2,500</td>
                  </tr>
                  <tr className="bg-enzobay-neutral-50">
                    <td className="px-4 py-3 text-enzobay-neutral-700">International</td>
                    <td className="px-4 py-3 text-enzobay-neutral-700">Calculated at checkout</td>
                    <td className="px-4 py-3 text-enzobay-neutral-700">Calculated at checkout</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-enzobay-neutral-500 mt-3">
              Note: Shipping rates are subject to change and may vary for large or heavy items. Exact shipping costs will be calculated at checkout.
            </p>
          </div>
          
          {/* Shipping Information */}
          <div className="max-w-4xl mx-auto mb-16 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-enzobay-brown mb-4">Order Processing</h2>
              <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200">
                <p className="text-enzobay-neutral-700 mb-4">
                  Orders are typically processed within 24 hours of being placed, excluding weekends and public holidays. During peak seasons or promotional periods, processing may take up to 48 hours.
                </p>
                <p className="text-enzobay-neutral-700">
                  Once your order has been processed, you will receive a confirmation email with tracking information. You can also track your order through your account dashboard.
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-enzobay-brown mb-4">Delivery Details</h2>
              <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200">
                <p className="text-enzobay-neutral-700 mb-4">
                  Please ensure that the delivery address provided is accurate and complete. Include any relevant landmarks or directions that might help our delivery personnel locate your address efficiently.
                </p>
                <p className="text-enzobay-neutral-700 mb-4">
                  Someone must be available at the delivery address to receive and sign for the package. If no one is available, our delivery personnel will attempt delivery again the next business day.
                </p>
                <p className="text-enzobay-neutral-700">
                  For valuable items, we may require identification verification at the time of delivery for security purposes.
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-enzobay-brown mb-4">Package Tracking</h2>
              <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200">
                <p className="text-enzobay-neutral-700 mb-4">
                  All shipments come with tracking capability. Once your order is shipped, you will receive an email with your tracking number and instructions on how to track your package.
                </p>
                <p className="text-enzobay-neutral-700">
                  You can also track your order by logging into your account and navigating to the "Orders" section, or by using the "Track Order" feature on our website with your order number and email address.
                </p>
              </div>
            </div>
          </div>
          
          {/* Shipping FAQ */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-enzobay-brown mb-6">Frequently Asked Questions</h2>
            <div className="bg-white rounded-xl border border-enzobay-neutral-200 divide-y divide-enzobay-neutral-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-2">What if I'm not home to receive my delivery?</h3>
                <p className="text-enzobay-neutral-600">
                  If you're not home during the delivery attempt, our courier will leave a notice and attempt delivery again the next business day. After three unsuccessful attempts, the package will be returned to our warehouse, and you'll need to contact customer service to arrange redelivery.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-2">Can I change my delivery address after placing an order?</h3>
                <p className="text-enzobay-neutral-600">
                  Address changes may be possible if the order hasn't been processed for shipping yet. Please contact our customer support team immediately if you need to change your delivery address.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-2">Do you ship to P.O. Box addresses?</h3>
                <p className="text-enzobay-neutral-600">
                  Yes, we can ship to P.O. Box addresses for standard shipping within Kenya. However, express shipping and international orders require a physical street address for delivery.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-2">What happens if my package is lost or damaged?</h3>
                <p className="text-enzobay-neutral-600">
                  In the rare event that your package is lost or damaged during transit, please contact our customer support within 48 hours of the expected delivery date. We'll investigate the issue and arrange for a replacement or refund.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-enzobay-neutral-600 mb-4">
                Have more questions about shipping and delivery?
              </p>
              <a href="/contact" className="btn-primary inline-block">
                Contact Customer Support
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
