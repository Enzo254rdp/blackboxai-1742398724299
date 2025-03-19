
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useScrollToTop } from "../hooks/use-scroll";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();
  useScrollToTop();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div>
      <Navbar />
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4 py-16">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-enzobay-brown mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">We couldn't find the page you're looking for</p>
          <p className="text-gray-500 mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <div className="space-y-4">
            <Link to="/" className="block w-full bg-enzobay-blue hover:bg-enzobay-blue-dark text-white font-medium py-3 px-6 rounded-md transition-colors duration-300">
              Return to Home
            </Link>
            <Link to="/products" className="block w-full bg-white border border-enzobay-neutral-300 hover:bg-enzobay-neutral-100 text-enzobay-neutral-800 font-medium py-3 px-6 rounded-md transition-colors duration-300">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
