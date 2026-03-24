import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { supabase } from '../utils/supabaseClient';
import { Ticket, Clock, CheckCircle, XCircle, Calendar, MapPin, DollarSign, Loader2 } from 'lucide-react';

interface MySubmissionsProps {
  user: any;
  onLogout: () => void;
}

export default function MySubmissions({ user, onLogout }: MySubmissionsProps) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      if (supabase) {
        const { data } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .order('booking_date', { ascending: false });

        if (data) setBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      confirmed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} />;
      case 'pending':
        return <Clock size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return <Ticket size={16} />;
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Header user={user} onLogout={onLogout} />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-white mb-2">My Bookings</h1>
            <p className="text-gray-200">View and manage all your event bookings</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="text-white animate-spin" size={48} />
            </div>
          ) : bookings.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center shadow-2xl">
              <Ticket className="mx-auto text-purple-400 mb-4" size={64} />
              <h2 className="text-white mb-2">No Bookings Yet</h2>
              <p className="text-gray-200 mb-6">
                You haven't booked any events yet. Start exploring and book your favorite events!
              </p>
              <Link
                to="/competitions"
                className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all shadow-lg"
              >
                Browse Events
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:bg-white/15"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-white text-xl mb-2">{booking.event_name}</h3>
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(booking.booking_status)}`}>
                              {getStatusIcon(booking.booking_status)}
                              <span className="capitalize">{booking.booking_status}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-200">
                          <Calendar size={16} className="text-purple-400" />
                          <span>{booking.event_date} {booking.event_time && `at ${booking.event_time}`}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-200">
                          <MapPin size={16} className="text-purple-400" />
                          <span>{booking.venue}, {booking.city}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-200">
                          <Ticket size={16} className="text-purple-400" />
                          <span>{booking.ticket_quantity} Ticket{booking.ticket_quantity > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-200">
                          <DollarSign size={16} className="text-purple-400" />
                          <span>₹{booking.total_price}</span>
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-gray-300">
                        Booked on: {formatDate(booking.booking_date)}
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-2">
                      <Link
                        to={`/competition-details/${booking.event_id}`}
                        className="px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all text-sm text-center"
                      >
                        View Event
                      </Link>
                      <button
                        className="px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all text-sm"
                      >
                        Download Ticket
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}