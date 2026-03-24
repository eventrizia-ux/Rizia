import { Link, useLocation } from 'react-router';
import { LayoutDashboard, Trophy, FileText, BarChart3, Users } from 'lucide-react';

export function AdminMobileNav() {
  const location = useLocation();

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/manage-competitions', icon: Trophy, label: 'Competitions' },
    { to: '/admin/bookings', icon: FileText, label: 'Bookings' },
    { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/admin/users', icon: Users, label: 'Users' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 shadow-lg">
      <div className="grid grid-cols-5 gap-1 p-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}