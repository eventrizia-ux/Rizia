import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  FileText, 
  LogOut,
  Settings,
  Bell,
  Search,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  TrendingUp,
  Activity
} from 'lucide-react';
import { RiziaLogo } from '../../components/RiziaLogo';
import { ThemeToggle } from '../../components/ThemeToggle';
import { AdminMobileNav } from '../../components/AdminMobileNav';
import { fetchAllEvents, fetchAllBookings, fetchDashboardStats } from '../../utils/supabaseHelpers';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [events, setEvents] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [eventsData, bookingsData, statsData] = await Promise.all([
        fetchAllEvents(),
        fetchAllBookings(),
        fetchDashboardStats()
      ]);

      setEvents(eventsData);
      setBookings(bookingsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const confirmedBookings = bookings.filter(b => b.booking_status === 'confirmed').length;
  const pendingBookings = bookings.filter(b => b.booking_status === 'pending').length;

  const statsCards = [
    {
      label: 'Total Competitions',
      value: stats.totalEvents.toString(),
      change: '+12%',
      trend: 'up',
      icon: Trophy,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30'
    },
    {
      label: 'Total Bookings',
      value: stats.totalBookings.toString(),
      change: '+23%',
      trend: 'up',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30'
    },
    {
      label: 'Pending Bookings',
      value: pendingBookings.toString(),
      change: '-5%',
      trend: 'down',
      icon: Clock,
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30'
    },
    {
      label: 'Revenue',
      value: `₹${(stats.totalRevenue / 1000).toFixed(1)}K`,
      change: '+18%',
      trend: 'up',
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30'
    }
  ];

  const recentEvents = events.slice(0, 5);
  const recentBookings = bookings.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Top Navigation */}
      <nav className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="hover:opacity-90 transition-opacity">
              <RiziaLogo size="md" />
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Search competitions, bookings..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors relative">
                <Bell size={20} className="text-gray-600 dark:text-gray-400" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <Settings size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all shadow-lg"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
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
              className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl shadow-lg group"
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/admin/manage-competitions"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors group"
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
              {pendingBookings > 0 && (
                <span className="ml-auto px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">
                  {pendingBookings}
                </span>
              )}
            </Link>

            <Link
              to="/admin/analytics"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors group"
            >
              <BarChart3 size={20} />
              <span>Analytics</span>
            </Link>

            <Link
              to="/admin/users-management"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors group"
            >
              <Users size={20} />
              <span>Users</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-purple-500" size={24} />
              <h1 className="text-gray-900 dark:text-white text-3xl">Dashboard Overview</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your events.</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-600 dark:text-gray-400">Loading dashboard data...</div>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {statsCards.map((stat, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${stat.bgGradient} border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 group`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                        <stat.icon className="text-white" size={24} />
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                        stat.trend === 'up' 
                          ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400' 
                          : 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400'
                      }`}>
                        {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        <span className="text-xs">{stat.change}</span>
                      </div>
                    </div>
                    <div className="text-3xl text-gray-900 dark:text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
                {/* Recent Events */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-gray-900 dark:text-white text-xl">Recent Competitions</h2>
                    <Link
                      to="/admin/manage-competitions"
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm flex items-center gap-1"
                    >
                      View All
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {recentEvents.length > 0 ? (
                      recentEvents.map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors group"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                            <Trophy size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 dark:text-white truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {event.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{event.city}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye size={16} className="text-gray-400" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">-</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">No competitions found</p>
                    )}
                  </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-gray-900 dark:text-white text-xl">Recent Bookings</h2>
                    <Link
                      to="/admin/bookings"
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm flex items-center gap-1"
                    >
                      View All
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {recentBookings.length > 0 ? (
                      recentBookings.map((booking) => {
                        const StatusIcon = booking.booking_status === 'confirmed' ? CheckCircle : booking.booking_status === 'cancelled' ? XCircle : Clock;
                        const statusColors = {
                          confirmed: 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400',
                          cancelled: 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400',
                          pending: 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400'
                        };

                        return (
                          <div
                            key={booking.id}
                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900 dark:text-white truncate">{booking.event_name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {booking.users?.name || 'User'}
                              </p>
                            </div>
                            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${statusColors[booking.booking_status as keyof typeof statusColors] || statusColors.pending}`}>
                              <StatusIcon size={14} />
                              <span className="text-xs capitalize">{booking.booking_status}</span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">No bookings found</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Activity Chart Placeholder */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-gray-900 dark:text-white text-xl mb-1">Event Performance</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Bookings over the last 7 days</p>
                  </div>
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Last 7 Days
                  </button>
                </div>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl">
                  <div className="text-center">
                    <Activity className="mx-auto mb-3 text-purple-500" size={48} />
                    <p className="text-gray-600 dark:text-gray-400">Analytics visualization</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <AdminMobileNav />
    </div>
  );
}