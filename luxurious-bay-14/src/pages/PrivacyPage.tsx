
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Shield, Eye, Lock, FileText } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-enzobay-neutral-50">
      <Navbar />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-enzobay-brown mb-4">Privacy Policy</h1>
            <p className="text-lg text-enzobay-neutral-600 max-w-3xl mx-auto">
              At EnzoBay, we value your privacy and are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data.
            </p>
            <p className="text-sm text-enzobay-neutral-500 mt-4">
              Last Updated: May 10, 2023
            </p>
          </div>
          
          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-xl p-8 border border-enzobay-neutral-200">
              <div className="flex items-start md:items-center gap-6 mb-6 flex-col md:flex-row">
                <div className="w-16 h-16 rounded-full bg-enzobay-blue/10 flex items-center justify-center text-enzobay-blue flex-shrink-0">
                  <Shield className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-enzobay-brown mb-2">Our Commitment to Privacy</h2>
                  <p className="text-enzobay-neutral-600">
                    EnzoBay is dedicated to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains our practices regarding the collection, use, and disclosure of your information when you use our website and services.
                  </p>
                </div>
              </div>
              
              <p className="text-enzobay-neutral-600 mb-4">
                By using EnzoBay's website and services, you consent to the practices described in this Privacy Policy. We encourage you to read this document carefully to understand how we handle your information.
              </p>
              
              <p className="text-enzobay-neutral-600">
                This policy applies to all information collected through our website, mobile applications, and any related services, sales, marketing, or events (collectively, the "Services").
              </p>
            </div>
          </div>
          
          {/* Information We Collect */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-enzobay-orange/10 flex items-center justify-center text-enzobay-orange">
                <Eye className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-enzobay-brown">Information We Collect</h2>
            </div>
            
            <div className="bg-white rounded-xl border border-enzobay-neutral-200 overflow-hidden">
              <div className="p-6 border-b border-enzobay-neutral-200">
                <h3 className="text-lg font-medium text-enzobay-brown mb-3">Personal Information</h3>
                <p className="text-enzobay-neutral-600 mb-4">
                  We may collect personally identifiable information that you provide to us, such as:
                </p>
                <ul className="space-y-2 ml-6 list-disc text-enzobay-neutral-600">
                  <li>Name, email address, phone number, and shipping/billing address</li>
                  <li>Account credentials, including username and password</li>
                  <li>Payment information (processed securely through our payment providers)</li>
                  <li>Purchase history and preferences</li>
                  <li>Communications with our customer service team</li>
                  <li>Responses to surveys or feedback forms</li>
                </ul>
              </div>
              
              <div className="p-6 border-b border-enzobay-neutral-200">
                <h3 className="text-lg font-medium text-enzobay-brown mb-3">Automatically Collected Information</h3>
                <p className="text-enzobay-neutral-600 mb-4">
                  When you visit our website or use our services, we may automatically collect certain information about your device and usage, including:
                </p>
                <ul className="space-y-2 ml-6 list-disc text-enzobay-neutral-600">
                  <li>IP address, browser type, operating system, and device information</li>
                  <li>Pages visited, links clicked, and browsing patterns</li>
                  <li>Time spent on our website and interaction with our content</li>
                  <li>Referring websites or sources</li>
                  <li>Location information (with your permission)</li>
                </ul>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-3">Information from Third Parties</h3>
                <p className="text-enzobay-neutral-600 mb-4">
                  We may receive information about you from other sources, including:
                </p>
                <ul className="space-y-2 ml-6 list-disc text-enzobay-neutral-600">
                  <li>Social media platforms when you connect them to your EnzoBay account</li>
                  <li>Marketing partners and analytics providers</li>
                  <li>Payment processors and fraud detection services</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* How We Use Your Information */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-enzobay-blue/10 flex items-center justify-center text-enzobay-blue">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-enzobay-brown">How We Use Your Information</h2>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200">
              <p className="text-enzobay-neutral-600 mb-6">
                We use the information we collect for various purposes, including but not limited to:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-3">Business Operations</h3>
                  <ul className="space-y-2 ml-6 list-disc text-enzobay-neutral-600">
                    <li>Processing and fulfilling your orders</li>
                    <li>Managing your account and providing customer support</li>
                    <li>Processing payments and preventing fraud</li>
                    <li>Communicating with you about your orders and account</li>
                    <li>Responding to your inquiries and requests</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-3">Service Improvement</h3>
                  <ul className="space-y-2 ml-6 list-disc text-enzobay-neutral-600">
                    <li>Analyzing usage patterns to improve our website and services</li>
                    <li>Troubleshooting technical issues</li>
                    <li>Developing new features and products</li>
                    <li>Conducting research and analytics</li>
                    <li>Personalizing your shopping experience</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-3">Marketing and Communication</h3>
                  <ul className="space-y-2 ml-6 list-disc text-enzobay-neutral-600">
                    <li>Sending promotional emails and newsletters (with your consent)</li>
                    <li>Providing personalized product recommendations</li>
                    <li>Running targeted advertising campaigns</li>
                    <li>Offering special promotions and discounts</li>
                    <li>Conducting market research and surveys</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-3">Legal and Security</h3>
                  <ul className="space-y-2 ml-6 list-disc text-enzobay-neutral-600">
                    <li>Complying with legal obligations and regulations</li>
                    <li>Enforcing our terms of service and policies</li>
                    <li>Protecting against unauthorized access and fraud</li>
                    <li>Securing our systems and user data</li>
                    <li>Resolving disputes and addressing legal claims</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Data Security */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-enzobay-orange/10 flex items-center justify-center text-enzobay-orange">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-enzobay-brown">Data Security</h2>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200">
              <p className="text-enzobay-neutral-600 mb-6">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our security measures include:
              </p>
              
              <ul className="space-y-3 ml-6 list-disc text-enzobay-neutral-600 mb-6">
                <li>Encryption of sensitive data using industry-standard protocols</li>
                <li>Secure Socket Layer (SSL) technology for all transactions</li>
                <li>Regular security assessments and penetration testing</li>
                <li>Access controls and authentication procedures for our staff</li>
                <li>Monitoring systems to detect and prevent suspicious activities</li>
                <li>Regular backups to prevent data loss</li>
              </ul>
              
              <p className="text-enzobay-neutral-600">
                While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to implementing reasonable security measures to protect your data.
              </p>
            </div>
          </div>
          
          {/* Your Privacy Rights */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-enzobay-brown mb-6">Your Privacy Rights</h2>
            <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200">
              <p className="text-enzobay-neutral-600 mb-6">
                Depending on your location, you may have certain rights regarding your personal information. These may include:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-2">Right to Access</h3>
                  <p className="text-enzobay-neutral-600">
                    You have the right to request a copy of the personal information we hold about you.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-2">Right to Rectification</h3>
                  <p className="text-enzobay-neutral-600">
                    You can request correction of any inaccurate information we hold about you.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-2">Right to Erasure</h3>
                  <p className="text-enzobay-neutral-600">
                    In certain circumstances, you can request that we delete your personal information.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-2">Right to Restrict Processing</h3>
                  <p className="text-enzobay-neutral-600">
                    You can ask us to temporarily or permanently stop processing some of your personal information.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-2">Right to Data Portability</h3>
                  <p className="text-enzobay-neutral-600">
                    You can ask for a copy of your personal information in a machine-readable format to transfer to another service.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-2">Right to Object</h3>
                  <p className="text-enzobay-neutral-600">
                    You have the right to object to our processing of your personal information in certain circumstances.
                  </p>
                </div>
              </div>
              
              <p className="mt-6 text-enzobay-neutral-600">
                To exercise any of these rights, please contact us at privacy@enzobay.com. We will respond to your request within 30 days.
              </p>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-enzobay-brown mb-6">Contact Us</h2>
            <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200 text-center">
              <p className="text-enzobay-neutral-600 mb-6">
                If you have any questions or concerns about our Privacy Policy or data practices, please contact our Data Protection Officer:
              </p>
              
              <div className="max-w-md mx-auto space-y-3">
                <p className="text-enzobay-neutral-700">
                  <strong>Email:</strong> privacy@enzobay.com
                </p>
                <p className="text-enzobay-neutral-700">
                  <strong>Address:</strong> Data Protection Officer<br />
                  EnzoBay Ltd.<br />
                  123 Luxury Avenue, Westlands<br />
                  Nairobi, Kenya
                </p>
                <p className="text-enzobay-neutral-700">
                  <strong>Phone:</strong> +254 700 123 456
                </p>
              </div>
              
              <div className="mt-8">
                <a href="/contact" className="btn-primary">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
