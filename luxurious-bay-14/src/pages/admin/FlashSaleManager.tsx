
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { CalendarIcon, Clock, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for flash sales
const mockFlashSales = [
  {
    id: "fs1",
    name: "Summer Flash Sale",
    startDate: new Date(2025, 5, 1),
    endDate: new Date(2025, 5, 3),
    discountPercentage: 30,
    active: true,
    products: [
      { id: "p1", name: "Summer T-Shirt", originalPrice: 29.99, discountedPrice: 20.99 },
      { id: "p2", name: "Beach Shorts", originalPrice: 39.99, discountedPrice: 27.99 },
    ]
  },
  {
    id: "fs2",
    name: "Weekend Special",
    startDate: new Date(2025, 2, 15),
    endDate: new Date(2025, 2, 17),
    discountPercentage: 25,
    active: false,
    products: [
      { id: "p3", name: "Casual Sneakers", originalPrice: 79.99, discountedPrice: 59.99 },
      { id: "p4", name: "Denim Jacket", originalPrice: 89.99, discountedPrice: 67.49 },
    ]
  }
];

// Mock products for selection
const mockProducts = [
  { id: "p1", name: "Summer T-Shirt", price: 29.99, category: "Clothing" },
  { id: "p2", name: "Beach Shorts", price: 39.99, category: "Clothing" },
  { id: "p3", name: "Casual Sneakers", price: 79.99, category: "Footwear" },
  { id: "p4", name: "Denim Jacket", price: 89.99, category: "Clothing" },
  { id: "p5", name: "Sunglasses", price: 49.99, category: "Accessories" },
  { id: "p6", name: "Watch", price: 129.99, category: "Accessories" },
];

const FlashSaleManager = () => {
  const [flashSales, setFlashSales] = useState(mockFlashSales);
  const [editingSale, setEditingSale] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("active");
  const { toast } = useToast();

  const handleCreateSale = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newSale = {
      id: `fs${flashSales.length + 1}`,
      name: formData.get("saleName") as string,
      startDate,
      endDate,
      discountPercentage: parseInt(formData.get("discount") as string, 10),
      active: true,
      products: selectedProducts.map(id => {
        const product = mockProducts.find(p => p.id === id);
        const discount = parseInt(formData.get("discount") as string, 10) / 100;
        return {
          id,
          name: product?.name || "",
          originalPrice: product?.price || 0,
          discountedPrice: product ? product.price * (1 - discount) : 0
        };
      })
    };
    
    setFlashSales([...flashSales, newSale]);
    toast({
      title: "Flash Sale Created",
      description: `${newSale.name} has been scheduled.`
    });
    
    // Reset form
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectedProducts([]);
    (event.target as HTMLFormElement).reset();
  };

  const toggleSaleStatus = (id: string) => {
    setFlashSales(flashSales.map(sale => 
      sale.id === id ? { ...sale, active: !sale.active } : sale
    ));
    
    const sale = flashSales.find(s => s.id === id);
    toast({
      title: sale?.active ? "Sale Deactivated" : "Sale Activated",
      description: `${sale?.name} has been ${sale?.active ? "deactivated" : "activated"}.`
    });
  };

  const deleteSale = (id: string) => {
    const sale = flashSales.find(s => s.id === id);
    setFlashSales(flashSales.filter(sale => sale.id !== id));
    toast({
      title: "Flash Sale Deleted",
      description: `${sale?.name} has been removed.`
    });
  };

  return (
    <div className="container px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Flash Sale Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>All Flash Sales</CardTitle>
            <CardDescription>Manage your active and upcoming flash sales</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="ended">Ended</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="space-y-4">
                {flashSales.filter(sale => sale.active).length > 0 ? (
                  flashSales.filter(sale => sale.active).map(sale => (
                    <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{sale.name}</h3>
                          <Badge>{sale.discountPercentage}% OFF</Badge>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {format(sale.startDate, "MMM d")} - {format(sale.endDate, "MMM d, yyyy")}
                          </span>
                        </div>
                        <div className="text-sm mt-1">
                          {sale.products.length} products on sale
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={sale.active} 
                          onCheckedChange={() => toggleSaleStatus(sale.id)} 
                        />
                        <Button variant="ghost" size="icon" onClick={() => deleteSale(sale.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 text-gray-500">No active flash sales</p>
                )}
              </TabsContent>
              
              <TabsContent value="scheduled" className="space-y-4">
                {flashSales.filter(sale => !sale.active && new Date(sale.startDate) > new Date()).length > 0 ? (
                  flashSales.filter(sale => !sale.active && new Date(sale.startDate) > new Date()).map(sale => (
                    <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{sale.name}</h3>
                          <Badge variant="outline">{sale.discountPercentage}% OFF</Badge>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {format(sale.startDate, "MMM d")} - {format(sale.endDate, "MMM d, yyyy")}
                          </span>
                        </div>
                        <div className="text-sm mt-1">
                          {sale.products.length} products on sale
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={sale.active} 
                          onCheckedChange={() => toggleSaleStatus(sale.id)} 
                        />
                        <Button variant="ghost" size="icon" onClick={() => deleteSale(sale.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 text-gray-500">No scheduled flash sales</p>
                )}
              </TabsContent>
              
              <TabsContent value="ended" className="space-y-4">
                {flashSales.filter(sale => !sale.active && new Date(sale.endDate) < new Date()).length > 0 ? (
                  flashSales.filter(sale => !sale.active && new Date(sale.endDate) < new Date()).map(sale => (
                    <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{sale.name}</h3>
                          <Badge variant="outline">{sale.discountPercentage}% OFF</Badge>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {format(sale.startDate, "MMM d")} - {format(sale.endDate, "MMM d, yyyy")}
                          </span>
                        </div>
                        <div className="text-sm mt-1">
                          {sale.products.length} products on sale
                        </div>
                      </div>
                      <div>
                        <Button variant="ghost" size="icon" onClick={() => deleteSale(sale.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 text-gray-500">No ended flash sales</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Create Flash Sale</CardTitle>
            <CardDescription>Set up a new limited-time offer</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateSale} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="saleName">Sale Name</Label>
                <Input id="saleName" name="saleName" placeholder="Summer Flash Sale" required />
              </div>
              
              <div className="space-y-2">
                <Label>Sale Period</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="startDate" className="text-xs">Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label htmlFor="endDate" className="text-xs">End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discount">Discount Percentage</Label>
                <Input 
                  id="discount" 
                  name="discount" 
                  type="number" 
                  min="1" 
                  max="99" 
                  placeholder="20" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label>Products</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select products for sale" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProducts.map(product => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - ${product.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedProducts.map(id => {
                    const product = mockProducts.find(p => p.id === id);
                    return (
                      <Badge key={id} variant="secondary" className="p-1">
                        {product?.name}
                        <button 
                          className="ml-1 text-gray-500 hover:text-gray-700"
                          onClick={() => setSelectedProducts(selectedProducts.filter(p => p !== id))}
                        >
                          ×
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              </div>
              
              <Button type="submit" className="w-full">Create Flash Sale</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FlashSaleManager;
