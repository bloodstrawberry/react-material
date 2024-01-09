import React from "react";

import Button from "@mui/material/Button";

import { Octokit } from "@octokit/rest";

let myKey = atob(process.env.REACT_APP_MY_TOKEN);

const repo = `auto-test`; // my repository
const path = `handsontable.json`; // fileName;

const SaveButtonGitHub = ({ myHandsOnTable }) => {
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

  const fileExist = async () => {
    try {
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

      return true;
    } catch (e) {
      return false;
    }
  };

  const fileCreate = async (contents) => {
    const octokit = new Octokit({
      auth: myKey,
    });

    const result = await octokit.request(
      `PUT /repos/bloodstrawberry/${repo}/contents/${path}`,
      {
        owner: "bloodstrawberry",
        repo: `${repo}`,
        path: `${path}`,
        message: "commit message!",
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

  const getEmptyArray = () => {
    let row = myHandsOnTable.getData().length;
    let col = myHandsOnTable.getData()[0].length;
    let emptyArray = [];

    for (let r = 0; r < row; r++) {
      emptyArray[r] = [];
      for (let c = 0; c < col; c++)
        emptyArray[r][c] = {
          className: undefined,
          style: {
            fontWeight: undefined,
            fontStyle: undefined,
            textDecoration: undefined,
            color: undefined,
            backgroundColor: undefined,
          },
        };
    }
    return emptyArray;
  };

  const saveGitHub = async () => {
    let data = myHandsOnTable.getData();
    let cellStyle = getEmptyArray();
    let row = cellStyle.length;
    let col = cellStyle[0].length;
    for (let r = 0; r < row; r++) {
      for (let c = 0; c < col; c++) {
        let cellInfo = myHandsOnTable.getCell(r, c);
        cellStyle[r][c].className = cellInfo.className;
        cellStyle[r][c].style.fontWeight = cellInfo.style.fontWeight;
        cellStyle[r][c].style.fontStyle = cellInfo.style.fontStyle;
        cellStyle[r][c].style.textDecoration = cellInfo.style.textDecoration;
        cellStyle[r][c].style.color = cellInfo.style.color;
        cellStyle[r][c].style.backgroundColor = cellInfo.style.backgroundColor;
      }
    }

    let comments = [];
    let mergeCells = [];
    for (let r = 0; r < row; r++) {
      for (let c = 0; c < col; c++) {
        let cellMeta = myHandsOnTable.getCellMeta(r, c);
        //console.log(cellMeta);
        if (cellMeta.comment)
          comments.push({
            row: r,
            col: c,
            comment: { value: cellMeta.comment.value },
          });

        if (cellMeta.spanned) {
          let rowspan = myHandsOnTable.getCell(r, c).rowSpan;
          let colspan = myHandsOnTable.getCell(r, c).colSpan;

          mergeCells.push({ row: r, col: c, rowspan, colspan });
        }
      }
    }

    let json = { data, cellStyle, comments, mergeCells };
    // localStorage.setItem(ALL_DATA_KEY, JSON.stringify(json));

    let checkFileExist = await fileExist();
    if (checkFileExist) fileWrite(JSON.stringify(json, null, 2));
    else fileCreate(JSON.stringify(json, null, 2));
  };

  return (
    <Button
      sx={{ m: 2 }}
      variant="outlined"
      color="warning"
      onClick={saveGitHub}
    >
      깃허브 저장하기
    </Button>
  );
};

export default SaveButtonGitHub;
