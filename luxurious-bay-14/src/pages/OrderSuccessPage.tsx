
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle, FileText, Home, Package, ShoppingBag } from "lucide-react";

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const orderNumber = "EB" + Math.floor(100000 + Math.random() * 900000);
  
  // Redirect to home if user refreshes this page or visits directly
  useEffect(() => {
    const timeout = setTimeout(() => {
      const fromCheckout = sessionStorage.getItem('fromCheckout');
      if (!fromCheckout) {
        navigate('/');
      }
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [navigate]);
  
  useEffect(() => {
    // Set a flag to prevent redirect on initial render
    sessionStorage.setItem('fromCheckout', 'true');
    
    return () => {
      // Clean up on unmount
      sessionStorage.removeItem('fromCheckout');
    };
  }, []);
  
  return (
    <div className="bg-enzobay-neutral-50 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mx-auto mb-6">
            <CheckCircle className="h-14 w-14 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-enzobay-brown mb-4">
            Order Successful!
          </h1>
          
          <p className="text-lg text-enzobay-neutral-600 mb-4">
            Thank you for your order! Your order has been placed and is being processed.
          </p>
          
          <div className="bg-enzobay-neutral-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-enzobay-neutral-600 mb-2">
              Order Number:
            </p>
            <p className="text-lg font-medium text-enzobay-brown">
              {orderNumber}
            </p>
          </div>
          
          <p className="text-sm text-enzobay-neutral-500 mb-8">
            A confirmation email has been sent to your email address. We'll notify you when your order has shipped.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md border border-enzobay-neutral-300 bg-white px-4 py-3 text-sm font-medium text-enzobay-neutral-700 shadow-sm hover:bg-enzobay-neutral-50"
            >
              <Home className="h-5 w-5 mr-2" />
              Return Home
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-enzobay-blue px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-enzobay-blue-dark"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
        
        <div className="max-w-2xl w-full mt-12">
          <h2 className="text-lg font-medium text-enzobay-brown mb-6 text-center">
            What happens next?
          </h2>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-enzobay-blue-50 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-enzobay-blue" />
              </div>
              <h3 className="font-medium text-enzobay-brown mb-2">Order Confirmation</h3>
              <p className="text-sm text-enzobay-neutral-600">
                You'll receive an email confirmation with your order details.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-enzobay-blue-50 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-enzobay-blue" />
              </div>
              <h3 className="font-medium text-enzobay-brown mb-2">Order Processing</h3>
              <p className="text-sm text-enzobay-neutral-600">
                We'll prepare your items and notify you once they ship.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-enzobay-blue-50 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-enzobay-blue" />
              </div>
              <h3 className="font-medium text-enzobay-brown mb-2">Delivery</h3>
              <p className="text-sm text-enzobay-neutral-600">
                Your order will be delivered to your specified address.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Truck icon component since it's missing from the imports
function Truck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
  );
}
