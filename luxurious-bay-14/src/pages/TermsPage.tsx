
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FileText, CheckCircle, AlertTriangle, HelpCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-enzobay-neutral-50">
      <Navbar />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-enzobay-brown mb-4">Terms of Service</h1>
            <p className="text-lg text-enzobay-neutral-600 max-w-3xl mx-auto">
              Please read these terms carefully before using our website or services. These terms govern your use of EnzoBay.
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
                  <FileText className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-enzobay-brown mb-2">Agreement to Terms</h2>
                  <p className="text-enzobay-neutral-600">
                    Welcome to EnzoBay. These Terms of Service ("Terms") constitute a legally binding agreement between you and EnzoBay Ltd. ("EnzoBay," "we," "us," or "our") governing your access to and use of the EnzoBay website, mobile application, and services.
                  </p>
                </div>
              </div>
              
              <p className="text-enzobay-neutral-600 mb-4">
                By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services. These Terms affect your legal rights and obligations, so please read them carefully.
              </p>
              
              <p className="text-enzobay-neutral-600">
                We may modify these Terms at any time. If we make changes, we will provide notice by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of our services after such modifications constitutes your acceptance of the revised Terms.
              </p>
            </div>
          </div>
          
          {/* Account Terms */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-enzobay-orange/10 flex items-center justify-center text-enzobay-orange">
                <CheckCircle className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-enzobay-brown">Account Terms</h2>
            </div>
            
            <div className="bg-white rounded-xl border border-enzobay-neutral-200 divide-y divide-enzobay-neutral-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-3">Account Creation</h3>
                <p className="text-enzobay-neutral-600">
                  To use certain features of our services, you may need to create an account. When you create an account, you must provide accurate, current, and complete information. You are responsible for safeguarding your account credentials and for all activities that occur under your account.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-3">Account Eligibility</h3>
                <p className="text-enzobay-neutral-600">
                  You must be at least 18 years old to create an account and use our services. By creating an account, you represent and warrant that you are at least 18 years old and that your use of our services does not violate any applicable laws or regulations.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-3">Account Security</h3>
                <p className="text-enzobay-neutral-600">
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security. We cannot and will not be liable for any loss or damage arising from your failure to comply with this provision.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-3">Account Termination</h3>
                <p className="text-enzobay-neutral-600">
                  We reserve the right to suspend or terminate your account at any time for any reason, including but not limited to, violation of these Terms. If we terminate your account, you may not create a new account without our express permission.
                </p>
              </div>
            </div>
          </div>
          
          {/* Purchase Terms */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-enzobay-blue/10 flex items-center justify-center text-enzobay-blue">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-enzobay-brown">Purchase Terms</h2>
            </div>
            
            <div className="bg-white rounded-xl border border-enzobay-neutral-200 divide-y divide-enzobay-neutral-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-3">Product Information</h3>
                <p className="text-enzobay-neutral-600">
                  We strive to provide accurate product descriptions, pricing, and availability information on our website. However, we do not warrant that product descriptions, pricing, or other content on our website is accurate, complete, reliable, current, or error-free. In the event of an error, we reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-3">Pricing and Payment</h3>
                <p className="text-enzobay-neutral-600">
                  All prices are shown in Kenyan Shillings (KSH) and are inclusive of applicable taxes. Payment must be made using one of our accepted payment methods. By providing a payment method, you represent and warrant that you are authorized to use the designated payment method and authorize us to charge your payment method for the total amount of your order, including taxes and shipping fees.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-3">Order Acceptance</h3>
                <p className="text-enzobay-neutral-600">
                  Your receipt of an order confirmation does not constitute our acceptance of your order. We reserve the right to accept or decline your order for any reason, including unavailability of product, errors in pricing or product information, or suspected fraudulent activity. If we cancel an order, we will attempt to notify you using the contact information provided at the time of order placement.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-3">Shipping and Delivery</h3>
                <p className="text-enzobay-neutral-600">
                  Delivery times and shipping costs vary depending on your location and the selected shipping method. We are not responsible for delays in delivery caused by factors beyond our control, such as customs processing or local delivery conditions. You are responsible for providing accurate shipping information. Please refer to our Shipping Policy for more details.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-3">Returns and Refunds</h3>
                <p className="text-enzobay-neutral-600">
                  We want you to be completely satisfied with your purchase. If you are not satisfied, you may return eligible items within 30 days of delivery for a refund or exchange, subject to our Return Policy. Some items may not be eligible for return, as specified in our Return Policy.
                </p>
              </div>
            </div>
          </div>
          
          {/* User Conduct */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-enzobay-orange/10 flex items-center justify-center text-enzobay-orange">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-enzobay-brown">User Conduct</h2>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200">
              <p className="text-enzobay-neutral-600 mb-6">
                When using our services, you agree not to:
              </p>
              
              <ul className="space-y-3 ml-6 list-disc text-enzobay-neutral-600">
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Use our services for any illegal or unauthorized purpose</li>
                <li>Post, upload, or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
                <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity</li>
                <li>Interfere with or disrupt our services or servers or networks connected to our services</li>
                <li>Attempt to gain unauthorized access to any portion of our services, other accounts, computer systems, or networks connected to our services</li>
                <li>Use any robot, spider, scraper, or other automated means to access our services for any purpose without our express written permission</li>
                <li>Circumvent, disable, or otherwise interfere with security-related features of our services</li>
                <li>Engage in any activity that could damage, disable, overburden, or impair our services</li>
                <li>Use our services in any manner that could interfere with other users' enjoyment of our services</li>
              </ul>
              
              <p className="mt-6 text-enzobay-neutral-600">
                We reserve the right to terminate or restrict your access to our services if, in our sole discretion, we determine that you have violated these Terms, engaged in illegal or fraudulent activity, or your actions may cause financial loss or legal liability for us or our users.
              </p>
            </div>
          </div>
          
          {/* Limitation of Liability */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-enzobay-blue/10 flex items-center justify-center text-enzobay-blue">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-enzobay-brown">Limitation of Liability</h2>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200">
              <p className="text-enzobay-neutral-600 mb-6">
                To the maximum extent permitted by law, EnzoBay and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, or goodwill, resulting from:
              </p>
              
              <ul className="space-y-3 ml-6 list-disc text-enzobay-neutral-600 mb-6">
                <li>Your access to or use of or inability to access or use our services</li>
                <li>Any conduct or content of any third party on our services</li>
                <li>Any content obtained from our services</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
              
              <p className="text-enzobay-neutral-600 mb-6">
                In no event shall our total liability to you for all claims arising from or relating to these Terms or your use of our services exceed the amount paid by you to EnzoBay during the twelve (12) months immediately preceding the event giving rise to the claim.
              </p>
              
              <p className="text-enzobay-neutral-600">
                Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for incidental or consequential damages. Accordingly, some of the above limitations may not apply to you.
              </p>
            </div>
          </div>
          
          {/* Additional Sections */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-xl border border-enzobay-neutral-200 divide-y divide-enzobay-neutral-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-3">Intellectual Property</h3>
                <p className="text-enzobay-neutral-600">
                  All content included on our website, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of EnzoBay or its content suppliers and protected by international copyright laws. The compilation of all content on our website is the exclusive property of EnzoBay and protected by international copyright laws.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-3">Indemnification</h3>
                <p className="text-enzobay-neutral-600">
                  You agree to indemnify, defend, and hold harmless EnzoBay, its officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, or expenses, including reasonable attorneys' fees and costs, arising out of or in any way connected with your access to or use of our services, your violation of these Terms, or your violation of any third-party right.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-3">Governing Law</h3>
                <p className="text-enzobay-neutral-600">
                  These Terms shall be governed by and construed in accordance with the laws of Kenya, without regard to its conflict of laws principles. Any dispute arising from or relating to these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of Kenya.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-enzobay-brown mb-3">Severability</h3>
                <p className="text-enzobay-neutral-600">
                  If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it valid, legal, and enforceable while preserving its intent. If such modification is not possible, the provision shall be severed from these Terms, and the remaining provisions shall remain in full force and effect.
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-enzobay-orange/10 flex items-center justify-center text-enzobay-orange">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-enzobay-brown">Contact Us</h2>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-enzobay-neutral-200 text-center">
              <p className="text-enzobay-neutral-600 mb-6">
                If you have any questions or concerns about these Terms, please contact us:
              </p>
              
              <div className="max-w-md mx-auto space-y-3">
                <p className="text-enzobay-neutral-700">
                  <strong>Email:</strong> legal@enzobay.com
                </p>
                <p className="text-enzobay-neutral-700">
                  <strong>Address:</strong> Legal Department<br />
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
