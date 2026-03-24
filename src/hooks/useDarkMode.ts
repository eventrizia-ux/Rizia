import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useDarkMode() {
  const [theme, setTheme] = useState<Theme>('system');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Get system preference
  const getSystemPreference = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // Calculate effective dark mode based on theme setting
  const calculateDarkMode = (currentTheme: Theme) => {
    if (currentTheme === 'system') {
      return getSystemPreference();
    }
    return currentTheme === 'dark';
  };

  useEffect(() => {
    // Check for saved preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
      setTheme(savedTheme);
      setIsDarkMode(calculateDarkMode(savedTheme));
    } else {
      // Default to system preference
      setTheme('system');
      setIsDarkMode(getSystemPreference());
    }
  }, []);

  useEffect(() => {
    // Listen for system theme changes only if theme is set to 'system'
    if (theme !== 'system') return;

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    darkModeMediaQuery.addEventListener('change', handleChange);
    
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  useEffect(() => {
    // Apply dark class to html element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    setIsDarkMode(calculateDarkMode(newTheme));
  };

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setThemeMode(newTheme);
  };

  return { 
    isDarkMode, 
    theme,
    toggleDarkMode,
    setThemeMode
  };
}
