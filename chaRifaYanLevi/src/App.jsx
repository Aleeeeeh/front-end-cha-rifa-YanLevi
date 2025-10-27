import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Participants from "./pages/Participants";
import BackgroundMusic from "./components/BackgroundMusic";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/participantes" element={<Participants />} />
      </Routes>
      <BackgroundMusic />
    </Router>
  );
}
