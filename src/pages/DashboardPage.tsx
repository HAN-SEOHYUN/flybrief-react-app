import { useFlightContext } from "../context/FlightContext";
import { FlightSearchForm } from "../components/FlightSearchForm";
import { FlightSchedule } from "../components/FlightSchedule";
import styled from "styled-components";
import { CountryInfo } from "../components/CountryInfo";
import { WeatherForecast } from "../components/WeatherForecast";
import { WeatherSummary } from "../components/WeatherSummary";
import { CountryAccidentNews } from "../components/CountryAccidentNews";
import { Header } from "../components/Header";
import { TravelRecommendation } from "../components/TravelRecommendation";
import { NoSearchResults } from "../components/NoSearchResults";

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
  grid-template-rows: auto auto auto auto auto;
  gap: 1rem;
  grid-template-areas:
    "search search"
    "no-results no-results"
    "schedule country"
    "weather weather-summary"
    "news .";
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "search"
      "no-results"
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

const NoResultsSection = styled.div`
  grid-area: no-results;
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
  const { flights, isSearched, isLoading } = useFlightContext();

  // 검색 결과가 없을 때만 NoSearchResults 표시
  const showNoResults = isSearched && !isLoading && (!flights || flights.length === 0);

  return (
    <>
      <Header />
      <PageWrapper>
        <ContentWrapper>
          <SearchSection>
            <FlightSearchForm />
            {!isSearched && <TravelRecommendation />}
          </SearchSection>
          
          {showNoResults && (
            <NoResultsSection>
              <NoSearchResults />
            </NoResultsSection>
          )}
          
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
            <WeatherSummary />
          </WeatherSummarySection>
          
          <NewsSection>
            <CountryAccidentNews />
          </NewsSection>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
};
