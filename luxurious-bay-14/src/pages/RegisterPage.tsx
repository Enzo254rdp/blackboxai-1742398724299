
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus, Mail, Lock, ArrowLeft, User, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1); // Step 1: Personal info, Step 2: Account details
  const navigate = useNavigate();

  const validateStep1 = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your first and last name");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!email.trim()) {
      setError("Please enter your email address");
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    if (!agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return false;
    }
    
    return true;
  };

  const nextStep = () => {
    setError(null);
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setError(null);
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateStep2()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      // This would be replaced with actual registration logic
      setTimeout(() => {
        // Success - would be replaced with proper registration flow
        navigate("/register-success");
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError("An error occurred. Please try again later.");
      setIsLoading(false);
    }
  };

  const passwordStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length < 10) return 2;
    if (password.length >= 10) return 3;
  };

  return (
    <div className="min-h-screen bg-enzobay-neutral-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <div className="mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center text-enzobay-blue hover:text-enzobay-blue-dark transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>
            
            <div className="text-center md:text-left mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-2">Create Account</h1>
              <p className="text-enzobay-neutral-600">
                Join EnzoBay for a premium shopping experience
              </p>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center mb-8">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-enzobay-blue text-white' : 'bg-enzobay-neutral-200 text-enzobay-neutral-500'}`}>
                1
              </div>
              <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-enzobay-blue' : 'bg-enzobay-neutral-200'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-enzobay-blue text-white' : 'bg-enzobay-neutral-200 text-enzobay-neutral-500'}`}>
                2
              </div>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 ? (
                /* Step 1: Personal Information */
                <>
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-enzobay-neutral-700">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-enzobay-neutral-400" />
                      </div>
                      <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-enzobay-neutral-300 rounded-md shadow-sm focus:ring-enzobay-blue focus:border-enzobay-blue bg-white text-enzobay-neutral-900"
                        placeholder="John"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-enzobay-neutral-700">
                      Last Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-enzobay-neutral-400" />
                      </div>
                      <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-enzobay-neutral-300 rounded-md shadow-sm focus:ring-enzobay-blue focus:border-enzobay-blue bg-white text-enzobay-neutral-900"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-enzobay-blue hover:bg-enzobay-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-enzobay-blue transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </>
              ) : (
                /* Step 2: Account Information */
                <>
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
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-enzobay-neutral-700">
                      Password
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
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="agreeTerms"
                          name="agreeTerms"
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="h-4 w-4 text-enzobay-blue focus:ring-enzobay-blue border-enzobay-neutral-300 rounded"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="agreeTerms" className="text-enzobay-neutral-700">
                          I agree to the{" "}
                          <Link to="/terms" className="text-enzobay-blue hover:text-enzobay-blue-dark">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy" className="text-enzobay-blue hover:text-enzobay-blue-dark">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="receiveUpdates"
                          name="receiveUpdates"
                          type="checkbox"
                          checked={receiveUpdates}
                          onChange={(e) => setReceiveUpdates(e.target.checked)}
                          className="h-4 w-4 text-enzobay-blue focus:ring-enzobay-blue border-enzobay-neutral-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="receiveUpdates" className="text-enzobay-neutral-700">
                          I would like to receive updates on new products, special offers, and promotions
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 py-3 px-4 border border-enzobay-neutral-300 rounded-md shadow-sm text-enzobay-neutral-700 bg-white hover:bg-enzobay-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-enzobay-blue transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-enzobay-blue hover:bg-enzobay-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-enzobay-blue transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating...
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-5 w-5" />
                          Create Account
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-enzobay-neutral-600">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-enzobay-blue hover:text-enzobay-blue-dark">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
          
          {/* Right Side - Image/Banner */}
          <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-enzobay-orange to-enzobay-orange-dark p-12">
            <div className="h-full flex flex-col justify-between">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
                <p className="text-white/80 mb-8">
                  Create an account to unlock exclusive benefits and join our growing community of luxury shoppers.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <span className="text-white/90">Access exclusive member-only deals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <span className="text-white/90">Save favorite products and collections</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <span className="text-white/90">Track orders and manage returns easily</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <span className="text-white/90">Earn rewards with every purchase</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <p className="text-sm text-white/70">
                  Your data is protected with state-of-the-art encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
