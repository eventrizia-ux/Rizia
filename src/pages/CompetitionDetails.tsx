import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { fetchEventById } from '../utils/supabaseHelpers';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  Clock3,
  FileText,
  Languages,
  MapPin,
  Ticket,
  Users,
} from 'lucide-react';
import {
  getEventAgeRestriction,
  getEventDateLabel,
  getEventImage,
  getEventLanguage,
  getEventVenueAddress,
  normalizeStringList,
} from '../utils/appData';

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
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <Header user={user} />
        <main className="flex-1 flex items-center justify-center p-4">
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
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-white text-3xl">Competition Not Found</h1>
            <p className="mt-3 text-purple-200">The competition you are looking for is not available.</p>
            <Link
              to="/competitions"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-6 py-3 text-white transition-all hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600"
            >
              <ArrowLeft size={18} />
              Back to Competitions
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const image = getEventImage(event);
  const features = normalizeStringList(event.features);
  const tags = normalizeStringList(event.tags);
  const rules = normalizeStringList(event.rules);
  const registrationLink = user ? `/checkout/${event.id}` : '/login';
  const timeline = [
    { label: 'Registration Deadline', value: event.registration_dead || getEventDateLabel(event) },
    { label: 'Preliminary Round', value: event.preliminary_date },
    { label: 'Grand Finale', value: event.grand_finale_date },
  ].filter((item) => item.value);
  const cardStyle = { backgroundColor: '#202b3d' };
  const innerCardStyle = { backgroundColor: '#1a2435' };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Header user={user} />

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-sm text-purple-100 transition-colors hover:text-white"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              <section
                className="overflow-hidden rounded-3xl border border-white/12 shadow-2xl"
                style={cardStyle}
              >
                {image && (
                  <div className="aspect-[16/8] w-full overflow-hidden" style={innerCardStyle}>
                    <ImageWithFallback src={image} alt={event.title} className="h-full w-full object-cover" />
                  </div>
                )}

                <div className="p-8">
                  <div className="mb-4 flex flex-wrap gap-3">
                    <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                      {event.category || 'Competition'}
                    </span>
                    {event.age_group && (
                      <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-pink-200">
                        {event.age_group}
                      </span>
                    )}
                  </div>

                  <h1 className="text-4xl text-white">{event.title}</h1>
                  <p className="mt-4 leading-8 text-purple-100/80">
                    {event.full_description || event.description || 'Competition details will be updated from the admin side.'}
                  </p>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 p-4" style={innerCardStyle}>
                      <p className="text-sm text-purple-300">Registration closes</p>
                      <p className="mt-1 text-lg text-white">{getEventDateLabel(event)}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 p-4" style={innerCardStyle}>
                      <p className="text-sm text-purple-300">Venue</p>
                      <p className="mt-1 text-lg text-white">{getEventVenueAddress(event)}</p>
                    </div>
                  </div>
                </div>
              </section>

              {(event.guidelines || rules.length > 0) && (
                <section className="rounded-3xl border border-white/12 p-8 shadow-2xl" style={cardStyle}>
                  <h2 className="text-2xl text-white">Competition Guidelines</h2>
                  {event.guidelines && (
                    <p className="mt-4 leading-8 text-purple-100/80">{event.guidelines}</p>
                  )}

                  {rules.length > 0 && (
                    <div className="mt-6 space-y-3">
                      {rules.map((rule, index) => (
                        <div
                          key={`${rule}-${index}`}
                          className="flex items-start gap-3 rounded-2xl border border-white/10 p-4"
                          style={innerCardStyle}
                        >
                          <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm text-purple-700">
                            {index + 1}
                          </div>
                          <span className="text-purple-100">{rule}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                <section className="rounded-3xl border border-white/12 p-8 shadow-2xl" style={cardStyle}>
                  <h2 className="text-2xl text-white">Competition Features</h2>
                  {features.length > 0 ? (
                    <div className="mt-5 grid gap-3">
                      {features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 p-4"
                          style={innerCardStyle}
                        >
                          <CheckCircle size={18} className="text-green-500" />
                          <span className="text-purple-100">{feature}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-5 rounded-2xl border border-white/10 p-4 text-purple-200" style={innerCardStyle}>
                      No feature details added yet.
                    </div>
                  )}
                </section>

                <section className="rounded-3xl border border-white/12 p-8 shadow-2xl" style={cardStyle}>
                  <h2 className="text-2xl text-white">Tags</h2>
                  {tags.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 px-4 py-2 text-sm text-pink-100"
                          style={innerCardStyle}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-5 rounded-2xl border border-white/10 p-4 text-purple-200" style={innerCardStyle}>
                      No tags added yet.
                    </div>
                  )}
                </section>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-white/12 p-8 shadow-xl" style={cardStyle}>
                <h3 className="text-2xl text-white">Join This Competition</h3>
                <p className="mt-3 text-sm leading-6 text-purple-100">
                  Review the competition brief and continue to registration when you are ready.
                </p>

                <div className="mt-6 grid gap-3">
                  <Link
                    to="/competitions"
                    className="flex items-center justify-center rounded-2xl border border-white/10 px-4 py-4 text-sm text-white transition-all hover:bg-white/5"
                    style={innerCardStyle}
                  >
                    Back to Competitions
                  </Link>
                  <Link
                    to={registrationLink}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-4 py-4 text-sm text-white shadow-lg transition-all hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600"
                  >
                    <Ticket size={18} />
                    <span>{user ? 'Register Now' : 'Login to Register'}</span>
                  </Link>
                </div>

                {!user && (
                  <p className="mt-4 text-sm text-purple-200">
                    Sign in first, then the registration form will ask for name, email and phone.
                  </p>
                )}
              </div>

              <div className="rounded-3xl border border-white/12 p-8 shadow-xl" style={cardStyle}>
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
                      <p className="text-white">
                        {event.venue || 'Venue to be announced'}
                        {event.city ? `, ${event.city}` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users size={18} className="mt-0.5 text-pink-300" />
                    <div>
                      <p className="text-purple-300">Age Group</p>
                      <p className="text-white">{getEventAgeRestriction(event)}</p>
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
                    <Languages size={18} className="mt-0.5 text-pink-300" />
                    <div>
                      <p className="text-purple-300">Languages</p>
                      <p className="text-white">{getEventLanguage(event)}</p>
                    </div>
                  </div>
                  {event.time_limit && (
                    <div className="flex items-start gap-3">
                      <Clock3 size={18} className="mt-0.5 text-pink-300" />
                      <div>
                        <p className="text-purple-300">Time Limit</p>
                        <p className="text-white">{event.time_limit}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {timeline.length > 0 && (
                <div className="rounded-3xl border border-white/12 p-8 shadow-xl" style={cardStyle}>
                  <h3 className="mb-4 text-xl text-white">Competition Timeline</h3>
                  <div className="space-y-3">
                    {timeline.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-purple-100"
                        style={innerCardStyle}
                      >
                        <p className="text-purple-300">{item.label}</p>
                        <p className="mt-1 text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
