import { useEffect } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FaHome,
  FaUser,
  FaCode,
  FaBriefcase,
  FaFolderOpen,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaLanguage,
  FaVolumeUp,
  FaCopy,
} from 'react-icons/fa';
import useSoundFx from '../../hooks/useSoundFx';
import { socialLinks } from '../../data/portfolioData';

const CommandPalette = ({ open, setOpen }) => {
  const { t, i18n } = useTranslation();
  const { isMuted, toggleMute, handleClick } = useSoundFx();
  const isRTL = i18n.language === 'fa';

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', down);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', down);
        document.body.style.overflow = 'unset';
      };
    }
  }, [open, setOpen]);

  const handleSelect = (action) => {
    handleClick();
    switch (action.type) {
      case 'navigate':
        const element = document.querySelector(action.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setOpen(false);
        break;
      case 'language':
        const newLang = i18n.language === 'en' ? 'fa' : 'en';
        i18n.changeLanguage(newLang);
        setOpen(false);
        break;
      case 'mute':
        toggleMute();
        setOpen(false);
        break;
      case 'copy':
        navigator.clipboard.writeText(action.value);
        setOpen(false);
        break;
      case 'link':
        window.open(action.href, '_blank');
        setOpen(false);
        break;
      default:
        setOpen(false);
    }
  };

  const commands = [
    {
      id: 'home',
      name: t('nav.home'),
      icon: FaHome,
      type: 'navigate',
      href: '#home',
    },
    {
      id: 'about',
      name: t('nav.about'),
      icon: FaUser,
      type: 'navigate',
      href: '#about',
    },
    {
      id: 'skills',
      name: t('nav.skills'),
      icon: FaCode,
      type: 'navigate',
      href: '#skills',
    },
    {
      id: 'experience',
      name: t('nav.experience'),
      icon: FaBriefcase,
      type: 'navigate',
      href: '#experience',
    },
    {
      id: 'projects',
      name: t('nav.projects'),
      icon: FaFolderOpen,
      type: 'navigate',
      href: '#projects',
    },
    {
      id: 'contact',
      name: t('nav.contact'),
      icon: FaEnvelope,
      type: 'navigate',
      href: '#contact',
    },
    {
      id: 'github',
      name: 'Open GitHub',
      icon: FaGithub,
      type: 'link',
      href: socialLinks.github,
    },
    {
      id: 'linkedin',
      name: 'Open LinkedIn',
      icon: FaLinkedin,
      type: 'link',
      href: socialLinks.linkedin,
    },
    {
      id: 'language',
      name: `Switch to ${i18n.language === 'en' ? 'Persian' : 'English'}`,
      icon: FaLanguage,
      type: 'language',
    },
    {
      id: 'mute',
      name: isMuted ? 'Unmute Sounds' : 'Mute Sounds',
      icon: FaVolumeUp,
      type: 'mute',
    },
    {
      id: 'copy-email',
      name: 'Copy Email',
      icon: FaCopy,
      type: 'copy',
      value: socialLinks.email.replace('mailto:', ''),
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-[90%] md:w-[600px] max-w-2xl"
          >
            <Command className="bg-[#16161e]/90 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              {/* Input Header */}
              <div className="border-b border-white/10 px-4 py-3">
                <Command.Input
                  placeholder={isRTL ? 'جستجو یا تایپ کنید...' : 'Type a command or search...'}
                  className={`w-full bg-transparent border-none outline-none text-white placeholder-gray-400 text-sm ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                  autoFocus
                />
              </div>

              {/* Command List */}
              <Command.List className="max-h-96 overflow-y-auto p-2 scrollbar-hide">
                <Command.Empty
                  className={`py-8 text-center text-gray-400 text-sm ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                >
                  {isRTL ? 'نتیجه‌ای یافت نشد.' : 'No results found.'}
                </Command.Empty>
                {commands.map((cmd) => {
                  const IconComponent = cmd.icon;
                  return (
                    <Command.Item
                      key={cmd.id}
                      onSelect={() => handleSelect(cmd)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/5 transition-colors duration-200 text-gray-300 hover:text-white ${
                        isRTL ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <IconComponent className="text-neon-cyan flex-shrink-0" />
                      <span className={isRTL ? 'text-right' : 'text-left'}>
                        {cmd.name}
                      </span>
                    </Command.Item>
                  );
                })}
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
