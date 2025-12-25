import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaVolumeUp, FaVolumeMute, FaSearch } from 'react-icons/fa';
import useSoundFx from '../../hooks/useSoundFx';
import ThemeSwitcher from '../common/ThemeSwitcher';
import MagneticWrapper from '../common/MagneticWrapper';
import { useCursor } from '../../contexts/CursorContext';

const Navbar = ({ onSearchClick }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isMuted, toggleMute, handleClick, handleHover } = useSoundFx();
  const { setVariant } = useCursor();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onSearchClick();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSearchClick]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    handleClick();
    const newLang = i18n.language === 'en' ? 'fa' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'experience', href: '#experience' },
    { key: 'projects', href: '#projects' },
    { key: 'contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-card py-3' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold gradient-text"
          >
            A
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <MagneticWrapper key={link.key} strength={0.2}>
                <motion.a
                  href={link.href}
                  onClick={handleClick}
                  onMouseEnter={() => setVariant('link')}
                  onMouseLeave={() => setVariant('default')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors duration-300"
                >
                  {t(`nav.${link.key}`)}
                </motion.a>
              </MagneticWrapper>
            ))}
          </div>

          {/* Language Toggle, Theme Switcher, Mute Toggle, Search & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <MagneticWrapper strength={0.2}>
              <motion.button
                onClick={() => {
                  handleClick();
                  onSearchClick();
                }}
                onMouseEnter={() => {
                  handleHover();
                  setVariant('link');
                }}
                onMouseLeave={() => setVariant('default')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg glass-card hover:bg-glass-medium transition-all duration-300"
                title="Search (Cmd+K / Ctrl+K)"
              >
                <FaSearch className="text-lg" style={{ color: `var(--primary-color)` }} />
              </motion.button>
            </MagneticWrapper>

            <MagneticWrapper strength={0.2}>
              <ThemeSwitcher />
            </MagneticWrapper>

            <MagneticWrapper strength={0.2}>
              <motion.button
                onClick={toggleMute}
                onMouseEnter={() => setVariant('link')}
                onMouseLeave={() => setVariant('default')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg glass-card hover:bg-glass-medium transition-all duration-300"
                title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
              >
                {isMuted ? (
                  <FaVolumeMute className="text-gray-300 text-lg" />
                ) : (
                  <FaVolumeUp className="text-lg" style={{ color: `var(--primary-color)` }} />
                )}
              </motion.button>
            </MagneticWrapper>

            <MagneticWrapper strength={0.2}>
              <motion.button
                onClick={toggleLanguage}
                onMouseEnter={() => setVariant('link')}
                onMouseLeave={() => setVariant('default')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg glass-card text-sm font-medium hover:bg-glass-medium transition-all duration-300"
              >
                {i18n.language === 'en' ? 'FA' : 'EN'}
              </motion.button>
            </MagneticWrapper>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                handleClick();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="md:hidden text-neon-cyan p-2"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 glass-card p-4 rounded-lg"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.key}
                href={link.href}
                onClick={() => {
                  handleClick();
                  setIsMenuOpen(false);
                }}
                onMouseEnter={() => setVariant('link')}
                onMouseLeave={() => setVariant('default')}
                whileTap={{ scale: 0.95 }}
                className="block py-2 text-gray-300 hover:text-neon-cyan transition-colors duration-300"
              >
                {t(`nav.${link.key}`)}
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;

