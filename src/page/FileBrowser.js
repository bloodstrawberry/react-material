import React, { useEffect, useState } from "react";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import FileUI from "./FileUI";

// let localData = {
//   child: [
//     {
//       label: "D:",
//       nodeId: 0,
//       child: [
//         {
//           label: "github",
//           nodeId: 1,
//           child: [
//             {
//               label: "globfiles",
//               nodeId: 2,
//               child: [
//                 {
//                   label: "abc1",
//                   nodeId: 3,
//                   child: [
//                     { label: "abc1_jsonfile1.json", nodeId: 4 },
//                     { label: "abc1_jsonfile2.json", nodeId: 5 },
//                     { label: "abc1_textfile1.txt", nodeId: 6 },
//                     { label: "abc1_textfile2.txt", nodeId: 7 },
//                     {
//                       label: "abc2",
//                       nodeId: 8,
//                       child: [
//                         { label: "abc2_jsonfile.json", nodeId: 12 },
//                         {
//                           label: "abc3",
//                           nodeId: 13,
//                           child: [
//                             { label: "abc3_jsonfile.json", nodeId: 14 },
//                             { label: "abc3_textfile.txt", nodeId: 15 },
//                           ],
//                         },
//                       ],
//                     },
//                     {
//                       label: "abc2_2",
//                       nodeId: 9,
//                       child: [
//                         { label: "abc2_2_jsonfile.json", nodeId: 10 },
//                         { label: "abc2_2_textfile.txt", nodeId: 11 },
//                       ],
//                     },
//                   ],
//                 },
//                 {
//                   label: "def1",
//                   nodeId: 16,
//                   child: [
//                     { label: "def_jsonfile1.json", nodeId: 17 },
//                     { label: "def_jsonfile2.json", nodeId: 18 },
//                     { label: "def_textfile1.txt", nodeId: 19 },
//                     { label: "def_textfile2.txt", nodeId: 20 },
//                   ],
//                 },
//                 {
//                   label: "ghi1",
//                   nodeId: 21,
//                   child: [
//                     {
//                       label: "ghi2",
//                       nodeId: 22,
//                       child: [
//                         { label: "ghi2_jsonfile1.json", nodeId: 23 },
//                         { label: "ghi2_jsonfile2.json", nodeId: 24 },
//                         { label: "ghi2_textfile1.txt", nodeId: 25 },
//                         { label: "ghi2_textfile2.txt", nodeId: 26 },
//                       ],
//                     },
//                   ],
//                 },
//                 { label: "jsonfile1.json", nodeId: 27 },
//                 { label: "jsonfile2.json", nodeId: 28 },
//                 { label: "textfile1.txt", nodeId: 29 },
//                 { label: "textfile2.txt", nodeId: 30 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

const FileBrowser = () => {
  const [treeInfo, setTreeInfo] = useState({});
  const [fileUi, setFileUI] = useState([]);

  const [idMap, setIdMap] = useState({});
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState([]);

  let nodeId = 0;
  const appendChild = (arr, info, path, tmpIdMap) => {
    if (arr.child === undefined) arr.child = [];
    if (arr.child.findIndex((item) => item.label === info) === -1) {
      console.log(path);
      arr.child.push({ label: info, nodeId });
      tmpIdMap[path] = nodeId.toString();
      nodeId++;
    }
  };

  const makeDirectories = (directories) => {
    let tmpTreeInfo = {};
    let tmpIdMap = {};

    let dir = ["D:", "D:/github", ...directories];
    console.log(dir);

    for (let d of dir) {
      let split = d.split("/");
      let len = split.length;
      let current = tmpTreeInfo;

      for (let i = 0; i < len; i++) {
        appendChild(current, split[i], d, tmpIdMap);
        current = current.child.find((item) => item.label === split[i]);
      }
    }

    //console.log(tmpTreeInfo);
    setIdMap(tmpIdMap);
    setTreeInfo(tmpTreeInfo);
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
  }

  const handleSelect = (event, ids) => {
    setSelected(ids);
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "20% 1% auto",
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
