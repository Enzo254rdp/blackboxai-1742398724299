
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { RefreshCw, Clock, ShieldCheck, CheckCircle } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-enzobay-neutral-50">
      <Navbar />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-enzobay-brown mb-4">Returns & Refunds</h1>
            <p className="text-lg text-enzobay-neutral-600 max-w-3xl mx-auto">
              Our hassle-free returns process ensures your complete satisfaction with every purchase from EnzoBay.
            </p>
          </div>
          
          {/* Return Policy Overview */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-enzobay-brown mb-8">Our Return Policy</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 30-Day Returns */}
              <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-enzobay-blue/10 rounded-full flex items-center justify-center text-enzobay-blue mr-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-enzobay-brown">30-Day Return Window</h3>
                </div>
                <p className="text-enzobay-neutral-600">
                  You have 30 days from the delivery date to return most items purchased from EnzoBay. This gives you ample time to evaluate your purchase and decide if it meets your needs.
                </p>
              </div>
              
              {/* Easy Returns */}
              <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-enzobay-orange/10 rounded-full flex items-center justify-center text-enzobay-orange mr-4">
                    <RefreshCw className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-enzobay-brown">Hassle-Free Process</h3>
                </div>
                <p className="text-enzobay-neutral-600">
                  Our returns process is simple and straightforward. Initiate your return online, print your return label, and drop off your package at a designated location or schedule a pickup.
                </p>
              </div>
              
              {/* Quality Guarantee */}
              <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-enzobay-blue/10 rounded-full flex items-center justify-center text-enzobay-blue mr-4">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-enzobay-brown">Quality Guarantee</h3>
                </div>
                <p className="text-enzobay-neutral-600">
                  We stand behind the quality of our products. If you receive a defective or damaged item, we'll promptly replace it or provide a full refund, no questions asked.
                </p>
              </div>
              
              {/* Customer Satisfaction */}
              <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-enzobay-orange/10 rounded-full flex items-center justify-center text-enzobay-orange mr-4">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-enzobay-brown">Satisfaction Promise</h3>
                </div>
                <p className="text-enzobay-neutral-600">
                  Your satisfaction is our priority. If you're not completely happy with your purchase for any reason, we're here to make it right with a return, exchange, or store credit.
                </p>
              </div>
            </div>
          </div>
          
          {/* Return Eligibility */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-enzobay-brown mb-6">Return Eligibility</h2>
            <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200">
              <p className="text-enzobay-neutral-700 mb-6">
                Most items purchased from EnzoBay are eligible for return within 30 days of delivery, provided they meet the following conditions:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <h3 className="font-semibold text-enzobay-brown mb-2">Eligible for Return</h3>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-enzobay-neutral-700">Unworn, unwashed, and unused items</span>
                    </li>
                    <li className="flex">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-enzobay-neutral-700">Items in original packaging</span>
                    </li>
                    <li className="flex">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-enzobay-neutral-700">Items with all tags and labels attached</span>
                    </li>
                    <li className="flex">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-enzobay-neutral-700">Defective or damaged items</span>
                    </li>
                    <li className="flex">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-enzobay-neutral-700">Items that don't match the description</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-enzobay-brown mb-2">Not Eligible for Return</h3>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="text-red-500 mr-2">✕</span>
                      <span className="text-enzobay-neutral-700">Used or worn items (unless defective)</span>
                    </li>
                    <li className="flex">
                      <span className="text-red-500 mr-2">✕</span>
                      <span className="text-enzobay-neutral-700">Items missing original packaging</span>
                    </li>
                    <li className="flex">
                      <span className="text-red-500 mr-2">✕</span>
                      <span className="text-enzobay-neutral-700">Personal care items or undergarments</span>
                    </li>
                    <li className="flex">
                      <span className="text-red-500 mr-2">✕</span>
                      <span className="text-enzobay-neutral-700">Gift cards and digital downloads</span>
                    </li>
                    <li className="flex">
                      <span className="text-red-500 mr-2">✕</span>
                      <span className="text-enzobay-neutral-700">Items marked as "Final Sale"</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-enzobay-neutral-700">
                  Some product categories may have specific return conditions. Please check individual product pages for any special return policy information.
                </p>
              </div>
            </div>
          </div>
          
          {/* Return Process */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-enzobay-brown mb-6">How to Return an Item</h2>
            <div className="bg-white rounded-xl overflow-hidden border border-enzobay-neutral-200">
              <div className="p-6 border-b border-enzobay-neutral-200">
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-enzobay-blue text-white flex items-center justify-center mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-enzobay-brown mb-2">Initiate Your Return</h3>
                    <p className="text-enzobay-neutral-600">
                      Log in to your EnzoBay account, navigate to "Orders," find the order containing the item you wish to return, and select "Return Item." Alternatively, you can contact our customer support team for assistance.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-b border-enzobay-neutral-200">
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-enzobay-blue text-white flex items-center justify-center mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-enzobay-brown mb-2">Provide Return Details</h3>
                    <p className="text-enzobay-neutral-600">
                      Select the items you wish to return, choose a return reason from the dropdown menu, and provide any additional information that might help us process your return more efficiently.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-b border-enzobay-neutral-200">
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-enzobay-blue text-white flex items-center justify-center mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-enzobay-brown mb-2">Select Return Method</h3>
                    <p className="text-enzobay-neutral-600">
                      Choose your preferred return method: drop-off at a partner location or scheduled pickup from your address. For some items, we offer free return shipping.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-b border-enzobay-neutral-200">
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-enzobay-blue text-white flex items-center justify-center mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-enzobay-brown mb-2">Package Your Return</h3>
                    <p className="text-enzobay-neutral-600">
                      Print the return label and packing slip provided, then securely package the item(s) in the original packaging if possible. Attach the return label to the outside of the package.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-enzobay-blue text-white flex items-center justify-center mr-4 flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-enzobay-brown mb-2">Track Your Return</h3>
                    <p className="text-enzobay-neutral-600">
                      You can track the status of your return through your EnzoBay account. Once we receive and inspect your return, we'll process your refund or exchange according to your preference.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Refunds */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-enzobay-brown mb-6">Refund Information</h2>
            <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200">
              <h3 className="text-lg font-medium text-enzobay-brown mb-4">Refund Processing</h3>
              <p className="text-enzobay-neutral-600 mb-6">
                Once we receive your return, our team will inspect the item to ensure it meets our return criteria. This process typically takes 1-2 business days. After approval, we'll process your refund according to the following timeline:
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-enzobay-neutral-100">
                  <div className="text-enzobay-neutral-700 font-medium">Credit/Debit Cards</div>
                  <div className="text-enzobay-neutral-600">Processed in 3-5 business days</div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-enzobay-neutral-100">
                  <div className="text-enzobay-neutral-700 font-medium">M-Pesa</div>
                  <div className="text-enzobay-neutral-600">Processed within 24-48 hours</div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-enzobay-neutral-100">
                  <div className="text-enzobay-neutral-700 font-medium">PayPal</div>
                  <div className="text-enzobay-neutral-600">Processed within 24 hours</div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="text-enzobay-neutral-700 font-medium">Store Credit</div>
                  <div className="text-enzobay-neutral-600">Available immediately after approval</div>
                </div>
              </div>
              
              <p className="text-enzobay-neutral-600 mb-4">
                Please note that while we process refunds promptly, it may take additional time for the funds to appear in your account, depending on your financial institution or payment method.
              </p>
              
              <h3 className="text-lg font-medium text-enzobay-brown mb-4">Refund Options</h3>
              <p className="text-enzobay-neutral-600">
                We offer three refund options:
              </p>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <span className="text-enzobay-blue font-semibold mr-2">•</span>
                  <span className="text-enzobay-neutral-700"><strong>Original Payment Method:</strong> Refund to the payment method used for the purchase.</span>
                </li>
                <li className="flex">
                  <span className="text-enzobay-blue font-semibold mr-2">•</span>
                  <span className="text-enzobay-neutral-700"><strong>Store Credit:</strong> Receive 110% of the purchase value as EnzoBay store credit for future purchases.</span>
                </li>
                <li className="flex">
                  <span className="text-enzobay-blue font-semibold mr-2">•</span>
                  <span className="text-enzobay-neutral-700"><strong>Exchange:</strong> Replace the returned item with another product of equal or different value (you'll pay or be refunded the difference).</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Return FAQ */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-enzobay-brown mb-6">Frequently Asked Questions</h2>
            <div className="bg-white rounded-xl border border-enzobay-neutral-200 divide-y divide-enzobay-neutral-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-2">Can I return a gift?</h3>
                <p className="text-enzobay-neutral-600">
                  Yes, you can return gifts. For gift returns, you'll receive store credit equal to the purchase value of the item. The original purchaser will not be notified about the return.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-2">Do I have to pay for return shipping?</h3>
                <p className="text-enzobay-neutral-600">
                  For returns due to defects, damages, or incorrect items, return shipping is free. For other returns, a shipping fee of KSH 300 will be deducted from your refund amount. EnzoBay Premium members enjoy free returns on all eligible items.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-2">Can I exchange an item for a different size or color?</h3>
                <p className="text-enzobay-neutral-600">
                  Yes, you can exchange items for different sizes, colors, or even different products. Simply select the "Exchange" option when initiating your return, and specify your preferences. Availability of exchanges depends on current stock.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-2">What if my item is damaged during the return shipping?</h3>
                <p className="text-enzobay-neutral-600">
                  We recommend that you take photos of the item and packaging before shipping. If the item is damaged during return transit, please contact our customer service within 48 hours of the return delivery date, and we will assist you with the next steps.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-enzobay-neutral-600 mb-4">
                Have more questions about returns or refunds?
              </p>
              <a href="/contact" className="btn-primary inline-block">
                Contact Customer Support
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
