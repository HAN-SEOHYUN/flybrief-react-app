import styled from "styled-components";
import { Github } from "lucide-react";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Logo = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #00a4dc 0%, #008dbd 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;

const ServiceName = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #212529;
  margin: 0;
`;

const GithubLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  color: #212529;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    transform: scale(1.05);
  }
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <LogoSection>
        <Logo>✈️</Logo>
        <ServiceName>FlyBrief</ServiceName>
      </LogoSection>
      
      <GithubLink 
        href="https://github.com" 
        target="_blank" 
        rel="noopener noreferrer"
        title="GitHub"
      >
        <Github size={24} />
      </GithubLink>
    </HeaderWrapper>
  );
}; 