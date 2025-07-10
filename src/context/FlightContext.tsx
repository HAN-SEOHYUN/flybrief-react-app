import { createContext, useContext, useState } from "react";
import type { Flight } from "../types/flight";

interface FlightContextType {
  flights: Flight[];
  setFlights: React.Dispatch<React.SetStateAction<Flight[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  to: string;
  setTo: React.Dispatch<React.SetStateAction<string>>;
}

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export const FlightProvider = ({ children }: { children: React.ReactNode }) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [to, setTo] = useState<string>("BNE");

  return (
    <FlightContext.Provider value={{ flights, setFlights, isLoading, setIsLoading, to, setTo }}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlightContext = () => {
  const context = useContext(FlightContext);
  if (!context) throw new Error("useFlightContext must be used within FlightProvider");
  return context;
};
