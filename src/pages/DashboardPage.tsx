import { useFlightContext } from "../context/FlightContext";
import { FlightSearchForm } from "../components/FlightSearchForm";
import { FlightSchedule } from "../components/FlightSchedule";
import styled from "styled-components";
import { CountryInfo } from "../components/CountryInfo";
import { WeatherForecast } from "../components/WeatherForecast";


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

  return (
    <PageWrapper>
      <ContentWrapper>
        <FlightSearchForm />
        <FlightSchedule />
        <CountryInfo/>
        <WeatherForecast/>
      </ContentWrapper>
    </PageWrapper>
  );
};
