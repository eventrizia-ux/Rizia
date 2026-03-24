import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { fetchEventById } from '../utils/supabaseHelpers';
import { ArrowLeft, Calendar, MapPin, Ticket, Info } from 'lucide-react';

interface SubmissionProps {
  user: any;
}

export default function Submission({ user }: SubmissionProps) {
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <Header user={user} />
        <main className="flex-1 flex items-center justify-center">
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
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-white mb-4">Event Not Found</h1>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all"
            >
              Go Back
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Header user={user} />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white mb-6 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            {/* Info Banner */}
            <div className="bg-blue-500/20 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <Info className="text-blue-300 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-white mb-2">Event Booking Information</h3>
                  <p className="text-blue-200">
                    This is an event ticketing platform. To attend this event, please book your tickets through the event details page.
                  </p>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="text-center mb-8">
              <h1 className="text-white mb-4">{event.title}</h1>
              <div className="space-y-3 text-gray-200">
                <div className="flex items-center justify-center gap-2">
                  <Calendar size={20} className="text-purple-400" />
                  <span>{event.date} {event.time && `at ${event.time}`}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin size={20} className="text-purple-400" />
                  <span>{event.venue}, {event.city}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Ticket size={20} className="text-purple-400" />
                  <span>Starting from {event.price}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                to={`/competition-details/${id}`}
                className="block w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl text-center"
              >
                View Event Details & Book Tickets
              </Link>

              <Link
                to="/competitions"
                className="block w-full py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all text-center"
              >
                Browse More Events
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}