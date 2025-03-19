
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useScrollToTop } from "../../hooks/use-scroll";
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Download,
  Eye,
  Printer,
  ChevronLeft,
  ChevronRight,
  Calendar,
  X
} from "lucide-react";
import { useToast } from "../../hooks/use-toast";

const OrderManager = () => {
  useScrollToTop();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [orderStatus, setOrderStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Mock orders data (would come from API/database)
  const orders = [
    { id: 'ORD-1234', customer: 'John Doe', email: 'john@example.com', date: '2023-09-28', items: 3, total: 5600, payment: 'M-Pesa', status: 'completed' },
    { id: 'ORD-1235', customer: 'Jane Smith', email: 'jane@example.com', date: '2023-09-27', items: 2, total: 3200, payment: 'Card', status: 'processing' },
    { id: 'ORD-1236', customer: 'Alice Johnson', email: 'alice@example.com', date: '2023-09-26', items: 5, total: 8750, payment: 'M-Pesa', status: 'completed' },
    { id: 'ORD-1237', customer: 'Bob Brown', email: 'bob@example.com', date: '2023-09-25', items: 1, total: 1450, payment: 'Card', status: 'pending' },
    { id: 'ORD-1238', customer: 'Eve Wilson', email: 'eve@example.com', date: '2023-09-24', items: 2, total: 2800, payment: 'M-Pesa', status: 'completed' },
    { id: 'ORD-1239', customer: 'Michael Johnson', email: 'michael@example.com', date: '2023-09-23', items: 4, total: 6500, payment: 'Card', status: 'processing' },
    { id: 'ORD-1240', customer: 'Sarah Davis', email: 'sarah@example.com', date: '2023-09-22', items: 1, total: 1200, payment: 'M-Pesa', status: 'completed' },
    { id: 'ORD-1241', customer: 'David Wilson', email: 'david@example.com', date: '2023-09-21', items: 3, total: 4800, payment: 'Card', status: 'cancelled' },
  ];

  // Mock order details (for the selected order)
  const orderDetails = {
    id: 'ORD-1234',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+254 712 345 678',
    },
    shippingAddress: {
      street: '123 Main St',
      city: 'Nairobi',
      zipCode: '00100',
      country: 'Kenya',
    },
    billingAddress: {
      street: '123 Main St',
      city: 'Nairobi',
      zipCode: '00100',
      country: 'Kenya',
    },
    orderDate: '2023-09-28',
    status: 'completed',
    paymentMethod: 'M-Pesa',
    paymentStatus: 'paid',
    items: [
      { id: 1, name: 'Wireless Earbuds', quantity: 1, price: 1400, total: 1400 },
      { id: 2, name: 'Smart Watch', quantity: 1, price: 2400, total: 2400 },
      { id: 3, name: 'Phone Case', quantity: 1, price: 800, total: 800 },
    ],
    subtotal: 4600,
    shippingFee: 500,
    tax: 500,
    total: 5600,
  };

  const filteredOrders = orders.filter(order => {
    // Filter by search query
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = orderStatus === "all" || order.status === orderStatus;
    
    // Filter by date range (simplified implementation)
    let matchesDateRange = true;
    if (dateRange === "today") {
      matchesDateRange = order.date === new Date().toISOString().split('T')[0];
    } else if (dateRange === "week") {
      // Simple check - orders from the last 7 days would need actual date comparison
      matchesDateRange = true;
    } else if (dateRange === "month") {
      // Simple check - orders from the last 30 days would need actual date comparison
      matchesDateRange = true;
    }
    
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Executed",
      description: `Searched for: ${searchQuery}`,
    });
  };

  const handleExportCSV = () => {
    toast({
      title: "Export Started",
      description: "Orders data is being exported to CSV.",
    });
  };

  const handlePrintOrders = () => {
    toast({
      title: "Print Started",
      description: "Orders are being prepared for printing.",
    });
  };

  const handleViewOrder = (orderId: string) => {
    // In a real app, this would fetch order details from the API
    setSelectedOrder(orderDetails);
    setShowOrderModal(true);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Order ${orderId} status updated to ${newStatus}.`,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-enzobay-neutral-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl font-semibold text-enzobay-brown mb-4 md:mb-0">
              <span className="flex items-center">
                <ShoppingCart className="mr-2 h-6 w-6" /> Order Management
              </span>
            </h1>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
              <form onSubmit={handleSearch} className="flex-grow relative">
                <input 
                  type="text"
                  placeholder="Search orders..."
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-enzobay-neutral-200 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-enzobay-neutral-500" />
              </form>
              
              <select 
                className="border rounded-md px-3 py-2 text-sm bg-white"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
              
              <select 
                className="border rounded-md px-3 py-2 text-sm bg-white"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="mb-2 md:mb-0">
              <p className="text-sm text-enzobay-neutral-600">
                Showing {filteredOrders.length} orders
              </p>
            </div>
            
            <div className="flex space-x-2">
              <button 
                className="bg-enzobay-neutral-100 text-enzobay-neutral-700 px-3 py-1.5 rounded-md text-sm flex items-center"
                onClick={handleExportCSV}
              >
                <Download className="h-4 w-4 mr-1" /> Export CSV
              </button>
              <button 
                className="bg-enzobay-neutral-100 text-enzobay-neutral-700 px-3 py-1.5 rounded-md text-sm flex items-center"
                onClick={handlePrintOrders}
              >
                <Printer className="h-4 w-4 mr-1" /> Print
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-enzobay-neutral-200">
              <thead>
                <tr className="text-left text-xs font-medium text-enzobay-neutral-500 uppercase tracking-wider">
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-enzobay-neutral-200">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-enzobay-neutral-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-enzobay-neutral-900">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-enzobay-neutral-900">{order.customer}</div>
                        <div className="text-xs text-enzobay-neutral-500">{order.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                      {order.date}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                      {order.items}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-enzobay-neutral-900">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                      {order.payment}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <select 
                        className={`inline-flex px-2 py-1 text-xs rounded-full border-0 ${getStatusColor(order.status)}`}
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      >
                        <option value="completed" className="bg-white text-enzobay-neutral-800">Completed</option>
                        <option value="processing" className="bg-white text-enzobay-neutral-800">Processing</option>
                        <option value="pending" className="bg-white text-enzobay-neutral-800">Pending</option>
                        <option value="cancelled" className="bg-white text-enzobay-neutral-800">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                      <div className="flex space-x-2">
                        <button 
                          className="text-enzobay-blue hover:text-enzobay-blue-dark"
                          onClick={() => handleViewOrder(order.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          className="text-enzobay-neutral-600 hover:text-enzobay-neutral-800"
                          onClick={() => {
                            toast({
                              title: "Print Order",
                              description: `Printing order: ${order.id}`,
                            });
                          }}
                        >
                          <Printer className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {currentOrders.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-enzobay-neutral-600">
                      No orders found. Try a different search query or filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-enzobay-neutral-600 mb-2 sm:mb-0">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} entries
            </p>
            
            <div className="flex space-x-1">
              <button 
                className={`px-3 py-1 rounded border text-sm ${currentPage === 1 ? 'text-enzobay-neutral-400 cursor-not-allowed' : 'text-enzobay-neutral-700'}`}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i + 1}
                  className={`px-3 py-1 rounded border text-sm ${
                    currentPage === i + 1 ? 'bg-enzobay-blue text-white' : 'text-enzobay-neutral-700'
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                className={`px-3 py-1 rounded border text-sm ${currentPage === totalPages ? 'text-enzobay-neutral-400 cursor-not-allowed' : 'text-enzobay-neutral-700'}`}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Order Detail Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-enzobay-brown">Order Details: {selectedOrder.id}</h3>
              <button 
                className="text-enzobay-neutral-500 hover:text-enzobay-neutral-800"
                onClick={() => setShowOrderModal(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-enzobay-neutral-500 mb-2">Customer Information</h4>
                  <div className="bg-enzobay-neutral-50 p-4 rounded-md">
                    <p className="font-medium">{selectedOrder.customer.name}</p>
                    <p className="text-sm text-enzobay-neutral-700">{selectedOrder.customer.email}</p>
                    <p className="text-sm text-enzobay-neutral-700">{selectedOrder.customer.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-enzobay-neutral-500 mb-2">Order Information</h4>
                  <div className="bg-enzobay-neutral-50 p-4 rounded-md">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-enzobay-neutral-700">Date:</span>
                      <span className="text-sm font-medium">{selectedOrder.orderDate}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-enzobay-neutral-700">Status:</span>
                      <span className={`text-sm px-2 py-0.5 rounded-full ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-enzobay-neutral-700">Payment:</span>
                      <span className="text-sm font-medium">{selectedOrder.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-enzobay-neutral-700">Payment Status:</span>
                      <span className={`text-sm font-medium ${
                        selectedOrder.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedOrder.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-enzobay-neutral-500 mb-2">Shipping Address</h4>
                  <div className="bg-enzobay-neutral-50 p-4 rounded-md">
                    <p className="text-sm">{selectedOrder.shippingAddress.street}</p>
                    <p className="text-sm">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.zipCode}</p>
                    <p className="text-sm">{selectedOrder.shippingAddress.country}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-enzobay-neutral-500 mb-2">Billing Address</h4>
                  <div className="bg-enzobay-neutral-50 p-4 rounded-md">
                    <p className="text-sm">{selectedOrder.billingAddress.street}</p>
                    <p className="text-sm">{selectedOrder.billingAddress.city}, {selectedOrder.billingAddress.zipCode}</p>
                    <p className="text-sm">{selectedOrder.billingAddress.country}</p>
                  </div>
                </div>
              </div>
              
              <h4 className="text-sm font-medium text-enzobay-neutral-500 mb-2">Order Items</h4>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full divide-y divide-enzobay-neutral-200">
                  <thead>
                    <tr className="text-left text-xs font-medium text-enzobay-neutral-500 uppercase tracking-wider bg-enzobay-neutral-50">
                      <th className="px-4 py-2">Product</th>
                      <th className="px-4 py-2">Quantity</th>
                      <th className="px-4 py-2">Unit Price</th>
                      <th className="px-4 py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-enzobay-neutral-200">
                    {selectedOrder.items.map((item: any) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2 text-sm">{item.name}</td>
                        <td className="px-4 py-2 text-sm">{item.quantity}</td>
                        <td className="px-4 py-2 text-sm">{formatCurrency(item.price)}</td>
                        <td className="px-4 py-2 text-sm font-medium">{formatCurrency(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="border-t border-enzobay-neutral-200 pt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-enzobay-neutral-700">Subtotal:</span>
                  <span className="text-sm font-medium">{formatCurrency(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-enzobay-neutral-700">Shipping:</span>
                  <span className="text-sm font-medium">{formatCurrency(selectedOrder.shippingFee)}</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm text-enzobay-neutral-700">Tax:</span>
                  <span className="text-sm font-medium">{formatCurrency(selectedOrder.tax)}</span>
                </div>
                <div className="flex justify-between border-t border-enzobay-neutral-200 pt-2">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-enzobay-blue">{formatCurrency(selectedOrder.total)}</span>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-2">
                <button 
                  className="px-4 py-2 border rounded-md text-enzobay-neutral-700 flex items-center"
                  onClick={() => {
                    toast({
                      title: "Print Order",
                      description: `Printing order: ${selectedOrder.id}`,
                    });
                  }}
                >
                  <Printer className="h-4 w-4 mr-1" /> Print Order
                </button>
                <button 
                  className="px-4 py-2 bg-enzobay-blue text-white rounded-md"
                  onClick={() => setShowOrderModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default OrderManager;
