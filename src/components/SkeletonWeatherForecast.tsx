import styled, { keyframes } from "styled-components";

const shine = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
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
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const TitleSkeleton = styled.div`
  height: 24px;
  width: 200px;
  margin: 0 auto 1rem;
  border-radius: 6px;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200px 100%;
  animation: ${shine} 1.2s infinite linear;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.75rem;
  padding: 1rem 0;
  flex: 1;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 0.5rem;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 0;
  min-height: 180px;
`;

const Circle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200px 100%;
  animation: ${shine} 1.2s infinite linear;
`;

const Line = styled.div<{ width?: string }>`
  height: 14px;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  width: ${(props) => props.width || "100%"};
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200px 100%;
  animation: ${shine} 1.2s infinite linear;
`;

export const SkeletonWeatherForecast = () => {
  return (
    <Wrapper>
      <TitleSkeleton />
      <Container>
        {Array.from({ length: 7 }).map((_, i) => (
          <Card key={i}>
            <Circle />
            <Line width="60%" />
            <Line width="80%" />
            <Line width="50%" />
          </Card>
        ))}
      </Container>
    </Wrapper>
  );
};
