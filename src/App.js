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
import * as ck from "./cookielibrary.js";
import ReactCookie from "./page/ReactCookie.js";
import IPConverter from "./page/IPConverter.js";
import ToastMailer from "./page/ToastMailer.js";
import TableCRUD from "./page/TableCRUD";

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

  useEffect(() => {
    if(loginStatus === false) return;
    let loginID = ck.getCookies("LOGIN_ID");
    let url = ck.getCookies("AVATAR_URL");
    let profile = `https://github.com/${loginID}`;

    setCurrentUser({
      currentUserId: loginID,
      currentUserImg: url,
      currentUserProfile: profile,
      currentUserFullName: loginID,
    });
  }, [loginStatus]);


  const titleUpdator = useTitle("Loading...");
  setTimeout(() => titleUpdator("Home"), 1000);

  useEffect(() => {
    gh.loginCheck(setLoginStatus);
  }, []);

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
          <Link to="/crud">CRUD Table</Link>
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
        <span>
          <Link to="/mail">Toast Mail</Link>
        </span>
        
        
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
          <Route path="/cookie" element={<ReactCookie />} />
          <Route path="/converter" element={<IPConverter />} />
          <Route path="/crud" element={<TableCRUD />} />
          
          {/* <Route path="/mail" element={<ToastMailer />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
