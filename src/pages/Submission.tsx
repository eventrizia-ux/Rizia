import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { fetchEventById } from '../utils/supabaseHelpers';
import { ArrowLeft, CalendarDays, MapPin, Ticket, Info, ClipboardList, Languages } from 'lucide-react';
import { getEventDateLabel, getEventLanguage, normalizeStringList } from '../utils/appData';

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
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <Header user={user} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-white text-xl">Loading competition...</div>
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
            <h1 className="text-white mb-4">Competition Not Found</h1>
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

  const rules = normalizeStringList(event.rules);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Header user={user} />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-white transition-colors hover:text-purple-300"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl md:p-12">
            <div className="mb-8 rounded-2xl border border-blue-500/30 bg-blue-500/20 p-6">
              <div className="flex items-start gap-3">
                <Info className="mt-1 flex-shrink-0 text-blue-300" size={24} />
                <div>
                  <h3 className="mb-2 text-white">Registration Details</h3>
                  <p className="text-blue-200">
                    Review the competition requirements below before proceeding with your participation.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8 text-center">
              <h1 className="mb-4 text-white">{event.title}</h1>
              <div className="space-y-3 text-gray-200">
                <div className="flex items-center justify-center gap-2">
                  <CalendarDays size={20} className="text-purple-400" />
                  <span>Register by {getEventDateLabel(event)}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin size={20} className="text-purple-400" />
                  <span>{event.venue}, {event.city}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Languages size={20} className="text-purple-400" />
                  <span>{getEventLanguage(event)}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Ticket size={20} className="text-purple-400" />
                  <span>{event.submission_format || 'Submission details will be shared by admin'}</span>
                </div>
              </div>
            </div>

            {rules.length > 0 && (
              <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="mb-4 flex items-center gap-2 text-white">
                  <ClipboardList size={20} className="text-pink-300" />
                  Rules
                </h2>
                <div className="space-y-3">
                  {rules.map((rule) => (
                    <div key={rule} className="rounded-xl bg-white/5 px-4 py-3 text-gray-200">
                      {rule}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Link
                to={`/competition/${id}`}
                className="block w-full rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-4 text-center text-white shadow-lg transition-all hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600"
              >
                Competition Info
              </Link>

              <Link
                to="/competitions"
                className="block w-full rounded-xl border border-white/20 bg-white/10 py-4 text-center text-white transition-all hover:bg-white/20"
              >
                Back to Competitions
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
