import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ItineraryBuilder from "./pages/ItineraryBuilder";
import ItineraryView from "./pages/ItineraryView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trip/:tripId/builder" element={<ItineraryBuilder />} />
        <Route path="/trip/:tripId/view" element={<ItineraryView />} />
      </Routes>
    </BrowserRouter>
  );
}
