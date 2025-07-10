import { useFlightContext } from "../context/FlightContext";
import styled from "styled-components";
import { FlightCard } from "./FlightCard";
import { SkeletonFlightCard } from "./SkeletonFlightCard";

const Wrapper = styled.section`
  margin-top: 0;
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
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #212529;
`;

const TitleSkeleton = styled.div`
  height: 1.4rem;
  width: 150px;
  margin: 0 auto 1.5rem;
  border-radius: 6px;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200px 100%;
  animation: shine 1.2s infinite linear;
  
  @keyframes shine {
    0% { background-position: -200px 0; }
    100% { background-position: calc(200px + 100%) 0; }
  }
`;

const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FlightSchedule = () => {
  const { flights, isLoading } = useFlightContext();

  if (!flights || flights.length === 0) return null;

  return (
    <Wrapper>
      {isLoading ? <TitleSkeleton /> : <Title>✈️ 항공편 여정</Title>}
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
