import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  FileText, 
  LogOut,
  Bell,
  Plus,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Filter,
  Download,
  X,
  BarChart3,
  Award
} from 'lucide-react';
import { RiziaLogo } from '../../components/RiziaLogo';
import { AdminMobileNav } from '../../components/AdminMobileNav';
import { fetchAllEvents, createEvent, updateEvent, deleteEvent } from '../../utils/supabaseHelpers';
import { datesToMultiline, getSiteContent, multilineToDates, saveSiteContent } from '../../utils/siteContent';
import { toast } from 'sonner@2.0.3';

interface ManageCompetitionsProps {
  onLogout: () => void;
}

interface CompetitionFormData {
  title: string;
  category: string;
  description: string;
  full_description: string;
  age_group: string;
  duration: string;
  guidelines: string;
  rules: string[];
  max_participants: number;
  submission_format: string;
  word_limit: string;
  time_limit: string;
  language_options: string[];
  is_active: boolean;
  registration_deadline: string;
  preliminary_date: string;
  grand_finale_date: string;
  venue: string;
  city: string;
  image_url: string;
}

export default function ManageCompetitions({ onLogout }: ManageCompetitionsProps) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [awardsText, setAwardsText] = useState('');
  const [datesText, setDatesText] = useState('');
  const [rulebookUrl, setRulebookUrl] = useState('');
  const [formData, setFormData] = useState<CompetitionFormData>({
    title: '',
    category: 'Drawing & Painting',
    description: '',
    full_description: '',
    age_group: 'Children',
    duration: '',
    guidelines: '',
    rules: [],
    max_participants: 0,
    submission_format: 'PDF',
    word_limit: '',
    time_limit: '',
    language_options: ['English', 'Tamil'],
    is_active: true,
    registration_deadline: '',
    preliminary_date: '',
    grand_finale_date: '',
    venue: '',
    city: 'Bengaluru',
    image_url: ''
  });

  const categories = ['All', 'Drawing & Painting', 'Article Writing', 'Poetry', 'Skit / Drama', 'Choreography / Dance', 'Vlogs / Short Videos', 'Speech', 'Creative Arts', 'Literary & Oratory', 'Performing Arts', 'Digital Media'];
  const ageGroups = ['Children', 'Youth', 'Young Adults', 'School & Parish Groups'];
  const cities = ['All', 'Bengaluru', 'Chennai', 'Coimbatore', 'Hyderabad', 'Kochi', 'Kolkata', 'Mumbai', 'New Delhi', 'Pune'];

  useEffect(() => {
    loadEvents();
    loadPlatformContent();
  }, []);

  const loadPlatformContent = () => {
    const content = getSiteContent();
    setAwardsText(content.awards.join('\n'));
    setDatesText(datesToMultiline(content.importantDates));
    setRulebookUrl(content.rulebookUrl);
  };

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchAllEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error loading events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesCity = selectedCity === 'All' || event.city === selectedCity;
    
    return matchesSearch && matchesCategory && matchesCity;
  });

  const handleOpenModal = (competition?: any) => {
    if (competition) {
      setEditingEvent(competition);
      setFormData({
        title: competition.title || '',
        category: competition.category || 'Drawing & Painting',
        description: competition.description || '',
        full_description: competition.full_description || '',
        age_group: competition.age_group || 'Children',
        duration: competition.duration || '',
        guidelines: competition.guidelines || '',
        rules: Array.isArray(competition.rules) ? competition.rules : [],
        max_participants: competition.max_participants || 0,
        submission_format: competition.submission_format || 'PDF',
        word_limit: competition.word_limit || '',
        time_limit: competition.time_limit || '',
        language_options: Array.isArray(competition.language_options) ? competition.language_options : ['English', 'Tamil'],
        is_active: competition.is_active !== undefined ? competition.is_active : true,
        registration_deadline: competition.registration_deadline || '',
        preliminary_date: competition.preliminary_date || '',
        grand_finale_date: competition.grand_finale_date || '',
        venue: competition.venue || '',
        city: competition.city || 'Bengaluru',
        image_url: competition.image_url || ''
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        category: 'Drawing & Painting',
        description: '',
        full_description: '',
        age_group: 'Children',
        duration: '',
        guidelines: '',
        rules: [],
        max_participants: 0,
        submission_format: 'PDF',
        word_limit: '',
        time_limit: '',
        language_options: ['English', 'Tamil'],
        is_active: true,
        registration_deadline: '',
        preliminary_date: '',
        grand_finale_date: '',
        venue: '',
        city: 'Bengaluru',
        image_url: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEvent(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const competitionData = {
        ...formData,
        rules: Array.isArray(formData.rules) ? formData.rules : formData.rules.toString().split('\n').filter(rule => rule.trim()),
        language_options: Array.isArray(formData.language_options) ? formData.language_options : formData.language_options.toString().split(',').map(lang => lang.trim())
      };

      if (editingEvent) {
        await updateEvent(editingEvent.id, competitionData);
        toast.success('Competition updated successfully!');
      } else {
        await createEvent(competitionData);
        toast.success('Competition created successfully!');
      }

      handleCloseModal();
      loadEvents();
    } catch (error) {
      console.error('Error saving competition:', error);
      toast.error('Failed to save competition');
    }
  };

  const handleDelete = async (competitionId: string, competitionTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${competitionTitle}"?`)) return;

    try {
      await deleteEvent(competitionId);
      toast.success('Competition deleted successfully!');
      loadEvents();
    } catch (error) {
      console.error('Error deleting competition:', error);
      toast.error('Failed to delete competition');
    }
  };

  const handleSavePlatformContent = () => {
    saveSiteContent({
      awards: awardsText
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      importantDates: multilineToDates(datesText),
      rulebookUrl: rulebookUrl.trim(),
    });

    toast.success('Homepage and dashboard content updated successfully!');
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Drawing & Painting': 'from-pink-500 to-rose-500',
      'Article Writing': 'from-blue-500 to-cyan-500',
      'Poetry': 'from-purple-500 to-violet-500',
      'Skit / Drama': 'from-green-500 to-emerald-500',
      'Choreography / Dance': 'from-yellow-500 to-orange-500',
      'Vlogs / Short Videos': 'from-red-500 to-pink-500',
      'Speech': 'from-indigo-500 to-blue-500',
      'Creative Arts': 'from-pink-500 to-purple-500',
      'Literary & Oratory': 'from-cyan-500 to-teal-500',
      'Performing Arts': 'from-orange-500 to-red-500',
      'Digital Media': 'from-gray-500 to-gray-600'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-gray-800/80">
        <div className="px-4 md:px-6 py-4">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" className="hover:opacity-90 transition-opacity">
              <RiziaLogo size="sm" />
            </Link>

            <div className="flex items-center gap-2 md:gap-3">
              <button className="p-2 md:p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors relative">
                <Bell size={18} className="text-gray-600 dark:text-gray-400 md:w-5 md:h-5" />
                <span className="absolute top-1 right-1 md:top-1.5 md:right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all shadow-lg"
              >
                <LogOut size={16} className="md:w-[18px] md:h-[18px]" />
                <span className="hidden sm:inline text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-73px)] p-6">
          <div className="mb-8">
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl border border-purple-200 dark:border-purple-800">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-xl flex items-center justify-center text-white">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white truncate">Admin</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Administrator</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors group"
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/admin/manage-competitions"
              className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl shadow-lg group"
            >
              <Trophy size={20} />
              <span>Manage Competitions</span>
            </Link>

            <Link
              to="/admin/bookings"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors group"
            >
              <FileText size={20} />
              <span>All Bookings</span>
            </Link>

            <Link
              to="/admin/analytics"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors group"
            >
              <BarChart3 size={20} />
              <span>Analytics</span>
            </Link>

            <Link
              to="/admin/users"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors group"
            >
              <Users size={20} />
              <span>Users</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-20 lg:pb-6">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-3 md:gap-4">
              <div>
                <h1 className="text-gray-900 dark:text-white text-2xl sm:text-3xl mb-1 md:mb-2">Manage Competitions</h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Create, edit, and manage all your competitions</p>
              </div>
              <button
                onClick={() => handleOpenModal()}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl text-sm whitespace-nowrap"
              >
                <Plus size={18} className="sm:w-5 sm:h-5" />
                <span>Add New Competition</span>
              </button>
            </div>

            <div className="mb-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl text-gray-900 dark:text-white">Homepage & Dashboard Content</h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Manage the shared awards, dates, and rulebook shown to users.
                  </p>
                </div>
                <button
                  onClick={handleSavePlatformContent}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-5 py-3 text-white shadow-lg transition-all hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600"
                >
                  <Award size={18} />
                  Save Content
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm text-gray-700 dark:text-gray-300">
                    Awards & Recognition
                  </label>
                  <textarea
                    rows={8}
                    value={awardsText}
                    onChange={(e) => setAwardsText(e.target.value)}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    placeholder="One award or recognition point per line"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-700 dark:text-gray-300">
                    Important Dates
                  </label>
                  <textarea
                    rows={8}
                    value={datesText}
                    onChange={(e) => setDatesText(e.target.value)}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    placeholder={'Registration Deadline | Dec 15, 2026\nGrand Finale | Jan 10, 2027'}
                  />
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Use one line per date in the format: Label | Value
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-700 dark:text-gray-300">
                    Rulebook URL or Path
                  </label>
                  <div className="rounded-2xl border border-dashed border-gray-300 p-4 dark:border-gray-600">
                    <div className="mb-3 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Download size={18} />
                      <span>Shared rulebook link</span>
                    </div>
                    <input
                      type="text"
                      value={rulebookUrl}
                      onChange={(e) => setRulebookUrl(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      placeholder="/rulebook.pdf"
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Example: `/rulebook.pdf` or a full downloadable URL.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-white appearance-none cursor-pointer text-sm"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-white appearance-none cursor-pointer text-sm"
                  >
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-600 dark:text-gray-400">Loading competitions...</div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
              <Trophy className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-gray-900 dark:text-white mb-2">No competitions found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Get started by creating your first competition</p>
              <button
                onClick={() => handleOpenModal()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all shadow-lg"
              >
                <Plus size={20} />
                <span>Add New Competition</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all">
                  {event.image_url && (
                    <img 
                      src={event.image_url} 
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex px-3 py-1 bg-gradient-to-r ${getCategoryColor(event.category)} text-white rounded-full text-xs`}>
                        {event.category}
                      </span>
                      <span className="inline-flex px-3 py-1 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 rounded-full text-xs">
                        Active
                      </span>
                    </div>
                    
                    <h3 className="text-gray-900 dark:text-white mb-2 line-clamp-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar size={16} />
                        <span>{event.event_date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin size={16} />
                        <span>{event.city}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-purple-600 dark:text-purple-400 font-semibold">{event.price}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(event)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id, event.title)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Add/Edit Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl text-gray-900 dark:text-white">
                {editingEvent ? 'Edit Competition' : 'Add New Competition'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Competition Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                    placeholder="Enter competition title"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                  >
                    <option value="Drawing & Painting">Drawing & Painting</option>
                    <option value="Article Writing">Article Writing</option>
                    <option value="Poetry">Poetry</option>
                    <option value="Skit / Drama">Skit / Drama</option>
                    <option value="Choreography / Dance">Choreography / Dance</option>
                    <option value="Vlogs / Short Videos">Vlogs / Short Videos</option>
                    <option value="Speech">Speech</option>
                    <option value="Creative Arts">Creative Arts</option>
                    <option value="Literary & Oratory">Literary & Oratory</option>
                    <option value="Performing Arts">Performing Arts</option>
                    <option value="Digital Media">Digital Media</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Age Group *</label>
                  <select
                    required
                    value={formData.age_group}
                    onChange={(e) => setFormData({...formData, age_group: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                  >
                    <option value="Children">Children</option>
                    <option value="Youth">Youth</option>
                    <option value="Young Adults">Young Adults</option>
                    <option value="School & Parish Groups">School & Parish Groups</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">City *</label>
                  <select
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                  >
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Kochi">Kochi</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="New Delhi">New Delhi</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                    placeholder="e.g., 1½ hours, 5-7 minutes"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Max Participants</label>
                  <input
                    type="number"
                    value={formData.max_participants}
                    onChange={(e) => setFormData({...formData, max_participants: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                    placeholder="0 for unlimited"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Submission Format</label>
                  <select
                    value={formData.submission_format}
                    onChange={(e) => setFormData({...formData, submission_format: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Video">Video</option>
                    <option value="Live Performance">Live Performance</option>
                    <option value="Document">Document</option>
                    <option value="Image">Image</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Word Limit</label>
                  <input
                    type="text"
                    value={formData.word_limit}
                    onChange={(e) => setFormData({...formData, word_limit: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                    placeholder="e.g., 800-1000 words"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Time Limit</label>
                  <input
                    type="text"
                    value={formData.time_limit}
                    onChange={(e) => setFormData({...formData, time_limit: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                    placeholder="e.g., 3-5 minutes"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Language Options</label>
                  <input
                    type="text"
                    value={formData.language_options.join(', ')}
                    onChange={(e) => setFormData({...formData, language_options: e.target.value.split(',').map(lang => lang.trim())})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                    placeholder="English, Tamil, Hindi"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white resize-none"
                    placeholder="Brief description of the competition"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Full Description</label>
                  <textarea
                    rows={4}
                    value={formData.full_description}
                    onChange={(e) => setFormData({...formData, full_description: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white resize-none"
                    placeholder="Detailed description with rules and guidelines"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Guidelines</label>
                  <textarea
                    rows={3}
                    value={formData.guidelines}
                    onChange={(e) => setFormData({...formData, guidelines: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white resize-none"
                    placeholder="Specific guidelines for participants"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Rules (one per line)</label>
                  <textarea
                    rows={4}
                    value={formData.rules.join('\n')}
                    onChange={(e) => setFormData({...formData, rules: e.target.value.split('\n').filter(rule => rule.trim())})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white resize-none"
                    placeholder="1. All entries must be original&#10;2. Content must uphold Church values&#10;3. Judges' decisions are final"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Registration Deadline</label>
                  <input
                    type="text"
                    value={formData.registration_deadline}
                    onChange={(e) => setFormData({...formData, registration_deadline: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                    placeholder="e.g., Dec 15, 2025"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Preliminary Date</label>
                  <input
                    type="text"
                    value={formData.preliminary_date}
                    onChange={(e) => setFormData({...formData, preliminary_date: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                    placeholder="e.g., Jan 10, 2026"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Grand Finale Date</label>
                  <input
                    type="text"
                    value={formData.grand_finale_date}
                    onChange={(e) => setFormData({...formData, grand_finale_date: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                    placeholder="e.g., Feb 15, 2026"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Venue</label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) => setFormData({...formData, venue: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                    placeholder="Venue name or Online"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                    placeholder="https://..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Competition is active</span>
                  </label>
                </div>
              </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                    placeholder="e.g., Music, Concert, Live"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Features (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.features}
                    onChange={(e) => setFormData({...formData, features: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                    placeholder="e.g., Indoor Event, Parking Available"
                  />
                </div>

              <div className="flex items-center gap-4 mt-8">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all shadow-lg"
                >
                  {editingEvent ? 'Update Competition' : 'Create Competition'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <AdminMobileNav />
    </div>
  );
}
