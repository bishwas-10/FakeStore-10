import React, { createContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: "dark" | "light";
  toggleDarkMode: (theme: "dark" | "light") => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: localStorage.getItem("ThemeMode") as "light" | "dark",
  toggleDarkMode: () => {},
});
export const ThemeModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State to manage the current theme
  const [theme, setTheme] = useState<"dark" | "light">(
    localStorage.getItem("ThemeMode") as "light" | "dark"
  );

  // Function to toggle between light and dark themes
  const toggleDarkMode = (theme: "dark" | "light") => {
    setTheme(theme);
    localStorage.setItem("ThemeMode", theme);
  };
  useEffect(() => {
    const theme = localStorage.getItem("ThemeMode");
    if (!theme) {
      localStorage.setItem("ThemeMode", "light");
    } else {
      setTheme(theme as "light" | "dark");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return React.useContext(ThemeContext);
}
