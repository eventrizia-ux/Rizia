import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  FileText, 
  LogOut,
  Bell,
  Search,
  BarChart3,
  Filter,
  Download,
  Mail,
  Calendar,
  UserCheck,
  Shield
} from 'lucide-react';
import { RiziaLogo } from '../../components/RiziaLogo';
import { AdminMobileNav } from '../../components/AdminMobileNav';
import { fetchAllUsers } from '../../utils/supabaseHelpers';

interface UsersManagementProps {
  onLogout: () => void;
}

export default function UsersManagement({ onLogout }: UsersManagementProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const isAdmin = user.users_login?.[0]?.is_admin || false;
    const userRole = isAdmin ? 'Admin' : 'User';
    const matchesRole = roleFilter === 'All' || userRole === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const stats = [
    {
      label: 'Total Users',
      value: users.length,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Admin Users',
      value: users.filter(u => u.users_login?.[0]?.is_admin).length,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Regular Users',
      value: users.filter(u => !u.users_login?.[0]?.is_admin).length,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Active Today',
      value: users.filter(u => {
        const lastLogin = u.users_login?.[0]?.last_login_at;
        if (!lastLogin) return false;
        const today = new Date().toDateString();
        return new Date(lastLogin).toDateString() === today;
      }).length,
      color: 'from-orange-500 to-amber-500'
    }
  ];

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
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

          {/* Mobile Search Bar */}
          <div className="mt-3 md:hidden">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all"
              />
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
              className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors group"
            >
              <Trophy size={20} />
              <span>Manage Events</span>
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
              className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl shadow-lg group"
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
            <div className="mb-6">
              <h1 className="text-gray-900 dark:text-white text-2xl sm:text-3xl mb-2">Users Management</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">View and manage all registered users</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-lg"
                >
                  <div className={`inline-flex p-3 bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg mb-3`}>
                    <Users className="text-white" size={24} />
                  </div>
                  <div className="text-3xl text-gray-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <div className="flex-1 min-w-[200px] hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-white appearance-none cursor-pointer"
                  >
                    <option value="All">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </div>
              </div>

              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                <Download size={18} />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Users Table */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-600 dark:text-gray-400">Loading users...</div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
              <Users className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-gray-900 dark:text-white mb-2">No users found</h3>
              <p className="text-gray-600 dark:text-gray-400">No users match your search criteria</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                      <th className="px-6 py-4 text-left text-sm text-gray-900 dark:text-white">Name</th>
                      <th className="px-6 py-4 text-left text-sm text-gray-900 dark:text-white">Email</th>
                      <th className="px-6 py-4 text-left text-sm text-gray-900 dark:text-white">Role</th>
                      <th className="px-6 py-4 text-left text-sm text-gray-900 dark:text-white">Category</th>
                      <th className="px-6 py-4 text-left text-sm text-gray-900 dark:text-white">Join Date</th>
                      <th className="px-6 py-4 text-left text-sm text-gray-900 dark:text-white">Last Login</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => {
                      const isAdmin = user.users_login?.[0]?.is_admin || false;
                      const lastLogin = user.users_login?.[0]?.last_login_at;
                      
                      return (
                        <tr
                          key={user.id}
                          className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors ${
                            index % 2 === 0 ? '' : 'bg-gray-50/50 dark:bg-gray-900/20'
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-gray-900 dark:text-white">{user.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                              <Mail size={16} />
                              <span className="text-sm">{user.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {isAdmin ? (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400">
                                <Shield size={14} />
                                <span className="text-xs">Admin</span>
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
                                <UserCheck size={14} />
                                <span className="text-xs">User</span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-900 dark:text-white">{user.category || 'N/A'}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                              <Calendar size={16} />
                              <span className="text-sm">{formatDate(user.created_at)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {lastLogin ? formatDate(lastLogin) : 'Never'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden p-4 space-y-4">
                {filteredUsers.map((user) => {
                  const isAdmin = user.users_login?.[0]?.is_admin || false;
                  const lastLogin = user.users_login?.[0]?.last_login_at;
                  
                  return (
                    <div
                      key={user.id}
                      className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-4"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg flex-shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-gray-900 dark:text-white mb-1">{user.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                            <Mail size={14} />
                            {user.email}
                          </p>
                        </div>
                        {isAdmin ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400">
                            <Shield size={14} />
                            <span className="text-xs">Admin</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
                            <UserCheck size={14} />
                            <span className="text-xs">User</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Category:</span>
                          <span className="text-gray-900 dark:text-white">{user.category || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Joined:</span>
                          <span className="text-gray-900 dark:text-white">{formatDate(user.created_at)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Last Login:</span>
                          <span className="text-gray-900 dark:text-white">{lastLogin ? formatDate(lastLogin) : 'Never'}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <AdminMobileNav />
    </div>
  );
}