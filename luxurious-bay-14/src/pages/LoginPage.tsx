
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore, simulateLogin } from "@/lib/auth-store";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Automatically detect admin email
    const role = email.includes("admin") ? "admin" : 
                 email.includes("seller") ? "seller" : "customer";
    
    // Simulate login with detected role
    const user = simulateLogin(role);
    
    toast({
      title: "Login successful",
      description: `Welcome back, ${user.name}!`,
    });
    
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "seller") {
      navigate("/seller");
    } else {
      navigate("/");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto bg-gradient-to-r from-enzobay-neutral-100 to-enzobay-neutral-200 border border-enzobay-neutral-300">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-gradient-gold">Sign in</CardTitle>
          <CardDescription className="text-enzobay-neutral-700">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-enzobay-neutral-800">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-enzobay-orange-light focus:border-enzobay-orange focus:ring-enzobay-orange"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-enzobay-neutral-800">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-enzobay-blue hover:text-enzobay-blue-dark hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10 border-enzobay-orange-light focus:border-enzobay-orange focus:ring-enzobay-orange"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-enzobay-neutral-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-enzobay-orange hover:bg-enzobay-orange-dark">
              Sign in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-enzobay-neutral-700">
            Don't have an account?{" "}
            <Link to="/register" className="text-enzobay-blue hover:text-enzobay-blue-dark hover:underline">
              Create account
            </Link>
          </div>
          <div className="text-sm text-center text-enzobay-neutral-700">
            Want to become a seller?{" "}
            <Link to="/seller/register" className="text-enzobay-blue hover:text-enzobay-blue-dark hover:underline">
              Register as a seller
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
