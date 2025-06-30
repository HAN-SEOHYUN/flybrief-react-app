import { useFlightContext } from "../context/FlightContext";
import { FlightCard } from "../components/FlightCard";

export const DashboardPage = () => {
//   const { flights, loading, error } = useFlightContext();

//   if (loading) return <p className="text-center mt-10">Loading flights...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        hello wolrd
      {/* {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))} */}
    </div>
  );
};