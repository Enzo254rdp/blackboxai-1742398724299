
import { Link } from "react-router-dom";
import { Mail, Phone, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import EnzoBayLogo from "./EnzoBayLogo";

export default function Footer() {
  return (
    <footer className="bg-enzobay-brown text-white border-t">
      {/* Compact footer with reduced height */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
          {/* Column 1: Logo and Contact */}
          <div className="col-span-2">
            <EnzoBayLogo variant="light" className="mb-3" />
            <div className="flex flex-col space-y-1 text-sm">
              <a href="tel:+254792012904" className="text-enzobay-neutral-300 hover:text-white flex items-center">
                <Phone className="h-4 w-4 mr-2 text-enzobay-orange" />
                +254 792 012 904
              </a>
              <a href="mailto:info@enzobay.com" className="text-enzobay-neutral-300 hover:text-white flex items-center">
                <Mail className="h-4 w-4 mr-2 text-enzobay-orange" />
                info@enzobay.com
              </a>
              <div className="flex space-x-2 mt-3">
                <a href="#" className="text-enzobay-neutral-300 hover:text-enzobay-orange">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="text-enzobay-neutral-300 hover:text-enzobay-orange">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="text-enzobay-neutral-300 hover:text-enzobay-orange">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="text-enzobay-neutral-300 hover:text-enzobay-orange">
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="text-sm">
            <h3 className="font-semibold mb-2 text-enzobay-orange">Products</h3>
            <ul className="space-y-1">
              <li><Link to="/products?category=clothing" className="text-enzobay-neutral-300 hover:text-white">Clothing</Link></li>
              <li><Link to="/products?category=electronics" className="text-enzobay-neutral-300 hover:text-white">Electronics</Link></li>
              <li><Link to="/products?category=accessories" className="text-enzobay-neutral-300 hover:text-white">Accessories</Link></li>
              <li><Link to="/flash-sale" className="text-enzobay-neutral-300 hover:text-white">Flash Sale</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Information */}
          <div className="text-sm">
            <h3 className="font-semibold mb-2 text-enzobay-orange">Information</h3>
            <ul className="space-y-1">
              <li><Link to="/about" className="text-enzobay-neutral-300 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-enzobay-neutral-300 hover:text-white">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-enzobay-neutral-300 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-enzobay-neutral-300 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Support */}
          <div className="text-sm">
            <h3 className="font-semibold mb-2 text-enzobay-orange">Support</h3>
            <ul className="space-y-1">
              <li><Link to="/faq" className="text-enzobay-neutral-300 hover:text-white">FAQs</Link></li>
              <li><Link to="/shipping" className="text-enzobay-neutral-300 hover:text-white">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-enzobay-neutral-300 hover:text-white">Returns</Link></li>
              <li><Link to="/track-order" className="text-enzobay-neutral-300 hover:text-white">Track Order</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-enzobay-neutral-400 text-xs">
            &copy; {new Date().getFullYear()} EnzoBay. All rights reserved.
          </p>
          <div className="flex gap-2 mt-2 md:mt-0">
            <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-5 w-auto" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-5 w-auto" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="PayPal" className="h-5 w-auto" />
            <img src="https://cdn-icons-png.flaticon.com/512/5977/5977576.png" alt="M-Pesa" className="h-5 w-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
}
