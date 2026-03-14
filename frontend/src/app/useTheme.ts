import { useState, useEffect } from "react";

type Theme = "dark" | "light" | "system";

const STORAGE_KEY = "task-theme";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [isMounted, setIsMounted] = useState(false);

  const isDark =
    theme === "dark" ||
    (theme === "system" && typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const setTheme = (t: Theme) => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, t);
    }
    setThemeState(t);
  };

  useEffect(() => {
    setIsMounted(true);
    // Load theme from localStorage after mount
    if (typeof window !== "undefined" && window.localStorage) {
      const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme;
      if (savedTheme && ["dark", "light", "system"].includes(savedTheme)) {
        setThemeState(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    if (!isMounted || theme !== "system") return;
    
    if (typeof window === "undefined" || !window.matchMedia) return;
    
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setThemeState("system"); // re-render
    
    try {
      mq.addEventListener("change", handler);
      return () => {
        try {
          mq.removeEventListener("change", handler);
        } catch (e) {
          // Ignore cleanup errors
        }
      };
    } catch (e) {
      // Fallback for older browsers
      mq.addListener(handler);
      return () => {
        try {
          mq.removeListener(handler);
        } catch (e) {
          // Ignore cleanup errors
        }
      };
    }
  }, [theme, isMounted]);

  return { theme, setTheme, isDark, isMounted };
}