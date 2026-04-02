import React, { createContext, useContext } from "react";

export type Locale = "en" | "zh";

interface LocaleContextValue {
  locale: Locale;
  setLocale: React.Dispatch<React.SetStateAction<Locale>>;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
  locale: Locale;
  setLocale: React.Dispatch<React.SetStateAction<Locale>>;
}

export function LocaleProvider({ children, locale, setLocale }: ProviderProps) {
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }

  return context;
}
