import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { fetchEventById } from '../utils/supabaseHelpers';
import { supabase } from '../utils/supabaseClient';
import { CheckCircle, Calendar, MapPin, Ticket, Download, Share2, Mail, Loader2 } from 'lucide-react';

interface RegistrationConfirmationProps {
  user: any;
}

export default function RegistrationConfirmation({ user }: RegistrationConfirmationProps) {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadEventAndBooking(id);
    }
  }, [id]);

  const loadEventAndBooking = async (eventId: string) => {
    try {
      setLoading(true);
      
      // Fetch event details
      const eventData = await fetchEventById(eventId);
      setEvent(eventData);

      // Fetch latest booking for this user and event
      if (supabase) {
        const { data: bookingData } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .eq('event_id', eventId)
          .order('booking_date', { ascending: false })
          .limit(1)
          .single();

        if (bookingData) {
          setBooking(bookingData);
        }
      }
    } catch (error) {
      console.error('Error loading event and booking:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <Header user={user} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto text-white animate-spin mb-4" size={48} />
            <p className="text-white text-xl">Loading confirmation...</p>
          </div>
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
            <div className="text-6xl mb-4">🎭</div>
            <h1 className="text-white mb-4">Event Not Found</h1>
            <Link 
              to="/competitions" 
              className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all"
            >
              Back to Events
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Header user={user} />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg">
              <CheckCircle className="text-white" size={40} />
            </div>

            <h1 className="text-white mb-4">Booking Confirmed! 🎉</h1>
            
            <p className="text-gray-200 mb-8 text-lg">
              You have successfully booked tickets for <span className="text-white font-semibold">{event.title}</span>
            </p>

            {/* Event Details Card */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-8 text-left">
              <h3 className="text-white mb-4 text-lg">Event Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-200">
                  <Calendar size={20} className="text-purple-400" />
                  <span>{event.date} {event.time ? `at ${event.time}` : ''}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-200">
                  <MapPin size={20} className="text-purple-400" />
                  <span>{event.venue}, {event.city}</span>
                </div>
                {booking && (
                  <div className="flex items-center gap-3 text-gray-200">
                    <Ticket size={20} className="text-purple-400" />
                    <span>{booking.ticket_quantity} Ticket{booking.ticket_quantity > 1 ? 's' : ''} - ₹{booking.total_price}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Booking ID */}
            {booking && (
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-4 mb-8">
                <p className="text-gray-300 text-sm mb-1">Booking ID</p>
                <p className="text-white font-mono text-lg">{booking.id}</p>
              </div>
            )}

            {/* Info Message */}
            <div className="bg-blue-500/20 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-4 mb-8">
              <div className="flex items-start gap-3 text-blue-200 text-sm">
                <Mail size={20} className="flex-shrink-0 mt-0.5" />
                <p className="text-left">
                  A confirmation email with your e-tickets has been sent to <span className="text-white font-semibold">{user.email}</span>. Please check your inbox.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <Download size={20} />
                Download E-Ticket
              </button>

              <Link
                to="/dashboard"
                className="block w-full py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all"
              >
                Go to Dashboard
              </Link>

              <Link
                to="/competitions"
                className="block w-full py-4 bg-white/5 backdrop-blur-lg border border-white/10 text-gray-200 rounded-xl hover:bg-white/10 transition-all"
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