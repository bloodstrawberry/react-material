import React, { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
//import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import VerticalAlignCenterIcon from "@mui/icons-material/VerticalAlignCenter";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
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

const HandsontableToggleButton = () => {
  const [horizontalAlignment, setHorizontalAlignment] = useState("left");
  const [verticalAlignment, setVerticalAlignment] = useState("middle");
  const [formats, setFormats] = useState(() => []);

  const [showCompactPicker, setShowCompactPicker] = useState(false); 
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 }); 
  const [fontColor, setFontColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");

  const handleAlignment = (event, newAlignment, type) => {
    console.log(newAlignment, type);
    if (type === "horizontal") setHorizontalAlignment(newAlignment);
    else if (type === "vertical") setVerticalAlignment(newAlignment);
  };

  const handleFormat = (event, newFormats) => {
    console.log(newFormats);
    setFormats(newFormats);
  };

  const handleToggleCompactPicker = (event, type) => {
    const iconButton = event.currentTarget;
    const rect = iconButton.getBoundingClientRect();
    const pickerTop = rect.bottom + window.scrollY;
    const pickerLeft = rect.left + window.scrollX;

    setPickerPosition({ top: pickerTop, left: pickerLeft });
    setShowCompactPicker((prev) => !prev);
  };

  const handleChangeComplete = (color, event) => {
    let colorType = formats.includes("fontColor") ? "fontColor" : "bgColor";

    console.log(colorType, color.hex);

    if (colorType === "fontColor") setFontColor(color.hex);
    else setBgColor(color.hex);
  };

  const getColorPicker = () => {
    let colorType = formats.includes("fontColor") ? "fontColor" : "bgColor";
    return (
      <CompactPicker
        color={colorType === "fontColor" ? fontColor : bgColor}
        onChangeComplete={handleChangeComplete}
      />
    );
  };

  const handleClose = () => {
    let fms = formats.filter(
      (item) => (item === "fontColor" || item === "bgColor") === false
    );
    setFormats(fms);

    setShowCompactPicker(false);
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
            width: "540px",
          }}
        >
          <StyledToggleButtonGroup
            size="small"
            value={horizontalAlignment}
            exclusive
            onChange={(e, alignment) =>
              handleAlignment(e, alignment, "horizontal")
            }
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
            {/* <ToggleButton value="justify" aria-label="justified">
              <FormatAlignJustifyIcon />
            </ToggleButton> */}
          </StyledToggleButtonGroup>

          <StyledToggleButtonGroup
            size="small"
            value={verticalAlignment}
            exclusive
            onChange={(e, alignment) =>
              handleAlignment(e, alignment, "vertical")
            }
            aria-label="text alignment"
          >
            <ToggleButton value="up" aria-label="left aligned">
              <VerticalAlignBottomIcon />
            </ToggleButton>
            <ToggleButton value="middle" aria-label="centered">
              <VerticalAlignCenterIcon />
            </ToggleButton>
            <ToggleButton value="bottom" aria-label="right aligned">
              <VerticalAlignTopIcon />
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
              value="fontColor"
              aria-label="fontColor"
              onClick={(e) => handleToggleCompactPicker(e, "fontColor")} 
            >
              <ColorizeIcon />
              <ArrowDropDownIcon />
            </ToggleButton>
            <ToggleButton
              value="bgColor"
              aria-label="bgColor"
              onClick={(e) => handleToggleCompactPicker(e, "bgColor")}
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
              zIndex: 1000,
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
            {getColorPicker()}
          </div>
        )}
      </Box>
    </div>
  );
};

export default HandsontableToggleButton;
