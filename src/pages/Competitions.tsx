import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CompetitionCard } from '../components/CompetitionCard';
import { fetchActiveEvents } from '../utils/supabaseHelpers';
import { Filter, MapPin, Sparkles } from 'lucide-react';
import { getEventDateLabel, getEventImage } from '../utils/appData';

interface CompetitionsProps {
  user?: any;
  selectedCity?: string | null;
  onChangeCity?: () => void;
}

export default function Competitions({ user, selectedCity, onChangeCity }: CompetitionsProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('all');
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchActiveEvents();
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'All',
    'Drawing & Painting',
    'Article Writing',
    'Poetry',
    'Skit / Drama',
    'Choreography / Dance',
    'Vlogs / Short Videos',
    'Speech',
    'Creative Arts',
    'Literary & Oratory',
    'Performing Arts',
    'Digital Media',
  ];

  const cityEvents = selectedCity ? events.filter((event) => event.city === selectedCity) : events;

  const filteredEvents = cityEvents.filter((event) => {
    if (selectedCategory === 'All') return true;
    return event.category === selectedCategory;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'deadline') {
      return new Date(getEventDateLabel(a)).getTime() - new Date(getEventDateLabel(b)).getTime();
    }
    if (sortBy === 'new') {
      return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Header user={user} selectedCity={selectedCity} onChangeCity={onChangeCity} />

      <main className="flex-1 px-4 pt-14 pb-12">
        <div className="container mx-auto max-w-7xl">
          <div className="mt-6 mb-8 grid gap-6 lg:grid-cols-2 lg:items-stretch">
            <section className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl lg:min-w-0">
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-pink-100">
                    <Sparkles size={15} />
                    <span>Rizia Competition Showcase</span>
                  </div>
                  <h1 className="mt-4 text-4xl text-white md:text-5xl">
                    {selectedCity ? `Competitions in ${selectedCity}` : 'Discover Competitions'}
                  </h1>
                  <p className="mt-3 max-w-2xl text-base leading-8 text-purple-100/80">
                    Browse live competitions, compare deadlines, and move into details or registration without friction.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div
                    className="min-w-[180px] rounded-[2rem] border p-4 backdrop-blur-2xl"
                    style={{
                      borderColor: 'rgba(255,255,255,0.14)',
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 100%)',
                      boxShadow:
                        'inset 0 1px 0 rgba(255,255,255,0.12), 0 12px 24px rgba(41, 18, 78, 0.14)',
                    }}
                  >
                    <div className="text-[10px] uppercase tracking-[0.22em] text-purple-200/80">Live competitions</div>
                    <div className="mt-3 text-3xl leading-none text-white">{sortedEvents.length}</div>
                    <div className="mt-2 text-xs text-purple-100/70">Available now</div>
                  </div>
                  <div
                    className="min-w-[220px] rounded-[2rem] border p-4 backdrop-blur-2xl"
                    style={{
                      borderColor: 'rgba(255,255,255,0.14)',
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 100%)',
                      boxShadow:
                        'inset 0 1px 0 rgba(255,255,255,0.12), 0 12px 24px rgba(41, 18, 78, 0.14)',
                    }}
                  >
                    <div className="text-[10px] uppercase tracking-[0.22em] text-purple-200/80">Current city</div>
                    <div className="mt-3 text-3xl leading-none text-white">{selectedCity || 'All'}</div>
                    <div className="mt-2 text-xs text-purple-100/70">Active filter</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl lg:min-w-0">
              <div className="mb-4 flex items-center gap-2 text-white">
                <Filter size={18} className="text-pink-300" />
                <span>Refine Discoveries</span>
              </div>

              <div className="grid gap-4">
                <div>
                  <label className="mb-2 block text-sm text-purple-100">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-900 text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-purple-100">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    <option value="all" className="bg-slate-900 text-white">All Events</option>
                    <option value="deadline" className="bg-slate-900 text-white">Deadline First</option>
                    <option value="new" className="bg-slate-900 text-white">Newly Added</option>
                  </select>
                </div>

                {selectedCity && onChangeCity ? (
                  <button
                    onClick={onChangeCity}
                    className="mt-auto flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-white transition-all hover:bg-white/10"
                  >
                    <MapPin size={16} className="text-pink-300" />
                    <span>Change City</span>
                  </button>
                ) : null}
              </div>
            </section>
          </div>

          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-purple-100/85">
              Showing {sortedEvents.length} competition{sortedEvents.length !== 1 ? 's' : ''}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {selectedCity && ` in ${selectedCity}`}
            </p>
            {loading ? <p className="text-sm text-purple-100/70">Updating competitions...</p> : null}
          </div>

          {sortedEvents.length > 0 ? (
            <div
              className="mb-32 grid justify-start gap-10"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 388px))' }}
            >
              {sortedEvents.map((event) => (
                <CompetitionCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  category={event.category}
                  description={event.description}
                  deadline={getEventDateLabel(event)}
                  prize={event.price}
                  image={getEventImage(event)}
                  venue={event.venue}
                  city={event.city}
                  registrationDeadline={event.registration_dead}
                  ageGroup={event.age_group}
                  submissionFormat={event.submission_format}
                  registrationLink={user ? `/checkout/${event.id}` : '/login'}
                />
              ))}
            </div>
          ) : (
            <div className="mb-32 rounded-3xl border border-white/20 bg-white/10 px-6 py-14 text-center shadow-xl backdrop-blur-xl">
              <h3 className="text-2xl text-white">No Competitions Found</h3>
              <p className="mx-auto mt-3 max-w-2xl text-purple-100/80">
                {selectedCity
                  ? `No competitions were found in ${selectedCity} for this category. Try a different category or change the city.`
                  : 'No competitions were found for this category. Try a different filter.'}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer seamless />
    </div>
  );
}
