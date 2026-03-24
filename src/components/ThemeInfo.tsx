import { Sun, Moon, Monitor, Info } from 'lucide-react';

export function ThemeInfo() {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800 rounded-2xl p-6 mb-8">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
          <Info className="text-purple-600 dark:text-purple-400" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-gray-900 dark:text-white mb-2">Theme Preferences</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Rizia automatically adapts to your system theme. You can also manually choose your preferred theme:
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <Sun size={16} className="text-amber-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Light - Bright and clear</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <Moon size={16} className="text-indigo-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Dark - Easy on the eyes</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <Monitor size={16} className="text-purple-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">System - Follows your OS settings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
