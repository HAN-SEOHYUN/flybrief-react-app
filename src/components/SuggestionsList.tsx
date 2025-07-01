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
  background: white;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
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