import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

import PlanJourney from "./components/PlanJourney";
import DiscoverNearby from "./components/DiscoverNearby";
import WeatherSafety from "./components/WeatherSafety";
import MapView from "./components/MapView";
import CostAnalysis from "./components/CostAnalysis";
import FriendShare from "./components/FriendShare";
import FriendLocation from "./components/FriendLocation";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<div>Welcome to the Dashboard!</div>} />
          <Route path="plan-journey" element={<PlanJourney />} />
          <Route path="discover-nearby" element={<DiscoverNearby />} />
          <Route path="weather-safety" element={<WeatherSafety />} />
          <Route path="map-view" element={<MapView />} />
          <Route path="cost-analysis" element={<CostAnalysis />} />
          <Route path="friend-share" element={<FriendShare />} />
          <Route path="friend-location" element={<FriendLocation />} />
        </Route>
      </Routes>
    </Router>
  );
}
