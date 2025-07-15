const BASE_URL = import.meta.env.VITE_BASE_URL;

export type AirportSuggestion = {
  id: number;
  iataCode: string;
  airportNameEn: string;
  airportNameKr: string;
};

export async function fetchAirportSuggestions(keyword: string): Promise<AirportSuggestion[]> {
  const response = await fetch(`${BASE_URL}/airports/search?keyword=${encodeURIComponent(keyword)}`);
  if (!response.ok) {
    throw new Error("Failed to fetch airport suggestions");
  }

  const result = await response.json();

  if (result.status !== "OK") {
    throw new Error(result.message || "API returned an error");
  }

  return result.data;
}
