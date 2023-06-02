import { Route, Link, Routes } from "react-router-dom";

import './App.css';

import ButtonTest from "./page/ButtonTest";
import MaterialTable from "./page/MaterialTable";
import TreeViewExample from "./page/TreeViewExample";
import TreeViewExample2 from "./page/TreeViewExample2";
import { useEffect, useState } from "react";
import FileBrowser from "./page/FileBrowser";

const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
}

function App() {
  const titleUpdator = useTitle("Loading...");
  setTimeout(() => titleUpdator("Home"), 1000);

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
        <span>
          <Link to="/fileBrowser">FileBrowser</Link>
        </span>
      </div>
      <div>
        <Routes>
          <Route path="/btn" element={<ButtonTest />} />
          <Route path="/mtable" element={<MaterialTable />} />
          <Route path="/tvexp" element={<TreeViewExample />} />
          <Route path="/tvexp2" element={<TreeViewExample2 />} />
          <Route path="/fileBrowser" element={<FileBrowser />} />          
        </Routes>
      </div>
    </div>
  );
}

export default App;