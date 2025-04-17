import React from "react";
import { Moon, Sun, Type, Globe, Bell, Shield, Eye } from "lucide-react";
import { useSettings } from "../contexts/SettingsContext";

const Settings: React.FC = () => {
  const { settings, updateSetting } = useSettings();

  return (
    <div className="space-y-8">
      {/* Theme Settings */}
      <div
        className="rounded-xl shadow-sm p-6"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--text)",
        }}
      >
        <h2 className="text-xl font-semibold mb-6">Display Settings</h2>
        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {settings.theme === "dark" ? (
                <Moon className="h-5 w-5" style={{ color: "var(--primary)" }} />
              ) : (
                <Sun className="h-5 w-5" style={{ color: "var(--primary)" }} />
              )}
              <div>
                <label className="text-sm font-medium">Theme</label>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Choose your preferred theme
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                updateSetting(
                  "theme",
                  settings.theme === "light" ? "dark" : "light"
                )
              }
              style={{
                backgroundColor:
                  settings.theme === "dark"
                    ? "var(--primary)"
                    : "var(--border)",
              }}
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
              role="switch"
              aria-checked={settings.theme === "dark"}
            >
              <span
                style={{
                  transform:
                    settings.theme === "dark"
                      ? "translateX(1.25rem)"
                      : "translateX(0)",
                }}
                className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              />
            </button>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Eye className="h-5 w-5" style={{ color: "var(--primary)" }} />
              <div>
                <label className="text-sm font-medium">High Contrast</label>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Increase visual contrast for better readability
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                updateSetting("highContrast", !settings.highContrast)
              }
              style={{
                backgroundColor: settings.highContrast
                  ? "var(--primary)"
                  : "var(--border)",
              }}
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
              role="switch"
              aria-checked={settings.highContrast}
            >
              <span
                style={{
                  transform: settings.highContrast
                    ? "translateX(1.25rem)"
                    : "translateX(0)",
                }}
                className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              />
            </button>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Type className="h-5 w-5" style={{ color: "var(--primary)" }} />
              <label className="text-sm font-medium">Font Size</label>
            </div>
            <select
              value={settings.fontSize}
              onChange={(e) =>
                updateSetting(
                  "fontSize",
                  e.target.value as "small" | "medium" | "large"
                )
              }
              style={{
                backgroundColor: "var(--background)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
              className="mt-1 block w-full rounded-md py-2 pl-3 pr-10 text-base focus:outline-none sm:text-sm"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>

      {/* Accessibility Settings */}
      <div
        className="rounded-xl shadow-sm p-6"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--text)",
        }}
      >
        <h2 className="text-xl font-semibold mb-6">Accessibility</h2>
        <div className="space-y-6">
          {/* Screen Reader */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5" style={{ color: "var(--primary)" }} />
              <div>
                <label className="text-sm font-medium">
                  Screen Reader Optimization
                </label>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Optimize interface for screen readers
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                updateSetting("screenReader", !settings.screenReader)
              }
              style={{
                backgroundColor: settings.screenReader
                  ? "var(--primary)"
                  : "var(--border)",
              }}
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
              role="switch"
              aria-checked={settings.screenReader}
            >
              <span
                style={{
                  transform: settings.screenReader
                    ? "translateX(1.25rem)"
                    : "translateX(0)",
                }}
                className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              />
            </button>
          </div>

          {/* Reduce Motion */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5" style={{ color: "var(--primary)" }} />
              <div>
                <label className="text-sm font-medium">Reduce Motion</label>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Minimize animations and transitions
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                updateSetting("reduceMotion", !settings.reduceMotion)
              }
              style={{
                backgroundColor: settings.reduceMotion
                  ? "var(--primary)"
                  : "var(--border)",
              }}
              className="relative inline-flex h-6 w-11 flex-shrink-0  cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
              role="switch"
              aria-checked={settings.reduceMotion}
            >
              <span
                style={{
                  transform: settings.reduceMotion
                    ? "translateX(1.25rem)"
                    : "translateX(0)",
                }}
                className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
