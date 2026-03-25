import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { supabase } from '../utils/supabaseClient';
import { Ticket, Clock, CheckCircle, XCircle, CalendarDays, MapPin, Loader2, FileText } from 'lucide-react';
import { formatDate, getBookingStatus } from '../utils/appData';

interface MySubmissionsProps {
  user: any;
  onLogout: () => void;
}

export default function MySubmissions({ user, onLogout }: MySubmissionsProps) {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, [user]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      if (supabase && user?.id) {
        const { data } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .order('booking_date', { ascending: false });

        if (data) {
          setRegistrations(data);
        }
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Header user={user} onLogout={onLogout} />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="mb-2 text-white">My Registrations</h1>
            <p className="text-gray-200">Track all the competitions you have registered for.</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-white" size={48} />
            </div>
          ) : registrations.length === 0 ? (
            <div className="rounded-3xl border border-white/20 bg-white/10 p-12 text-center shadow-2xl backdrop-blur-xl">
              <Ticket className="mx-auto mb-4 text-purple-400" size={64} />
              <h2 className="mb-2 text-white">No Registrations Yet</h2>
              <p className="mb-6 text-gray-200">You have not registered for any competitions yet.</p>
              <Link
                to="/competitions"
                className="inline-block rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-6 py-3 text-white shadow-lg transition-all hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600"
              >
                Browse Competitions
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {registrations.map((registration) => {
                const status = getBookingStatus(registration);

                return (
                  <div
                    key={registration.id}
                    className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl transition-all hover:bg-white/15 hover:shadow-2xl backdrop-blur-xl"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="mb-3 flex items-start justify-between">
                          <div>
                            <h3 className="mb-2 text-xl text-white">{registration.event_name}</h3>
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm ${getStatusColor(status)}`}>
                                {getStatusIcon(status)}
                                <span className="capitalize">{status}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                          <div className="flex items-center gap-2 text-gray-200">
                            <CalendarDays size={16} className="text-purple-400" />
                            <span>{registration.event_date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-200">
                            <MapPin size={16} className="text-purple-400" />
                            <span>{registration.venue}, {registration.city}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-200">
                            <FileText size={16} className="text-purple-400" />
                            <span>{registration.payment_method === 'competition_registration' ? 'Competition registration' : registration.payment_method}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-200">
                            <Clock size={16} className="text-purple-400" />
                            <span>Registered on {formatDate(registration.booking_date)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 md:flex-col">
                        <Link
                          to={`/competition/${registration.event_id}`}
                          className="rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-4 py-2 text-center text-sm text-white transition-all hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600"
                        >
                          View Competition
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
