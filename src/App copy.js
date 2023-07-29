import React, { useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import { Textarea } from "@mui/joy";
import { Octokit } from "@octokit/rest";

import MarkdownPreview from "@uiw/react-markdown-preview";

let myKey = "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";

const App = () => {
  const [repo, setRepo] = useState("auto-test");
  const [path, setPath] = useState("README.md");
  const [contents, setContents] = useState("");

  const getSHA = async (octokit) => {
    const result = await octokit.request(
      `GET /repos/bloodstrawberry/${repo}/contents/${path}`,
      {
        owner: "bloodstrawberry",
        repo: `${repo}`,
        path: `${path}`,
      }
    );

    return await result.data.sha;
  };

  const fileWrite = async () => {
    const octokit = new Octokit({
      auth: myKey,
    });

    const currentSHA = await getSHA(octokit);
    const result = await octokit.request(
      `PUT /repos/bloodstrawberry/${repo}/contents/${path}`,
      {
        owner: "bloodstrawberry",
        repo: `${repo}`,
        path: `${path}`,
        message: "commit message!",
        sha: currentSHA,
        committer: {
          name: "bloodstrawberry",
          email: "bloodstrawberry@github.com",
        },
        content: `${btoa(unescape(encodeURIComponent(`${contents}`)))}`,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    console.log(result.status);
  };

  // const fileWrite = async () => {
  //   const octokit = new Octokit({
  //     auth: myKey,
  //   });

  //   const result = await octokit.request(
  //     `PUT /repos/bloodstrawberry/${repo}/contents/${path}`,
  //     {
  //       owner: "bloodstrawberry",
  //       repo: `${repo}`,
  //       path: `${path}`,
  //       message: "commit message!",
  //       committer: {
  //         name: "bloodstrawberry",
  //         email: "bloodstrawberry@github.com",
  //       },
  //       content: `${btoa(unescape(encodeURIComponent(`${contents}`)))}`,
  //       headers: {
  //         "X-GitHub-Api-Version": "2022-11-28",
  //       },
  //     }
  //   );

  //   console.log(result.status);
  // };

  const fileRead1 = async () => {
    const octokit = new Octokit({
      auth: myKey,
    });

    const result = await octokit.request(
      `GET /repos/bloodstrawberry/${repo}/contents/${path}`,
      {
        owner: "bloodstrawberry",
        repo: `${repo}`,
        path: `${path}`,
        headers: {
          //Accept: 'application/vnd.github.v3.raw', // Set the Accept header for streaming content
          Accept: "application/json; charset=utf-8",
        },
      }
    );

    console.log(result);
    setContents(decodeURIComponent(escape(window.atob(result.data.content))));
  };

  const fileRead = async () => {
    // console.log("hello");
    // fetch("/api/repos/bloodstrawberry/auto-test")
    //   .then((response) => console.log(response))
    //   //.then((data) => console.log(data))
    //   .catch((error) => console.error("Error:", error));

    // return;
    console.log(myKey);
    const octokit = new Octokit({
      auth: myKey,
    });

    const resultForUrl = await octokit.request(
      "GET /repos/bloodstrawberry/auto-test/contents/test/testtest.txt",
      {
        owner: "bloodstrawberry",
        repo: "auto-test",
        path: "test/testtest.txt",
        headers: {
          Accept: "application/vnd.github.v3.raw", // Set the Accept header for streaming content
          //Accept: 'application/json; charset=utf-8'
        },
      }
    );

    const downloadUrl = resultForUrl;

    console.log(downloadUrl);
    console.log(downloadUrl.data.download_url);
    return;

    const result = await octokit.request({
      method: "GET",
      url: downloadUrl.data.download_url,
      // headers: {
      //   Accept: 'application/octet-stream',
      // },
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      responseType: "stream",
    });

    console.log(result);
    setContents(result.data);
  };

  const test11 = async () => {
    const idb =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB ||
      window.shimIndexedDB;


    if(!idb) {
      console.log("Indexed DB 미지원 브라우저");
      return;
    }
    
    const request = idb.open("testDB", 2);
    
    request.onerror = (e) => {
      console.log("error", e);
    }

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      console.log(db);

      if(!db.objectStoreNames.contains("userData")) {
        var objectStore = db.createObjectStore("memo", { keyPath: "id" });

      }

    };

    request.onsuccess = (e) => {
      console.log("db open");
    }



    // console.log("zzzz");
    // console.log(indexedDB);

    // let db;
    // let request = indexedDB.open("test", 2);
    // console.log(request);
    // request.onupgradeneeded = (e) => {
    //   db = e.target.result;
    //   console.log(db);
    //   var objectStore = db.createObjectStore("memo", { keyPath: "id" });
    // };

    // request.onerror = (e) => alert("failed");
    // request.onsuccess = (e) => console.log(e); // 5. 성공시 db에 result를 저장
  };

  return (
    <div>
      <h1>깃허브 파일 편집기1</h1>
      <Stack sx={{ m: 5 }} spacing={2} direction="row">
        <Button variant="outlined" color="primary" onClick={test11}>
          불러오기
        </Button>
        <Button variant="outlined" color="primary" onClick={fileRead1}>
          불러오기
        </Button>
        <Button variant="outlined" color="primary" onClick={fileRead}>
          불러오기2
        </Button>

        <Button variant="outlined" color="secondary" onClick={fileWrite}>
          저장하기
        </Button>
      </Stack>
      <Stack sx={{ m: 5 }} spacing={2} direction="row">
        <TextField
          id="outlined-required"
          label="repository"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
        />
        <TextField
          id="outlined-required"
          label="filePath"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
      </Stack>
      <Stack sx={{ m: 5 }}>
        <Textarea
          name="Primary"
          placeholder="Type in here…"
          variant="outlined"
          color="primary"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
      </Stack>

      <Stack sx={{ m: 2 }}>
        {/* <ReactMarkdown>{contents}</ReactMarkdown>
         */}
        <MarkdownPreview source={contents} />
      </Stack>
    </div>
  );
};

export default App;

// import { Route, Link, Routes } from "react-router-dom";

// import './App.css';

// import ButtonTest from "./page/ButtonTest";
// import MaterialTable from "./page/MaterialTable";
// import TreeViewExample from "./page/TreeViewExample";
// import TreeViewExample2 from "./page/TreeViewExample2";
// import { useEffect, useState } from "react";
// import FileBrowser from "./page/FileBrowser";
// import MyAutoComplete from "./page/MyAutoComplete";
// import LoadingBar from "./page/LoadingBar";

// const useTitle = (initialTitle) => {
//   const [title, setTitle] = useState(initialTitle);
//   const updateTitle = () => {
//     const htmlTitle = document.querySelector("title");
//     htmlTitle.innerText = title;
//   };
//   useEffect(updateTitle, [title]);
//   return setTitle;
// }
// function App() {
//   const titleUpdator = useTitle("Loading...");
//   setTimeout(() => titleUpdator("Home"), 1000);

//   return (
//     <div className="App">
//       <div className="router">
//         <span>
//           <Link to="/btn">Button Test</Link>
//         </span>
//         <span>
//           <Link to="/mtable">Material Table</Link>
//         </span>
//         <span>
//           <Link to="/tvexp">Tree View</Link>
//         </span>
//         <span>
//           <Link to="/tvexp2">Tree View 2</Link>
//         </span>
//         <span>
//           <Link to="/fileBrowser">FileBrowser</Link>
//         </span>
//         <span>
//           <Link to="/autoComplete">Auto Complete</Link>
//         </span>
//         <span>
//           <Link to="/loadingBar">Loading</Link>
//         </span>

//       </div>
//       <div>
//         <Routes>
//           <Route path="/btn" element={<ButtonTest />} />
//           <Route path="/mtable" element={<MaterialTable />} />
//           <Route path="/tvexp" element={<TreeViewExample />} />
//           <Route path="/tvexp2" element={<TreeViewExample2 />} />
//           <Route path="/fileBrowser" element={<FileBrowser />} />
//           <Route path="/autoComplete" element={<MyAutoComplete />} />
//           <Route path="/loadingBar" element={<LoadingBar />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;
