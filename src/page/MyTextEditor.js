import React, { useState } from "react";

import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ColorizeIcon from "@mui/icons-material/Colorize";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { styled } from "@mui/material/styles";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const MyTextEditor = () => {
  const [text, setText] = useState(
    "<p>이것저것 테스트 해보세요.</p><p>이것저것 테스트 해보세요.</p><p>이것저것 테스트 해보세요.</p>"
  );
  const [alignment, setAlignment] = React.useState();
  const [formats, setFormats] = useState([]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleToggleStyle = (value) => {
    console.log(value);
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");

      //span.style.fontStyle = "italic"; // 기울기 
      span.style.fontWeight = "bold"; // 굵게 
      //span.style.textDecoration = "line-through"; // 취소선 

      span.appendChild(document.createTextNode(selectedText));
      
      range.deleteContents();
      range.insertNode(span);

      selection.removeAllRanges(); // 적용 후 해제하고 싶은 경우,
      setText(document.getElementById("text-container").innerHTML);
    }
  };

  return (
    <div>
      <button onClick={handleToggleStyle}>임시 버튼</button>
      <Box sx={{ m: 2 }}>
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            flexWrap: "wrap",
            width: "450px",
          }}
        >
          <StyledToggleButtonGroup
            size="small"
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              <FormatAlignCenterIcon />
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              <FormatAlignRightIcon />
            </ToggleButton>
            <ToggleButton value="justify" aria-label="justified" disabled>
              <FormatAlignJustifyIcon />
            </ToggleButton>
          </StyledToggleButtonGroup>

          <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

          <StyledToggleButtonGroup
            size="small"
            value={formats}
            onChange={handleFormat}
            aria-label="text formatting"
          >
            <ToggleButton value="bold" aria-label="bold" onClick={(e) => handleToggleStyle(e.target.value)}>
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
              <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton value="underlined" aria-label="underlined">
              <FormatUnderlinedIcon />
            </ToggleButton>
            <ToggleButton value="color" aria-label="color">
              <ColorizeIcon />
              <ArrowDropDownIcon />
            </ToggleButton>
            <ToggleButton value="bgColor" aria-label="bgColor">
              <FormatColorFillIcon />
              <ArrowDropDownIcon />
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Paper>
      </Box>
      <Box sx={{ m: 2 }}>
        <div id="text-container">
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </Box>
    </div>
  );
};

export default MyTextEditor;
