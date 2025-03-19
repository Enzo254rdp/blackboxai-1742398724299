
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-enzobay-neutral-50">
      <Navbar />
      
      <main>
        {/* Header Banner */}
        <div className="bg-enzobay-brown py-16 px-4">
          <div className="container mx-auto text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">About EnzoBay</h1>
            <p className="text-xl font-light max-w-3xl mx-auto">
              Your premier destination for quality products and exceptional shopping experiences.
            </p>
          </div>
        </div>
        
        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-4">Our Story</h2>
              <p className="text-enzobay-neutral-700 mb-4">
                EnzoBay was founded in 2015 with a simple mission: to provide customers with access to a wide range of quality products at competitive prices. What started as a small venture has grown into one of Kenya's leading e-commerce platforms.
              </p>
              <p className="text-enzobay-neutral-700 mb-4">
                We believe in the power of choice, convenience, and customer satisfaction. Our team works tirelessly to source products from reliable suppliers and brands to ensure that every item sold on our platform meets our high standards.
              </p>
              <p className="text-enzobay-neutral-700">
                Today, EnzoBay serves thousands of customers across the country, offering everything from electronics and fashion to home essentials and more. Our growth is a testament to our commitment to excellence and our drive to continuously improve the shopping experience for our customers.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2072&auto=format&fit=crop" 
                alt="Our team" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
        
        {/* Our Mission & Values */}
        <section className="py-16 bg-enzobay-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-4">Our Mission & Values</h2>
              <p className="text-enzobay-neutral-700 max-w-3xl mx-auto">
                At EnzoBay, we're guided by a set of core values that define who we are and how we operate.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-enzobay-orange/10 rounded-full flex items-center justify-center text-enzobay-orange mb-4">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.24 12.24C21.3658 11.1142 21.9983 9.58722 21.9983 7.99501C21.9983 6.40279 21.3658 4.87583 20.24 3.75001C19.1142 2.62419 17.5872 1.99171 15.995 1.99171C14.4028 1.99171 12.8758 2.62419 11.75 3.75001L5 10.5V19H13.5L20.24 12.24Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 8L2 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.5 15H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-enzobay-brown mb-3">Quality First</h3>
                <p className="text-enzobay-neutral-600">
                  We never compromise on quality. Every product on our platform undergoes rigorous quality checks to ensure it meets our standards.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-enzobay-blue/10 rounded-full flex items-center justify-center text-enzobay-blue mb-4">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-enzobay-brown mb-3">Customer Satisfaction</h3>
                <p className="text-enzobay-neutral-600">
                  Our customers are at the heart of everything we do. We strive to exceed expectations and provide exceptional service at every touchpoint.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-enzobay-orange/10 rounded-full flex items-center justify-center text-enzobay-orange mb-4">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-enzobay-brown mb-3">Integrity & Transparency</h3>
                <p className="text-enzobay-neutral-600">
                  We operate with honesty and transparency. From pricing to product information, we ensure clarity in all our communications.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-4">Meet Our Team</h2>
              <p className="text-enzobay-neutral-700 max-w-3xl mx-auto">
                Behind EnzoBay is a dedicated team of professionals committed to delivering excellence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "John Doe",
                  position: "CEO & Founder",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop"
                },
                {
                  name: "Jane Smith",
                  position: "COO",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                },
                {
                  name: "Michael Johnson",
                  position: "CTO",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
                },
                {
                  name: "Sarah Williams",
                  position: "Head of Marketing",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
                }
              ].map((member, index) => (
                <div key={index} className="bg-enzobay-neutral-50 rounded-lg overflow-hidden shadow-sm group">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-enzobay-brown">{member.name}</h3>
                    <p className="text-enzobay-neutral-600">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Join Us CTA */}
        <section className="py-16 bg-enzobay-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join the EnzoBay Family</h2>
            <p className="text-xl font-light max-w-3xl mx-auto mb-8">
              Be part of our journey as we continue to revolutionize online shopping in Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-enzobay-blue py-3 px-8 rounded-md font-medium hover:bg-enzobay-neutral-100 transition-colors">
                Contact Us
              </a>
              <a href="/careers" className="bg-transparent border border-white text-white py-3 px-8 rounded-md font-medium hover:bg-white/10 transition-colors">
                Careers
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
