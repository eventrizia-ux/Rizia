import { Link } from 'react-router';
import { Trophy, Menu, X, MapPin, ChevronDown, LogOut } from 'lucide-react';
import { useState } from 'react';
import { RiziaLogo } from './RiziaLogo';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  user?: any;
  onLogout?: () => void;
  showAuth?: boolean;
  selectedCity?: string | null;
  onChangeCity?: () => void;
}

export function Header({ user, onLogout, showAuth = true, selectedCity, onChangeCity }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-sm backdrop-blur-xl bg-white/80 dark:bg-gray-800/80">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Location */}
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:opacity-90 transition-opacity">
              <RiziaLogo size="md" />
            </Link>

            {/* Location Selector */}
            {selectedCity && onChangeCity && (
              <button
                onClick={onChangeCity}
                className="hidden md:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/50 dark:to-purple-950/50 hover:from-pink-100 hover:to-purple-100 dark:hover:from-pink-950 dark:hover:to-purple-950 rounded-lg transition-colors border border-purple-200 dark:border-purple-800"
              >
                <MapPin size={16} className="text-purple-600 dark:text-purple-400" />
                <span className="text-sm text-gray-900 dark:text-white">{selectedCity}</span>
                <ChevronDown size={14} className="text-gray-500 dark:text-gray-400" />
              </button>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/competitions" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Competitions
            </Link>
            {user && (
              <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Dashboard
              </Link>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {showAuth && (
              <>
                {user ? (
                  <div className="hidden md:flex items-center gap-3">
                    <Link to="/dashboard" className="text-gray-900 dark:text-white">
                      {user.name}
                    </Link>
                    {onLogout && (
                      <button
                        onClick={onLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-lg hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all shadow-lg"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="hidden md:flex items-center gap-3">
                    <Link
                      to="/login"
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-6 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-lg hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all shadow-lg"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <nav className="flex flex-col gap-3">
              {/* Theme Toggle for Mobile */}
              <div className="px-4 py-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Theme</p>
                <ThemeToggle />
              </div>

              <Link
                to="/competitions"
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Competitions
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              
              {showAuth && (
                <>
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-gray-900 dark:text-white">
                        {user.name}
                      </div>
                      {onLogout && (
                        <button
                          onClick={() => {
                            onLogout();
                            setMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-lg hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all"
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-lg hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all text-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}