import styled, { keyframes } from "styled-components";

const shine = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const TitleSkeleton = styled.div`
  margin-top: 0;
  height: 28px;
  width: 180px;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  background: #eee;
  animation: ${shine} 1.2s infinite linear;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200px 100%;
`;

const TextSkeleton = styled.div`
  height: 18px;
  width: 90%;
  border-radius: 6px;
  margin-bottom: 1rem;
  background: #eee;
  animation: ${shine} 1.2s infinite linear;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200px 100%;
`;

const Wrapper = styled.section`
  margin-top: 0;
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
  height: 400px;
`;

export const SkeletonWeatherSummary = () => (
  <>
    <TitleSkeleton />
    <TextSkeleton />
    <TextSkeleton />
    <TextSkeleton />
    <TextSkeleton />
    <TextSkeleton style={{ width: "70%" }} />
  </>
);

// 버튼만을 위한 스켈레톤
const ButtonSkeleton = styled.div`
  width: 220px;
  height: 48px;
  border-radius: 2rem;
  background: #e0e7ff;
  animation: ${shine} 1.2s infinite linear;
  background: linear-gradient(90deg, #e0e7ff 25%, #f0f9ff 50%, #e0e7ff 75%);
  background-size: 200px 100%;
  margin: 0 auto;
  margin-top: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
`;

export const SkeletonWeatherSummaryButton = () => (
  <ButtonWrapper>
    <ButtonSkeleton />
  </ButtonWrapper>
);
