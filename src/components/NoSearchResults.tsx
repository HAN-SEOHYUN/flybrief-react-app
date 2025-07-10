import styled from "styled-components";
import { SearchX } from "lucide-react";

const Wrapper = styled.section`
  margin-top: 0;
  padding: 2rem 1.5rem;
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
  justify-content: center;
  height: 400px;
  text-align: center;
  grid-column: 1 / -1; /* 좌우 두 섹션에 걸쳐 표시 */
`;

const IconWrapper = styled.div`
  margin-bottom: 1.5rem;
  color: #868e96;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1rem;
  color: #868e96;
  line-height: 1.6;
  max-width: 400px;
`;

export const NoSearchResults = () => {
  return (
    <Wrapper>
      <IconWrapper>
        <SearchX size={48} />
      </IconWrapper>
      <Title>검색 결과를 표시할 수 없습니다</Title>
      <Message>
        더 많은 검색 결과를 보려면 검색 조건을 일부 변경해 보세요.
      </Message>
    </Wrapper>
  );
}; 