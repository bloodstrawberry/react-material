import React, { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import * as gh from "../githublibrary.js";
import Swal from "sweetalert2";

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

const colorSyntaxOptions = {
  preset: [
    "#333333",
    "#666666",
    "#FFFFFF",
    "#EE2323",
    "#F89009",
    "#009A87",
    "#006DD7",
    "#8A3DB6",
    "#781B33",
    "#5733B1",
    "#953B34",
    "#FFC1C8",
    "#FFC9AF",
    "#9FEEC3",
    "#99CEFA",
    "#C1BEF9",
  ],
};

let myKey = process.env.REACT_APP_MY_TOKEN;

const SimpleToastEditor = () => {
  const editorRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const repo = "auto-test";
  const path = "README.md";
  //const path = "test/testtest.txt";

  const getSHAforMainFile = async (octokit) => {
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

  const getSHAforBranchFile = async (octokit, branchName) => {
    const result = await octokit.request(
      `GET /repos/bloodstrawberry/${repo}/contents/${path}`,
      {
        owner: "bloodstrawberry",
        repo: `${repo}`,
        path: `${path}`,
        ref: branchName, // 브랜치 이름을 ref에 지정
      }
    );

    return await result.data.sha;
  };

  const getSHAforMain = async (octokit) => {
    const response = await octokit.git.getRef({
      owner: "bloodstrawberry",
      repo: `${repo}`,
      ref: "heads/main", // main 브랜치의 이름
    });

    return await response.data.object.sha;
  };

  const getSHAforBranch = async (octokit, branchName) => {
    const branch = await octokit.repos.getBranch({
      owner: "bloodstrawberry",
      repo: repo,
      branch: branchName,
    });

    return await branch.data.commit.sha;
  };

  const createPullRequest1 = async (branchName) => {
    try {
      const octokit = new Octokit({
        auth: myKey,
      });

      // Pull Request 생성 요청
      const response = await octokit.pulls.create({
        owner: "bloodstrawberry",
        repo: `${repo}`,
        title: "진짜 최종 마지막 PR !!!!!!!!!!!!",
        body: "이거는 body당당 ㅋㅋㅋ",
        head: branchName, // 본인의 브랜치명으로 변경
        base: "main", // 기본 브랜치명으로 변경
      });

      // Pull Request가 생성되었습니다.
      console.log("Pull Request Created:", response.data);

      const mergeResponse = await octokit.pulls.merge({
        owner: "bloodstrawberry",
        repo: `${repo}`,
        pull_number: response.data.number, // 생성된 PR의 번호를 사용
        merge_method: "merge", // "merge"로 지정하여 강제로 병합
        merge: true, // 강제 병합 설정
      });

      console.log("Pull Request Merged:", mergeResponse.data);
    } catch (error) {
      console.error("Error creating Pull Request:", error);
    }
  };

  const createPullRequest = async (branchName, title = "ZZZ", body ="TTTT") => {
    const octokit = new Octokit({
      auth: myKey,
    });

    const result = await octokit.pulls.create({
      owner: "bloodstrawberry",
      repo: `${repo}`,
      title,
      body,
      head: branchName, // 현재 브랜치
      base: "main",
    });

    console.log(result);
    console.log("Pull Request Created:", result.data);

    const mergeResult = await octokit.pulls.merge({
      owner: "bloodstrawberry",
      repo: `${repo}`,
      pull_number: result.data.number, // 생성된 PR의 번호를 사용
    });

    console.log(mergeResult);
    console.log("Pull Request Merged:", mergeResult.data);
  };

  const fileWrite = async (contents, commitMsg, branchName) => {
    const octokit = new Octokit({
      auth: myKey,
    });

    const currentSHA = await getSHAforMainFile(octokit);
    const currentSHA1 = await getSHAforBranchFile(octokit, branchName);
    const currentSHA2 = await getSHAforMain(octokit);
    const currentSHA3 = await getSHAforBranch(octokit, branchName);
    console.log(currentSHA, currentSHA1, currentSHA2, currentSHA3);

    const result = await octokit.request(
      `PUT /repos/bloodstrawberry/${repo}/contents/${path}`,
      {
        owner: "bloodstrawberry",
        repo: `${repo}`,
        path: `${path}`,
        message: commitMsg,
        sha: currentSHA1,
        committer: {
          name: "bloodstrawberry",
          email: "bloodstrawberry@github.com",
        },
        content: `${btoa(unescape(encodeURIComponent(`${contents}`)))}`,
        branch: branchName,
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

    return await result;
  };

  const handleSave = async () => {
    let status = await gh.getLoginStatus();

    if (status) {
      let loginID = localStorage.getItem("LOGIN_ID");
      let markDownContent = editorRef.current.getInstance().getMarkdown();

      fileWrite(markDownContent, `submitted by ${loginID}`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "로그인 해주세요!!",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const clientID = process.env.REACT_APP_CLIENT_ID;
          const callbackURL = "http://localhost:3000/callback";
          const loginURL = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=repo:status read:repo_hook user:email&redirect_uri=${callbackURL}`;
          window.open(loginURL);
        }
      });
    }
  };

  const handleDelete = async () => {
    const octokit = new Octokit({
      auth: myKey,
    });
    const currentSHA = await getSHAforMainFile(octokit);
    const result = await octokit.request(
      `DELETE /repos/bloodstrawberry/${repo}/contents/${path}`,
      {
        owner: "bloodstrawberry",
        repo: `${repo}`,
        path: `${path}`,
        message : "delete!!",
        sha: currentSHA,        
      }
    );
    
    console.log(result);
    return await result;
  }

  const handleCreate= async (contents = "test!!") => {
    const octokit = new Octokit({
      auth: myKey,
    });

    contents = "testzz";
    const result = await octokit.request(
      `PUT /repos/bloodstrawberry/${repo}/contents/${path}`,
      {
        owner: "bloodstrawberry",
        repo: `${repo}`,
        message : "create!!",
        content: `${btoa(unescape(encodeURIComponent(`${contents}`)))}`,
        committer: {
          name: "bloodstrawberry",
          email: "bloodstrawberry@github.com",
        },
      }
    );
    
    console.log(result);
    return await result;
  }

  const initReadMe = async () => {
    // let item = localStorage.getItem(CONTENT_KEY);
    let result = await fileRead();
    let contents = decodeURIComponent(escape(window.atob(result.data.content)));
    //console.log(contents);

    if (editMode === false) {
      const viewer = new Viewer({
        el: document.querySelector(".toast-editor-viewer"),
        viewer: true,
        height: "400px",
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

  const gitPR = async () => {
    const octokit = new Octokit({
      auth: myKey,
    });

    const result = await octokit.pulls.create(
      `GET /repos/bloodstrawberry/${repo}/pulls`,
      {
        owner: "bloodstrawberry",
        repo: `${repo}`,
      }
    );

    // let prTitle = "zzzz";

    // const response = await octokit.pulls.create({
    //   owner: "bloodstrawberry",
    //   repo: `${repo}`,
    //   title: prTitle,
    //   head: 'test', // 본인의 브랜치명으로 변경
    //   base: 'main', // 기본 브랜치명으로 변경
    // });

    // const result = octokit.request(`POST /repos/bloodstrawberry/${repo}/pulls`, {
    //   owner: "bloodstrawberry",
    //   repo: `${repo}`,
    //   title: 'Amazing new feature',
    //   body: 'Please pull these awesome changes in!',
    //   head: 'test2',
    //   base: 'main',
    // })

    return await result;
  };

  const prtest = async () => {
    createPullRequest();
  };

  const deleteBranch = async (branchName) => {
    const octokit = new Octokit({
      auth: myKey,
    });

    const result = await octokit.git.deleteRef({
      owner: "bloodstrawberry",
      repo: `${repo}`,
      ref: `heads/${branchName}`, // 새로운 브랜치 이름
    });

    console.log("delete!!", result);
  };

  const makeBranch = async (branchName) => {
    const octokit = new Octokit({
      auth: myKey,
    });

    const currentSHA = await getSHAforMain(octokit);
    console.log(currentSHA);

    const result = await octokit.git.createRef({
      owner: "bloodstrawberry",
      repo: `${repo}`,
      ref: `refs/heads/${branchName}`, // 새로운 브랜치 이름
      sha: currentSHA, // 기반 커밋의 SHA
    });

    console.log(result);
    return await result;
  };

  const superMerge = async () => {
    let branchName = "test3";
    let result = await makeBranch(branchName);
    console.log(result);
    result = await fileWrite(
      "real real lastlast !what the money is good! very good!!",
      "strawberrasdfy!!",
      branchName
    );
    console.log(result);

    result = await createPullRequest(branchName);
    console.log(result);

    deleteBranch(branchName);
  };

  return (
    <div>
      <Box sx={{ m: 2 }}>
        <h1>Toast UI Editor</h1>
        <button onClick={makeBranch}>Make Branch</button>

        <button onClick={prtest}>PR TEST</button>
        <button onClick={superMerge}>Super Merge</button>

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
        <Button
          variant="outlined"
          color="error"
          sx={{ m: 1 }}
          onClick={handleDelete}
        >
          삭제하기
        </Button>

        <Button
          variant="outlined"
          color="error"
          sx={{ m: 1 }}
          onClick={handleCreate}
        >
          만들기
        </Button>

        {editMode === false && <div className="toast-editor-viewer"></div>}

        {editMode === true && (
          <Editor
            ref={editorRef}
            // initialValue={initContents}
            height="400px"
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

export default SimpleToastEditor;
