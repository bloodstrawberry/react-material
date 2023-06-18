import React from "react";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import TreeItem from "@mui/lab/TreeItem";
import { withStyles } from "@mui/styles";

const MyTreeItem = withStyles({
  root: {
    "&.MuiTreeItem-root > .MuiTreeItem-content:hover": {
      background: "blue",
    },
    "&.MuiTreeItem-root > .MuiTreeItem-content:hover > .MuiTreeItem-label": {
      background: "skyblue",
    },
    "&.MuiTreeItem-root > .Mui-selected": {
      background: "grey",
    },
    "@media (hover: none)": {
      backgroundColor: "transparent",
    },
  },
})(TreeItem);

const TreeViewExample = () => {
  return (
    <div>
      
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        disabledItemsFocusable={true}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        <MyTreeItem
          nodeId="1"
          label="Applications"
          onClick={(e) => console.log(e.target.innerText)}
        >
          <MyTreeItem nodeId="2" label="Calendar" />
        </MyTreeItem>
        <MyTreeItem nodeId="5" label="Documents">
          <MyTreeItem nodeId="10" label="OSS" />
          <MyTreeItem nodeId="6" label="MUI" disabled={true}>
            <MyTreeItem nodeId="8" label="index.js" />
          </MyTreeItem>
        </MyTreeItem>
      </TreeView>
    </div>
  );
};

export default TreeViewExample;
