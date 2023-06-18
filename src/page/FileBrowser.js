import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import FileUI from "./FileUI";

const FileBrowser = () => {
  const [treeInfo, setTreeInfo] = useState({});
  const [fileUi, setFileUI] = useState([]);

  const [idMap, setIdMap] = useState({});
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState([]);

  const [id, setId] = useState(0);

  let nodeId = 0;
  const appendChild = (arr, info, path, tmpIdMap) => {
    if (arr.child === undefined) arr.child = [];
    if (arr.child.findIndex((item) => item.label === info) === -1) {
      arr.child.push({ label: info, nodeId });
      tmpIdMap[path] = nodeId.toString();
      nodeId++;
    }
  };

  const makeDirectories = (directories) => {
    let tmpTreeInfo = {};
    let tmpIdMap = {};

    let dir = ["D:", "D:/github", ...directories];

    for (let d of dir) {
      let split = d.split("/");
      let len = split.length;
      let current = tmpTreeInfo;

      for (let i = 0; i < len; i++) {
        appendChild(current, split[i], d, tmpIdMap);
        current = current.child.find((item) => item.label === split[i]);
      }
    }

    setIdMap(tmpIdMap);
    setTreeInfo(tmpTreeInfo);
    setId(nodeId);
  };

  const getFiles = () => {
    // setTreeInfo(localData);
    // return;
    let server = `http://192.168.55.120:3002`;
    let path = `D:\\github\\globfiles\\**`;

    fetch(`${server}/useGlob?path=${path}`)
      .then((res) => res.json())
      .then((data) => makeDirectories(data.findPath));
  };

  const isFile = (path) => {
    let spt = path.split("/");
    return spt[spt.length - 1].includes(".");
  };

  const sortFileUI = (path) => {
    let dir = path.filter((val) => isFile(val) === false);
    let files = path.filter((val) => isFile(val));

    dir.sort();
    files.sort();

    setFileUI([...dir, ...files]);
  };

  const getFilesForFileBrowser = (path) => {
    let server = `http://192.168.55.120:3002`;

    /* /D:/... 앞의 / 삭제 */
    path = path.substring(1, path.length);

    fetch(`${server}/useGlob?path=${path}/*`)
      .then((res) => res.json())
      .then((data) => sortFileUI(data.findPath));
  };

  const makeTreeItem = (info, parent) => {
    if (info.child === undefined) return;

    return info.child.map((item, idx) => (
      <TreeItem
        key={idx}
        nodeId={item.nodeId.toString()}
        label={item.label}
        onClick={() => getFilesForFileBrowser(`${parent}/${item.label}`)}
      >
        {makeTreeItem(item, `${parent}/${item.label}`)}
      </TreeItem>
    ));
  };

  useEffect(() => {
    getFiles();
  }, []);

  const handleToggle = (event, ids) => {
    setExpanded(ids);
  };

  const handleSelect = (event, ids) => {
    setSelected(ids);
  };

  const handleExpandClick = () => {
    let fullExpanded = [];
    for (let i = 0; i <= id; i++) fullExpanded.push(i.toString());

    setExpanded((oldExpanded) =>
      oldExpanded.length === 0 ? fullExpanded : []
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "25% 1% auto",
        gridGap: "25px",
        width: "100%",
      }}
    >
      {/* <button onClick={getFiles}>test</button> */}
      <div>
        <a
          href="https://bloodstrawberry.tistory.com/1175"
          target="_blank"
          rel="noreferrer"
        >
          Node Server 구현 필요
        </a>
        <Box sx={{ mb: 1 }}>
          <Button onClick={handleExpandClick}>
            {expanded.length === 0 ? "Expand all" : "Collapse all"}
          </Button>
        </Box>
        <TreeView
          expanded={expanded}
          onNodeToggle={handleToggle}
          selected={selected}
          onNodeSelect={handleSelect}
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 500, overflowX: "hidden" }}
          //sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
          {makeTreeItem(treeInfo, "")}
        </TreeView>
      </div>
      <div style={{ borderRight: "2px solid black" }} />
      <div>
        {fileUi.map((f, idx) => (
          <FileUI
            key={idx}
            pathInfo={f}
            idMap={idMap}
            tvfunc={{ expanded, setExpanded, setSelected, sortFileUI }}
          />
        ))}
      </div>
    </div>
  );
};

export default FileBrowser;
