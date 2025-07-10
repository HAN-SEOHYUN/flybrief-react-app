import { useFlightContext } from "../context/FlightContext";
import { FlightSearchForm } from "../components/FlightSearchForm";
import { FlightSchedule } from "../components/FlightSchedule";
import styled from "styled-components";
import { CountryInfo } from "../components/CountryInfo";
import { WeatherForecast } from "../components/WeatherForecast";
import { WeatherSummary } from "../components/WeatherSummary";
import { useState } from "react";
import { CountryAccidentNews } from "../components/CountryAccidentNews";
import { Header } from "../components/Header";

const PageWrapper = styled.div`
  padding: 1rem;
  padding-top: 5rem;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto auto;
  gap: 1rem;
  grid-template-areas:
    "search search"
    "schedule country"
    "weather weather-summary"
    "news .";
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "search"
      "schedule"
      "country"
      "weather"
      "weather-summary"
      "news";
  }
`;

const SearchSection = styled.div`
  grid-area: search;
  width: 100%;
`;

const ScheduleSection = styled.div`
  grid-area: schedule;
  width: 100%;
`;

const CountrySection = styled.div`
  grid-area: country;
  width: 100%;
`;

const WeatherSection = styled.div`
  grid-area: weather;
  width: 100%;
`;

const WeatherSummarySection = styled.div`
  grid-area: weather-summary;
  width: 100%;
`;

const NewsSection = styled.div`
  grid-area: news;
  width: 100%;
`;

export const DashboardPage = () => {
  const { flights } = useFlightContext();
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <>
      <Header />
      <PageWrapper>
        <ContentWrapper>
          <SearchSection>
            <FlightSearchForm onSearch={() => setHasSearched(true)} />
          </SearchSection>
          
          <ScheduleSection>
            <FlightSchedule />
          </ScheduleSection>
          
          <CountrySection>
            <CountryInfo />
          </CountrySection>
          
          <WeatherSection>
            <WeatherForecast />
          </WeatherSection>
          
          <WeatherSummarySection>
            {hasSearched && <WeatherSummary />}
          </WeatherSummarySection>
          
          <NewsSection>
            <CountryAccidentNews />
          </NewsSection>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
};
