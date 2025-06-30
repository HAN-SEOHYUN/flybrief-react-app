import { createContext, useContext, useEffect, useState } from "react";
import { type Flight } from "../types/flight";
import { fetchFlights } from "../api/flightApi";

interface FlightContextType {
  flights: Flight[];
  loading: boolean;
  error: string | null;
}

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export const FlightProvider = ({ children }: { children: React.ReactNode }) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFlights()
      .then(setFlights)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <FlightContext.Provider value={{ flights, loading, error }}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlightContext = () => {
  const context = useContext(FlightContext);
  if (!context) throw new Error("useFlightContext must be used within FlightProvider");
  return context;
};

