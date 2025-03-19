
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, ArrowLeft, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [resetSuccess, setResetSuccess] = useState(false);

  const passwordStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length < 10) return 2;
    if (password.length >= 10) return 3;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      // This would be replaced with actual password reset logic
      setTimeout(() => {
        setResetSuccess(true);
        setIsLoading(false);
        
        // Redirect to login after successful reset
        setTimeout(() => {
          navigate("/login");
        }, 3000);
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
          {!resetSuccess ? (
            <>
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
                  <Lock className="h-8 w-8 text-enzobay-blue" />
                </div>
                <h1 className="text-2xl font-bold text-enzobay-brown mb-2">
                  Reset Your Password
                </h1>
                <p className="text-enzobay-neutral-600">
                  Create a new password for your account
                </p>
              </div>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-enzobay-neutral-700">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-enzobay-neutral-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-3 border border-enzobay-neutral-300 rounded-md shadow-sm focus:ring-enzobay-blue focus:border-enzobay-blue bg-white text-enzobay-neutral-900"
                      placeholder="••••••••"
                      required
                      minLength={8}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-enzobay-neutral-400 hover:text-enzobay-neutral-600 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {password.length > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-xs font-medium text-enzobay-neutral-700">
                          Password Strength:
                        </div>
                        <div className="text-xs font-medium">
                          {passwordStrength() === 1 && <span className="text-red-500">Weak</span>}
                          {passwordStrength() === 2 && <span className="text-yellow-500">Medium</span>}
                          {passwordStrength() === 3 && <span className="text-green-500">Strong</span>}
                        </div>
                      </div>
                      <div className="w-full bg-enzobay-neutral-200 rounded-full h-1.5 mb-1">
                        <div 
                          className={`h-1.5 rounded-full ${
                            passwordStrength() === 1 ? 'bg-red-500 w-1/3' : 
                            passwordStrength() === 2 ? 'bg-yellow-500 w-2/3' : 
                            'bg-green-500 w-full'
                          }`}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-enzobay-neutral-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-enzobay-neutral-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-3 border border-enzobay-neutral-300 rounded-md shadow-sm focus:ring-enzobay-blue focus:border-enzobay-blue bg-white text-enzobay-neutral-900"
                      placeholder="••••••••"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-enzobay-neutral-400 hover:text-enzobay-neutral-600 focus:outline-none"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Password Match Indicator */}
                  {confirmPassword.length > 0 && (
                    <div className={`text-xs mt-1 flex items-center ${password === confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
                      {password === confirmPassword ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Passwords match
                        </>
                      ) : (
                        <>
                          <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Passwords do not match
                        </>
                      )}
                    </div>
                  )}
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
                        Resetting...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-enzobay-brown mb-2">
                Password Reset Complete
              </h1>
              <p className="text-enzobay-neutral-600 mb-6">
                Your password has been reset successfully. You'll be redirected to the login page shortly.
              </p>
              <Link
                to="/login"
                className="block w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-enzobay-blue hover:bg-enzobay-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-enzobay-blue transition-colors"
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
