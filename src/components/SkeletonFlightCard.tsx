import styled, { keyframes } from "styled-components";

const shine = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const SkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  gap: 1.25rem;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

const SkeletonBox = styled.div`
  background: #eee;
  border-radius: 4px;
  animation: ${shine} 1.2s infinite linear;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200px 100%;
`;

const LogoSkeleton = styled(SkeletonBox)`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
`;

const TextBlock = styled.div`
  flex: 1;
`;

const Line = styled(SkeletonBox)<{ width?: string; }>`
  height: 14px;
  margin-bottom: 0.5rem;
  width: ${(props: { width?: string }) => props.width || "100%"};
`;

export const SkeletonFlightCard = () => (
  <SkeletonWrapper>
    <LogoSkeleton />
    <TextBlock>
      <Line width="70%" />
      <Line width="50%" />
      <Line width="40%" />
    </TextBlock>
  </SkeletonWrapper>
);
