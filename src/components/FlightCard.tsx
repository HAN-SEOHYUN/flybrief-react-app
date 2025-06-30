// ✅ src/components/FlightCard.tsx
import { type Flight } from "../types/flight";

export const FlightCard = ({ flight }: { flight: Flight }) => {
  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="font-semibold text-lg">{flight.airline} {flight.flightNumber}</h2>
      <p>Departure: {flight.departure}</p>
      <p>Arrival: {flight.arrival}</p>
    </div>
  );
};