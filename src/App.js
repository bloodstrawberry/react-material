import React from 'react';
import { Route, Link, Routes } from "react-router-dom";

import './App.css';

import ButtonTest from "./page/ButtonTest";
import MaterialTable from "./page/MaterialTable";
import TreeViewExample from "./page/TreeViewExample";
import TreeViewExample2 from "./page/TreeViewExample2";
import { useEffect, useState } from "react";
import FileBrowser from "./page/FileBrowser";
import MyAutoComplete from "./page/MyAutoComplete";
import LoadingBar from "./page/LoadingBar";
import ToastEditor from './page/ToastEditor';

const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
}

const App = () => {
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
        <span>
          <Link to="/autoComplete">Auto Complete</Link>
        </span>
        <span>
          <Link to="/loadingBar">Loading</Link>
        </span>
        <span>
          <Link to="/toastEditor">Toast UI Editor</Link>
        </span>

      </div>
      <div>
        <Routes>
          <Route path="/btn" element={<ButtonTest />} />
          <Route path="/mtable" element={<MaterialTable />} />
          <Route path="/tvexp" element={<TreeViewExample />} />
          <Route path="/tvexp2" element={<TreeViewExample2 />} />
          <Route path="/fileBrowser" element={<FileBrowser />} />
          <Route path="/autoComplete" element={<MyAutoComplete />} />
          <Route path="/loadingBar" element={<LoadingBar />} />
          <Route path="/toastEditor" element={<ToastEditor />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
