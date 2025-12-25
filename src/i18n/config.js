import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import faTranslations from './locales/fa.json';

// Get saved language from localStorage or default to 'en'
const getSavedLanguage = () => {
  try {
    const saved = localStorage.getItem('portfolio-language');
    if (saved && (saved === 'en' || saved === 'fa')) {
      return saved;
    }
  } catch (error) {
    console.warn('Failed to read language from localStorage:', error);
  }
  return 'en';
};

const savedLanguage = getSavedLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      fa: {
        translation: faTranslations,
      },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Update document direction when language changes
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === 'fa' ? 'rtl' : 'ltr';
  document.body.dir = lng === 'fa' ? 'rtl' : 'ltr';
  
  // Save to localStorage
  try {
    localStorage.setItem('portfolio-language', lng);
  } catch (error) {
    console.warn('Failed to save language to localStorage:', error);
  }
});

// Set initial direction
document.documentElement.dir = savedLanguage === 'fa' ? 'rtl' : 'ltr';
document.body.dir = savedLanguage === 'fa' ? 'rtl' : 'ltr';

export default i18n;

