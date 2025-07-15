export const fetchTravelRecommendations = async (travelTheme: string): Promise<any> => {
  const params = new URLSearchParams({ travelTheme });
  const response = await fetch(`http://98.83.105.239:8080/api/agent/recommendations?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch travel recommendations");
  return await response.json();
};
