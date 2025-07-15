const BASE_URL = import.meta.env.VITE_BASE_URL;
import type { Flight } from "../types/flight";

export const fetchFlights = async (
  origin: string,
  destination: string,
  startDate: string,
  endDate: string
): Promise<Flight[]> => {
  const params = new URLSearchParams({ origin, destination, startDate, endDate });
  const response = await fetch(`${BASE_URL}/flights/schedules?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch flights");
  const result = await response.json();
  return result.data;
};