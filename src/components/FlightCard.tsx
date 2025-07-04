import type { Flight } from "../types/flight";
import styled from "styled-components";
import { SkeletonFlightCard } from "./SkeletonFlightCard";

const Card = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  gap: 1rem;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

const LogoWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const RouteLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 1rem;
  font-weight: 500;
  align-items: center;
`;

const MealLine = styled.div`
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.25rem;
`;

export const FlightCard = ({
  flight,
  isLoading = false,
}: {
  flight: Flight;
  isLoading?: boolean;
}) => {
  if (isLoading) {
    return <SkeletonFlightCard />;
  }

  return (
    <Card>
      <LogoWrapper>
        <img
          src={`https://content.airhex.com/content/logos/airlines_${flight.airlineCodeIata.slice(
            0,
            2
          )}_200_200_s.png`}
          alt={`${flight.airlineCodeIata} logo`}
          width={50}
          height={50}
          style={{ objectFit: "contain", marginBottom: "0.5rem" }}
        />
      </LogoWrapper>
      <InfoRow>
        <RouteLine>
          <span>
            {flight.departureAirportIataCode} ➝ {flight.arrivalAirportIataCode}
          </span>
          <span>
            {flight.scheduledDepartureTime} → {flight.scheduledArrivalTime}
          </span>
          <span>{flight.flightDuration} | 직항</span>
        </RouteLine>
        <MealLine>{flight.mealService}</MealLine>
      </InfoRow>
    </Card>
  );
};
