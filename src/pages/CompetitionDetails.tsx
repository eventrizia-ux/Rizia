import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { fetchEventById } from '../utils/supabaseHelpers';
import { Calendar, Award, CheckCircle, ArrowLeft, MapPin, Clock, Ticket, Users, Shield, Heart } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface CompetitionDetailsProps {
  user?: any;
}

export default function CompetitionDetails({ user }: CompetitionDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      loadEvent(id);
    }
  }, [id]);

  const loadEvent = async (eventId: string) => {
    try {
      setLoading(true);
      const data = await fetchEventById(eventId);
      setEvent(data);
    } catch (error) {
      console.error('Error loading event:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const isRegistered = false; // We can enhance this later with actual booking check

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <Header user={user} />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-white text-xl">Loading event...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <Header user={user} />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🎭</div>
            <h1 className="text-white mb-4">Event Not Found</h1>
            <p className="text-gray-300 mb-6">The event you're looking for doesn't exist.</p>
            <Link 
              to="/competitions" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all"
            >
              <ArrowLeft size={20} />
              Back to Events
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleBookNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Redirect to checkout page
    navigate(`/checkout/${id}`);
  };

  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      Art: 'from-purple-500 to-violet-500',
      Dance: 'from-pink-500 to-rose-500',
      Music: 'from-blue-500 to-cyan-500',
      Concert: 'from-blue-500 to-cyan-500',
      Writing: 'from-emerald-500 to-teal-500',
      Photography: 'from-yellow-500 to-orange-500',
      Film: 'from-red-500 to-pink-500',
      Comedy: 'from-yellow-500 to-orange-500',
      Festival: 'from-indigo-500 to-purple-500',
      Literature: 'from-teal-500 to-emerald-500',
      'Music Festival': 'from-violet-500 to-purple-500',
    };
    return gradients[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-950">
      <Header user={user} />
      
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-6 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>

          {/* Event Image Hero */}
          {event.image_url && (
            <div className="relative h-96 rounded-3xl overflow-hidden mb-8 shadow-2xl">
              <ImageWithFallback 
                src={event.image_url}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm text-white bg-gradient-to-r ${getCategoryGradient(event.category)} shadow-lg`}>
                    {event.category}
                  </span>
                  {isRegistered && (
                    <span className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full shadow-lg">
                      <CheckCircle size={18} />
                      <span className="text-sm">Booked</span>
                    </span>
                  )}
                </div>
                <h1 className="text-white text-4xl md:text-5xl mb-4">{event.title}</h1>
                <div className="flex flex-wrap gap-4 text-white">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg">
                    <Calendar size={18} />
                    <span>{event.event_date}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg">
                    <Clock size={18} />
                    <span>{event.event_time}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg">
                    <MapPin size={18} />
                    <span>{event.city}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                <h2 className="text-gray-900 dark:text-white mb-4 text-2xl">About This Event</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{event.full_description || event.description}</p>
              </div>

              {/* Venue Details */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                <h2 className="text-gray-900 dark:text-white mb-4 text-2xl">Venue</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-purple-500 dark:text-purple-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-gray-900 dark:text-white">{event.venue}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{event.venue_address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Features */}
              {event.features && event.features.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                  <h2 className="text-gray-900 dark:text-white mb-4 text-2xl">Event Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {event.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                  <h2 className="text-gray-900 dark:text-white mb-4 text-2xl">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-950/50 dark:to-purple-950/50 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700 sticky top-8">
                <div className="text-center mb-6">
                  <div className="text-3xl text-gray-900 dark:text-white mb-2">{event.price}</div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">per ticket</p>
                </div>

                {isRegistered ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border border-green-200 dark:border-green-800 rounded-2xl p-4 text-green-800 dark:text-green-300 text-center">
                      <CheckCircle size={24} className="mx-auto mb-2" />
                      <p>You have booked this event!</p>
                    </div>
                    <Link
                      to="/my-submissions"
                      className="block w-full text-center py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-2xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl"
                    >
                      View My Bookings
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleBookNow}
                    className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-2xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
                  >
                    <Ticket size={22} />
                    Book Now
                  </button>
                )}

                {!user && (
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Please login to book tickets
                  </p>
                )}
              </div>

              {/* Event Info */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-3xl p-8 shadow-lg border border-purple-100 dark:border-purple-900">
                <h3 className="text-gray-900 dark:text-white mb-4">Event Information</h3>
                <div className="space-y-4">
                  {event.language && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white">
                        🗣️
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Language</p>
                        <p className="text-gray-900 dark:text-white">{event.language}</p>
                      </div>
                    </div>
                  )}
                  {event.age_restriction && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                        <Users size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Age Restriction</p>
                        <p className="text-gray-900 dark:text-white">{event.age_restriction}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}