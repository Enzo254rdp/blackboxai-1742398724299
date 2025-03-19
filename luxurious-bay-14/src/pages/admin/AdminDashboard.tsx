
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, 
  BarChart3, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Users, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/auth-store";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sample data for dashboard
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      change: "+20.1%",
      trend: "up",
    },
    {
      title: "Orders",
      value: "356",
      icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
      change: "+12.2%",
      trend: "up",
    },
    {
      title: "Products",
      value: "2,345",
      icon: <Package className="h-4 w-4 text-muted-foreground" />,
      change: "+3.1%",
      trend: "up",
    },
    {
      title: "Active Users",
      value: "12,234",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      change: "+14.5%",
      trend: "up",
    },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", seller: "TechGadgets", status: "Completed", amount: "$125.99", date: "2023-06-01" },
    { id: "ORD-002", customer: "Jane Smith", seller: "HomeDecor", status: "Processing", amount: "$89.50", date: "2023-06-02" },
    { id: "ORD-003", customer: "Robert Johnson", seller: "FashionTrends", status: "Shipped", amount: "$432.20", date: "2023-06-03" },
    { id: "ORD-004", customer: "Emily Davis", seller: "SportsEquip", status: "Pending", amount: "$76.00", date: "2023-06-04" },
    { id: "ORD-005", customer: "Michael Wilson", seller: "ElectronicsHub", status: "Completed", amount: "$210.75", date: "2023-06-05" },
  ];

  const productsForReview = [
    { id: "PRD-101", name: "Wireless Earbuds", seller: "AudioTech", submittedOn: "2023-06-01", status: "Pending Review", issue: null },
    { id: "PRD-102", name: "Smartphone Case", seller: "GadgetCover", submittedOn: "2023-06-02", status: "Pending Review", issue: null },
    { id: "PRD-103", name: "Blender", seller: "KitchenPro", submittedOn: "2023-06-03", status: "Flagged", issue: "Low quality images" },
    { id: "PRD-104", name: "Running Shoes", seller: "SportyGear", submittedOn: "2023-06-04", status: "Flagged", issue: "Description mismatch" },
    { id: "PRD-105", name: "Desk Lamp", seller: "HomeLight", submittedOn: "2023-06-05", status: "Pending Review", issue: null },
  ];

  const lowStockProducts = [
    { id: "PRD-001", name: "Wireless Earbuds", seller: "TechStore", stock: 5, category: "Electronics" },
    { id: "PRD-002", name: "Leather Wallet", seller: "FashionHub", stock: 3, category: "Accessories" },
    { id: "PRD-003", name: "Fitness Tracker", seller: "SportsWorld", stock: 7, category: "Electronics" },
    { id: "PRD-004", name: "Cotton T-Shirt", seller: "ClothingCo", stock: 8, category: "Clothing" },
    { id: "PRD-005", name: "Stainless Steel Water Bottle", seller: "EcoGoods", stock: 4, category: "Home & Kitchen" },
  ];

  // Admin specific actions - different from seller actions
  const reviewProduct = (product) => {
    setSelectedProduct(product);
    setIsReviewDialogOpen(true);
  };

  const approveProduct = () => {
    toast({
      title: "Product Approved",
      description: `${selectedProduct.name} has been approved and is now live on the store.`,
    });
    setIsReviewDialogOpen(false);
  };

  const flagProduct = (reason) => {
    toast({
      title: "Product Flagged",
      description: `${selectedProduct.name} has been flagged for: ${reason}`,
      variant: "destructive",
    });
    setIsReviewDialogOpen(false);
  };

  const removeProduct = () => {
    toast({
      title: "Product Removed",
      description: `${selectedProduct.name} has been removed from the store.`,
      variant: "destructive",
    });
    setIsReviewDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || "Admin"}!
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/")}>
            View Store
          </Button>
          <Button onClick={() => navigate("/admin/banners")}>
            Manage Banners
          </Button>
          <Button onClick={() => navigate("/admin/flash-sales")}>
            Manage Flash Sales
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-6 md:w-max">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="sellers">Sellers</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      {stat.icon}
                      <div>
                        <p className="text-sm font-medium text-muted-foreground leading-none">
                          {stat.title}
                        </p>
                        <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Platform-wide order activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.seller}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "Completed"
                                ? "default"
                                : order.status === "Processing"
                                ? "secondary"
                                : order.status === "Shipped"
                                ? "outline"
                                : "destructive"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => setActiveTab("orders")} className="ml-auto">
                  View All Orders
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Products Requiring Review</CardTitle>
                <CardDescription>
                  Products flagged or pending review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productsForReview.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.seller}</TableCell>
                        <TableCell>
                          <Badge
                            variant={product.status === "Pending Review" ? "outline" : "destructive"}
                          >
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => reviewProduct(product)}
                          >
                            <Eye className="h-4 w-4 mr-1" /> Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => setActiveTab("products")} className="ml-auto">
                  View All Products
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders Management</CardTitle>
              <CardDescription>View and monitor all platform orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  As an admin, you monitor orders platform-wide but don't manage individual fulfillment.
                  Sellers are responsible for processing their own orders.
                </p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.seller}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "Completed"
                              ? "default"
                              : order.status === "Processing"
                              ? "secondary"
                              : order.status === "Shipped"
                              ? "outline"
                              : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                        >
                          <Eye className="h-4 w-4 mr-1" /> Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Products Management</CardTitle>
              <CardDescription>Review and moderate all products on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  As an admin, you have the ability to review, approve, flag, or remove products from the platform.
                  Products may be flagged for low quality images, inaccurate descriptions, or policy violations.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Products Requiring Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Seller</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {productsForReview.filter(p => p.status === "Pending Review").map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.seller}</TableCell>
                            <TableCell>{product.submittedOn}</TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => reviewProduct(product)}
                              >
                                <Eye className="h-4 w-4 mr-1" /> Review
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Flagged Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Seller</TableHead>
                          <TableHead>Issue</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {productsForReview.filter(p => p.status === "Flagged").map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.seller}</TableCell>
                            <TableCell>
                              <span className="text-red-500">{product.issue}</span>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => reviewProduct(product)}
                              >
                                <Eye className="h-4 w-4 mr-1" /> Review
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>View and manage customer accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Customer management interface with ability to view purchase history, manage accounts, and handle customer support tickets.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sellers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seller Management</CardTitle>
              <CardDescription>Monitor and manage seller accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Seller management interface with verification, performance metrics, and account management features.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>Manage global platform configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Platform settings interface for managing categories, tags, commissions, and other global configuration options.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Product Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Review Product</DialogTitle>
            <DialogDescription>
              {selectedProduct ? (
                <>
                  Reviewing {selectedProduct.name} by {selectedProduct.seller}
                  {selectedProduct.issue && (
                    <div className="mt-2 p-2 bg-red-50 text-red-700 rounded-md text-sm">
                      <AlertTriangle className="h-4 w-4 inline-block mr-1" />
                      Flagged for: {selectedProduct.issue}
                    </div>
                  )}
                </>
              ) : "Loading product details..."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-center p-4 bg-gray-100 rounded-md">
              <p className="text-sm text-gray-500">Product preview would be shown here</p>
            </div>
            <div className="space-y-2 text-sm">
              <h4 className="font-medium">Product Actions:</h4>
              <p>Use these actions to manage the product's status on the platform</p>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button
              variant="destructive"
              onClick={removeProduct}
              className="w-full sm:w-auto"
            >
              <XCircle className="h-4 w-4 mr-2" /> Remove Product
            </Button>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => flagProduct("Description doesn't match product")}
                className="flex-1"
              >
                <AlertTriangle className="h-4 w-4 mr-2" /> Flag
              </Button>
              <Button
                onClick={approveProduct}
                className="flex-1"
              >
                <CheckCircle className="h-4 w-4 mr-2" /> Approve
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
