import styled from "styled-components";
import { useEffect, useState } from "react";
import { useFlightContext } from "../context/FlightContext";
import { fetchCountryAccidentNews } from "../api/countryApi";
import { SkeletonCountryAccidentNews } from "./SkeletonCountryAccidentNews";

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
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1.5rem;
  position: relative;
  min-height: 180px;
  max-height: 300px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const MinistryImg = styled.img`
  width: 38px;
  height: 38px;
  object-fit: contain;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  align-self: flex-start;
  margin-top: 0.2rem;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.7rem;
  height: 100%;
  max-height: 260px;
  overflow: hidden;
`;

const InfoText = styled.div`
  font-size: 0.98rem;
  color: #1971c2;
  background: #e7f5ff;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  text-align: left;
`;

const NewsText = styled.div`
  width: 100%;
  font-size: 1.08rem;
  color: #222;
  line-height: 1.7;
  text-align: left;
  max-height: 240px;
  overflow-y: auto;
  padding-right: 0.5rem;
`;

export const CountryAccidentNews = () => {
  const { flights, isLoading: isFlightLoading } = useFlightContext();
  const iataCode = flights?.[0]?.arrivalAirportIataCode;
  const [newsHtml, setNewsHtml] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!iataCode) {
      setNewsHtml("");
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    fetchCountryAccidentNews(iataCode)
      .then((data) => {
        setNewsHtml(data);
      })
      .catch(() => {
        setError("사건·사고 예방정보를 불러오지 못했습니다.");
        setNewsHtml("");
      })
      .finally(() => setLoading(false));
  }, [iataCode]);

  if (isFlightLoading) return <SkeletonCountryAccidentNews />;
  if (!flights || flights.length === 0) return null;
  if (loading) return <SkeletonCountryAccidentNews />;

  return (
    <Wrapper>
      <MinistryImg src="/ministry.png" alt="외교부 로고" />
      <InfoBox>
        <InfoText>
          이 정보는 외교부에서 실시간으로 제공하는 <strong>사건·사고 예방 안내</strong>입니다. 여행 전 참고해주세요.
        </InfoText>
        {error ? (
          <NewsText>{error}</NewsText>
        ) : (
          <NewsText dangerouslySetInnerHTML={{ __html: newsHtml }} />
        )}
      </InfoBox>
    </Wrapper>
  );
};
