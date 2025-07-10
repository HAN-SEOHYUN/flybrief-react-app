import { useState, useRef } from "react";
import { useFlightContext } from "../context/FlightContext";
import { fetchFlights } from "../api/flightApi";
import { fetchAirportSuggestions, type AirportSuggestion } from "../api/airportApi";
import { ArrowLeftRight, LoaderCircle } from "lucide-react";
import styled from "styled-components";
import { SuggestionsList } from "./SuggestionsList";

const Container = styled.div`
  justify-items: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 0;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 1.2rem 1.2rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.5);
  overflow: visible;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  min-width: 160px;
  flex: 1;
  overflow: visible;
  z-index: 100;
  
  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const InputLabel = styled.label`
  position: absolute;
  top: 6px;
  left: 10px;
  font-size: 0.75rem;
  color: #495057;
  pointer-events: none;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.1rem 0.5rem 0.5rem 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  font-size: 0.97rem;
  background: rgba(255, 255, 255, 0.95);
  color: #212529;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #00a4dc;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 0 3px rgba(0, 164, 220, 0.1);
  }
  
  &::placeholder {
    color: #6c757d;
  }
`;

const SwapButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 9999px;
  padding: 0.3rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 36px;
  width: 36px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const SubmitButton = styled.button<{ disabled?: boolean }>`
  height: 42px;
  padding: 0 1.2rem;
  background: linear-gradient(135deg, #00a4dc 0%, #008dbd 100%);
  color: white;
  font-weight: 600;
  font-size: 0.97rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 4px;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 164, 220, 0.3);

  &:hover {
    background: linear-gradient(135deg, #008dbd 0%, #007ba8 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 164, 220, 0.4);
  }

  &:active {
    background: linear-gradient(135deg, #007ba8 0%, #006b94 100%);
    transform: translateY(0);
  }

  &:disabled {
    background: linear-gradient(135deg, #aad7e7 0%, #99c7d7 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// props 타입 추가
interface FlightSearchFormProps {
  onSearch?: () => void;
}

export const FlightSearchForm = ({ onSearch }: FlightSearchFormProps) => {
  const [from, setFrom] = useState("ICN");
  const [to, setTo] = useState("BNE");
  const [date, setDate] = useState("2025-06-20");

  const { isLoading, setFlights, setIsLoading } = useFlightContext();
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const [fromSuggestions, setFromSuggestions] = useState<AirportSuggestion[]>([]);
  const [toSuggestions, setToSuggestions] = useState<AirportSuggestion[]>([]);

  const handleSuggestions = async (keyword: string, target: "from" | "to") => {
    if (!keyword.trim()) return;
    try {
      const data = await fetchAirportSuggestions(keyword);
      target === "from" ? setFromSuggestions(data) : setToSuggestions(data);
    } catch (err) {
      console.error("Failed to fetch suggestions", err);
    }
  };

  const getNextDate = (dateStr: string) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const startDate = date;
    const endDate = getNextDate(startDate);
    try {
      setIsLoading(true);
      const data = await fetchFlights(from, to, startDate, endDate);
      setFlights(data);
      if (onSearch) onSearch();
    } catch (err) {
      alert("항공편 조회에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <InputWrapper ref={fromRef}>
          <InputLabel htmlFor="from">출발지</InputLabel>
          <Input
            id="from"
            type="text"
            value={from}
            onChange={(e) => {
              const value = e.target.value;
              setFrom(value);
              handleSuggestions(value, "from");
            }}
          />
          <SuggestionsList
            suggestions={fromSuggestions}
            onSelect={(iataCode) => {
              setFrom(iataCode);
              setFromSuggestions([]);
            }}
          />
        </InputWrapper>

        <SwapButton type="button" onClick={handleSwap} title="Swap from/to">
          <ArrowLeftRight size={20} color="#333" />
        </SwapButton>

        <InputWrapper ref={toRef}>
          <InputLabel htmlFor="to">도착지</InputLabel>
          <Input
            id="to"
            type="text"
            value={to}
            onChange={(e) => {
              const value = e.target.value;
              setTo(value);
              handleSuggestions(value, "to");
            }}
          />
          <SuggestionsList
            suggestions={toSuggestions}
            onSelect={(iataCode) => {
              setTo(iataCode);
              setToSuggestions([]);
            }}
          />
        </InputWrapper>

        <InputWrapper>
          <InputLabel htmlFor="date">가는 편 날짜</InputLabel>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </InputWrapper>

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? <LoaderCircle size={20} /> : "검색"}
        </SubmitButton>
      </Form>
    </Container>
  );
};
