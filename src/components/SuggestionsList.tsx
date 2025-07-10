// ✅ src/components/SuggestionsList.tsx
import styled from "styled-components";

type AirportSuggestion = {
  id: number;
  iataCode: string;
  airportNameEn: string;
  airportNameKr: string;
};

type SuggestionsListProps = {
  suggestions: AirportSuggestion[];
  onSelect: (iataCode: string) => void;
};

const List = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  list-style: none;
  margin: 0;
  padding: 0;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
`;

const Item = styled.li`
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: rgba(0, 164, 220, 0.1);
    color: #00a4dc;
  }
  
  &:active {
    background: rgba(0, 164, 220, 0.2);
  }
`;

export const SuggestionsList = ({ suggestions, onSelect }: SuggestionsListProps) => {
  if (suggestions.length === 0) return null;

  return (
    <List>
      {suggestions.map((item) => (
        <Item key={item.id} onClick={() => onSelect(item.iataCode)}>
          {item.airportNameKr} ({item.iataCode})
        </Item>
      ))}
    </List>
  );
};