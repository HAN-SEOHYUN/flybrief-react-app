// ✅ src/components/FlightSearchForm.tsx
import { useState, useRef } from "react";
import { fetchFlights } from "../api/flightApi";
import { fetchAirportSuggestions } from "../api/airportApi";
import { ArrowLeftRight } from "lucide-react";
import styled from "styled-components";
import { SuggestionsList } from "./SuggestionsList";
import { useClickOutside } from "../hooks/useClickOutside";

const Container = styled.div`
  justify-items: center;
  display: block;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  overflow: visible;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 200px;
  flex-shrink: 0;
`;

const InputLabel = styled.label`
  position: absolute;
  top: 6px;
  left: 10px;
  font-size: 0.75rem;
  color: #6c757d;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.5rem 0.5rem 0.5rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
`;

const SwapButton = styled.button`
  background: #eee;
  border-radius: 9999px;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 40px;
  width: 40px;
`;

const SubmitButton = styled.button`
  height: 53px;
  padding: 0 1.5rem;
  background-color: #00a4dc;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-left: 8px;

  &:hover {
    background-color: #008dbd;
  }

  &:active {
    background-color: #007ba8;
  }
`;

type AirportSuggestion = {
  id: number;
  iataCode: string;
  airportNameEn: string;
  airportNameKr: string;
};

export const FlightSearchForm = () => {
  const [from, setFrom] = useState("ICN");
  const [to, setTo] = useState("BNE");
  const [date, setDate] = useState("2025-06-20");
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const [fromSuggestions, setFromSuggestions] = useState<AirportSuggestion[]>([]);
  const [toSuggestions, setToSuggestions] = useState<AirportSuggestion[]>([]);

  useClickOutside(fromRef, () => setFromSuggestions([]));
  useClickOutside(toRef, () => setToSuggestions([]));

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
      const data = await fetchFlights(from, to, startDate, endDate);
      console.log("📦 Flight schedules fetched:", data);
    } catch (err) {
      alert("Failed to fetch flight schedules.");
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

        <SubmitButton type="submit">검색하기</SubmitButton>
      </Form>
    </Container>
  );
};