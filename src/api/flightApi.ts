import type { Flight } from "../types/flight";

export const fetchFlights = async (
  origin: string,
  destination: string,
  startDate: string,
  endDate: string
): Promise<Flight[]> => {
  const params = new URLSearchParams({ origin, destination, startDate, endDate });
  const response = await fetch(`http://localhost:8080/api/flights/schedules?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch flights");
  const result = await response.json();
  return result.data;
};