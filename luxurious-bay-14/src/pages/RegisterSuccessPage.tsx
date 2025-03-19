
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RegisterSuccessPage() {
  return (
    <div className="min-h-screen bg-enzobay-neutral-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden p-8 text-center">
          <div className="mb-8 flex flex-col items-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-4">
              Registration Successful!
            </h1>
            <p className="text-enzobay-neutral-600 max-w-md">
              Your account has been created successfully. Start exploring our premium collection of luxury products.
            </p>
          </div>
          
          <div className="mb-8 p-6 bg-enzobay-neutral-50 rounded-lg">
            <h2 className="text-lg font-semibold text-enzobay-brown mb-3">What's Next?</h2>
            <ul className="space-y-4 text-left">
              <li className="flex">
                <div className="flex-shrink-0 w-6 h-6 bg-enzobay-blue rounded-full flex items-center justify-center text-white font-semibold text-xs mr-3 mt-0.5">
                  1
                </div>
                <span className="text-enzobay-neutral-700">
                  <strong>Complete your profile</strong> - Add your shipping details and preferences for a smoother checkout experience.
                </span>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 w-6 h-6 bg-enzobay-blue rounded-full flex items-center justify-center text-white font-semibold text-xs mr-3 mt-0.5">
                  2
                </div>
                <span className="text-enzobay-neutral-700">
                  <strong>Browse our latest collections</strong> - Discover our newest arrivals and best-selling products.
                </span>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 w-6 h-6 bg-enzobay-blue rounded-full flex items-center justify-center text-white font-semibold text-xs mr-3 mt-0.5">
                  3
                </div>
                <span className="text-enzobay-neutral-700">
                  <strong>Check out our flash sales</strong> - Limited-time offers on premium products you don't want to miss.
                </span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/account"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-enzobay-blue hover:bg-enzobay-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-enzobay-blue transition-colors"
            >
              My Account
            </Link>
            <Link
              to="/products"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-enzobay-orange hover:bg-enzobay-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-enzobay-orange transition-colors"
            >
              Start Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
