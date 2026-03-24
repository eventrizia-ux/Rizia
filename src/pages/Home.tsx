import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CompetitionCard } from '../components/CompetitionCard';
import { HeroCarousel } from '../components/HeroCarousel';
import { fetchActiveEvents } from '../utils/supabaseHelpers';
import { getSiteContent, type SiteContent } from '../utils/siteContent';
import {
  Sparkles,
  Trophy,
  Users,
  Award,
  ArrowRight,
  Calendar,
  BookOpen,
  Church,
  Heart,
  TrendingUp,
  Download,
  Pencil,
  Mic,
  Theater,
  Clapperboard,
  Camera,
  Palette,
  PenTool,
  Music2,
  Library,
  MonitorPlay,
  Star,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface HomeProps {
  user?: any;
  selectedCity?: string | null;
  onChangeCity?: () => void;
}

export default function Home({ user, selectedCity, onChangeCity }: HomeProps) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [siteContent, setSiteContent] = useState<SiteContent>(getSiteContent());

  useEffect(() => {
    loadEvents();
    setSiteContent(getSiteContent());
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchActiveEvents();
      setEvents(data);

      const counts = data.reduce((acc: Record<string, number>, event: any) => {
        const category = event.category;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});
      setCategoryCounts(counts);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      name: 'Drawing & Painting',
      icon: Palette,
      image:
        'https://images.unsplash.com/photo-1683222042853-37cd29faf895?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWludGluZyUyMGNhbnZhc3xlbnwxfHx8fDE3NjQ4NDk1OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      count: categoryCounts['Drawing & Painting'] || 0,
      gradient: 'from-purple-500 to-violet-500',
    },
    {
      name: 'Article Writing',
      icon: Pencil,
      image:
        'https://images.unsplash.com/photo-1612907260223-2c7aff7a7d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0aW5nJTIwbm90ZWJvb2slMjBjcmVhdGl2ZXxlbnwxfHx8fDE3NjQ4NTE1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      count: categoryCounts['Article Writing'] || 0,
      gradient: 'from-teal-500 to-emerald-500',
    },
    {
      name: 'Poetry',
      icon: PenTool,
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1080',
      count: categoryCounts['Poetry'] || 0,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Skit / Drama',
      icon: Theater,
      image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1080',
      count: categoryCounts['Skit / Drama'] || 0,
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      name: 'Choreography / Dance',
      icon: Music2,
      image:
        'https://images.unsplash.com/photo-1698824554771-293b5dcc42db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHBlcmZvcm1hbmNlJTIwc3RhZ2V8ZW58MXx8fHwxNzY0ODI1Nzc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      count: categoryCounts['Choreography / Dance'] || 0,
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      name: 'Vlogs / Short Videos',
      icon: Clapperboard,
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1080',
      count: categoryCounts['Vlogs / Short Videos'] || 0,
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      name: 'Speech',
      icon: Mic,
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1080',
      count: categoryCounts['Speech'] || 0,
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      name: 'Creative Arts',
      icon: Camera,
      image:
        'https://images.unsplash.com/photo-1761116182933-544a89286835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFydHMlMjBwYWxldHRlJTIwYnJ1c2hlc3xlbnwxfHx8fDE3NzM1MTA0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      count: categoryCounts['Creative Arts'] || 0,
      gradient: 'from-fuchsia-500 to-pink-500',
    },
    {
      name: 'Literary & Oratory',
      icon: Library,
      image:
        'https://images.unsplash.com/photo-1585742162711-ed1a0fb549ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwbGlicmFyeSUyMHJlYWRpbmclMjBsaXRlcmF0dXJlfGVufDF8fHx8MTc3MzUxMDQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      count: categoryCounts['Literary & Oratory'] || 0,
      gradient: 'from-green-500 to-teal-500',
    },
    {
      name: 'Performing Arts',
      icon: Theater,
      image:
        'https://images.unsplash.com/photo-1761618291331-535983ae4296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzM0OTY2MzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      count: categoryCounts['Performing Arts'] || 0,
      gradient: 'from-red-500 to-orange-500',
    },
    {
      name: 'Digital Media',
      icon: MonitorPlay,
      image:
        'https://images.unsplash.com/photo-1758553026412-bc1da0ebd366?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWVkaWElMjBjYW1lcmElMjBwcm9kdWN0aW9ufGVufDF8fHx8MTc3MzUxMDQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      count: categoryCounts['Digital Media'] || 0,
      gradient: 'from-sky-500 to-blue-500',
    },
  ];

  const stats = [
    { label: 'Active Categories', value: '11', icon: Trophy, gradient: 'from-pink-500 to-rose-500' },
    { label: 'Participants', value: '500+', icon: Users, gradient: 'from-purple-500 to-indigo-500' },
    { label: 'Age Groups', value: '4', icon: Award, gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Total Submissions', value: events.length.toString(), icon: BookOpen, gradient: 'from-orange-500 to-amber-500' },
  ];

  const displayEvents = selectedCity
    ? events.filter((event) => event.city === selectedCity).slice(0, 6)
    : events.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-[#20293d]" style={{ backgroundColor: '#20293d' }}>
      <Header user={user} selectedCity={selectedCity} onChangeCity={onChangeCity} />

      <main className="flex-1 bg-[#20293d]" style={{ backgroundColor: '#20293d' }}>
        <HeroCarousel />

        <section className="border-t border-white/5 bg-[#252f45] py-14" style={{ backgroundColor: '#252f45' }}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-6 text-center"
                >
                  <div
                    className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
                  >
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <div className="mb-1 text-2xl text-white md:text-3xl">{stat.value}</div>
                  <div className="text-sm text-slate-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#223047] py-16" style={{ backgroundColor: '#223047' }}>
          <div className="container mx-auto px-4">
            <div className="mb-14 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-500/15 px-4 py-2 text-sm text-purple-200">
                <Sparkles size={18} className="text-pink-300" />
                Explore Categories
              </div>
              <h2 className="mb-4 text-4xl text-white md:text-5xl">Browse by Category</h2>
              <p className="mx-auto max-w-2xl text-xl text-slate-300">
                Choose your category and express your faith creatively
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <Link
                    key={category.name}
                    to="/competitions"
                    className="group relative aspect-square overflow-hidden rounded-3xl border border-white/8 bg-[#162235]/45 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
                  >
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-25`}
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black/25 backdrop-blur-md">
                        <Icon className="text-white" size={24} />
                      </div>
                      <div className="mb-2 text-sm text-white md:text-base">{category.name}</div>
                      <div className={`w-fit rounded-full bg-gradient-to-r px-3 py-1 text-xs text-white ${category.gradient}`}>
                        {category.count} competitions
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#20293d] py-20" style={{ backgroundColor: '#20293d' }}>
          <div className="container mx-auto px-4">
            <div className="mb-12 flex items-center justify-between gap-4">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink-500/12 px-4 py-2 text-sm text-pink-200">
                  <TrendingUp size={18} className="text-pink-300" />
                  Featured Categories
                </div>
                <h2 className="mb-2 text-4xl text-white md:text-5xl">
                  {selectedCity ? `Competitions in ${selectedCity}` : 'Featured Competitions'}
                </h2>
                <p className="text-lg text-slate-300">Express your faith through these creative categories</p>
              </div>
              <Link
                to="/competitions"
                className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-6 py-3 text-white shadow-lg transition-all hover:scale-105 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 md:inline-flex"
              >
                <span>View All</span>
                <ArrowRight size={20} />
              </Link>
            </div>

            {loading ? (
              <div className="rounded-3xl border border-white/8 bg-[#223047]/70 p-10 text-center text-slate-300 backdrop-blur-xl">
                Loading competitions...
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {displayEvents.map((event) => (
                  <CompetitionCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    category={event.category}
                    description={event.description}
                    deadline={event.date}
                    prize={event.price}
                    image={event.image}
                    venue={event.venue}
                    city={event.city}
                  />
                ))}
              </div>
            )}

            <div className="mt-12 text-center md:hidden">
              <Link
                to="/competitions"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-8 py-4 text-white shadow-lg transition-all hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600"
              >
                <span>View All Categories</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#223047] py-20" style={{ backgroundColor: '#223047' }}>
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-blue-200">
                <Church size={18} className="text-cyan-300" />
                Why Rizia
              </div>
              <h2 className="mb-4 text-4xl text-white md:text-5xl">Why Participate in Rizia?</h2>
              <p className="text-xl text-slate-300">Rediscover our faith through creative expression</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="group relative rounded-3xl border border-pink-400/15 bg-[#3b2340] p-8 backdrop-blur-xl">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 opacity-10 transition-opacity group-hover:opacity-20" />
                <div className="relative">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg">
                    <BookOpen className="text-white" size={28} />
                  </div>
                  <h3 className="mb-3 text-xl text-white">Deepen Your Faith</h3>
                  <p className="text-slate-300">Understand the why behind our traditions and explore Church history.</p>
                </div>
              </div>

              <div className="group relative rounded-3xl border border-purple-400/15 bg-[#312b56] p-8 backdrop-blur-xl">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 opacity-10 transition-opacity group-hover:opacity-20" />
                <div className="relative">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 shadow-lg">
                    <Trophy className="text-white" size={28} />
                  </div>
                  <h3 className="mb-3 text-xl text-white">Showcase Talent</h3>
                  <p className="text-slate-300">Share your God-given gifts with the entire Diocese.</p>
                </div>
              </div>

              <div className="group relative rounded-3xl border border-blue-400/15 bg-[#1f3d5b] p-8 backdrop-blur-xl">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-10 transition-opacity group-hover:opacity-20" />
                <div className="relative">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                    <Users className="text-white" size={28} />
                  </div>
                  <h3 className="mb-3 text-xl text-white">Build Community</h3>
                  <p className="text-slate-300">Connect with brothers and sisters from different parishes.</p>
                </div>
              </div>

              <div className="group relative rounded-3xl border border-emerald-400/15 bg-[#173c3d] p-8 backdrop-blur-xl">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 opacity-10 transition-opacity group-hover:opacity-20" />
                <div className="relative">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
                    <Award className="text-white" size={28} />
                  </div>
                  <h3 className="mb-3 text-xl text-white">Win Rewards</h3>
                  <p className="text-slate-300">Exciting prizes and certificates for winners in all categories.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#20293d] pb-20" style={{ backgroundColor: '#20293d' }}>
          <div className="w-full">
            <div
              className="w-full border-y border-white/8 bg-[#253148] px-6 py-8 shadow-xl backdrop-blur-xl md:px-8 lg:px-10"
              style={{ backgroundColor: '#253148' }}
            >
              <div className="mb-8">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
                  <Star size={16} className="text-pink-300" />
                  Festival essentials
                </div>
                <h2 className="text-2xl text-white md:text-3xl">Awards, Dates and Rulebook</h2>
                <p className="mt-3 max-w-4xl text-slate-300">
                  Check the key rewards, important milestones, and the latest participation guide before you register.
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                <div className="min-w-0">
                  <div className="w-full rounded-3xl border border-pink-400/12 bg-[#30263d] p-5 md:p-6" style={{ backgroundColor: '#30263d' }}>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg">
                        <Award className="text-white" size={20} />
                      </div>
                      <h3 className="text-lg text-white">Awards</h3>
                    </div>
                    <div className="space-y-3">
                      {siteContent.awards.map((item) => (
                        <div key={item} className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="w-full rounded-3xl border border-cyan-400/12 bg-[#23374d] p-5 md:p-6" style={{ backgroundColor: '#23374d' }}>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg">
                        <Calendar className="text-white" size={20} />
                      </div>
                      <h3 className="text-lg text-white">Important Dates</h3>
                    </div>
                    <div className="space-y-3">
                      {siteContent.importantDates.map((item) => (
                        <div key={`${item.label}-${item.value}`} className="rounded-2xl bg-white/5 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">{item.label}</p>
                          <p className="mt-1 text-sm text-white">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="w-full rounded-3xl border border-indigo-400/12 bg-[#2b3152] p-6" style={{ backgroundColor: '#2b3152' }}>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 shadow-lg">
                        <Download className="text-white" size={20} />
                      </div>
                      <h3 className="text-lg text-white">Rulebook</h3>
                    </div>
                    <p className="mb-6 text-sm leading-6 text-slate-300">
                      Open the latest participation guide, competition rules, and submission instructions.
                    </p>
                    <div className="mb-6 rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200">
                      Use this PDF to review eligibility, submission format, and event rules in one place.
                    </div>
                    {siteContent.rulebookUrl && (
                      <a
                        href={siteContent.rulebookUrl}
                        download
                        className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition-all hover:scale-105 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600"
                      >
                        <Download size={16} />
                        Download Rulebook
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 py-20 text-white">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-0 top-0 h-96 w-96 animate-pulse rounded-full bg-white blur-3xl" />
            <div
              className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-white blur-3xl"
              style={{ animationDelay: '1s' }}
            />
          </div>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-md">
              <Church size={18} />
              <span className="text-sm">Turning Back to Church History</span>
            </div>
            <h2 className="mb-6 text-4xl text-white md:text-5xl">Ready to Join Rizia?</h2>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-purple-100">
              Express your faith creatively and help keep the flame of our heritage alive for the next generation
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/competitions"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-purple-600 shadow-2xl transition-all hover:scale-105 hover:bg-purple-50 hover:shadow-white/20"
              >
                <Trophy size={20} />
                <span className="text-lg">Browse Categories</span>
              </Link>
              {!user && (
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-8 py-4 text-white backdrop-blur-md transition-all hover:bg-white/20"
                >
                  <Heart size={20} />
                  <span className="text-lg">Register Now</span>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
