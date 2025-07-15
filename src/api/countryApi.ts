export type CountryInfo = {
  iso3: string;
  iso2: string;
  countryNameKo: string;
  countryNameEn: string;
  attention: string | null;
  attentionPartial: string | null;
  attentionNote: string | null;
  control: string | null;
  controlPartial: string | null;
  controlNote: string | null;
  limita: string | null;
  limitaPartial: string | null;
  limitaNote: string | null;
  banYna: string | null;
  banYnPartial: string | null;
  banNote: string | null;
  wrtDt: string;
  capital: string;
  population: string;
  populationDesc: string | null;
  areaKm2: string;
  areaDesc: string | null;
  language: string | null;
  religion: string | null;
  ethnicity: string | null;
  climate: string | null;
  independence: string | null;
};

export async function fetchCountryInfo(iso3: string): Promise<CountryInfo> {
  const response = await fetch(`http://98.83.105.239:8080/api/country/info?iataCode=${encodeURIComponent(iso3)}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch country info");
  }

  const result = await response.json();

  if (result.status !== "OK") {
    throw new Error(result.message || "API returned an error");
  }

  return result.data as CountryInfo;
}

export async function fetchCountryAccidentNews(iataCode: string): Promise<string> {
  const response = await fetch(
    `http://98.83.105.239:8080/api/country/news?iataCode=${encodeURIComponent(iataCode)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch country accident news");
  }

  const result = await response.json();

  if (result.status !== "OK") {
    throw new Error(result.message || "API returned an error");
  }

  return result.data as string;
}