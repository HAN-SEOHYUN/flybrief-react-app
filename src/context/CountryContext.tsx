import { createContext, useContext, useState } from "react";
import type { CountryInfo } from "../api/countryApi";

interface CountryContextType {
  countryInfo: CountryInfo | null;
  setCountryInfo: React.Dispatch<React.SetStateAction<CountryInfo | null>>;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider = ({ children }: { children: React.ReactNode }) => {
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);

  return (
    <CountryContext.Provider value={{ countryInfo, setCountryInfo }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountryContext = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountryContext must be used within CountryProvider");
  }
  return context;
};
