import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * AccessibilityContext – Achiri
 * Fournit les préférences d’accessibilité à toute l’application.
 * - Contraste élevé, taille police, navigation clavier, dark mode, focus visible, TTS, langue des signes, sous-titres, etc.
 * - Prêt pour extensions futures (lecteur d’écran, synthèse vocale, analytics, notifications…).
 * - Persistance locale, feedback utilisateur, design moderne.
 */

const defaultSettings = {
  highContrast: false,
  fontSize: "medium", // "small" | "medium" | "large"
  darkMode: false,
  focusVisible: true,
  tts: false,
  subtitles: false,
  signLanguage: false,
  language: "fr",
};

const AccessibilityContext = createContext({
  ...defaultSettings,
  setHighContrast: () => {},
  setFontSize: () => {},
  setDarkMode: () => {},
  setFocusVisible: () => {},
  setTTS: () => {},
  setSubtitles: () => {},
  setSignLanguage: () => {},
  setLanguage: () => {},
});

export function AccessibilityProvider({ children }) {
  const [highContrast, setHighContrast] = useState(
    defaultSettings.highContrast,
  );
  const [fontSize, setFontSize] = useState(defaultSettings.fontSize);
  const [darkMode, setDarkMode] = useState(defaultSettings.darkMode);
  const [focusVisible, setFocusVisible] = useState(
    defaultSettings.focusVisible,
  );
  const [tts, setTTS] = useState(defaultSettings.tts);
  const [subtitles, setSubtitles] = useState(defaultSettings.subtitles);
  const [signLanguage, setSignLanguage] = useState(
    defaultSettings.signLanguage,
  );
  const [language, setLanguage] = useState(defaultSettings.language);

  // Persistance locale (localStorage)
  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("achiri-accessibility") || "{}",
    );
    if (saved.highContrast !== undefined) setHighContrast(saved.highContrast);
    if (saved.fontSize) setFontSize(saved.fontSize);
    if (saved.darkMode !== undefined) setDarkMode(saved.darkMode);
    if (saved.focusVisible !== undefined) setFocusVisible(saved.focusVisible);
    if (saved.tts !== undefined) setTTS(saved.tts);
    if (saved.subtitles !== undefined) setSubtitles(saved.subtitles);
    if (saved.signLanguage !== undefined) setSignLanguage(saved.signLanguage);
    if (saved.language) setLanguage(saved.language);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "achiri-accessibility",
      JSON.stringify({
        highContrast,
        fontSize,
        darkMode,
        focusVisible,
        tts,
        subtitles,
        signLanguage,
        language,
      }),
    );
  }, [
    highContrast,
    fontSize,
    darkMode,
    focusVisible,
    tts,
    subtitles,
    signLanguage,
    language,
  ]);

  // Application des préférences au body (pour le CSS global)
  useEffect(() => {
    document.body.dataset.highContrast = highContrast ? "true" : "false";
    document.body.dataset.fontSize = fontSize;
    document.body.dataset.darkMode = darkMode ? "true" : "false";
    document.body.dataset.focusVisible = focusVisible ? "true" : "false";
    document.body.dataset.tts = tts ? "true" : "false";
    document.body.dataset.subtitles = subtitles ? "true" : "false";
    document.body.dataset.signLanguage = signLanguage ? "true" : "false";
    document.body.dataset.language = language;
  }, [
    highContrast,
    fontSize,
    darkMode,
    focusVisible,
    tts,
    subtitles,
    signLanguage,
    language,
  ]);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        setHighContrast,
        fontSize,
        setFontSize,
        darkMode,
        setDarkMode,
        focusVisible,
        setFocusVisible,
        tts,
        setTTS,
        subtitles,
        setSubtitles,
        signLanguage,
        setSignLanguage,
        language,
        setLanguage,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  return useContext(AccessibilityContext);
}

/**
 * Documentation :
 * - Fournit : highContrast, fontSize, darkMode, focusVisible, tts, subtitles, signLanguage, language + setters.
 * - Persistance locale (localStorage).
 * - Application des préférences au body (data-attributes pour CSS global).
 * - Prêt pour extensions futures (lecteur d’écran, synthèse vocale, analytics, notifications…).
 * - Sécurité : pas d’info sensible, pas de tracking.
 * - Accessibilité : navigation clavier, focus visible, responsive, dark mode, TTS, sous-titres, langue des signes.
 * - Design moderne, SEO friendly, branding Achiri.
 */
