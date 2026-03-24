import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Search, ChevronDown, ChevronUp, Ticket, CreditCard, Users, Shield, HelpCircle, Book } from 'lucide-react';

interface HelpProps {
  user?: any;
}

export default function Help({ user }: HelpProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const categories = [
    { icon: Ticket, label: 'Booking & Tickets', color: 'from-pink-500 to-rose-500' },
    { icon: CreditCard, label: 'Payments & Refunds', color: 'from-purple-500 to-violet-500' },
    { icon: Users, label: 'Account & Profile', color: 'from-indigo-500 to-blue-500' },
    { icon: Shield, label: 'Safety & Security', color: 'from-cyan-500 to-teal-500' },
  ];

  const faqs = [
    {
      category: 'Booking & Tickets',
      question: 'How do I book tickets on Rizia?',
      answer: 'Booking tickets is easy! Simply browse events, select your preferred event, click "Book Now", choose the number of tickets, and proceed to payment. After successful payment, you\'ll receive an e-ticket via email instantly.'
    },
    {
      category: 'Booking & Tickets',
      question: 'Can I book multiple tickets at once?',
      answer: 'Yes! You can book multiple tickets in a single transaction. Just select the number of tickets you need during the booking process. The maximum number of tickets per booking varies by event.'
    },
    {
      category: 'Booking & Tickets',
      question: 'How do I receive my tickets?',
      answer: 'All tickets are sent as e-tickets to your registered email address immediately after successful payment. You can also view and download your tickets from the "My Bookings" section in your account.'
    },
    {
      category: 'Booking & Tickets',
      question: 'What should I bring to the event?',
      answer: 'Bring your e-ticket (printed or on your phone) and a valid government-issued photo ID. Some events may have additional requirements mentioned in the event details.'
    },
    {
      category: 'Payments & Refunds',
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit/debit cards, UPI, net banking, and popular digital wallets like Paytm, PhonePe, and Google Pay. All payments are processed securely through our payment gateway partners.'
    },
    {
      category: 'Payments & Refunds',
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use industry-standard encryption and comply with PCI-DSS standards. Your payment information is never stored on our servers and is processed securely by our certified payment partners.'
    },
    {
      category: 'Payments & Refunds',
      question: 'Can I get a refund if I cancel my booking?',
      answer: 'Refund policies vary by event. Generally, you can cancel up to 24-48 hours before the event for a full or partial refund. Please check the specific event\'s cancellation policy before booking.'
    },
    {
      category: 'Payments & Refunds',
      question: 'How long does it take to process refunds?',
      answer: 'Refunds are typically processed within 5-7 business days from the date of cancellation. The actual credit to your account depends on your bank or payment provider.'
    },
    {
      category: 'Account & Profile',
      question: 'How do I create an account?',
      answer: 'Click on "Sign Up" in the top navigation, fill in your details (name, email, password), and verify your email address. You can then start booking events immediately!'
    },
    {
      category: 'Account & Profile',
      question: 'Can I change my email address?',
      answer: 'Yes, you can update your email address from the Account Settings page. You\'ll need to verify the new email address before the change takes effect.'
    },
    {
      category: 'Account & Profile',
      question: 'I forgot my password. How do I reset it?',
      answer: 'Click on "Forgot Password" on the login page, enter your registered email, and you\'ll receive a password reset link. Follow the instructions in the email to set a new password.'
    },
    {
      category: 'Account & Profile',
      question: 'How do I view my booking history?',
      answer: 'After logging in, go to "My Bookings" from your dashboard. Here you can view all your past and upcoming event bookings, download tickets, and manage your bookings.'
    },
    {
      category: 'Safety & Security',
      question: 'How does Rizia ensure event authenticity?',
      answer: 'We partner only with verified event organizers and venues. Every event listing is vetted by our team to ensure authenticity and quality standards.'
    },
    {
      category: 'Safety & Security',
      question: 'What if an event is cancelled?',
      answer: 'If an event is cancelled by the organizer, you will receive a full refund automatically. We\'ll notify you via email and SMS about the cancellation and refund process.'
    },
    {
      category: 'Safety & Security',
      question: 'How is my personal data protected?',
      answer: 'We follow strict data protection policies and comply with Indian data privacy regulations. Your personal information is encrypted and never shared with third parties without your consent.'
    },
    {
      category: 'Safety & Security',
      question: 'What are the COVID-19 safety measures?',
      answer: 'Safety measures vary by event and venue. Check the event details page for specific COVID-19 protocols, including vaccination requirements, mask mandates, and social distancing measures.'
    }
  ];

  const filteredFaqs = searchQuery
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Header user={user} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          <div className="container mx-auto max-w-4xl relative z-10 text-center">
            <div className="mb-8">
              <HelpCircle className="mx-auto mb-4 text-white" size={64} />
              <h1 className="text-white mb-4 text-4xl md:text-6xl">How Can We Help?</h1>
              <p className="text-white/90 text-xl">
                Find answers to common questions or search our help center
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help articles..."
                className="w-full pl-16 pr-6 py-5 rounded-2xl text-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-gray-900 dark:text-white mb-8 text-2xl text-center">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all group text-left"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-gray-900 dark:text-white text-lg">{category.label}</h3>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-gray-900 dark:text-white mb-8 text-3xl text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-950/50 dark:to-purple-950/50 text-purple-700 dark:text-purple-300 rounded-full text-xs mb-2">
                        {faq.category}
                      </span>
                      <h3 className="text-gray-900 dark:text-white text-lg">{faq.question}</h3>
                    </div>
                    {expandedFaq === index ? (
                      <ChevronUp className="text-purple-500 ml-4 flex-shrink-0" size={24} />
                    ) : (
                      <ChevronDown className="text-gray-400 ml-4 flex-shrink-0" size={24} />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-5">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No results found for "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-950/30 dark:via-purple-950/30 dark:to-indigo-950/30 rounded-3xl p-12 text-center border border-purple-200 dark:border-purple-900">
              <Book className="mx-auto mb-6 text-purple-500" size={48} />
              <h2 className="text-gray-900 dark:text-white mb-4 text-3xl">
                Still Need Help?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our support team is ready to assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-2xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all shadow-lg"
                >
                  Contact Support
                </a>
                <a
                  href="mailto:support@rizia.com"
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}