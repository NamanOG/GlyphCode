import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import CursorGlow from "./components/CursorGlow";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/LoadingScreen";
import ScrollProgressBar from "./components/ScrollProgressBar";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <ScrollProgressBar />
      <CursorGlow />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div className={loading ? "invisible" : "visible"}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
