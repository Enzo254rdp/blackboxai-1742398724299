
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useScrollToTop } from "../../hooks/use-scroll";
import { 
  BarChart3, 
  PieChart, 
  Download, 
  Calendar,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  ArrowDown,
  ArrowUp
} from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const ReportManager = () => {
  useScrollToTop();
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState("month");
  
  // Mock sales data
  const salesData = [
    { name: 'Jan', sales: 20000 },
    { name: 'Feb', sales: 25000 },
    { name: 'Mar', sales: 30000 },
    { name: 'Apr', sales: 27000 },
    { name: 'May', sales: 32000 },
    { name: 'Jun', sales: 38000 },
    { name: 'Jul', sales: 42000 },
    { name: 'Aug', sales: 45000 },
    { name: 'Sep', sales: 48000 },
    { name: 'Oct', sales: 52000 },
    { name: 'Nov', sales: 58000 },
    { name: 'Dec', sales: 62000 },
  ];

  // Mock category data
  const categoryData = [
    { name: 'Electronics', value: 42 },
    { name: 'Clothing', value: 28 },
    { name: 'Home & Kitchen', value: 16 },
    { name: 'Beauty & Personal Care', value: 8 },
    { name: 'Others', value: 6 },
  ];

  // Mock payment methods data
  const paymentData = [
    { name: 'M-Pesa', value: 65 },
    { name: 'Credit/Debit Card', value: 25 },
    { name: 'Bank Transfer', value: 8 },
    { name: 'Others', value: 2 },
  ];

  // Mock sales by product data
  const productSalesData = [
    { name: 'Wireless Earbuds', sales: 120 },
    { name: 'Smart Watch', sales: 98 },
    { name: 'Bluetooth Speaker', sales: 86 },
    { name: 'T-Shirt', sales: 72 },
    { name: 'Smartphone', sales: 58 },
  ];

  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const handleExportReport = (reportType: string) => {
    toast({
      title: "Report Export Started",
      description: `${reportType} report is being exported.`,
    });
  };

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    toast({
      title: "Date Range Changed",
      description: `Viewing reports for: ${range}`,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount);
  };

  // Mock summary metrics
  const summaryMetrics = {
    totalRevenue: 458600,
    revenueGrowth: 12.5,
    totalOrders: 128,
    ordersGrowth: 8.3,
    totalCustomers: 245,
    customersGrowth: 15.7,
    averageOrderValue: 3583,
    aovGrowth: 3.8,
  };

  return (
    <div className="min-h-screen flex flex-col bg-enzobay-neutral-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-semibold text-enzobay-brown mb-4 md:mb-0">
            <span className="flex items-center">
              <BarChart3 className="mr-2 h-6 w-6" /> Sales Reports
            </span>
          </h1>
          
          <div className="flex space-x-2">
            <select 
              className="border rounded-md px-3 py-2 text-sm bg-white"
              value={dateRange}
              onChange={(e) => handleDateRangeChange(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
            
            <button 
              className="bg-enzobay-blue text-white px-4 py-2 rounded-md text-sm flex items-center"
              onClick={() => handleExportReport('Sales')}
            >
              <Download className="h-4 w-4 mr-1" /> Export Report
            </button>
          </div>
        </div>
        
        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-3 mr-3">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-enzobay-neutral-700">Total Revenue</span>
              </div>
              <span className={`flex items-center text-xs font-medium ${
                summaryMetrics.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {summaryMetrics.revenueGrowth >= 0 ? 
                  <ArrowUp className="h-3 w-3 mr-1" /> : 
                  <ArrowDown className="h-3 w-3 mr-1" />
                }
                {Math.abs(summaryMetrics.revenueGrowth)}%
              </span>
            </div>
            <p className="text-2xl font-bold text-enzobay-blue">
              {formatCurrency(summaryMetrics.totalRevenue)}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="rounded-full bg-green-100 p-3 mr-3">
                  <ShoppingBag className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-enzobay-neutral-700">Total Orders</span>
              </div>
              <span className={`flex items-center text-xs font-medium ${
                summaryMetrics.ordersGrowth >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {summaryMetrics.ordersGrowth >= 0 ? 
                  <ArrowUp className="h-3 w-3 mr-1" /> : 
                  <ArrowDown className="h-3 w-3 mr-1" />
                }
                {Math.abs(summaryMetrics.ordersGrowth)}%
              </span>
            </div>
            <p className="text-2xl font-bold text-enzobay-green">
              {summaryMetrics.totalOrders}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="rounded-full bg-purple-100 p-3 mr-3">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-enzobay-neutral-700">Total Customers</span>
              </div>
              <span className={`flex items-center text-xs font-medium ${
                summaryMetrics.customersGrowth >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {summaryMetrics.customersGrowth >= 0 ? 
                  <ArrowUp className="h-3 w-3 mr-1" /> : 
                  <ArrowDown className="h-3 w-3 mr-1" />
                }
                {Math.abs(summaryMetrics.customersGrowth)}%
              </span>
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {summaryMetrics.totalCustomers}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="rounded-full bg-orange-100 p-3 mr-3">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-enzobay-neutral-700">Avg. Order Value</span>
              </div>
              <span className={`flex items-center text-xs font-medium ${
                summaryMetrics.aovGrowth >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {summaryMetrics.aovGrowth >= 0 ? 
                  <ArrowUp className="h-3 w-3 mr-1" /> : 
                  <ArrowDown className="h-3 w-3 mr-1" />
                }
                {Math.abs(summaryMetrics.aovGrowth)}%
              </span>
            </div>
            <p className="text-2xl font-bold text-orange-600">
              {formatCurrency(summaryMetrics.averageOrderValue)}
            </p>
          </div>
        </div>
        
        {/* Sales Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium text-lg text-enzobay-brown">Sales Trend</h2>
            <button 
              className="text-sm text-enzobay-blue hover:underline flex items-center"
              onClick={() => handleExportReport('Sales Trend')}
            >
              <Download className="h-4 w-4 mr-1" /> Export
            </button>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => `${value / 1000}K`}
                />
                <Tooltip 
                  formatter={(value) => [`${formatCurrency(value as number)}`, 'Sales']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3b82f6" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Category and Payment Method Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium text-lg text-enzobay-brown">Sales by Category</h2>
              <button 
                className="text-sm text-enzobay-blue hover:underline flex items-center"
                onClick={() => handleExportReport('Category')}
              >
                <Download className="h-4 w-4 mr-1" /> Export
              </button>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentage']}
                  />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium text-lg text-enzobay-brown">Payment Methods</h2>
              <button 
                className="text-sm text-enzobay-blue hover:underline flex items-center"
                onClick={() => handleExportReport('Payment')}
              >
                <Download className="h-4 w-4 mr-1" /> Export
              </button>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={paymentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentage']}
                  />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Top Products Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium text-lg text-enzobay-brown">Top Selling Products</h2>
            <button 
              className="text-sm text-enzobay-blue hover:underline flex items-center"
              onClick={() => handleExportReport('Products')}
            >
              <Download className="h-4 w-4 mr-1" /> Export
            </button>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={productSalesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" name="Units Sold" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportManager;
