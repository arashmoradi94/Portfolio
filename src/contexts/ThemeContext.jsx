import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themes = {
  cyan: {
    name: 'Cyan',
    color: '#00f5ff',
    rgb: '0, 245, 255',
    gradient: 'linear-gradient(135deg, #00f5ff 0%, #a855f7 100%)',
  },
  purple: {
    name: 'Purple',
    color: '#a855f7',
    rgb: '168, 85, 247',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
  },
  green: {
    name: 'Green',
    color: '#10b981',
    rgb: '16, 185, 129',
    gradient: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
  },
  orange: {
    name: 'Orange',
    color: '#f97316',
    rgb: '249, 115, 22',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved && themes[saved]) {
        return saved;
      }
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error);
    }
    return 'cyan'; // Default theme
  });

  useEffect(() => {
    // Update CSS variables
    const theme = themes[currentTheme];
    document.documentElement.style.setProperty('--primary-color', theme.color);
    document.documentElement.style.setProperty('--primary-color-rgb', theme.rgb);
    document.documentElement.style.setProperty('--primary-gradient', theme.gradient);
    
    // Save to localStorage
    try {
      localStorage.setItem('portfolio-theme', currentTheme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

