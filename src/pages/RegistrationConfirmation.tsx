import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { fetchEventById } from '../utils/supabaseHelpers';
import { supabase } from '../utils/supabaseClient';
import { CheckCircle, CalendarDays, MapPin, FileText, Mail, Loader2 } from 'lucide-react';
import { getEventDateLabel, getEventLanguage } from '../utils/appData';

interface RegistrationConfirmationProps {
  user: any;
}

export default function RegistrationConfirmation({ user }: RegistrationConfirmationProps) {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [registration, setRegistration] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadData(id);
    }
  }, [id]);

  const loadData = async (eventId: string) => {
    try {
      setLoading(true);
      const eventData = await fetchEventById(eventId);
      setEvent(eventData);

      if (supabase && user?.id) {
        const { data } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .eq('event_id', eventId)
          .order('booking_date', { ascending: false })
          .limit(1)
          .single();

        if (data) {
          setRegistration(data);
        }
      }
    } catch (error) {
      console.error('Error loading confirmation:', error);
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
            <Loader2 className="mx-auto mb-4 animate-spin text-white" size={48} />
            <p className="text-xl text-white">Loading confirmation...</p>
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
            <h1 className="mb-4 text-white">Competition Not Found</h1>
            <Link
              to="/competitions"
              className="inline-block rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-6 py-3 text-white transition-all hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600"
            >
              Back to Competitions
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

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl md:p-12">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
              <CheckCircle className="text-white" size={40} />
            </div>

            <h1 className="mb-4 text-white">Registration Confirmed</h1>
            <p className="mb-8 text-lg text-gray-200">
              Your registration for <span className="font-semibold text-white">{event.title}</span> has been saved successfully.
            </p>

            <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
              <h3 className="mb-4 text-lg text-white">Competition Details</h3>
              <div className="space-y-3 text-gray-200">
                <div className="flex items-center gap-3">
                  <CalendarDays size={20} className="text-purple-400" />
                  <span>Register by {getEventDateLabel(event)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-purple-400" />
                  <span>{event.venue}, {event.city}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-purple-400" />
                  <span>{event.submission_format || 'Submission format to be announced'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-purple-400" />
                  <span>{getEventLanguage(event)}</span>
                </div>
              </div>
            </div>

            {registration && (
              <div className="mb-8 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4">
                <p className="mb-1 text-sm text-gray-300">Registration ID</p>
                <p className="font-mono text-lg text-white">{registration.id}</p>
              </div>
            )}

            <div className="mb-8 rounded-2xl border border-blue-500/30 bg-blue-500/20 p-4">
              <div className="flex items-start gap-3 text-left text-sm text-blue-200">
                <Mail size={20} className="mt-0.5 flex-shrink-0" />
                <p>
                  A confirmation has been sent to <span className="font-semibold text-white">{user?.email}</span>. You can also track this from your dashboard.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/dashboard"
                className="block w-full rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-4 text-white transition-all hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600"
              >
                Go to Dashboard
              </Link>
              <Link
                to={`/competition/${event.id}`}
                className="block w-full rounded-xl border border-white/20 bg-white/10 py-4 text-white transition-all hover:bg-white/20"
              >
                View Competition
              </Link>
              <Link
                to="/competitions"
                className="block w-full rounded-xl border border-white/10 bg-white/5 py-4 text-gray-200 transition-all hover:bg-white/10"
              >
                Browse More Competitions
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
