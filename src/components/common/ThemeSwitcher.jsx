import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPalette } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import useSoundFx from '../../hooks/useSoundFx';

const ThemeSwitcher = () => {
  const { currentTheme, changeTheme, themes } = useTheme();
  const { handleClick, handleHover } = useSoundFx();
  const [isOpen, setIsOpen] = useState(false);

  const themeColors = [
    { key: 'cyan', color: '#00f5ff' },
    { key: 'purple', color: '#a855f7' },
    { key: 'green', color: '#10b981' },
    { key: 'orange', color: '#f97316' },
  ];

  return (
    <div className="relative">
      <motion.button
        onClick={() => {
          handleClick();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={handleHover}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 rounded-lg glass-card hover:bg-glass-medium transition-all duration-300"
        title="Change theme color"
      >
        <FaPalette className="text-neon-cyan text-lg" style={{ color: `var(--primary-color)` }} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="absolute top-full right-0 mt-2 glass-card p-3 rounded-lg z-50"
            >
              <div className="flex gap-3">
                {themeColors.map((theme) => (
                  <motion.button
                    key={theme.key}
                    onClick={() => {
                      handleClick();
                      changeTheme(theme.key);
                      setIsOpen(false);
                    }}
                    onMouseEnter={handleHover}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                      currentTheme === theme.key
                        ? 'border-white scale-110 ring-2 ring-offset-2 ring-offset-dark-bg'
                        : 'border-white/30 hover:border-white/60'
                    }`}
                    style={{
                      backgroundColor: theme.color,
                      ringColor: theme.color,
                    }}
                    title={themes[theme.key].name}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;

