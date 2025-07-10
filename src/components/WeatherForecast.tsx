import { useEffect, useState } from "react";
import styled from "styled-components";
import { useFlightContext } from "../context/FlightContext";
import { fetchWeatherForecast } from "../api/weatherApi";
import { SkeletonWeatherForecast } from "./SkeletonWeatherForecast";

export type WeatherData = {
  dateTime: string;
  tempMax: number;
  tempMin: number;
  icon: string;
  humidity: number;
  description: string;
};

const Wrapper = styled.section`
  margin-top: 0;
  padding: 1.5rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #212529;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  height: 1.8rem;
  text-align: center;
  margin-bottom: 1.25rem;
  position: relative;
`;

const Title = styled.h2<{ $visible: boolean }>`
  font-size: 1.4rem;
  font-weight: bold;
  color: #212529;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  transition: opacity 0.3s ease;
`;

const DescriptionText = styled.p<{ $visible: boolean }>`
  font-size: 0.9rem;
  color: #212529;
  font-weight: 500;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  transition: opacity 0.3s ease;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.75rem;
  padding: 1rem 0;
  flex: 1;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 0.5rem;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 20px 0 20px 0;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  color: #212529;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: background 0.3s ease;
  position: relative;
  width: 100%;
  min-width: 0;
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
  color: #495057;
`;

const DateText = styled.div`
  font-size: 0.75rem;
  color: #868e96;
  margin-bottom: 0.25rem;
`;

function getDayLabel(dateStr: string, index: number) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(dateStr);
  return index === 0 ? "Today" : days[date.getDay()];
}

function getWeatherIconClass(icon: string): string {
  const iconMap: Record<string, string> = {
    "rain": "wi wi-rain",
    "cloudy": "wi wi-cloud",
    "partly-cloudy-day": "wi wi-day-cloudy",
    "clear-day": "wi wi-day-sunny",
    "day-cloudy": "wi wi-day-cloudy",
    "day-sunny": "wi wi-day-sunny"
  };
  return iconMap[icon] || "wi wi-na";
}

export const WeatherForecast = () => {
  const { flights, isLoading: isFlightLoading } = useFlightContext();
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [hoveredDesc, setHoveredDesc] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getEndDate = (start: string): string => {
    const date = new Date(start);
    date.setDate(date.getDate() + 6);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    const iataCode = flights?.[0]?.arrivalAirportIataCode;
    const startDate = flights?.[0]?.scheduledDepartureDate;

    if (!iataCode || !startDate) {
      setIsLoading(false);
      return;
    }
    const endDate = getEndDate(startDate);

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchWeatherForecast(iataCode, startDate, endDate);
        setWeatherData(data);
      } catch (error) {
        console.error("날씨 정보 요청 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [flights]);

  if (isFlightLoading) return <SkeletonWeatherForecast />;
  if (!flights || flights.length === 0) return null;
  if (isLoading) return <SkeletonWeatherForecast />;

  if (weatherData.length === 0) return null;

  return (
    <Wrapper>
      <TitleWrapper>
        <Title $visible={!hoveredDesc}>7-Day Weather Forecast</Title>
        <DescriptionText $visible={!!hoveredDesc}>{hoveredDesc}</DescriptionText>
      </TitleWrapper>

      <Container>
        {weatherData.map((day, index) => (
          <Card
            key={day.dateTime}
            onMouseEnter={() => setHoveredDesc(day.description)}
            onMouseLeave={() => setHoveredDesc("")}
          >
            <WeatherIcon className={getWeatherIconClass(day.icon)} />
            <Label>{getDayLabel(day.dateTime, index)}</Label>
            <DateText>{day.dateTime}</DateText>
            <Temp>
              {day.tempMax}°C / {day.tempMin}°C
            </Temp>
            <Label>Humidity: {day.humidity}%</Label>
          </Card>
        ))}
      </Container>
    </Wrapper>
  );
};
