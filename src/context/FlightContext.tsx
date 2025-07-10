import { createContext, useContext, useState } from "react";
import type { Flight } from "../types/flight";

interface FlightContextType {
  flights: Flight[];
  setFlights: React.Dispatch<React.SetStateAction<Flight[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  to: string;
  setTo: React.Dispatch<React.SetStateAction<string>>;
  isSearched: boolean;
  setIsSearched: React.Dispatch<React.SetStateAction<boolean>>;
}

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export const FlightProvider = ({ children }: { children: React.ReactNode }) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [to, setTo] = useState<string>("BKK");
  const [isSearched, setIsSearched] = useState<boolean>(false);

  return (
    <FlightContext.Provider value={{ flights, setFlights, isLoading, setIsLoading, to, setTo, isSearched, setIsSearched }}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlightContext = () => {
  const context = useContext(FlightContext);
  if (!context) throw new Error("useFlightContext must be used within FlightProvider");
  return context;
};
