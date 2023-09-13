import React, { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ColorizeIcon from "@mui/icons-material/Colorize";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { CompactPicker } from "react-color";

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
  const [alignment, setAlignment] = React.useState("left");
  const [formats, setFormats] = React.useState(() => ["italic"]);
  const [showCompactPicker, setShowCompactPicker] = useState(false); // 추가
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 }); // 추가
  const [fontColor, setFontColor] = useState("#000000");

  const [background, setBackground] = useState("#FFFFFF");

  const [text, setText] = useState(
    "<p>이것저것 테스트 해보세요.</p><p>이것저것 테스트 해보세요.</p><p>이것저것 테스트 해보세요.</p>"
  );

  const handleFormat = (event, newFormats) => {
    console.log(newFormats);
    setFormats(newFormats);
  };

  const handleAlignment = (event, newAlignment) => {
    console.log(newAlignment);
    setAlignment(newAlignment);
  };

  const handleToggleCompactPicker = (event) => {
    const iconButton = event.currentTarget;
    const rect = iconButton.getBoundingClientRect();
    const pickerTop = rect.bottom + window.scrollY;
    const pickerLeft = rect.left + window.scrollX;

    setPickerPosition({ top: pickerTop, left: pickerLeft });
    setShowCompactPicker((prev) => !prev);
    console.log("zzzzz");
    console.log(formats.filter((item) => item !== "color"));
    let a = formats.filter((item) => item !== "color");
    setFormats(a);
  };

  const handleChangeComplete = (color, event) => {
    console.log(color.hex, event);
    setBackground(color.hex);
    console.log("zzzz");
    //setShowCompactPicker(false);
  };

  const handleColorChange = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");

      span.style.color = "red";
      span.style.fontStyle = "italic"; // 기울기 스타일 적용
      span.style.fontWeight = "bold"; // 굵게 스타일 적용
      span.style.textDecoration = "line-through"; // 취소선 스타일 적용
      span.appendChild(document.createTextNode(selectedText));
      range.deleteContents();
      range.insertNode(span);

      // 선택 해제
      selection.removeAllRanges();
      setText(document.getElementById("text-container").innerHTML);
    }
  };

  //   useEffect(() => {
  //     const handleClickOutside = (event) => {
  //       if (
  //         showCompactPicker &&
  //         !event.target.closest(".compact-picker-container")
  //       ) {
  //         setShowCompactPicker(false);
  //       }
  //     };

  //     document.addEventListener("click", handleClickOutside);

  //     return () => {
  //       document.removeEventListener("click", handleClickOutside);
  //     };
  //   }, [showCompactPicker]);

  const handleClose = () => {
    setShowCompactPicker(false);
    let a = formats.filter((item) => item !== "color");
    setFormats(a);
  };

  return (
    <div>
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
            <ToggleButton value="bold" aria-label="bold">
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
              <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton value="underlined" aria-label="underlined">
              <FormatUnderlinedIcon />
            </ToggleButton>
            <ToggleButton
              value="color"
              aria-label="color"
              onClick={handleToggleCompactPicker}
            >
              <ColorizeIcon />
              <ArrowDropDownIcon />
            </ToggleButton>

            <ToggleButton
              value="bgColor"
              aria-label="bgColor"
              onClick={handleToggleCompactPicker}
            >
              <FormatColorFillIcon />
              <ArrowDropDownIcon />
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Paper>

        {showCompactPicker && (
          <div
            className="compact-picker-container"
            style={{
              position: "absolute",
              top: pickerPosition.top + "px",
              left: pickerPosition.left + "px",
            }}
          >
            <div
              style={{
                position: "fixed",
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px",
              }}
              onClick={handleClose}
            />
            <CompactPicker
              color={background}
              onChangeComplete={handleChangeComplete}
              // onSwatchHover 색상 변경
            />
          </div>
        )}
      </Box>
      <Box sx={{ m: 2 }}>
        <div>
          <button onClick={handleColorChange}>색상 변경</button>
        </div>
        <div id="text-container">
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </Box>
    </div>
  );
};

export default MyTextEditor;
