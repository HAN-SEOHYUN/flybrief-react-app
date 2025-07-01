import { useFlightContext } from "../context/FlightContext";
import styled from "styled-components";
import { FlightCard } from "./FlightCard";
import { SkeletonFlightCard } from "./SkeletonFlightCard";

const Wrapper = styled.div`
  margin-top: 1rem;
  max-width: 840px;
  margin-left: auto;
  margin-right: auto;
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
