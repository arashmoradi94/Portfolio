import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-glass-medium">
      <div className="container mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-400 text-sm"
        >
          © {new Date().getFullYear()} Arash. {t('footer.rights')}
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;

