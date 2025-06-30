import { createContext, useContext, useState } from "react";
import type { Flight } from "../types/flight";

interface FlightContextType {
  flights: Flight[];
  setFlights: React.Dispatch<React.SetStateAction<Flight[]>>;
}

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export const FlightProvider = ({ children }: { children: React.ReactNode }) => {
  const [flights, setFlights] = useState<Flight[]>([]);

  return (
    <FlightContext.Provider value={{ flights, setFlights }}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlightContext = () => {
  const context = useContext(FlightContext);
  if (!context) throw new Error("useFlightContext must be used within FlightProvider");
  return context;
};
