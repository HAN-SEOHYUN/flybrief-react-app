// src/components/WeatherForecast.tsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchWeatherForecast } from "../api/weatherApi";

export type WeatherData = {
  dateTime: string;
  tempMax: number;
  tempMin: number;
  icon: string;
  humidity: number;
};

const Container = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem;
`;

const Card = styled.div`
  flex: 0 0 auto;
  width: 120px;
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  color: #212529;
`;

const WeatherIcon = styled.i`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Temp = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
`;

const Label = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

function getDayLabel(dateStr: string, index: number) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(dateStr);
  return index === 0 ? "Today" : days[date.getDay()];
}

function getWeatherIconClass(icon: string): string {
  const iconMap: Record<string, string> = {
    rain: "wi wi-rain",
    "partly-cloudy-day": "wi wi-day-cloudy",
    "clear-day": "wi wi-day-sunny",
    "day-cloudy": "wi wi-day-cloudy",
    "day-sunny": "wi wi-day-sunny"
  };
  return iconMap[icon] || "wi wi-na";
}

export const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherForecast("YVR", "2025-06-26", "2025-07-02");
        setWeatherData(data);
      } catch (error) {
        console.error("날씨 정보 요청 실패:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      {weatherData.map((day, index) => (
        <Card key={day.dateTime}>
          <WeatherIcon className={getWeatherIconClass(day.icon)} />
          <Label>{getDayLabel(day.dateTime, index)}</Label>
          <Temp>{day.tempMax}°C / {day.tempMin}°C</Temp>
          <Label>Humidity: {day.humidity}%</Label>
        </Card>
      ))}
    </Container>
  );
};
