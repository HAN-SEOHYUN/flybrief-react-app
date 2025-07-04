import { useFlightContext } from "../context/FlightContext";
import { FlightSearchForm } from "../components/FlightSearchForm";
import { FlightSchedule } from "../components/FlightSchedule";
import styled from "styled-components";
import { CountryInfo } from "../components/CountryInfo";
import { WeatherForecast } from "../components/WeatherForecast";
import { WeatherSummary } from "../components/WeatherSummary";
import { useState } from "react";
import { CountryAccidentNews } from "../components/CountryAccidentNews";

const PageWrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 800px;
`;

export const DashboardPage = () => {
  const { flights } = useFlightContext();
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <PageWrapper>
      <ContentWrapper>
        <FlightSearchForm onSearch={() => setHasSearched(true)} />
        <FlightSchedule />
        <CountryInfo/>
        <WeatherForecast/>
        {hasSearched && <WeatherSummary/>}
        <CountryAccidentNews/>
      </ContentWrapper>
    </PageWrapper>
  );
};
