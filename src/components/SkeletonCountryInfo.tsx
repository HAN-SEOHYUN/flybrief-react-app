import styled, { keyframes } from "styled-components";

const shine = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const SkeletonWrapper = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #f9f9f9;
`;

const SkeletonBox = styled.div`
  background: #eee;
  border-radius: 6px;
  animation: ${shine} 1.2s infinite linear;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200px 100%;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FlagSkeleton = styled(SkeletonBox)`
  width: 48px;
  height: 32px;
`;

const TitleSkeleton = styled(SkeletonBox)`
  height: 24px;
  width: 180px;
`;

const InfoLine = styled(SkeletonBox)`
  height: 16px;
  width: 80%;
  margin-bottom: 1rem;
`;

const TagRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const TagSkeleton = styled(SkeletonBox)`
  width: 60px;
  height: 24px;
`;

const ValueSkeleton = styled(SkeletonBox)`
  width: 150px;
  height: 20px;
`;

export const SkeletonCountryInfo = () => {
  return (
    <SkeletonWrapper>
      <TitleRow>
        <FlagSkeleton />
        <TitleSkeleton />
      </TitleRow>

      <InfoLine />
      <InfoLine />
      <InfoLine />

      <TagRow>
        <TagSkeleton />
        <ValueSkeleton />
      </TagRow>
      <TagRow>
        <TagSkeleton />
        <ValueSkeleton />
      </TagRow>
      <TagRow>
        <TagSkeleton />
        <ValueSkeleton />
      </TagRow>
      <TagRow>
        <TagSkeleton />
        <ValueSkeleton />
      </TagRow>
    </SkeletonWrapper>
  );
};
