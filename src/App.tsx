import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { FlightProvider } from "./context/FlightContext";

function App() {
  return (
    <FlightProvider>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </FlightProvider>
  );
}

export default App;