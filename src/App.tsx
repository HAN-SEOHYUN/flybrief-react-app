import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { FlightProvider } from "./context/FlightContext";
import { Logo } from "./components/Logo";

function App() {
  return (
    <FlightProvider>
      <Router>
        <Logo />
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </FlightProvider>
  );
}

export default App;