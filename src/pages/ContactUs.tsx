import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Sparkles } from 'lucide-react';

interface ContactUsProps {
  user?: any;
}

export default function ContactUs({ user }: ContactUsProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'support@rizia.com',
      description: 'Send us an email anytime',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+91 1800-123-4567',
      description: 'Mon-Sat, 9AM to 6PM IST',
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: 'Bengaluru, Karnataka',
      description: 'Koramangala, Bengaluru - 560034',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: '9:00 AM - 6:00 PM',
      description: 'Monday to Saturday',
      gradient: 'from-cyan-500 to-teal-500'
    }
  ];

  const faqs = [
    {
      question: 'How do I book tickets?',
      answer: 'Simply browse events, select your preferred event, choose the number of tickets, and complete the payment process.'
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking up to 24 hours before the event for a full refund.'
    },
    {
      question: 'How will I receive my tickets?',
      answer: 'E-tickets will be sent to your registered email immediately after successful payment.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Header user={user} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 dark:from-pink-500/5 dark:via-purple-500/5 dark:to-indigo-500/5"></div>
          <div className="container mx-auto max-w-6xl relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-950/50 dark:to-purple-950/50 rounded-full mb-6">
              <MessageCircle size={18} className="text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-purple-700 dark:text-purple-300">Get In Touch</span>
            </div>
            <h1 className="text-gray-900 dark:text-white mb-6 text-4xl md:text-6xl">
              We'd Love to <br />
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Hear From You
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Have questions? Need support? Our team is here to help you with anything you need.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all group">
                  <div className={`w-14 h-14 bg-gradient-to-br ${info.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <info.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-gray-900 dark:text-white mb-2 text-lg">{info.title}</h3>
                  <p className="text-gray-900 dark:text-white mb-1">{info.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{info.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-gray-900 dark:text-white mb-6 text-2xl">Send Us a Message</h2>
                
                {submitted ? (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-gray-900 dark:text-white mb-2 text-xl">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
                        placeholder="How can we help?"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all resize-none"
                        placeholder="Tell us more about your inquiry..."
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg group"
                    >
                      <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>

              {/* FAQ Section */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h2 className="text-gray-900 dark:text-white mb-6 text-2xl">Quick Answers</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 rounded-2xl border border-purple-100 dark:border-purple-900">
                        <h3 className="text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                  <a
                    href="/help"
                    className="block mt-6 text-center py-3 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-950/50 dark:to-purple-950/50 text-purple-700 dark:text-purple-300 rounded-xl hover:from-pink-200 hover:to-purple-200 dark:hover:from-pink-950 dark:hover:to-purple-950 transition-all"
                  >
                    View All FAQs
                  </a>
                </div>

                {/* Map Placeholder */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h2 className="text-gray-900 dark:text-white mb-4 text-2xl">Our Location</h2>
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 dark:from-pink-950/30 dark:via-purple-950/30 dark:to-indigo-950/30 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <MapPin className="mx-auto mb-3 text-purple-500" size={48} />
                      <p className="text-gray-600 dark:text-gray-400">Koramangala, Bengaluru</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Karnataka - 560034</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}