import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import Box from "@mui/material/Box";

import "@toast-ui/editor/dist/toastui-editor.css";

//color 설정
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

//코드
import "prismjs/themes/prism.css";

import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs"; // prism 테마 추가

// 테이블 머지
import "@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";

///
import { Viewer } from "@toast-ui/react-editor";

import { Editor } from "@toast-ui/react-editor";
//import Editor from 'tui-editor';
import { useRef } from "react";

import MarkdownPreview from "@uiw/react-markdown-preview";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const editorReference = useRef();

  let init = `안녕<span style="color: #ff0f00">하</span>세요

1. ㅋㅋㅋ
    1. ㅋㅋㅋㅋㅋ


|  |  |
| --- | --- |
|  |  |
|  |  |`;

  const [content, setContents] = useState(init);
  const handleFocus = (e, f) => {
    console.log("focus!!", e, f);
  };

  const showEditor = () => {
     console.log(editorReference.current.getInstance());
     setContents(editorReference.current.getInstance().getHTML());
     console.log(editorReference.current.getInstance().getMarkdown());
  
  };

  const onChange = () => {
    const data = editorReference.current.getInstance().getHTML();
    console.log(data);
  };

  const ErrorFallback = (error) => {
    console.log("szz", error);
    return <div>에러났어요@@</div>;
  };

  function Farewell({ subject }) {
    return <div>Goodbye {subject.toUpperCase()}</div>;
  }

  return (
    <div>
      <Box sx={{ m: 2 }}>
        <h1>Toast UI Editor</h1>
        <button onClick={showEditor}>test</button>
      


       <Editor
          ref={editorReference}
          onChange={onChange}
          previewStyle="vertical" // tab
          height="400px"
          initialEditType="wysiwyg"
          //hideModeSwitch={true} //하단 숨기기
          //initialEditType="markdown"
          initialValue={init}
          usageStatistics={false} // 통계 수집 거부
          toolbarItems={[
            // 툴바 옵션 설정
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task", "indent", "outdent"],
            ["table", "link"],
            ["code", "codeblock"],
          ]}
          plugins={[tableMergedCell, colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}  // colorSyntax 플러그인 적용
          //plugins= {[tableMergedCell]}
          onFocus={handleFocus}
          useCommandShortcut={false} // 키보드 입력 컨트롤 방지 ctrl z 등
        /> 
      </Box>
      <Box sx={{ m: 2 }}>
        {/* <MarkdownPreview source={content} /> */}
        <Viewer initialValue={content} />
      </Box>
    </div>
  );
};

export default App;
