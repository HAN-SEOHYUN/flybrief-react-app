import { useEffect, useState } from "react";
import styled from "styled-components";
import { useFlightContext } from "../context/FlightContext";
import { fetchCountryInfo } from "../api/countryApi";
import type { CountryInfo as CountryInfoType } from "../api/countryApi";
import { SkeletonCountryInfo } from "./SkeletonCountryInfo";

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
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #212529;
`;

const InfoItem = styled.div`
  margin-bottom: 1rem;
`;

const InfoItemRow = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
`;

const Label = styled.div`
  font-size: 0.85rem;
  color: #495057;
`;

const WarningTag = styled.div<{ $level: "attention" | "control" | "limita" | "ban" }>`
  display: inline-block;
  padding: 0.3rem 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 9999px;
  color: ${({ $level }) =>
    $level === "ban"
      ? "#fff"
      : $level === "limita"
      ? "#c92a2a"
      : $level === "control"
      ? "#996c00"
      : "#1864ab"};
  background-color: ${({ $level }) =>
    $level === "ban"
      ? "#212529"
      : $level === "limita"
      ? "#ffa8a8"
      : $level === "control"
      ? "#fff3bf"
      : "#d0ebff"};
`;

const SubTag = styled.div`
  display: inline-block;
  padding: 0.3rem 0.75rem;
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 9999px;
  background-color: #fff;
  color: #212529;
  border: 1px solid #ccc;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Flag = styled.img`
  width: 64px;
  height: 42px;
  border-radius: 4px;
  object-fit: cover;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
`;

const Value = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: #212529;
`;

export const CountryInfo = () => {
  const { flights, isLoading } = useFlightContext();
  const [countryInfo, setCountryInfo] = useState<CountryInfoType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const iataCode = flights?.[0]?.arrivalAirportIataCode;
    if (!iataCode) {
      setCountryInfo(null);
      return;
    }

    fetchCountryInfo(iataCode)
      .then((data) => {
        setCountryInfo(data);
        setError(null);
      })
      .catch((err) => {
        console.error("나라 정보 요청 실패:", err);
        setError("나라 정보를 불러오지 못했습니다.");
        setCountryInfo(null);
      });
  }, [flights]);

  if (!flights || flights.length === 0) return null;
  if (error) return <Wrapper>{error}</Wrapper>;
  if (isLoading || !countryInfo) return <SkeletonCountryInfo />;

  return (
    <Wrapper>
      <TitleSection>
        <Flag
          src={`https://flagcdn.com/w80/${countryInfo.iso2.toLowerCase()}.png`}
          alt={`${countryInfo.countryNameKo} 국기`}
        />
        <Title>
          {countryInfo.countryNameKo} ({countryInfo.countryNameEn})
        </Title>
      </TitleSection>

      {countryInfo.capital && (
        <InfoItem>
          <Label>수도</Label>
          <Value>{countryInfo.capital}</Value>
        </InfoItem>
      )}

      {countryInfo.religion && (
        <InfoItem>
          <Label>종교</Label>
          <Value>{countryInfo.religion}</Value>
        </InfoItem>
      )}

      {countryInfo.language && (
        <InfoItem>
          <Label>언어</Label>
          <Value>{countryInfo.language}</Value>
        </InfoItem>
      )}

      {(countryInfo.attentionPartial || countryInfo.attentionNote) && (
        <InfoItemRow>
          <WarningTag $level="attention">여행유의</WarningTag>
          {countryInfo.attentionPartial && <SubTag>일부</SubTag>}
          {countryInfo.attentionNote && <Value>{countryInfo.attentionNote}</Value>}
        </InfoItemRow>
      )}

      {(countryInfo.controlPartial || countryInfo.controlNote) && (
        <InfoItemRow>
          <WarningTag $level="control">여행자제</WarningTag>
          {countryInfo.controlPartial && <SubTag>일부</SubTag>}
          {countryInfo.controlNote && <Value>{countryInfo.controlNote}</Value>}
        </InfoItemRow>
      )}

      {(countryInfo.limitaPartial || countryInfo.limitaNote) && (
        <InfoItemRow>
          <WarningTag $level="limita">철수권고</WarningTag>
          {countryInfo.limitaPartial && <SubTag>일부</SubTag>}
          {countryInfo.limitaNote && <Value>{countryInfo.limitaNote}</Value>}
        </InfoItemRow>
      )}

      {(countryInfo.banYnPartial || countryInfo.banNote) && (
        <InfoItemRow>
          <WarningTag $level="ban">여행금지</WarningTag>
          {countryInfo.banYnPartial && <SubTag>일부</SubTag>}
          {countryInfo.banNote && <Value>{countryInfo.banNote}</Value>}
        </InfoItemRow>
      )}
    </Wrapper>
  );
};
