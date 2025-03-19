
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Send } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      // This would be replaced with actual password reset logic
      setTimeout(() => {
        setEmailSent(true);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError("An error occurred. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-enzobay-neutral-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-8">
          <div className="mb-8">
            <Link 
              to="/login" 
              className="inline-flex items-center text-enzobay-blue hover:text-enzobay-blue-dark transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-enzobay-blue/10 rounded-full mb-4">
              <Mail className="h-8 w-8 text-enzobay-blue" />
            </div>
            <h1 className="text-2xl font-bold text-enzobay-brown mb-2">
              {emailSent ? "Check Your Email" : "Forgot Password?"}
            </h1>
            <p className="text-enzobay-neutral-600">
              {emailSent 
                ? "We've sent password reset instructions to your email." 
                : "No worries, we'll send you reset instructions."}
            </p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}
          
          {!emailSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-enzobay-neutral-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-enzobay-neutral-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-enzobay-neutral-300 rounded-md shadow-sm focus:ring-enzobay-blue focus:border-enzobay-blue bg-white text-enzobay-neutral-900"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-enzobay-blue hover:bg-enzobay-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-enzobay-blue transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Reset Password
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-enzobay-blue/5 rounded-lg p-4 text-sm text-enzobay-neutral-700">
                <p className="mb-2">
                  <strong>Note:</strong> If you don't see the email in your inbox, please check your spam folder.
                </p>
                <p>
                  The link in the email will expire in 30 minutes for security reasons.
                </p>
              </div>
              
              <button
                onClick={() => setEmailSent(false)}
                className="w-full py-3 px-4 border border-enzobay-neutral-300 rounded-md shadow-sm text-enzobay-neutral-700 bg-white hover:bg-enzobay-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-enzobay-blue transition-colors"
              >
                Resend Email
              </button>
            </div>
          )}
          
          <div className="mt-8 text-center">
            <p className="text-sm text-enzobay-neutral-600">
              Remember your password?{" "}
              <Link to="/login" className="font-medium text-enzobay-blue hover:text-enzobay-blue-dark">
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
