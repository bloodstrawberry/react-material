import { Route, Link, Routes } from "react-router-dom";

import './App.css';

import ButtonTest from "./page/ButtonTest";
import Router1 from "./page/Router1";
import Router2 from "./page/Router2";

function App() {
  return (
    <div className="App">
      <div className="router">
        <span>
          <Link to="/btn">Button Test</Link>
        </span>
        <span>
          <Link to="/r1">2</Link>
        </span>
        <span>
          <Link to="/r2">3</Link>
        </span>
      </div>
      <div>
        <Routes>
          <Route path="/btn" element={<ButtonTest />} />
          <Route path="/r1" element={<Router1 />} />
          <Route path="/r2" element={<Router2 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;