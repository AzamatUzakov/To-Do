import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";
import type { AppLanguage } from "./resources";

const STORAGE_KEY = "app_language";

const savedLanguage = localStorage.getItem(STORAGE_KEY) as AppLanguage | null;

const initialLanguage: AppLanguage = savedLanguage ?? "ru";

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export const changeLanguage = (lng: AppLanguage) => {
  i18n.changeLanguage(lng);
  localStorage.setItem(STORAGE_KEY, lng);
};

export default i18n;
