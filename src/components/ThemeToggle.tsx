import { Sun, Moon, Monitor } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

export function ThemeToggle() {
  const { theme, setThemeMode } = useDarkMode();

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'System' }
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setThemeMode(value)}
          className={`p-2 rounded-lg transition-all ${
            theme === value
              ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          title={label}
        >
          <Icon size={18} />
        </button>
      ))}
    </div>
  );
}
