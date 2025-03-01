import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Classes from "./pages/Classes";
import Schedule from "./pages/Schedule";
import Membership from "./pages/Membership";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Ballet from "./pages/classes/Ballet";
import Contemporary from "./pages/classes/Contemporary";
import HipHop from "./pages/classes/HipHop";
import Jazz from "./pages/classes/Jazz";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/ballet" element={<Ballet />} />
          <Route path="/classes/contemporary" element={<Contemporary />} />
          <Route path="/classes/hip-hop" element={<HipHop />} />
          <Route path="/classes/jazz" element={<Jazz />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
