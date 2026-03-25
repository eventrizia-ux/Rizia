import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { fetchEventById } from '../utils/supabaseHelpers';
import { supabase, isSupabaseConfigured } from '../utils/supabaseClient';
import { CalendarDays, CheckCircle, FileText, Loader2, MapPin, User, Users } from 'lucide-react';
import { getEventDateLabel, getEventLanguage, normalizeStringList } from '../utils/appData';

interface CheckoutProps {
  user?: any;
}

export default function Checkout({ user }: CheckoutProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    note: '',
  });

  useEffect(() => {
    if (id) {
      loadEvent(id);
    }
  }, [id]);

  const loadEvent = async (eventId: string) => {
    try {
      setLoading(true);
      const data = await fetchEventById(eventId);
      if (!data) {
        navigate('/competitions');
        return;
      }
      setEvent(data);
    } catch (error) {
      console.error('Error loading competition:', error);
      navigate('/competitions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!event || !user?.id) {
      return;
    }

    setSubmitting(true);

    try {
      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase.from('bookings').insert({
          user_id: user.id,
          event_id: event.id,
          event_name: event.title,
          event_date: getEventDateLabel(event),
          event_time: event.preliminary_date || event.grand_finale_date || 'To be announced',
          city: event.city,
          venue: event.venue,
          ticket_quantity: 1,
          price_per_ticket: 0,
          total_price: 0,
          booking_status: 'confirmed',
          payment_method: 'competition_registration',
        });

        if (error) {
          console.error('Registration save error:', error);
          alert('Registration failed to save. Please try again.');
          return;
        }
      }

      navigate(`/registration-confirmation/${event.id}`);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Something went wrong while registering.');
    } finally {
      setSubmitting(false);
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
    return null;
  }

  const rules = normalizeStringList(event.rules);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Header user={user} />

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="text-white text-3xl">Competition Registration</h1>
            <p className="mt-2 text-purple-200">Register once and we will save your participation in the `bookings` table.</p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div
              className="rounded-3xl border border-white/12 p-8 shadow-2xl"
              style={{ backgroundColor: '#202b3d' }}
            >
              <h2 className="mb-6 flex items-center gap-2 text-2xl text-white">
                <User className="text-pink-300" size={24} />
                Participant Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-purple-100">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 px-4 py-3 text-white placeholder:text-purple-200/45 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    style={{ backgroundColor: '#1a2435' }}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-purple-100">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-white/10 px-4 py-3 text-white placeholder:text-purple-200/45 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      style={{ backgroundColor: '#1a2435' }}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-purple-100">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-white/10 px-4 py-3 text-white placeholder:text-purple-200/45 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      style={{ backgroundColor: '#1a2435' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-purple-100">Notes</label>
                  <textarea
                    rows={4}
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    placeholder="Any extra details for your registration"
                    className="w-full rounded-xl border border-white/10 px-4 py-3 text-white placeholder:text-purple-200/45 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    style={{ backgroundColor: '#1a2435' }}
                  />
                </div>

                <div
                  className="rounded-2xl border border-white/10 p-4 text-sm text-purple-100/90"
                  style={{ backgroundColor: '#1a2435' }}
                >
                  This registration will be stored in your current `bookings` table as a competition registration.
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-6 py-4 text-white shadow-lg transition-all hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle size={20} />}
                  <span>{submitting ? 'Saving Registration...' : 'Register Now'}</span>
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div
                className="rounded-3xl border border-white/12 p-8 shadow-2xl"
                style={{ backgroundColor: '#202b3d' }}
              >
                <h3 className="mb-4 text-xl text-white">{event.title}</h3>
                <div className="space-y-3 text-sm text-purple-100">
                  <div className="flex items-start gap-3">
                    <CalendarDays size={18} className="mt-0.5 text-pink-300" />
                    <div>
                      <p className="text-purple-300">Registration Deadline</p>
                      <p className="text-white">{getEventDateLabel(event)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 text-pink-300" />
                    <div>
                      <p className="text-purple-300">Venue</p>
                      <p className="text-white">{[event.venue, event.city].filter(Boolean).join(', ') || 'To be announced'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users size={18} className="mt-0.5 text-pink-300" />
                    <div>
                      <p className="text-purple-300">Age Group</p>
                      <p className="text-white">{event.age_group || 'Open to all'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText size={18} className="mt-0.5 text-pink-300" />
                    <div>
                      <p className="text-purple-300">Submission Format</p>
                      <p className="text-white">{event.submission_format || 'To be announced'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText size={18} className="mt-0.5 text-pink-300" />
                    <div>
                      <p className="text-purple-300">Languages</p>
                      <p className="text-white">{getEventLanguage(event)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {rules.length > 0 && (
                <div
                  className="rounded-3xl border border-white/12 p-8 shadow-2xl"
                  style={{ backgroundColor: '#202b3d' }}
                >
                  <h3 className="mb-4 text-xl text-white">Rules Snapshot</h3>
                  <div className="space-y-3">
                    {rules.slice(0, 5).map((rule) => (
                      <div
                        key={rule}
                        className="rounded-2xl border border-white/10 p-4 text-sm text-purple-100"
                        style={{ backgroundColor: '#1a2435' }}
                      >
                        {rule}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
