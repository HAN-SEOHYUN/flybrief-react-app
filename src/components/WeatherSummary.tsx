import styled, { keyframes } from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useFlightContext } from "../context/FlightContext";
import { fetchWeatherSummary } from "../api/weatherApi";
import { SkeletonWeatherSummary, SkeletonWeatherSummaryButton } from "./SkeletonWeatherSummary";

const neon = keyframes`
  0% { box-shadow: 0 0 4px 1px #a084ff, 0 0 0 0 #5ee6ff; }
  50% { box-shadow: 0 0 8px 2px #5ee6ff, 0 0 4px 1px #a084ff; }
  100% { box-shadow: 0 0 4px 1px #a084ff, 0 0 0 0 #5ee6ff; }
`;

const SummaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  border: none;
  background: linear-gradient(90deg, #e0e7ff 0%, #5ee6ff 100%);
  position: relative;
  font-size: 1.1rem;
  font-weight: 900;
  color: #fff !important;
  text-shadow: 0 0 0px #fff,0 0 0px #fff;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 1.5rem;
  outline: none;
  z-index: 1;
  box-shadow: 0 0 4px 1.5px #a084ff, 0 0 8px 2px #5ee6ff;
  transition: box-shadow 0.2s;
  
  &:before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 2rem;
    background: transparent;
    z-index: 0;
    pointer-events: none;
    box-shadow: 0 0 6px 2px #a084ff, 0 0 12px 3px #5ee6ff;
    opacity: 1;
    animation: ${neon} 1.5s infinite;
  }
  & > * {
    position: relative;
    z-index: 1;
  }
`;

const GlitterIcon = styled.span`
  font-size: 1.7rem;
  margin-right: 0.5rem;
  filter: drop-shadow(0 0 4px #ffe066) drop-shadow(0 0 8px #ffd700);
  text-shadow: 0 0 0 #ffe066,0 0 0px #ffd700,0 0 0 #fff;
  vertical-align: middle;
`;

// WeatherForecast.tsx 스타일 참고
const Wrapper = styled.section`
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #212529;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: #212529;
  text-align: center;
  margin-bottom: 1.25rem;
`;

const SummaryText = styled.div`
  font-size: 1.08rem;
  color: #222;
  line-height: 1.7;
  white-space: pre-line;
  text-align: center;
`;

function getEndDate(start: string): string {
  const date = new Date(start);
  date.setDate(date.getDate() + 6);
  return date.toISOString().split("T")[0];
}

export const WeatherSummary = () => {
  const { flights, isLoading } = useFlightContext();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string>("");

  // flights[0]?.arrivalAirportIataCode 또는 scheduledDepartureDate가 변경될 때 summary 초기화
  const prevKey = useRef("");
  const key = (flights[0]?.arrivalAirportIataCode || "") + "_" + (flights[0]?.scheduledDepartureDate || "");
  useEffect(() => {
    if (prevKey.current && prevKey.current !== key) {
      setSummary("");
    }
    prevKey.current = key;
  }, [key]);

  if (!flights || flights.length === 0) return null;

  // isLoading이 true면 버튼 위치에만 skeleton ui
  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SkeletonWeatherSummaryButton />
      </div>
    );
  }

  const handleClick = async () => {
    if (!flights[0]?.arrivalAirportIataCode || !flights[0]?.scheduledDepartureDate) return;
    setLoading(true);
    try {
      const iataCode = flights[0].arrivalAirportIataCode;
      const startDate = flights[0].scheduledDepartureDate;
      const endDate = getEndDate(startDate);
      const summaryText = await fetchWeatherSummary(iataCode, startDate, endDate);
      setSummary(summaryText);
    } catch (err) {
      setSummary("요약 정보를 불러오지 못했습니다.");
      console.error("날씨 요약 요청 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!summary && !loading) {
    // summary가 없고 로딩도 아닐 때: 버튼만 중앙에
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SummaryButton type="button" onClick={handleClick} disabled={loading}>
          <GlitterIcon>✨</GlitterIcon>날씨정보 AI 요약
        </SummaryButton>
      </div>
    );
  }

  // summary가 있거나 로딩 중이면: 카드 상단에 버튼, 그 아래에 타이틀/텍스트 또는 스켈레톤
  return (
    <Wrapper>
      <SummaryButton type="button" onClick={handleClick} disabled={loading} style={{ marginTop: 0, marginBottom: "1.2rem" }}>
        <GlitterIcon>✨</GlitterIcon>날씨정보 AI 요약
      </SummaryButton>
      {loading ? (
        <SkeletonWeatherSummary />
      ) : (
        <>
          {/* <Title>AI 날씨 요약</Title> */}
          <SummaryText>{summary}</SummaryText>
        </>
      )}
    </Wrapper>
  );
};
