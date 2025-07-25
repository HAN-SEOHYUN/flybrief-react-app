const BASE_URL = import.meta.env.VITE_BASE_URL;

export type WeatherForecast = {
  dateTime: string;
  tempMax: number;
  tempMin: number;
  feelsLikeMax: number;
  feelsLikeMin: number;
  precip: number;
  description: string;
  icon: string;
  humidity: number;
  windGust: number;
  sunrise: string;
  sunset: string;
};

export async function fetchWeatherForecast(iataCode: string, startDate: string, endDate: string): Promise<WeatherForecast[]> {
  const response = await fetch(
    `${BASE_URL}/weather/forecast?iataCode=${encodeURIComponent(iataCode)}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather forecast");
  }

  const result = await response.json();

  if (result.status !== "OK") {
    throw new Error(result.message || "API returned an error");
  }

  return result.data as WeatherForecast[];
}

export async function fetchWeatherSummary(iataCode: string, startDate: string, endDate: string): Promise<string> {
  const response = await fetch(
    `${BASE_URL}/weather/summary?iataCode=${encodeURIComponent(iataCode)}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather summary");
  }

  const result = await response.json();

  if (result.status !== "OK") {
    throw new Error(result.message || "API returned an error");
  }

  return result.data as string;
}

