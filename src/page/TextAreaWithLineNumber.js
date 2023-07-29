
// https://webtips.dev/add-line-numbers-to-html-textarea
// https://developer.mozilla.org/ko/docs/Web/CSS/CSS_counter_styles/Using_CSS_counters

import React, { useEffect } from "react";

import "../css/TextAreaWithLineNumber.css";

import Box from "@mui/joy/Box";
import Textarea from "@mui/joy/Textarea";

const TextAreaWithLineNumber = () => {
  const init = () => {
    const textarea = document.querySelector("textarea");
    const lineNumbers = document.querySelector(".line-numbers");

    textarea.addEventListener("keyup", (event) => {
      const numberOfLines = event.target.value.split("\n").length;

      lineNumbers.innerHTML = Array(numberOfLines)
        .fill("<span></span>")
        .join("");
    });

    textarea.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        textarea.value =
          textarea.value.substring(0, start) +
          "\t" +
          textarea.value.substring(end);

        event.preventDefault();
      }
    });
  };

  useEffect(() => init(), []);

  return (
    <div>
      <div className="editor">
        <div className="line-numbers">
          <span></span>
        </div>
        <textarea></textarea>
      </div>
      <Box
        ml={2}
        sx={{
          py: 2,
          display: "grid",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Textarea
          name="Neutral"
          placeholder="Type in here…"
          variant="outlined"
          color="neutral"
        />
      </Box>
    </div>
  );
};

export default TextAreaWithLineNumber;
