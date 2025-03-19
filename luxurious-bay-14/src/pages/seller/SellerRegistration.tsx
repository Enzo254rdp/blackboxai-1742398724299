
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useScrollToTop } from "../../hooks/use-scroll";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Store, Upload, Shield, CheckSquare } from "lucide-react";

// Form schema for seller registration
const sellerFormSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  registrationNumber: z.string().optional(),
  businessType: z.string({
    required_error: "Please select a business type.",
  }),
  description: z.string().min(10, {
    message: "Business description must be at least 10 characters.",
  }).max(500, {
    message: "Business description must not exceed 500 characters."
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  county: z.string({
    required_error: "Please select a county.",
  }),
  postalCode: z.string().min(5, {
    message: "Postal code must be at least 5 characters.",
  }),
  idNumber: z.string().min(6, {
    message: "ID number must be at least 6 characters."
  }),
  bankName: z.string().min(2, {
    message: "Bank name must be at least 2 characters."
  }),
  accountNumber: z.string().min(5, {
    message: "Account number must be at least 5 characters."
  }),
  termsAgreed: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

// County options in Kenya
const KENYA_COUNTIES = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Uasin Gishu", "Kiambu", "Machakos", "Kajiado",
  "Nyeri", "Kakamega", "Kilifi", "Kitui", "Meru", "Bungoma", "Muranga", "Homa Bay", "Kwale",
  "Migori", "Trans Nzoia", "Siaya", "Kericho", "Bomet", "Vihiga", "Nandi", "Taita Taveta",
  "Kisii", "Nyamira", "Laikipia", "Embu", "Garissa", "Makueni", "Busia", "Nyandarua", "Kirinyaga",
  "Turkana", "West Pokot", "Samburu", "Tharaka Nithi", "Marsabit", "Isiolo", "Tana River", "Lamu",
  "Wajir", "Mandera", "Baringo", "Narok", "Elgeyo Marakwet"
].sort();

// Business type options
const BUSINESS_TYPES = [
  { id: "sole_proprietorship", name: "Sole Proprietorship" },
  { id: "partnership", name: "Partnership" },
  { id: "limited_company", name: "Limited Company" },
  { id: "cooperative", name: "Cooperative" },
  { id: "other", name: "Other" },
];

const SellerRegistration = () => {
  useScrollToTop();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  
  const form = useForm<z.infer<typeof sellerFormSchema>>({
    resolver: zodResolver(sellerFormSchema),
    defaultValues: {
      businessName: "",
      registrationNumber: "",
      businessType: "",
      description: "",
      phoneNumber: "",
      email: "",
      address: "",
      city: "",
      county: "",
      postalCode: "",
      idNumber: "",
      bankName: "",
      accountNumber: "",
      termsAgreed: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof sellerFormSchema>) => {
    setLoading(true);
    
    try {
      // In a real app, this would submit to an API
      console.log("Seller registration data:", values);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Registration successful!",
        description: "Your seller account is pending approval. We'll notify you once it's approved.",
      });
      
      // Redirect to seller dashboard after registration
      navigate("/seller");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error registering your seller account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Seller Registration
          </h1>
          <p className="text-gray-600 mb-8">
            Join our marketplace and start selling your products to customers around the country.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <Store className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-lg">Business Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Create your seller profile with your business details and information.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <Upload className="h-8 w-8 text-green-500 mb-2" />
                <CardTitle className="text-lg">Upload Products</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Once approved, you can start uploading and selling your products on the platform.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <Shield className="h-8 w-8 text-orange-500 mb-2" />
                <CardTitle className="text-lg">Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Receive secure payments directly to your bank account for all your sales.</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Seller Application Form</CardTitle>
              <CardDescription>Please fill out all the required information to apply as a seller</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium border-b pb-2 mb-4">Business Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="businessName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Name*</FormLabel>
                              <FormControl>
                                <Input placeholder="Your business name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="registrationNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Registration Number (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Registration number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="businessType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Type*</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select business type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {BUSINESS_TYPES.map((type) => (
                                    <SelectItem key={type.id} value={type.id}>
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number*</FormLabel>
                              <FormControl>
                                <Input placeholder="Your business phone" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Business Email*</FormLabel>
                              <FormControl>
                                <Input placeholder="your.business@example.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Business Description*</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Briefly describe your business and the products you sell" 
                                  className="min-h-[100px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                This will be displayed on your seller profile.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium border-b pb-2 mb-4">Location Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Address*</FormLabel>
                              <FormControl>
                                <Input placeholder="Street address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City*</FormLabel>
                              <FormControl>
                                <Input placeholder="City" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="county"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>County*</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select county" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {KENYA_COUNTIES.map((county) => (
                                    <SelectItem key={county} value={county.toLowerCase()}>
                                      {county}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code*</FormLabel>
                              <FormControl>
                                <Input placeholder="Postal code" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium border-b pb-2 mb-4">Identity & Payment Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="idNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>National ID Number*</FormLabel>
                              <FormControl>
                                <Input placeholder="ID number" {...field} />
                              </FormControl>
                              <FormDescription>
                                Used for verification purposes only
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="md:col-span-2">
                          <div className="text-sm mb-2">Identity Document</div>
                          <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-gray-50">
                            <Upload className="h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500 mb-1">Upload a scan or photo of your ID document</p>
                            <p className="text-xs text-gray-400 mb-4">(ID card, passport, or business registration)</p>
                            <Button type="button" variant="outline" className="w-full sm:w-auto">
                              Select File
                            </Button>
                            <p className="text-xs text-gray-400 mt-4">Supported formats: JPG, PNG, PDF (Max size: 5MB)</p>
                          </div>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="bankName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bank Name*</FormLabel>
                              <FormControl>
                                <Input placeholder="Your bank name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="accountNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Account Number*</FormLabel>
                              <FormControl>
                                <Input placeholder="Your account number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="termsAgreed"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the terms and conditions and marketplace policy
                            </FormLabel>
                            <FormDescription>
                              By submitting this form, you agree to our <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
                            </FormDescription>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Submit Application
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="border-t bg-gray-50 flex flex-col items-start">
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                Your application will be reviewed within 1-3 business days
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellerRegistration;
