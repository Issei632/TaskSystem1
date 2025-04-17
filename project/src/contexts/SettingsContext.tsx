import React, { createContext, useContext, useState, useEffect } from "react";

interface Settings {
  theme: "light" | "dark";
  highContrast: boolean;
  fontSize: "small" | "medium" | "large";
  language: string;
  notifications: boolean;
  reduceMotion: boolean;
  screenReader: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>({
    theme: "light",
    highContrast: false,
    fontSize: "medium",
    language: "en",
    notifications: true,
    reduceMotion: false,
    screenReader: false,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(settings));

    // Apply theme
    document.documentElement.setAttribute("data-theme", settings.theme);

    // Apply high contrast
    document.documentElement.setAttribute(
      "data-high-contrast",
      settings.highContrast.toString()
    );

    // Apply font size
    const fontSizes = {
      small: "14px",
      medium: "16px",
      large: "18px",
    };
    document.documentElement.style.fontSize = fontSizes[settings.fontSize];

    // Apply reduced motion
    if (settings.reduceMotion) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
  }, [settings]);

  const updateSetting = <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
