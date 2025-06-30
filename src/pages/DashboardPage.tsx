import { useFlightContext } from "../context/FlightContext";
import { FlightCard } from "../components/FlightCard";
import { FlightSearchForm } from "../components/FlightSearchForm";
import styled from "styled-components";

const PageWrapper = styled.div`
`;

const FlightGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export const DashboardPage = () => {
  const { flights } = useFlightContext();

  return (
    <PageWrapper>
      <FlightSearchForm />
      <FlightGrid>
        {flights.map((flight, index) => (
          <FlightCard key={index} flight={flight} />
        ))}
      </FlightGrid>
    </PageWrapper>
  );
};