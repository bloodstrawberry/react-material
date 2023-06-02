import React from "react";

import axios from "axios";

import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import DataObjectICON from "@mui/icons-material/DataObject";
import FolderIcon from "@mui/icons-material/Folder";

const getFileName = (path) => {
  if (path === undefined) return undefined;
  let spt = path.split("/");
  return spt[spt.length - 1];
};

const getMuiIcon = (fileName) => {
  if (fileName === undefined) return <TextSnippetIcon sx={{ fontSize: 60 }} />;

  let spt = fileName.split(".");
  if (spt.length === 1)
    return <FolderIcon sx={{ fontSize: 60, left: "50%" }} />;
  if (spt[1] === "json")
    return <DataObjectICON sx={{ fontSize: 60, left: "50%" }} />;
  return <TextSnippetIcon sx={{ fontSize: 60, left: "50%" }} />;
};

const downloadPC = (response, fileName) => {
  const url = window.URL.createObjectURL(
    new Blob([response.data], { type: `${response.headers["content-type"]}` })
  );

  let link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url); // memory 해제
};

const download = (pathInfo) => {
  if (pathInfo === undefined || pathInfo === "") return;

  let fileName = getFileName(pathInfo);

  if (fileName.includes(".") === false) return; // 폴더인 경우

  let server = `http://192.168.55.120:3002`;
  axios
    .get(`${server}/downloadFile?filePath=${pathInfo}`, {
      responseType: "arraybuffer",
    })
    .then((res) => {
      downloadPC(res, fileName);
    })
    .catch((error) => console.log(error));
};

const FileUI = ({ pathInfo }) => {
  return (
    <div
      style={{
        display: "inline-block",
        width: "110px",
        height: "120px",
        backgroundColor: "silver",
        textAlign: "center",
        margin: "10px",
        cursor: "pointer",
        verticalAlign: "top",
      }}
      onClick={() => download(pathInfo)}
    >
      {getMuiIcon(getFileName(pathInfo))}
      <div style={{ width: "110px", height: "40px", wordBreak: "break-all" }}>
        <span
          style={{
            fontSize: "12px",
            backgroundColor: "green",
            cursor: "pointer",
            display: "block",
            height: "50px",
          }}
        >
          {getFileName(pathInfo)}
        </span>
      </div>
    </div>
  );
};

export default FileUI;
