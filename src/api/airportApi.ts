export type AirportSuggestion = {
  id: number;
  iataCode: string;
  airportNameEn: string;
  airportNameKr: string;
};

export async function fetchAirportSuggestions(keyword: string): Promise<AirportSuggestion[]> {
  const response = await fetch(`http://98.83.105.239:8080/api/airports/search?keyword=${encodeURIComponent(keyword)}`);
  if (!response.ok) {
    throw new Error("Failed to fetch airport suggestions");
  }

  const result = await response.json();

  if (result.status !== "OK") {
    throw new Error(result.message || "API returned an error");
  }

  return result.data;
}
