
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import SalePage from "./pages/SalePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import ShippingPage from "./pages/ShippingPage";
import ReturnsPage from "./pages/ReturnsPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import FlashSalePage from "./pages/FlashSalePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import RegisterSuccessPage from "./pages/RegisterSuccessPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import AccountPage from "./pages/AccountPage";
import OrdersPage from "./pages/OrdersPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import AdminBannerManager from "./pages/admin/BannerManager";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FlashSaleManager from "./pages/admin/FlashSaleManager";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerRegistration from "./pages/seller/SellerRegistration";
import { useScrollToTop } from "./hooks/use-scroll";
import { useAuthStore } from "./lib/auth-store";

// Temporarily disabled protected routes
// const AdminRoute = ({ children }) => {
//   const { isAuthenticated, user } = useAuthStore();
//   return isAuthenticated && user?.role === 'admin' ? children : <Navigate to="/login" />;
// };

// const SellerRoute = ({ children }) => {
//   const { isAuthenticated, user } = useAuthStore();
//   return isAuthenticated && user?.role === 'seller' ? children : <Navigate to="/seller/register" />;
// };

const queryClient = new QueryClient();

const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/products/:category" element={<CategoryProductsPage />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="/flash-sale" element={<FlashSalePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/register-success" element={<RegisterSuccessPage />} />
          
          {/* User Account Routes */}
          <Route path="/account" element={<AccountPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/track-order" element={<OrderTrackingPage />} />
          
          {/* Shopping Routes */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          
          {/* Admin Routes - Protected routes temporarily disabled */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/banners" element={<AdminBannerManager />} />
          <Route path="/admin/flash-sales" element={<FlashSaleManager />} />
          
          {/* Seller Routes - Protected routes temporarily disabled */}
          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/seller/register" element={<SellerRegistration />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
