import { Route, Link, Routes } from "react-router-dom";

import './App.css';

import ButtonTest from "./page/ButtonTest";
import MaterialTable from "./page/MaterialTable";
import TreeViewExample from "./page/TreeViewExample";
import TreeViewExample2 from "./page/TreeViewExample2";

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
          <Link to="/tvexp">Tree View</Link>
        </span>
        <span>
          <Link to="/tvexp2">Tree View 2</Link>
        </span>
      </div>
      <div>
        <Routes>
          <Route path="/btn" element={<ButtonTest />} />
          <Route path="/mtable" element={<MaterialTable />} />
          <Route path="/tvexp" element={<TreeViewExample />} />
          <Route path="/tvexp2" element={<TreeViewExample2 />} />
          
        </Routes>
      </div>
    </div>
  );
}

export default App;