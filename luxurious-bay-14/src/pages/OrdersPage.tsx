
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useScrollToTop } from "../hooks/use-scroll";

// Mock order data
const MOCK_ORDERS = [
  {
    id: "ORD123456",
    date: "March 1, 2025",
    status: "Delivered",
    total: "Ksh 12,500",
    items: [
      { id: "p1", name: "Leather Sofa", price: "Ksh 10,000", quantity: 1 },
      { id: "p2", name: "Coffee Table", price: "Ksh 2,500", quantity: 1 }
    ]
  },
  {
    id: "ORD789012",
    date: "February 15, 2025",
    status: "Shipped",
    total: "Ksh 5,800",
    items: [
      { id: "p3", name: "Floor Lamp", price: "Ksh 3,800", quantity: 1 },
      { id: "p4", name: "Decorative Vase", price: "Ksh 2,000", quantity: 1 }
    ]
  },
  {
    id: "ORD345678",
    date: "January 20, 2025",
    status: "Delivered",
    total: "Ksh 15,200",
    items: [
      { id: "p5", name: "Dining Chair (Set of 4)", price: "Ksh 15,200", quantity: 1 }
    ]
  }
];

interface OrderDetailsProps {
  order: typeof MOCK_ORDERS[0];
  onClose: () => void;
}

const OrderDetails = ({ order, onClose }: OrderDetailsProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-enzobay-brown">Order Details</h2>
            <button
              onClick={onClose}
              className="text-enzobay-neutral-500 hover:text-enzobay-neutral-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-enzobay-neutral-500">Order Number</p>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-enzobay-neutral-500">Date</p>
              <p className="font-medium">{order.date}</p>
            </div>
            <div>
              <p className="text-sm text-enzobay-neutral-500">Status</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                order.status === "Delivered" 
                  ? "bg-green-100 text-green-800" 
                  : order.status === "Shipped" 
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {order.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-enzobay-neutral-500">Total</p>
              <p className="font-medium">{order.total}</p>
            </div>
          </div>
          
          <div className="border-t border-b border-enzobay-neutral-200 py-6 mb-6">
            <h3 className="font-semibold text-enzobay-brown mb-4">Items</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-enzobay-neutral-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Link 
              to={`/track-order?order=${order.id}`}
              className="bg-enzobay-blue hover:bg-enzobay-blue-dark text-white font-medium py-2 px-6 rounded-md transition-colors duration-300 text-center"
            >
              Track Order
            </Link>
            
            <button 
              className="bg-enzobay-neutral-100 hover:bg-enzobay-neutral-200 text-enzobay-neutral-800 font-medium py-2 px-6 rounded-md transition-colors duration-300"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrdersPage = () => {
  useScrollToTop();
  const [selectedOrder, setSelectedOrder] = useState<typeof MOCK_ORDERS[0] | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-8">
          My Orders
        </h1>
        
        {MOCK_ORDERS.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-enzobay-neutral-200">
                <thead className="bg-enzobay-neutral-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-enzobay-neutral-500 uppercase tracking-wider">
                      Order Number
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-enzobay-neutral-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-enzobay-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-enzobay-neutral-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-enzobay-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-enzobay-neutral-200">
                  {MOCK_ORDERS.map((order) => (
                    <tr key={order.id} className="hover:bg-enzobay-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-enzobay-brown">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-enzobay-neutral-600">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "Delivered" 
                            ? "bg-green-100 text-green-800" 
                            : order.status === "Shipped" 
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-enzobay-neutral-600">
                        {order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-enzobay-blue hover:text-enzobay-blue-dark mr-4"
                        >
                          View
                        </button>
                        <Link
                          to={`/track-order?order=${order.id}`}
                          className="text-enzobay-orange hover:text-enzobay-orange-dark"
                        >
                          Track
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-enzobay-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-enzobay-brown mb-2">No Orders Yet</h2>
            <p className="text-enzobay-neutral-600 mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link
              to="/products"
              className="bg-enzobay-blue hover:bg-enzobay-blue-dark text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
            >
              Browse Products
            </Link>
          </div>
        )}
      </main>
      
      {selectedOrder && (
        <OrderDetails 
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default OrdersPage;
