import type { Flight } from "../types/flight";

export const FlightCard = ({ flight }: { flight: Flight }) => {
  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="font-semibold text-lg">{flight.airlineCodeIata}</h2>
      <p>Departure: {flight.departureAirportIataCode} @ {flight.scheduledDepartureTime}</p>
      <p>Arrival: {flight.arrivalAirportIataCode} @ {flight.scheduledArrivalTime}</p>
      <p>Aircraft: {flight.aircraftType}</p>
      <p>Duration: {flight.flightDuration}</p>
    </div>
  );
};