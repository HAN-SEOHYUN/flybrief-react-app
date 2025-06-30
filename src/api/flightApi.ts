import type { Flight } from "../types/flight";

export const fetchFlights = async () => {
  const response = await fetch("https://api.example.com/flights");
  if (!response.ok) throw new Error("Failed to fetch flights");
  const data = await response.json();
  return data as Flight[];
};