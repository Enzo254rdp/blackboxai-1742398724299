import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useScrollToTop } from "../../hooks/use-scroll";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { 
  PlusCircle, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Tag, 
  Check, 
  X, 
  Edit, 
  Trash2, 
  Eye, 
  ArrowUpRight,
  Search,
  ChevronDown,
  Download,
  Image as ImageIcon,
  Loader2,
  Percent,
  Star
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../../lib/types";

// Mock API endpoints and utility functions
const API_ENDPOINTS = {
  products: "/api/seller/products",
  orders: "/api/seller/orders",
  analytics: "/api/seller/analytics",
  uploadImage: "/api/upload/image",
};

// Product categories - now using platform's centralized categories
const productCategories = CATEGORIES.map(category => ({
  id: category.id.toLowerCase(),
  name: category.name
}));

// Mock fetch function (will be replaced with actual API calls)
const fetchApi = async (endpoint: string, options = {}) => {
  // In a real implementation, this would be an actual fetch call
  console.log(`Mock API call to ${endpoint}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data based on endpoint
  return { success: true };
};

const SellerDashboard = () => {
  useScrollToTop();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State for products
  const [products, setProducts] = useState([
    { id: 1, name: "Handmade Ceramic Pot", price: 2500, inventory: 15, status: "active", category: "home", images: [], description: "Beautiful handcrafted ceramic pot", isNew: true, discount: 0, isFeatured: false },
    { id: 2, name: "Beaded Necklace", price: 1800, inventory: 8, status: "active", category: "accessories", images: [], description: "Elegant beaded necklace with natural stones", isNew: false, discount: 10, isFeatured: true },
    { id: 3, name: "Wooden Wall Art", price: 3200, inventory: 6, status: "active", category: "art", images: [], description: "Modern wooden wall art piece", isNew: false, discount: 0, isFeatured: false },
    { id: 4, name: "Organic Face Scrub", price: 850, inventory: 24, status: "active", category: "beauty", images: [], description: "Natural organic face scrub with essential oils", isNew: true, discount: 15, isFeatured: true },
    { id: 5, name: "Leather Journal", price: 1200, inventory: 0, status: "out_of_stock", category: "supplies", images: [], description: "Handmade leather journal with recycled paper", isNew: false, discount: 0, isFeatured: false },
  ]);
  
  // State for orders
  const [orders, setOrders] = useState([
    { id: "ORD-7823", customer: "Jane Smith", date: "2023-06-12", total: 4300, status: "delivered", items: [{ id: 1, name: "Handmade Ceramic Pot", quantity: 1, price: 2500 }, { id: 2, name: "Beaded Necklace", quantity: 1, price: 1800 }] },
    { id: "ORD-7824", customer: "Michael Johnson", date: "2023-06-14", total: 1800, status: "processing", items: [{ id: 2, name: "Beaded Necklace", quantity: 1, price: 1800 }] },
    { id: "ORD-7825", customer: "Sarah Williams", date: "2023-06-15", total: 3200, status: "shipped", items: [{ id: 3, name: "Wooden Wall Art", quantity: 1, price: 3200 }] },
    { id: "ORD-7826", customer: "David Brown", date: "2023-06-15", total: 850, status: "pending", items: [{ id: 4, name: "Organic Face Scrub", quantity: 1, price: 850 }] },
  ]);
  
  // Sales data for chart
  const [salesData, setSalesData] = useState([
    { name: "Jan", sales: 12000 },
    { name: "Feb", sales: 19000 },
    { name: "Mar", sales: 15000 },
    { name: "Apr", sales: 25000 },
    { name: "May", sales: 32000 },
    { name: "Jun", sales: 45600 },
  ]);
  
  // Product form state
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [productFormLoading, setProductFormLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    salePrice: "",
    inventory: "",
    category: "",
    tags: "",
    isFeatured: false,
    isNew: false,
    discount: "",
    images: [] as string[],
    variants: [] as {name: string, options: string[]}[],
    specifications: [] as {name: string, value: string}[],
    shipping: {
      weight: "",
      dimensions: {
        length: "",
        width: "",
        height: "",
      },
      freeShipping: false,
    },
  });
  
  // Order details state
  const [viewingOrder, setViewingOrder] = useState<any>(null);
  const [isViewingOrderDetails, setIsViewingOrderDetails] = useState(false);
  
  // Loading states
  const [productsLoading, setProductsLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  
  // Filter states
  const [productFilter, setProductFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [orderFilter, setOrderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // File upload state
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Variant management
  const [currentVariant, setCurrentVariant] = useState({ name: "", options: "" });
  
  // Specification management
  const [currentSpec, setCurrentSpec] = useState({ name: "", value: "" });
  
  // Tag management
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  
  // Filtered products
  const filteredProducts = products.filter(product => {
    // Apply search filter
    const matchesSearch = productFilter === "" || 
      product.name.toLowerCase().includes(productFilter.toLowerCase());
    
    // Apply category filter
    const matchesCategory = categoryFilter === "all" || 
      product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Filtered orders
  const filteredOrders = orders.filter(order => {
    // Apply search filter
    const matchesSearch = orderFilter === "" || 
      order.id.includes(orderFilter) || 
      order.customer.toLowerCase().includes(orderFilter.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter === "all" || 
      order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Function to handle tag input
  const handleAddTag = () => {
    if (!currentTag.trim()) return;
    
    if (!tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
    }
    setCurrentTag("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Handlers for product management
  const handleAddProduct = async () => {
    setProductFormLoading(true);
    
    // In a real app, you would send this to an API
    try {
      // Format tags for sending to API
      const productTags = tags.length > 0 ? tags : [];
      
      // Simulate API call
      await fetchApi(API_ENDPOINTS.products, {
        method: 'POST',
        body: JSON.stringify({
          ...newProduct,
          tags: productTags
        })
      });
      
      const createdProduct = {
        id: products.length + 1,
        name: newProduct.name,
        price: parseInt(newProduct.price),
        inventory: parseInt(newProduct.inventory),
        status: parseInt(newProduct.inventory) > 0 ? "active" : "out_of_stock",
        category: newProduct.category,
        images: newProduct.images,
        description: newProduct.description,
        isNew: newProduct.isNew,
        discount: newProduct.discount ? parseInt(newProduct.discount) : 0,
        isFeatured: newProduct.isFeatured
      };
      
      setProducts([...products, createdProduct]);
      resetProductForm();
      
      toast({
        title: "Product added successfully",
        description: `${newProduct.name} has been added to your inventory`,
      });
    } catch (error) {
      toast({
        title: "Error adding product",
        description: "There was an error adding your product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProductFormLoading(false);
    }
  };
  
  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;
    
    setProductFormLoading(true);
    
    try {
      // Format tags for sending to API
      const productTags = tags.length > 0 ? tags : [];
      
      // Simulate API call
      await fetchApi(`${API_ENDPOINTS.products}/${selectedProduct.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...newProduct,
          tags: productTags
        })
      });
      
      const updatedProduct = {
        ...selectedProduct,
        name: newProduct.name,
        price: parseInt(newProduct.price),
        inventory: parseInt(newProduct.inventory),
        status: parseInt(newProduct.inventory) > 0 ? "active" : "out_of_stock",
        category: newProduct.category,
        images: newProduct.images,
        description: newProduct.description,
        isNew: newProduct.isNew,
        discount: newProduct.discount ? parseInt(newProduct.discount) : 0,
        isFeatured: newProduct.isFeatured
      };
      
      setProducts(products.map(p => 
        p.id === selectedProduct.id ? updatedProduct : p
      ));
      
      resetProductForm();
      
      toast({
        title: "Product updated successfully",
        description: `${newProduct.name} has been updated`,
      });
    } catch (error) {
      toast({
        title: "Error updating product",
        description: "There was an error updating your product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProductFormLoading(false);
    }
  };
  
  const handleDeleteProduct = async (id: number) => {
    try {
      // Simulate API call
      await fetchApi(`${API_ENDPOINTS.products}/${id}`, {
        method: 'DELETE'
      });
      
      setProducts(products.filter(product => product.id !== id));
      
      toast({
        title: "Product deleted",
        description: "The product has been removed from your inventory",
      });
    } catch (error) {
      toast({
        title: "Error deleting product",
        description: "There was an error deleting your product. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      salePrice: "",
      inventory: product.inventory.toString(),
      category: product.category || "",
      tags: "",
      isFeatured: product.isFeatured || false,
      isNew: product.isNew || false,
      discount: product.discount ? product.discount.toString() : "",
      images: product.images || [],
      variants: [],
      specifications: [],
      shipping: {
        weight: "",
        dimensions: {
          length: "",
          width: "",
          height: "",
        },
        freeShipping: false,
      },
    });
    // Load any existing tags
    setTags(product.tags || []);
    setIsEditingProduct(true);
  };
  
  const resetProductForm = () => {
    setIsAddingProduct(false);
    setIsEditingProduct(false);
    setSelectedProduct(null);
    setTags([]);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      salePrice: "",
      inventory: "",
      category: "",
      tags: "",
      isFeatured: false,
      isNew: false,
      discount: "",
      images: [],
      variants: [],
      specifications: [],
      shipping: {
        weight: "",
        dimensions: {
          length: "",
          width: "",
          height: "",
        },
        freeShipping: false,
      },
    });
  };
  
  // Handle order status change
  const handleOrderStatusChange = async (orderId: string, newStatus: string) => {
    try {
      // Simulate API call
      await fetchApi(`${API_ENDPOINTS.orders}/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      toast({
        title: "Order updated",
        description: `Order ${orderId} status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error updating order",
        description: "There was an error updating the order status. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploadingImage(true);
    
    try {
      // In a real app, you would upload to a server
      // For now, we'll simulate with local URLs and a delay
      const uploadedUrls = Array.from(files).map(file => 
        URL.createObjectURL(file)
      );
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNewProduct({
        ...newProduct,
        images: [...newProduct.images, ...uploadedUrls]
      });
      
      toast({
        title: "Images uploaded",
        description: `${files.length} image(s) uploaded successfully`,
      });
    } catch (error) {
      toast({
        title: "Error uploading images",
        description: "There was an error uploading your images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };
  
  // Handle removing an image from the product
  const handleRemoveImage = (index: number) => {
    const updatedImages = [...newProduct.images];
    updatedImages.splice(index, 1);
    setNewProduct({
      ...newProduct,
      images: updatedImages
    });
  };
  
  // Handle adding a variant
  const handleAddVariant = () => {
    if (!currentVariant.name || !currentVariant.options) return;
    
    const optionsArray = currentVariant.options
      .split(',')
      .map(option => option.trim())
      .filter(option => option);
    
    if (optionsArray.length === 0) return;
    
    setNewProduct({
      ...newProduct,
      variants: [
        ...newProduct.variants,
        {
          name: currentVariant.name,
          options: optionsArray
        }
      ]
    });
    
    setCurrentVariant({ name: "", options: "" });
  };
  
  // Handle removing a variant
  const handleRemoveVariant = (index: number) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants.splice(index, 1);
    setNewProduct({
      ...newProduct,
      variants: updatedVariants
    });
  };
  
  // Handle adding a specification
  const handleAddSpecification = () => {
    if (!currentSpec.name || !currentSpec.value) return;
    
    setNewProduct({
      ...newProduct,
      specifications: [
        ...newProduct.specifications,
        {
          name: currentSpec.name,
          value: currentSpec.value
        }
      ]
    });
    
    setCurrentSpec({ name: "", value: "" });
  };
  
  // Handle removing a specification
  const handleRemoveSpecification = (index: number) => {
    const updatedSpecs = [...newProduct.specifications];
    updatedSpecs.splice(index, 1);
    setNewProduct({
      ...newProduct,
      specifications: updatedSpecs
    });
  };
  
  // Navigate to seller registration
  const handleNavigateToSellerRegistration = () => {
    navigate("/seller/register");
  };
  
  // View order details
  const handleViewOrderDetails = (order: any) => {
    setViewingOrder(order);
    setIsViewingOrderDetails(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Seller Dashboard
          </h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleNavigateToSellerRegistration}>
              Seller Profile
            </Button>
          </div>
        </div>
        <p className="text-gray-600 mb-8">
          Manage your products, orders, and track your sales performance
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Package className="mr-2 h-5 w-5 text-blue-500" />
                Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-500">{products.length}</p>
              <p className="text-gray-600 text-sm">Total products</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => setIsAddingProduct(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5 text-green-500" />
                Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">{orders.length}</p>
              <p className="text-gray-600 text-sm">Active orders</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => {
                toast({
                  title: "Orders view",
                  description: "View your orders below in the Orders tab",
                });
              }}>
                View Orders
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-orange-500" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-500">Ksh 45,600</p>
              <p className="text-gray-600 text-sm">This month</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => {
                toast({
                  title: "Analytics view",
                  description: "View your sales analytics below in the Analytics tab",
                });
              }}>
                View Analytics
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-8"
                  value={productFilter}
                  onChange={(e) => setProductFilter(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {productCategories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button variant="outline" onClick={() => setIsAddingProduct(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>
            
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Inventory</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productsLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex justify-center">
                          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                        </div>
                        <p className="text-gray-500 mt-2">Loading products...</p>
                      </TableCell>
                    </TableRow>
                  ) : filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <p className="text-gray-500">No products found</p>
                        <Button 
                          variant="link" 
                          className="mt-2"
                          onClick={() => setIsAddingProduct(true)}
                        >
                          Add a product
                        </Button>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <span>{product.name}</span>
                            {product.isNew && (
                              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">New</Badge>
                            )}
                            {product.isFeatured && (
                              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Featured</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {product.discount > 0 ? (
                              <>
                                <span className="line-through text-gray-400">Ksh {product.price.toLocaleString()}</span>
                                <span className="font-medium">
                                  Ksh {(product.price * (1 - product.discount / 100)).toLocaleString()}
                                </span>
                                <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                                  {product.discount}% off
                                </Badge>
                              </>
                            ) : (
                              <span>Ksh {product.price.toLocaleString()}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{product.inventory}</TableCell>
                        <TableCell>
                          <Badge variant={product.status === "active" ? "default" : "destructive"} className={product.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}>
                            {product.status === "active" ? "Active" : "Out of Stock"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {product.isNew && <Badge variant="outline" className="bg-blue-50">new</Badge>}
                            {product.discount > 0 && <Badge variant="outline" className="bg-red-50">sale</Badge>}
                            {product.isFeatured && <Badge variant="outline" className="bg-purple-50">featured</Badge>}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search order ID or customer..." 
                  className="pl-8"
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordersLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex justify-center">
                          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                        </div>
                        <p className="text-gray-500 mt-2">Loading orders...</p>
                      </TableCell>
                    </TableRow>
                  ) : filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <p className="text-gray-500">No orders found</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>Ksh {order.total.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              order.status === "delivered" ? "outline" : 
                              order.status === "shipped" ? "outline" :
                              order.status === "processing" ? "secondary" : "default"
                            }
                            className={
                              order.status === "delivered" ? "bg-green-100 text-green-800 hover:bg-green-200" : 
                              order.status === "shipped" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" :
                              order.status === "processing" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" :
                              "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewOrderDetails(order)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleOrderStatusChange(order.id, "pending")}>
                                  Mark as Pending
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleOrderStatusChange(order.id, "processing")}>
                                  Mark as Processing
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleOrderStatusChange(order.id, "shipped")}>
                                  Mark as Shipped
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleOrderStatusChange(order.id, "delivered")}>
                                  Mark as Delivered
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales</CardTitle>
                <CardDescription>Your sales performance over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsLoading ? (
                  <div className="h-[300px] flex justify-center items-center">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto" />
                      <p className="text-gray-500 mt-2">Loading analytics...</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-[300px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Bar dataKey="sales" fill="#82c91e" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" size="sm" onClick={() => {
                  toast({
                    title: "Export Analytics",
                    description: "Your analytics data is being exported",
                  });
                }}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Handmade Ceramic Pot</p>
                        <p className="text-sm text-gray-500">32 units sold</p>
                      </div>
                      <p className="font-semibold">Ksh 80,000</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Beaded Necklace</p>
                        <p className="text-sm text-gray-500">28 units sold</p>
                      </div>
                      <p className="font-semibold">Ksh 50,400</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Organic Face Scrub</p>
                        <p className="text-sm text-gray-500">25 units sold</p>
                      </div>
                      <p className="font-semibold">Ksh 21,250</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                        <p className="font-semibold text-green-600">Sales Increasing</p>
                      </div>
                      <p className="text-sm text-gray-700">Your sales have increased by 24% compared to last month.</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="h-4 w-4 text-blue-600" />
                        <p className="font-semibold text-blue-600">Popular Category</p>
                      </div>
                      <p className="text-sm text-gray-700">Handmade items are your best performing category.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Add/Edit Product Dialog */}
      <Dialog open={isAddingProduct || isEditingProduct} onOpenChange={(open) => {
        if (!open) resetProductForm();
        else if (!isAddingProduct && !isEditingProduct) setIsAddingProduct(true);
      }}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {isEditingProduct 
                ? "Update your product information."
                : "Create a new product to sell on the marketplace."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name*</Label>
                <Input 
                  id="name" 
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category*</Label>
                <Select 
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {productCategories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your product in detail"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Regular Price (Ksh)*</Label>
                <Input 
                  id="price" 
                  type="number" 
                  placeholder="0"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input 
                  id="discount" 
                  type="number" 
                  placeholder="0"
                  min="0"
                  max="100"
                  value={newProduct.discount}
                  onChange={(e) => setNewProduct({...newProduct, discount: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="inventory">Inventory*</Label>
                <Input 
                  id="inventory" 
                  type="number" 
                  placeholder="0"
                  value={newProduct.inventory}
                  onChange={(e) => setNewProduct({...newProduct, inventory: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-4 w-4 p-0 ml-1" 
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  id="tag"
                  placeholder="Add tag (press Enter or click Add)"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleAddTag}
                >
                  Add
                </Button>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Product Images</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                {newProduct.images.map((image, index) => (
                  <div key={index} className="relative aspect-square border rounded-md overflow-hidden bg-gray-50">
                    <img 
                      src={image} 
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <div className="aspect-square border border-dashed rounded-md flex flex-col items-center justify-center p-4 bg-gray-50">
                  <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                    {uploadingImage ? (
                      <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                    ) : (
                      <>
                        <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500 text-center">Upload Image</span>
                      </>
                    )}
                  </label>
                  <input 
                    id="image-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    multiple
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid gap-4">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="featured" 
                    checked={newProduct.isFeatured}
                    onCheckedChange={(checked) => 
                      setNewProduct({...newProduct, isFeatured: checked as boolean})
                    }
                  />
                  <label
                    htmlFor="featured"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Feature this product on homepage
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="new" 
                    checked={newProduct.isNew}
                    onCheckedChange={(checked) => 
                      setNewProduct({...newProduct, isNew: checked as boolean})
                    }
                  />
                  <label
                    htmlFor="new"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mark as new product
                  </label>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Product Variants</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="grid gap-2">
                  <Label htmlFor="variant-name">Variant Name</Label>
                  <Input 
                    id="variant-name" 
                    placeholder="Size, Color, Material, etc."
                    value={currentVariant.name}
                    onChange={(e) => setCurrentVariant({...currentVariant, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="variant-options">Options (comma separated)</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="variant-options" 
                      placeholder="Small, Medium, Large"
                      value={currentVariant.options}
                      onChange={(e) => setCurrentVariant({...currentVariant, options: e.target.value})}
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handleAddVariant}
                      disabled={!currentVariant.name || !currentVariant.options}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
              
              {newProduct.variants.length > 0 && (
                <div className="mt-4 border rounded-md p-4 bg-gray-50">
                  <h4 className="font-medium mb-2">Added Variants</h4>
                  <div className="space-y-2">
                    {newProduct.variants.map((variant, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
                        <div>
                          <p className="font-medium">{variant.name}</p>
                          <p className="text-sm text-gray-500">{variant.options.join(", ")}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveVariant(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Product Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="grid gap-2">
                  <Label htmlFor="spec-name">Specification</Label>
                  <Input 
                    id="spec-name" 
                    placeholder="Material, Weight, Dimensions, etc."
                    value={currentSpec.name}
                    onChange={(e) => setCurrentSpec({...currentSpec, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="spec-value">Value</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="spec-value" 
                      placeholder="100% Cotton, 250g, 20cm x 30cm"
                      value={currentSpec.value}
                      onChange={(e) => setCurrentSpec({...currentSpec, value: e.target.value})}
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handleAddSpecification}
                      disabled={!currentSpec.name || !currentSpec.value}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
              
              {newProduct.specifications.length > 0 && (
                <div className="mt-4 border rounded-md p-4 bg-gray-50">
                  <h4 className="font-medium mb-2">Added Specifications</h4>
                  <div className="space-y-2">
                    {newProduct.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
                        <div className="grid grid-cols-2 gap-2 flex-1">
                          <p className="font-medium">{spec.name}</p>
                          <p className="text-gray-700">{spec.value}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveSpecification(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="grid gap-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    value={newProduct.shipping.weight}
                    onChange={(e) => setNewProduct({
                      ...newProduct, 
                      shipping: {
                        ...newProduct.shipping,
                        weight: e.target.value
                      }
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dimensions">Dimensions (cm)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Input 
                      placeholder="L"
                      value={newProduct.shipping.dimensions.length}
                      onChange={(e) => setNewProduct({
                        ...newProduct, 
                        shipping: {
                          ...newProduct.shipping,
                          dimensions: {
                            ...newProduct.shipping.dimensions,
                            length: e.target.value
                          }
                        }
                      })}
                    />
                    <Input 
                      placeholder="W"
                      value={newProduct.shipping.dimensions.width}
                      onChange={(e) => setNewProduct({
                        ...newProduct, 
                        shipping: {
                          ...newProduct.shipping,
                          dimensions: {
                            ...newProduct.shipping.dimensions,
                            width: e.target.value
                          }
                        }
                      })}
                    />
                    <Input 
                      placeholder="H"
                      value={newProduct.shipping.dimensions.height}
                      onChange={(e) => setNewProduct({
                        ...newProduct, 
                        shipping: {
                          ...newProduct.shipping,
                          dimensions: {
                            ...newProduct.shipping.dimensions,
                            height: e.target.value
                          }
                        }
                      })}
                    />
                  </div>
                </div>
                <div className="grid gap-2 items-center">
                  <Label htmlFor="free-shipping" className="block mb-2">Free Shipping</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="free-shipping" 
                      checked={newProduct.shipping.freeShipping}
                      onCheckedChange={(checked) => 
                        setNewProduct({
                          ...newProduct, 
                          shipping: {
                            ...newProduct.shipping,
                            freeShipping: checked as boolean
                          }
                        })
                      }
                    />
                    <label
                      htmlFor="free-shipping"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Offer free shipping
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={resetProductForm} disabled={productFormLoading}>
              Cancel
            </Button>
            <Button 
              onClick={isEditingProduct ? handleUpdateProduct : handleAddProduct} 
              disabled={!newProduct.name || !newProduct.price || !newProduct.inventory || !newProduct.category || productFormLoading}
            >
              {productFormLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditingProduct ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Order Details Dialog */}
      <Dialog open={isViewingOrderDetails} onOpenChange={setIsViewingOrderDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {viewingOrder && `Order ID: ${viewingOrder.id}`}
            </DialogDescription>
          </DialogHeader>
          {viewingOrder && (
            <div className="py-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Customer</h3>
                  <p className="mt-1">{viewingOrder.customer}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p className="mt-1">{viewingOrder.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <Badge 
                    className="mt-1"
                    variant={
                      viewingOrder.status === "delivered" ? "outline" : 
                      viewingOrder.status === "shipped" ? "outline" :
                      viewingOrder.status === "processing" ? "secondary" : "default"
                    }
                  >
                    {viewingOrder.status.charAt(0).toUpperCase() + viewingOrder.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total</h3>
                  <p className="mt-1 font-bold">Ksh {viewingOrder.total.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-medium mb-2">Items</h3>
                <div className="space-y-2">
                  {viewingOrder.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold">Ksh {item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="font-medium mb-2">Update Status</h3>
                <RadioGroup 
                  value={viewingOrder.status}
                  onValueChange={(value) => {
                    handleOrderStatusChange(viewingOrder.id, value);
                    setViewingOrder({...viewingOrder, status: value});
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pending" id="pending" />
                    <Label htmlFor="pending">Pending</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="processing" id="processing" />
                    <Label htmlFor="processing">Processing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="shipped" id="shipped" />
                    <Label htmlFor="shipped">Shipped</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivered" id="delivered" />
                    <Label htmlFor="delivered">Delivered</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewingOrderDetails(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default SellerDashboard;
