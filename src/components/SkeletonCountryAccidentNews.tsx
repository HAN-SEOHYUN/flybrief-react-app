import styled, { keyframes } from "styled-components";

const shine = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

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
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1.5rem;
  min-height: 180px;
  max-height: 340px;
`;

const ImgSkeleton = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #eee;
  animation: ${shine} 1.2s infinite linear;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200px 100%;
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

const InfoTextSkeleton = styled.div`
  height: 22px;
  width: 60%;
  border-radius: 8px;
  background: #e7f5ff;
  margin-bottom: 0.5rem;
  animation: ${shine} 1.2s infinite linear;
  background: linear-gradient(90deg, #e7f5ff 25%, #f0f9ff 50%, #e7f5ff 75%);
  background-size: 200px 100%;
`;

const NewsLine = styled.div`
  height: 16px;
  width: 95%;
  border-radius: 6px;
  background: #eee;
  margin-bottom: 0.6rem;
  animation: ${shine} 1.2s infinite linear;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200px 100%;
`;

export const SkeletonCountryAccidentNews = () => (
  <Wrapper>
    <ImgSkeleton />
    <InfoBox>
      <InfoTextSkeleton />
      <NewsLine />
      <NewsLine />
      <NewsLine style={{ width: "80%" }} />
      <NewsLine style={{ width: "60%" }} />
    </InfoBox>
  </Wrapper>
);
