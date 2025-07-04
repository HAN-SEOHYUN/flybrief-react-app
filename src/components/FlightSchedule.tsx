import { useFlightContext } from "../context/FlightContext";
import styled from "styled-components";
import { FlightCard } from "./FlightCard";
import { SkeletonFlightCard } from "./SkeletonFlightCard";

const Wrapper = styled.section`
  margin-top: 2rem;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #212529;
  position: relative;
  z-index: 1;
`;

const ListContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FlightSchedule = () => {
  const { flights, isLoading } = useFlightContext();

  return (
    <Wrapper>
      <ListContainer>
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonFlightCard key={idx} />
            ))
          : flights.map((flight, idx) => (
              <FlightCard key={idx} flight={flight} />
            ))}
      </ListContainer>
    </Wrapper>
  );
};
