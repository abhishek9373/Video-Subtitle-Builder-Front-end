import { useState } from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import Onboard from "./components/Onboard";
import { Data } from "./services/store";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Builder from "./components/Builder";
import Playerpage from "./components/Playerpage";

function App() {
  const [file, setFile] = useState(null);

  const contextValues = {
    file,
    updateFile: (newFile) => setFile(newFile),
  };

  return (
    <Data.Provider value={contextValues}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboard />} />
          <Route path="/selectvideo" element={<Homepage />} />
          <Route path="/video" element={<Builder />} />
          <Route path="/video/:videoId" element={<Playerpage />} />
        </Routes>
      </BrowserRouter>
    </Data.Provider>
  );
}

export default App;
