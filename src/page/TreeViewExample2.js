import React, { useEffect, useState } from "react";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

const TreeViewExample2 = () => {
  const [treeInfo, setTreeInfo] = useState({});

  let tmpTreeInfo = {};
  let nodeId = 0;
  const appendChild = (arr, info) => {
    if (arr.child === undefined) arr.child = [];
    if (arr.child.findIndex((item) => item.label === info) === -1) {
      arr.child.push({ label: info, nodeId });
      nodeId++;
    }
  };

  const makeDirectories = (directories) => {
    tmpTreeInfo = {};
    for (let d of directories) {
      let split = d.split("/");
      let len = split.length;
      let current = tmpTreeInfo;

      for (let i = 0; i < len; i++) {
        appendChild(current, split[i]);
        current = current.child.find((item) => item.label === split[i]);
      }
    }

    console.log(tmpTreeInfo);
    setTreeInfo(tmpTreeInfo);
  };

  const getFiles = () => {
    let server = `http://192.168.55.120:3002`;
    let path = `D:\\github\\globfiles\\**`;
    fetch(`${server}/useGlob?path=${path}`)
      .then((res) => res.json())
      .then((data) => makeDirectories(data.findPath));
  };

  const makeTreeItem = (info, parent) => {
    if (info.child === undefined) return;

    return info.child.map((item, idx) => (
      <TreeItem
        key={idx}
        nodeId={item.nodeId.toString()}
        label={item.label}
        onClick={() => console.log(`${parent}/${item.label}`)}
      >
        {makeTreeItem(item, `${parent}/${item.label}`)}
      </TreeItem>
    ));
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div>
      {/* <button onClick={getFiles}>test</button> */}
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        //sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {makeTreeItem(treeInfo, "")}
      </TreeView>
    </div>
  );
};

export default TreeViewExample2;
