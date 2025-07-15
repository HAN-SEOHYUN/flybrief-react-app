const BASE_URL = import.meta.env.VITE_BASE_URL;
export const fetchTravelRecommendations = async (travelTheme: string): Promise<any> => {
  const params = new URLSearchParams({ travelTheme });
  const response = await fetch(`${BASE_URL}/agent/recommendations?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch travel recommendations");
  return await response.json();
};
