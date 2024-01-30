import React, { useEffect, useState } from "react";
import { Route, Link, Routes } from "react-router-dom";

import "./App.css";

import ButtonTest from "./page/ButtonTest";
import MaterialTable from "./page/MaterialTable";
import TreeViewExample from "./page/TreeViewExample";
import TreeViewExample2 from "./page/TreeViewExample2";
import FileBrowser from "./page/FileBrowser";
import MyAutoComplete from "./page/MyAutoComplete";
import LoadingBar from "./page/LoadingBar";
import ToastEditor from "./page/ToastEditor";
import MyHandsonTable from "./page/MyHandsonTable";
import MyTextEditorToggleButton from "./page/MyTextEditorToggleButton";
import ReactComments from "./page/ReactComments";
import GitHubLoginCallBack from "./page/GitHubLoginCallback";

import * as gh from "./githublibrary.js";

import IPConverter from "./page/IPConverter.js";
import ToastMailer from "./page/ToastMailer.js";

import ReactImageList from "./page/ReactImageList.js";
import Capture from "./page/Capture.js";
import SimpleToastEditor from "./page/SimpleToastEditor.js";
import MyStepper from "./page/MyStepper.js";
import Router1 from "./page/Router1.js";
import CKEditorVer4 from "./page/CKEditorVer4";

const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const titleUpdator = useTitle("Loading...");
  setTimeout(() => titleUpdator("Home"), 1000);

  return (
    <div className="App">
      {/* <img
        src="https://github.com/bloodstrawberry/auto-test/raw/main/KakaoTalk_20230212_143204341_01.jpg"
        //https://github.com/bloodstrawberry/auto-test/blob/main/KakaoTalk_20230212_143204341_01.jpg 이지만 blob -> raw로 변경
        //"https://github.com/bloo/리포지토리/raw/브랜치명/이미지경로/이미지파일.jpg"
        alt="alt"
        title="title"
      /> */}
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
        {/* <span>
          <Link to="/ck4">CK Editor v4</Link>
        </span> */}
        
        <span>
          <Link to="/toggle">Toggle Button</Link>
        </span>
        <span>
          <Link to="/myHandsTable">HandsOnTable</Link>
        </span>
        <span>
          <Link to="/comments">Comments</Link>
        </span>
        <span>
          <Link to="/converter">IP Converter</Link>
        </span>
        {/* <span>
          <Link to="/mail">Toast Mail</Link>
        </span> */}
        <span>
          <Link to="/capture">Capture</Link>
        </span>
        <span>
          <Link to="/stepper">Stepper</Link>
        </span>
        
        
        {/* <span>
          <Link to="/imageList">Image List</Link>
        </span> */}

        

        {/* <span>
          <Link to="/cookie">Cookie</Link>
        </span> */}
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
          <Route path="/toggle" element={<MyTextEditorToggleButton />} />
          <Route path="/myHandsTable" element={<MyHandsonTable />} />
          <Route path="/capture" element={<Capture />} />
          <Route path="/stepper" element={<MyStepper />} />
          <Route path="/ck4" element={<CKEditorVer4 />} />
          <Route path="/r1" element={<Router1 />} />
          
{/*           
          <Route path="/imageList" element={<ReactImageList />} /> */}
          
          <Route
            path="/comments"
            element={<ReactComments currentUser={currentUser} />}
          />
          <Route
            path="/callback"
            element={
              <GitHubLoginCallBack
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
              />
            }
          />

          <Route path="/converter" element={<IPConverter />} />
          
          {/* <Route path="/mail" element={<ToastMailer />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
