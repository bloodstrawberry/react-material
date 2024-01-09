import React, { useRef, useState } from "react";

import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// Toast UI Editor
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css"; // Viewer css
import { Editor } from "@toast-ui/react-editor";
//import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";

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

const colorSyntaxOptions = {
  preset: [
    "#333333", "#666666", "#FFFFFF", "#EE2323", "#F89009", "#009A87", "#006DD7", "#8A3DB6",
    "#781B33", "#5733B1", "#953B34", "#FFC1C8", "#FFC9AF", "#9FEEC3", "#99CEFA", "#C1BEF9",
  ],
};

const ToastMailer = () => {
  const editorRef = useRef(null);
  const [info, setInfo] = useState({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
  });

  const sendEmail = async () => {
    let htmlContents = editorRef.current.getInstance().getHTML();

    const response = await axios.post(
      "http://192.168.55.120:3002/post_man",
      {
        to: info.to,
        cc: info.cc,
        bcc: info.bcc,
        subject: info.subject,
        html: htmlContents,
      },
      {
        header: { "content-type": "application/json" },
      }
    );

    console.log(response);
  };

  return (
    <div>
      <Box sx={{ m: 2 }}>
        <h1>Toast Mail</h1>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ m: 1 }}
          onClick={sendEmail}
        >
          보내기
        </Button>
        <Box
          component="form"
          sx={{
            m: 2,
            display: "flex",
            flexDirection: "column",
            width: "98%",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            sx={{ marginBottom: 3 }}
            color="primary"
            label="보내는사람"
          />
          <TextField
            sx={{ marginBottom: 3 }}
            color="primary"
            label="받는사람"
            value={info.to}
            onChange={(e) => setInfo({ ...info, to: e.target.value })}
          />
          <TextField
            sx={{ marginBottom: 3 }}
            color="primary"
            label="참조"
            value={info.cc}
            onChange={(e) => setInfo({ ...info, cc: e.target.value })}
          />
          <TextField
            sx={{ marginBottom: 3 }}
            color="warning"
            label="비밀참조"
            value={info.bcc}
            onChange={(e) => setInfo({ ...info, bcc: e.target.value })}
          />
          <TextField
            sx={{ marginBottom: 3 }}
            color="success"
            label="제목"
            value={info.subject}
            onChange={(e) => setInfo({ ...info, subject: e.target.value })}
          />
        </Box>

        <Editor
          ref={editorRef}
          // initialValue={initContents}
          height="1000px"
          placeholder="Please Enter Text."
          previewStyle="tab" // or vertical
          initialEditType="wysiwyg" // or markdown
          hideModeSwitch={true} // 하단 숨기기
          toolbarItems={[
            // 툴바 옵션 설정
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task", "indent", "outdent"],
            ["table", /* "image", */ "link"],
            ["code", "codeblock"],
          ]}
          //theme="dark"
          //useCommandShortcut={false} // 키보드 입력 컨트롤 방지 ex ctrl z 등
          usageStatistics={false} // 통계 수집 거부
          plugins={[[colorSyntax, colorSyntaxOptions], tableMergedCell]}
        />
      </Box>
    </div>
  );
};

export default ToastMailer;
