// ✅ src/components/Logo.tsx
import styled from "styled-components";

const LogoWrapper = styled.div`
  text-align: center;
`;

const LogoImage = styled.img`
  height: 200px;
  cursor: pointer;
`;

export const Logo = () => (
  <LogoWrapper>
    <a href="/">
      <LogoImage src="/logo.png" alt="Flybrief Logo" />
    </a>
  </LogoWrapper>
);