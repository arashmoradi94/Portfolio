import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTelegram, FaEnvelope, FaComment } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import useSoundFx from '../../hooks/useSoundFx';

const FloatingContact = () => {
  const { i18n } = useTranslation();
  const { handleClick, handleHover } = useSoundFx();
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      href: 'https://wa.me/1234567890', // Replace with your WhatsApp number
      color: '#25D366',
    },
    {
      name: 'Telegram',
      icon: FaTelegram,
      href: 'https://t.me/yourusername', // TODO: Replace with your Telegram username
      color: '#0088cc',
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      href: 'mailto:your.email@example.com', // TODO: Replace with your email
      color: '#00f5ff',
    },
  ];

  const isRTL = i18n.language === 'fa';

  return (
    <div
      className={`fixed bottom-8 z-40 ${
        isRTL ? 'left-8' : 'right-8'
      }`}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col-reverse gap-3 mb-3 ${
              isRTL ? 'items-start' : 'items-end'
            }`}
          >
            {contacts.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <motion.a
                  key={contact.name}
                  href={contact.href}
                  target={contact.name === 'Email' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={handleClick}
                  onMouseEnter={handleHover}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="glass-card p-3 rounded-full hover:shadow-neon-cyan transition-all duration-300"
                  style={{ color: contact.color }}
                >
                  <IconComponent className="text-2xl" />
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => {
          handleClick();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={handleHover}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="glass-card p-4 rounded-full shadow-neon-cyan hover:shadow-neon-purple transition-all duration-300"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaComment className="text-2xl text-neon-cyan" />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingContact;

