
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";

// FAQ data structure
const faqCategories = [
  {
    name: "Shopping",
    faqs: [
      {
        question: "How do I create an account?",
        answer: "Creating an account is easy! Click on the 'Account' icon at the top of the page, then select 'Sign Up'. Fill in your details, and you're good to go."
      },
      {
        question: "How can I search for products?",
        answer: "You can search for products using the search bar at the top of the page. Enter keywords related to what you're looking for, and we'll show you relevant results. You can also browse by category or use our advanced filters."
      },
      {
        question: "Can I shop as a guest without creating an account?",
        answer: "Yes, you can shop as a guest without creating an account. However, creating an account allows you to track your orders, save your favorite items, and enjoy a faster checkout experience in the future."
      },
      {
        question: "How do I add items to my cart?",
        answer: "To add items to your cart, simply click the 'Add to Cart' button on the product page. You can view your cart at any time by clicking the cart icon in the top right corner."
      }
    ]
  },
  {
    name: "Orders & Payments",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept a variety of payment methods including credit/debit cards (Visa, Mastercard), M-Pesa, bank transfers, and PayPal. All transactions are secure and encrypted for your safety."
      },
      {
        question: "How can I track my order?",
        answer: "You can track your order by logging into your account and navigating to the 'Orders' section. Alternatively, you can use the tracking number provided in your order confirmation email."
      },
      {
        question: "Can I change or cancel my order after placing it?",
        answer: "If you need to change or cancel your order, please contact our customer support team as soon as possible. Changes or cancellations may not be possible once your order has been processed for shipping."
      },
      {
        question: "Is it safe to use my credit card on your website?",
        answer: "Yes, our website uses the latest security protocols and encryption technology to ensure your credit card information is secure. We are also PCI DSS compliant, which means we adhere to the highest standards for credit card security."
      }
    ]
  },
  {
    name: "Shipping & Delivery",
    faqs: [
      {
        question: "How long will it take to receive my order?",
        answer: "Delivery times vary depending on your location and the items ordered. Within Nairobi, delivery typically takes 1-3 business days. For other locations in Kenya, it may take 3-7 business days. International shipping times vary by destination."
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to select international destinations. Shipping costs and delivery times vary by location. You can view the available shipping options during checkout."
      },
      {
        question: "How much does shipping cost?",
        answer: "Shipping costs depend on your location and the size/weight of your order. We offer free shipping on orders over KSH 5,000 within Kenya. Exact shipping costs are calculated at checkout."
      },
      {
        question: "Can I change my delivery address after placing an order?",
        answer: "If you need to change your delivery address, please contact our customer support team immediately. Address changes may be possible if the order hasn't been processed for shipping yet."
      }
    ]
  },
  {
    name: "Returns & Refunds",
    faqs: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for most items. Products must be in their original condition with all tags and packaging intact. Please visit our Returns page for more detailed information."
      },
      {
        question: "How do I return an item?",
        answer: "To return an item, login to your account, go to 'Orders', find the order with the item you wish to return, and select 'Return Item'. Follow the instructions to complete the return process. You can also contact our customer support for assistance."
      },
      {
        question: "How long does it take to process a refund?",
        answer: "Once we receive your returned item and verify its condition, refunds are typically processed within 5-7 business days. The time it takes for the refund to appear in your account depends on your payment method and financial institution."
      },
      {
        question: "Do you offer exchanges?",
        answer: "Yes, we offer exchanges for items of equal value. If you'd like to exchange an item, please indicate this during the return process. If the replacement item costs more, you'll need to pay the difference."
      }
    ]
  },
  {
    name: "Product Information",
    faqs: [
      {
        question: "Are your products authentic?",
        answer: "Yes, all products sold on EnzoBay are 100% authentic. We source our products directly from authorized distributors and brand owners to ensure quality and authenticity."
      },
      {
        question: "Do you offer warranty on products?",
        answer: "Warranty coverage varies by product and brand. Manufacturer warranties are passed on to customers where applicable. Specific warranty information is provided on individual product pages."
      },
      {
        question: "Can I request items that are out of stock?",
        answer: "Yes, you can sign up for notifications when out-of-stock items become available again. Simply click the 'Notify Me' button on the product page. For specific requests, please contact our customer support team."
      },
      {
        question: "How can I tell if a product will fit me?",
        answer: "Detailed size guides are provided on product pages for clothing and footwear. Measurements for other items such as furniture or accessories are also listed in the product specifications. If you need additional information, please contact customer support."
      }
    ]
  }
];

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Toggle FAQ open/close state
  const toggleFaq = (categoryName: string, questionIndex: number) => {
    const key = `${categoryName}-${questionIndex}`;
    setOpenFaqs(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  // Filter FAQs based on search term
  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-enzobay-neutral-50">
      <Navbar />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-enzobay-brown mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-enzobay-neutral-600 max-w-3xl mx-auto mb-8">
              Find answers to common questions about shopping on EnzoBay. If you can't find what you're looking for, please contact our support team.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-enzobay-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white w-full py-3 pl-10 pr-10 rounded-lg border border-enzobay-neutral-200 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-enzobay-neutral-400 hover:text-enzobay-neutral-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
          
          {/* Category Navigation - Horizontal ScrollView for Mobile */}
          {!searchTerm && (
            <div className="mb-8 overflow-x-auto">
              <div className="flex space-x-2 pb-2 min-w-max">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === null 
                      ? "bg-enzobay-orange text-white" 
                      : "bg-enzobay-neutral-100 text-enzobay-neutral-700 hover:bg-enzobay-neutral-200"
                  }`}
                >
                  All Questions
                </button>
                
                {faqCategories.map(category => (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category.name 
                        ? "bg-enzobay-orange text-white" 
                        : "bg-enzobay-neutral-100 text-enzobay-neutral-700 hover:bg-enzobay-neutral-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* FAQs */}
          <div className="max-w-4xl mx-auto space-y-8">
            {(searchTerm ? filteredFaqs : (activeCategory 
              ? faqCategories.filter(category => category.name === activeCategory) 
              : faqCategories)).map((category, categoryIndex) => (
              <div key={categoryIndex} className="animate-fade-in" style={{animationDelay: `${categoryIndex * 0.1}s`}}>
                <h2 className="text-xl md:text-2xl font-bold text-enzobay-brown mb-4">{category.name}</h2>
                
                <div className="space-y-3">
                  {category.faqs.map((faq, faqIndex) => {
                    const isOpen = openFaqs[`${category.name}-${faqIndex}`] || false;
                    
                    return (
                      <div 
                        key={faqIndex} 
                        className={`bg-white rounded-lg overflow-hidden border transition-all duration-300 ${
                          isOpen ? "border-enzobay-blue shadow-md" : "border-enzobay-neutral-200"
                        }`}
                      >
                        <button
                          onClick={() => toggleFaq(category.name, faqIndex)}
                          className="w-full flex justify-between items-center p-5 text-left"
                        >
                          <h3 className={`font-medium text-lg ${isOpen ? "text-enzobay-blue" : "text-enzobay-brown"}`}>
                            {faq.question}
                          </h3>
                          {isOpen ? (
                            <ChevronUp className={`h-5 w-5 ${isOpen ? "text-enzobay-blue" : "text-enzobay-neutral-400"}`} />
                          ) : (
                            <ChevronDown className={`h-5 w-5 ${isOpen ? "text-enzobay-blue" : "text-enzobay-neutral-400"}`} />
                          )}
                        </button>
                        
                        <div 
                          className={`px-5 transition-all duration-300 overflow-hidden ${
                            isOpen ? "max-h-96 pb-5" : "max-h-0"
                          }`}
                        >
                          <p className="text-enzobay-neutral-600">{faq.answer}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {/* No results message */}
            {searchTerm && filteredFaqs.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-enzobay-neutral-100 p-4 rounded-full mb-4">
                  <Search className="h-8 w-8 text-enzobay-neutral-500" />
                </div>
                <h3 className="text-xl font-semibold text-enzobay-brown mb-2">No matching questions found</h3>
                <p className="text-enzobay-neutral-600 max-w-md mb-6">
                  We couldn't find any FAQs matching your search. Try a different keyword or phrase.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="btn-primary"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
          
          {/* Still Need Help */}
          <div className="mt-16 bg-white rounded-xl p-8 shadow-sm text-center max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-enzobay-brown mb-4">Still Need Help?</h2>
            <p className="text-enzobay-neutral-600 mb-8 max-w-2xl mx-auto">
              If you couldn't find the answer you're looking for, our customer support team is here to help. We're available Monday through Saturday, 8AM - 6PM.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="btn-primary"
              >
                Contact Support
              </a>
              <a 
                href="mailto:support@enzobay.com" 
                className="border border-enzobay-neutral-300 text-enzobay-brown font-medium py-2 px-6 rounded-md hover:bg-enzobay-neutral-100 transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
