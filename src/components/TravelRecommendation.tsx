import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { fetchTravelRecommendations } from "../api/travelAgentApi";
import { useFlightContext } from "../context/FlightContext";

const GlassContainer = styled.div`
  margin: 1.5rem 0 1.2rem 0;
  padding: 1.5rem 1.2rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.10);
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.1rem;
`;

const GuideText = styled.div`
  font-size: 1.05rem;
  color: #1971c2;
  background: #e7f5ff;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  text-align: left;
`;

const ThemeList = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
`;

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.3rem;
  border-radius: 1.5rem;
  border: 1.5px solid #e5e5e5;
  background: #fff;
  font-size: 1.15rem;
  font-weight: 500;
  color: #222;
  cursor: pointer;
  transition: box-shadow 0.15s, border-color 0.15s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);

  &:hover:enabled {
    border-color: #00a4dc;
    box-shadow: 0 2px 8px rgba(0,164,220,0.08);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(1); }
  40% { transform: scale(1.5); }
`;

const DotLoader = styled.span`
  display: inline-block;
  margin-left: 0.5rem;
  & > span {
    display: inline-block;
    width: 0.6em;
    height: 0.6em;
    margin: 0 0.1em;
    background: #ffd600;
    border-radius: 50%;
    animation: ${bounce} 1.4s infinite both;
  }
  & > span:nth-child(2) {
    animation-delay: 0.2s;
  }
  & > span:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const neon = keyframes`
  0% { box-shadow: 0 0 4px 1px rgba(255,224,102,0.25), 0 0 0 0 rgba(255,215,0,0.18); }
  50% { box-shadow: 0 0 10px 2px rgba(255,215,0,0.22), 0 0 4px 1px rgba(255,224,102,0.13); }
  100% { box-shadow: 0 0 4px 1px rgba(255,224,102,0.25), 0 0 0 0 rgba(255,215,0,0.18); }
`;

const ResultBox = styled.div`
  margin-top: 1.2rem;
  background: rgba(255,255,255,0.85);
  border-radius: 14px;
  padding: 1.2rem 1.2rem 1.1rem 1.2rem;
  color: #222;
  font-size: 1.08rem;
  line-height: 1.7;
  word-break: keep-all;
  white-space: pre-line;
  position: relative;
  border: 2px solid #ffe066;
  box-shadow: 0 0 4px 1px rgba(255,224,102,0.25), 0 0 0 0 rgba(255,215,0,0.18);
  animation: ${neon} 1.5s infinite;
  transition: box-shadow 0.2s;
`;

const Iso3List = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-top: 1.1rem;
  flex-wrap: wrap;
`;

const Iso3Tag = styled.button`
  background: linear-gradient(135deg, #00a4dc 0%, #008dbd 100%);
  color: #fff;
  border: none;
  border-radius: 1.2rem;
  padding: 0.45rem 1.1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,164,220,0.10);
  transition: background 0.2s, transform 0.1s;
  outline: none;

  &:hover {
    background: linear-gradient(135deg, #008dbd 0%, #00a4dc 100%);
    transform: translateY(-2px) scale(1.05);
  }
`;

const themes = [
  { emoji: "🍴", label: "미식" },
  { emoji: "🕍", label: "문화 유산" },
  { emoji: "🌋", label: "트레킹" },
  { emoji: "🌊", label: "바다" },
  { emoji: "🏖️", label: "휴양지" },
];

export const TravelRecommendation = () => {
  const [result, setResult] = useState<{ message: string; iso3: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setTo } = useFlightContext();

  const handleThemeClick = async (theme: string) => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetchTravelRecommendations(theme);
      setResult(res.data);
    } catch (err) {
      setError("추천 결과를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleIso3Click = (iso3Code: string) => {
    setTo(iso3Code);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <GlassContainer>
      <GuideText>✨ AI가 테마별 여행지를 추천해드립니다.</GuideText>
      <ThemeList>
        {themes.map(({ emoji, label }) => (
          <ThemeButton key={label} onClick={() => handleThemeClick(label)} disabled={loading}>
            {emoji} {label}
          </ThemeButton>
        ))}
      </ThemeList>
      {loading && (
        <ResultBox>
          추천 결과를 불러오는 중입니다
          <DotLoader>
            <span />
            <span />
            <span />
          </DotLoader>
        </ResultBox>
      )}
      {error && <ResultBox style={{ color: '#c92a2a' }}>{error}</ResultBox>}
      {result && !loading && !error && (
        <ResultBox>
          {result.message}
          {result.iso3 && result.iso3.length > 0 && (
            <Iso3List>
              {result.iso3.map((code) => (
                <Iso3Tag key={code} onClick={() => handleIso3Click(code)}>
                  {code}
                </Iso3Tag>
              ))}
            </Iso3List>
          )}
        </ResultBox>
      )}
    </GlassContainer>
  );
};
