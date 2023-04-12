import { Route, Link, Routes } from "react-router-dom";

import './App.css';

import ButtonTest from "./page/ButtonTest";
import MaterialTable from "./page/MaterialTable";
import Router2 from "./page/Router2";

function App() {
  return (
    <div className="App">
      <div className="router">
        <span>
          <Link to="/btn">Button Test</Link>
        </span>
        <span>
          <Link to="/mtable">Material Table</Link>
        </span>
        <span>
          <Link to="/r2">3</Link>
        </span>
      </div>
      <div>
        <Routes>
          <Route path="/btn" element={<ButtonTest />} />
          <Route path="/mtable" element={<MaterialTable />} />
          <Route path="/r2" element={<Router2 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;