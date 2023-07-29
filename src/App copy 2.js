import React, { useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import { Textarea } from "@mui/joy";
import { Octokit } from "@octokit/rest";

import * as idblib from "./indexeddblibrary.js";

let myKey = atob("Z2hwX3BWOHE1S2JyeEJUc0ZURFU4eUFCVFVYQk5lWlBWajE5VGxiMw==");

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
    let date = new Date();
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
        // content: `${btoa(`${contents}`)}`,
        content: `${btoa(unescape(encodeURIComponent(`${contents}`)))}`,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    console.log(result);

    if (result.status === 200) {
      let tempData = {
        id: "temp",
        contents,
        date,
      };

      idblib.addDataToIndexedDB(tempData);
    }
  };

  const fileRead = async () => {
    console.log(myKey);
    const octokit = new Octokit({
      auth: myKey,
    });

    const result = await octokit.request(
      `GET /repos/bloodstrawberry/${repo}/contents/${path}`,
      {
        owner: "bloodstrawberry",
        repo: `${repo}`,
        path: `${path}`,
      }
    );

    let content = decodeURIComponent(escape(window.atob(result.data.content)));

    let modifiedDate = new Date(result.headers["last-modified"]);
    let mdTime = parseInt(modifiedDate.getTime() / 6000);

    let tempData = await idblib.getDataFromIndexedDB("temp");
    if (tempData === undefined) {
      setContents(content);
      return;
    }

    let tempTime = parseInt(tempData.date.getTime() / 6000);
    console.log(result);
    console.log(modifiedDate);
    console.log({ mdTime, tempTime });
    if (mdTime < tempTime) {
      console.log(tempData);
      content = tempData.contents;
    }

    // setContents(atob(result.data.content));
    setContents(content);
  };

  return (
    <div>
      <h1>깃허브 파일 편집기</h1>
      <Stack sx={{ m: 5 }} spacing={2} direction="row">
        <Button variant="outlined" color="primary" onClick={fileRead}>
          불러오기
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
    </div>
  );
};

export default App;
