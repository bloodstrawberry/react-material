import React, { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import "./styles.css";

// Toast UI Editor
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css"; // Viewer css
import { Editor } from "@toast-ui/react-editor";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";

// Dark Theme 적용
// import '@toast-ui/editor/dist/toastui-editor.css';
// import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

// Color Syntax Plugin
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

// Table Merged Cell Plugin
import "@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";

import html2pdf from "html2pdf.js";

const colorSyntaxOptions = {
  preset: [
    "#333333",
    "#666666",
    "#FFFFFF",
    "#EE2323",
    "#F89009",
    "#009A87",
    "#006DD7",
    "#8A3DB6",
    "#781B33",
    "#5733B1",
    "#953B34",
    "#FFC1C8",
    "#FFC9AF",
    "#9FEEC3",
    "#99CEFA",
    "#C1BEF9",
  ],
};

const CONTENT_KEY = "CONTENT_KEY";

const ToastEditor = () => {
  const editorRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  let initData = `# 제목

  ***~~<span style="color: #EE2323">내용</span>~~***
  
  * [x] 체크박스
  * [ ] 체크박스 2`;

  const handleSave = () => {
    let markDownContent = editorRef.current.getInstance().getMarkdown();
    let htmlContent = editorRef.current.getInstance().getHTML();
    console.log(markDownContent);
    console.log(htmlContent);
    localStorage.setItem(CONTENT_KEY, markDownContent);
  };

  useEffect(() => {
    let item = localStorage.getItem(CONTENT_KEY);

    if (editMode === false) {
      const viewer = new Viewer({
        el: document.querySelector(".toast-editor-viewer"),
        viewer: true,
        height: "400px",
        usageStatistics: false, // 통계 수집 거부
        plugins: [tableMergedCell],
      });

      if (item) viewer.setMarkdown(item);
      else viewer.setMarkdown(initData);
    }

    if (item) {
      if (editorRef.current) editorRef.current.getInstance().setMarkdown(item);
    } else {
      if (editorRef.current)
        editorRef.current.getInstance().setMarkdown(initData);
    }
  }, [editMode]);

  const downloadPDF = () => {
    const element = document.getElementById("pdf-download"); // PDF로 변환할 요소 선택
    html2pdf(element, {
      filename: "Toast_Editor.pdf", // default : file.pdf
      html2canvas: { scale: 2 }, // 캡처한 이미지의 크기를 조절, 값이 클수록 더 선명하다.
      jsPDF: {
        format: "b4", // 종이 크기 형식
        orientation: "portrait", // or landscape : 가로
      },
      callback: () => {
        console.log("PDF 다운로드 완료");
      },
    });
  };

  class Rectangle extends React.Component {
    render() {
      const { top, left, width, height } = this.props;
      const style = {
        position: "absolute",
        top: top,
        left: left,
        width: width,
        height: height,
        backgroundColor: "red", // 사각형의 색상을 여기에서 변경 가능합니다.
      };

      return <div style={style}></div>;
    }
  }

  return (
    <div>
      <Rectangle top="50px" left="50px" width="100px" height="100px" />
      <Rectangle top="150px" left="150px" width="150px" height="200px" />

      <div className="parent">
        <Box sx={{ m: 2 }}>
          <h1>Toast UI Editor</h1>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ m: 1 }}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "취소하기" : "편집하기"}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ m: 1 }}
            onClick={handleSave}
            disabled={editMode === false}
          >
            저장하기
          </Button>

          <Button
            variant="outlined"
            color="warning"
            sx={{ m: 1 }}
            onClick={downloadPDF}
          >
            PDF Download
          </Button>

          {editMode === false && (
            <div id="pdf-download" className="toast-editor-viewer"></div>
          )}

          {editMode === true && (
            <Editor
              ref={editorRef}
              // initialValue={initContents}
              height="400px"
              placeholder="Please Enter Text."
              previewStyle="tab" // or vertical
              initialEditType="wysiwyg" // or markdown
              // hideModeSwitch={true} // 하단 숨기기
              toolbarItems={[
                // 툴바 옵션 설정
                ["heading", "bold", "italic", "strike"],
                ["hr", "quote"],
                ["ul", "ol", "task", "indent", "outdent"],
                ["table", /* "image", */ "link"],
                ["code", "codeblock"],
              ]}
              onChange={() =>
                console.log(editorRef.current.getInstance().getMarkdown())
              }
              //theme="dark"
              //useCommandShortcut={false} // 키보드 입력 컨트롤 방지 ex ctrl z 등
              usageStatistics={false} // 통계 수집 거부
              plugins={[[colorSyntax, colorSyntaxOptions], tableMergedCell]}
            />
          )}
        </Box>
      </div>
      <input></input>
    </div>
  );
};

export default ToastEditor;
