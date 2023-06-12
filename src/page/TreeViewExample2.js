import React, { useEffect, useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

let localData = {
  child: [
    {
      label: "D:",
      nodeId: 0,
      child: [
        {
          label: "github",
          nodeId: 1,
          child: [
            {
              label: "globfiles",
              nodeId: 2,
              child: [
                {
                  label: "abc1",
                  nodeId: 3,
                  child: [
                    { label: "abc1_jsonfile1.json", nodeId: 4 },
                    { label: "abc1_jsonfile2.json", nodeId: 5 },
                    { label: "abc1_textfile1.txt", nodeId: 6 },
                    { label: "abc1_textfile2.txt", nodeId: 7 },
                    {
                      label: "abc2",
                      nodeId: 8,
                      child: [
                        { label: "abc2_jsonfile.json", nodeId: 12 },
                        {
                          label: "abc3",
                          nodeId: 13,
                          child: [
                            { label: "abc3_jsonfile.json", nodeId: 14 },
                            { label: "abc3_textfile.txt", nodeId: 15 },
                          ],
                        },
                      ],
                    },
                    {
                      label: "abc2_2",
                      nodeId: 9,
                      child: [
                        { label: "abc2_2_jsonfile.json", nodeId: 10 },
                        { label: "abc2_2_textfile.txt", nodeId: 11 },
                      ],
                    },
                  ],
                },
                {
                  label: "def1",
                  nodeId: 16,
                  child: [
                    { label: "def_jsonfile1.json", nodeId: 17 },
                    { label: "def_jsonfile2.json", nodeId: 18 },
                    { label: "def_textfile1.txt", nodeId: 19 },
                    { label: "def_textfile2.txt", nodeId: 20 },
                  ],
                },
                {
                  label: "ghi1",
                  nodeId: 21,
                  child: [
                    {
                      label: "ghi2",
                      nodeId: 22,
                      child: [
                        { label: "ghi2_jsonfile1.json", nodeId: 23 },
                        { label: "ghi2_jsonfile2.json", nodeId: 24 },
                        { label: "ghi2_textfile1.txt", nodeId: 25 },
                        { label: "ghi2_textfile2.txt", nodeId: 26 },
                      ],
                    },
                  ],
                },
                { label: "jsonfile1.json", nodeId: 27 },
                { label: "jsonfile2.json", nodeId: 28 },
                { label: "textfile1.txt", nodeId: 29 },
                { label: "textfile2.txt", nodeId: 30 },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const TreeViewExample2 = () => {
  const [treeInfo, setTreeInfo] = useState({});

  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  /*
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
  */

  const getFiles = () => {
    setTreeInfo(localData);
    return;
    // let server = `http://192.168.55.120:3002`;
    // let path = `D:\\github\\globfiles\\**`;
    // fetch(`${server}/useGlob?path=${path}`)
    //   .then((res) => res.json())
    //   .then((data) => makeDirectories(data.findPath));
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

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const handleExpandClick = () => {
    let fullExpanded = [];
    for(let i = 0; i <= 30; i++) fullExpanded.push(i.toString());

    setExpanded((oldExpanded) =>
      oldExpanded.length === 0 ? fullExpanded : []
    );
  };

  const handleSelectClick = () => {
    setSelected((oldSelected) =>
      oldSelected.length === 0
        ? ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
        : []
    );
  };

  return (
    <div>
      {/* <button onClick={getFiles}>test</button> */}
      <Box sx={{ mb: 1 }}>
        <Button onClick={handleExpandClick}>
          {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
        </Button>
        <Button onClick={handleSelectClick}>
          {selected.length === 0 ? 'Select all' : 'Unselect all'}
        </Button>
      </Box>
      <TreeView
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
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
