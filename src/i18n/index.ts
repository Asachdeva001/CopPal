import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './translations/en.json';
import hi from './translations/hi.json';
import mr from './translations/mr.json';
import gu from './translations/gu.json';
import pa from './translations/pa.json';

const resources = {
  en: {
    translation: en,
  },
  hi: {
    translation: hi,
  },
  mr: {
    translation: mr,
  },
  gu: {
    translation: gu,
  },
  pa: {
    translation: pa,
  },
};

// Get device language safely
const getDeviceLanguage = () => {
  try {
    return Localization.locale?.split('-')[0] || 'en';
  } catch (error) {
    console.warn('Error getting device language:', error);
    return 'en';
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3',
  });

export default i18n; 