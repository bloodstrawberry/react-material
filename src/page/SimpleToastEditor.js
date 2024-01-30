import React, { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// GitHub RESTful API
import { Octokit } from "@octokit/rest";

// Toast UI Editor
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css"; // Viewer css
import { Editor } from "@toast-ui/react-editor";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";

// Dark Theme 적용
// import '@toast-ui/editor/dist/toastui-editor.css';
// import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

// Color Syntax Plugin
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

// Table Merged Cell Plugin
import "@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";

import axios from "axios";

const colorSyntaxOptions = {
  preset: [
    "#333333", "#666666", "#FFFFFF", "#EE2323", "#F89009", "#009A87", "#006DD7", "#8A3DB6",
    "#781B33", "#5733B1", "#953B34", "#FFC1C8", "#FFC9AF", "#9FEEC3", "#99CEFA", "#C1BEF9",
  ],
};

//const CONTENT_KEY = "CONTENT_KEY";

let myKey = process.env.REACT_APP_MY_TOKEN;

const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}_${month}_${day}_${hours}_${minutes}_${seconds}`;
}

const extractDataUrlImages = (inputString) => {
  // 정규식을 사용하여 Data URL 형식 찾기
  const regex = /!\[image\.png\]\(data:image\/png;base64,([^)]*)\)/g;
  const matches = inputString.match(regex);

  if (matches) {
      const imageDataArray = matches.map(match => match.replace(regex, '$1'));
      return {matches, imageDataArray};
  } else {
      return [];
  }
}

const App = () => {
  const editorRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const repo = "auto-test";
  const path = "README.md";

  const getSHA = async (octokit) => {
    const result = await octokit.request(
      `GET /repos/bloodstrawberry/${repo}/contents/${path}`,
      {
        owner: "bloodstrawberry",
        repo: `${repo}`,
        path: `${path}`,
      }
    );

    return result.data.sha;
  };

  const fileWrite = async (contents) => {
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

  const fileRead = async () => {
    const octokit = new Octokit({
      auth: myKey,
    });

    const result = await octokit.request(
      `GET /repos/bloodstrawberry/${repo}/contents/${path}`,
      {
        owner: "bloodstrawberry",
        repo: `${repo}`,
        path: `${path}`,
        encoding: "utf-8",
        decoding: "utf-8",
      }
    );

    return result;
  };

  const githubUpload = async (imageDataUrls, currentTime) => {
    if (imageDataUrls.length === 0) {
      console.error("Please paste an image first.");
      return;
    }

    for (let index = 0; index < imageDataUrls.length; index++) {
      const base64encoded = imageDataUrls[index];
      const filePath = `images/image_${currentTime}_${index}.jpg`;
      const apiURL = `https://api.github.com/repos/bloodstrawberry/auto-test/contents/${filePath}`;
      const accessToken = process.env.REACT_APP_MY_TOKEN;

      // fileWrite 후 3초 뒤에 실행하기 위해 앞으로 이동 (충돌 방지)
      await new Promise((resolve) => setTimeout(resolve, 3000)); 

      try {        
        const response = await axios.put(
          apiURL,
          {
            message: `Add image ${index + 1}`,
            content: base64encoded,
            branch: "main",
          },
          {
            headers: {
              Authorization: `token ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(
          `Image ${index + 1} uploaded successfully:`,
          response.data.content.name
        );
      } catch (error) {
        console.error(`Error uploading image ${index + 1}:`, error);
      }
    }
  };

  const handleSave = () => {
    let currentTime = getCurrentDateTime();
    let markDownContent = editorRef.current.getInstance().getMarkdown();    
    let {matches, imageDataArray} = extractDataUrlImages(markDownContent);    
    
    // base64 text를 링크로 변경
    for(let index = 0; index < matches.length; index++) {
      const filePath = `images/image_${currentTime}_${index}.jpg`;
      markDownContent = markDownContent.replace(matches[index], `![image](https://github.com/bloodstrawberry/auto-test/raw/main/${filePath})`);
    }

    fileWrite(markDownContent);
    
    // 이미지 업로드
    githubUpload(imageDataArray, currentTime);
  };

  const initReadMe = async () => {
    // let item = localStorage.getItem(CONTENT_KEY);
    let result = await fileRead();
    let contents = decodeURIComponent(escape(window.atob(result.data.content)));
    console.log(contents);

    if (editMode === false) {
      const viewer = new Viewer({
        el: document.querySelector(".toast-editor-viewer"),
        viewer: true,
        height: "600px",
        usageStatistics: false, // 통계 수집 거부
        plugins: [tableMergedCell],
      });

      viewer.setMarkdown(contents);
    }

    if (editorRef.current)
      editorRef.current.getInstance().setMarkdown(contents);
  };

  useEffect(() => {
    initReadMe();
  }, [editMode]);

  return (
    <div>
      <Box sx={{ m: 2 }}>
        <h1>Toast UI Editor</h1>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ m: 1 }}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "취소하기" : "편집하기"}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ m: 1 }}
          onClick={handleSave}
          disabled={editMode === false}
        >
          저장하기
        </Button>

        {editMode === false && <div className="toast-editor-viewer"></div>}

        {editMode === true && (
          <Editor
            ref={editorRef}
            // initialValue={initContents}
            height="600px"
            placeholder="Please Enter Text."
            previewStyle="tab" // or vertical
            initialEditType="wysiwyg" // or markdown
            // hideModeSwitch={true} // 하단 숨기기
            toolbarItems={[
              // 툴바 옵션 설정
              ["heading", "bold", "italic", "strike"],
              ["hr", "quote"],
              ["ul", "ol", "task", "indent", "outdent"],
              ["table", /* "image", */ "link"],
              ["code", "codeblock"],
            ]}
            //theme="dark"
            //useCommandShortcut={false} // 키보드 입력 컨트롤 방지 ex ctrl z 등
            usageStatistics={false} // 통계 수집 거부
            plugins={[[colorSyntax, colorSyntaxOptions], tableMergedCell]}
          />
        )}
      </Box>
    </div>
  );
};

export default App;