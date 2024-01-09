import React, { useEffect, useState } from "react";
import { CommentSection } from "react-comments-section";
//import 'react-comments-section/dist/index.css';
import "../css/comment.css";

import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

import * as gh from "../githublibrary.js";
import * as ck from "../cookielibrary.js";

const clientID = process.env.REACT_APP_CLIENT_ID;
const callbackURL = "http://localhost:3000/callback";
const loginURL = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=repo:status read:repo_hook user:email&redirect_uri=${callbackURL}`;

const maxDataCount = 5;

const getCurrentDateTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const formattedDateTime = `${year}_${month}_${day}_${hours}_${minutes}_${seconds}`;
  return formattedDateTime;
};

const ReactComments = ({ currentUser }) => {
  const [currentComments, setCurrentComments] = useState([]);
  const [totalComments, setTotalComments] = useState([]);
  const [maxPageCount, setMaxPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const currentData = (data) => {
    console.log("current data", data);
  };

  const getCurrentUser = () => {
    if (currentUser === null) {
      let loginID = ck.getCookies("LOGIN_ID");
      let url = ck.getCookies("AVATAR_URL");
      let profile = `https://github.com/${loginID}`;

      if (loginID === null || loginID === undefined) return null;

      return {
        currentUserId: loginID,
        currentUserImg: url,
        currentUserProfile: profile,
        currentUserFullName: loginID,
      };
    }

    return currentUser;
  };

  const setCommentsPage = (data, currentPage) => {
    let dataLength = data.length;
    let startIndex = (currentPage - 1) * maxDataCount;
    let endIndex = Math.min(currentPage * maxDataCount, dataLength);
    let selectedComments = data.slice(startIndex, endIndex);

    setCurrentComments(selectedComments);
  };

  const loadComments = async () => {
    let commentDir = `comments`;
    let fileList = await gh.fileRead(commentDir);

    if (fileList === undefined) return; // 아무 댓글도 없는 경우

    // original_comments.js 찾기
    let originalComment = fileList.data.filter(
      (file) => file.name === "original_comments.js"
    );
    let originalCommentData = [];
    if (originalComment.length) {
      let result = await gh.fileRead(originalComment[0].path);
      if (result === undefined) return;

      originalCommentData = JSON.parse(
        decodeURIComponent(escape(window.atob(result.data.content)))
      );
    }

    let commentsAction = fileList.data.filter(
      (file) => file.name !== "original_comments.js"
    );

    for (let action of commentsAction) {
      let result = await gh.fileRead(action.path);

      if (result === undefined) {
        console.error("error data");
        continue;
      }

      //console.log(result.data.name);
      let contents = JSON.parse(
        decodeURIComponent(escape(window.atob(result.data.content)))
      );

      //console.log(contents);
      if (contents.type === "submit") {
        delete contents.type;
        originalCommentData.push(contents);
      } else if (contents.type === "delete") {
        let comIdToDelete = contents.comIdToDelete;
        let parentOfDeleteId = contents.parentOfDeleteId;

        if (parentOfDeleteId === undefined) {
          // 댓글 삭제
          originalCommentData = originalCommentData.filter(
            (data) => data.comId !== comIdToDelete
          );
        } else {
          // reply 삭제
          let parent = originalCommentData.filter(
            (data) => data.comId === parentOfDeleteId
          )[0];
          parent.replies = parent.replies.filter(
            (data) => data.comId !== comIdToDelete
          );
        }
      } else if (contents.type === "reply") {
        let repliedToCommentId =
          contents.parentOfRepliedCommentId || contents.repliedToCommentId;
        let parent = originalCommentData.filter(
          (data) => data.comId === repliedToCommentId
        )[0];
        delete contents.type;
        parent.replies.push(contents);
      } else if (contents.type === "edit") {
        let comId = contents.comId;
        let parentOfEditedCommentId = contents.parentOfEditedCommentId;

        if (parentOfEditedCommentId === undefined) {
          // 댓글을 변경한 경우
          let parentText = originalCommentData.filter(
            (data) => data.comId === comId
          )[0];
          parentText.text = contents.text;
        } else {
          // reply를 변경한 경우
          let parent = originalCommentData.filter(
            (data) => data.comId === parentOfEditedCommentId
          )[0];
          let child = parent.replies.filter((data) => data.comId === comId)[0];
          child.text = contents.text;
        }
      }
    }

    let maxPage = Math.ceil(originalCommentData.length / maxDataCount);
    setMaxPageCount(maxPage);

    setTotalComments(originalCommentData);
    setCommentsPage(originalCommentData, 1);

    if (commentsAction.length === 0) return;

    // 기존 data는 삭제
    let originalPath = `comments/original_comments.js`;
    let result = await gh.fileDelete(originalPath);

    console.log(`${originalPath} delete : ${result}`);

    // 새로 생성
    result = await gh.fileCreate(
      JSON.stringify(originalCommentData, null, 2),
      originalPath
    );

    console.log(result);

    // 불필요한 action 삭제
    for (let action of commentsAction) {
      result = await gh.fileDelete(action.path);
      console.log(`${action.path} delete : ${result}`);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const saveCommentAction = async (data) => {
    console.log("save Comments Action");
    
    let path = `comments/${getCurrentDateTime()}_data.json`;
    let result = await gh.fileCreate(JSON.stringify(data, null, 2), path);

    console.log(result);
  };

  const onSubmitAction = (data) => {
    console.log("check submit, ", data);

    data.type = "submit";
    saveCommentAction(data);

    let tmp = totalComments;
    tmp.push(data);

    let maxPage = Math.ceil(tmp.length / maxDataCount);
    setMaxPageCount(maxPage);
    setCurrentPage(maxPage);
    setCommentsPage(tmp, maxPage);
    setTotalComments(tmp);
  };

  const onDeleteAction = (data) => {
    console.log("check Delete, ", data);
    data.type = "delete";
    saveCommentAction(data);

    let comIdToDelete = data.comIdToDelete;
    let parentOfDeleteId = data.parentOfDeleteId;

    if (parentOfDeleteId === undefined) {
      let tmp = totalComments;
      tmp = tmp.filter((data) => data.comId !== comIdToDelete);

      let maxPage = Math.ceil(tmp.length / maxDataCount);
      setMaxPageCount(maxPage);
      setCurrentPage(1);
      setCommentsPage(tmp, 1);
      setTotalComments(tmp);
    }
  };

  const onReplyAction = (data) => {
    console.log("check Reply, ", data);
    data.type = "reply";

    saveCommentAction(data);
  };

  const onEditAction = (data) => {
    console.log("check Edit, ", data);

    data.type = "edit";
    saveCommentAction(data);
  };

  const handleChangePage = (event, value) => {
    //console.log(event, value);
    setCommentsPage(totalComments, value);
    setCurrentPage(value);
  };

  return (
    <div>
      {/* <button onClick={setCommentsPage}>test</button> */}
      <CommentSection
        currentUser={getCurrentUser}
        logIn={{
          loginLink: loginURL,
          signupLink: "https://github.com/",
        }}
        commentData={currentComments}
        currentData={currentData}
        onSubmitAction={onSubmitAction}
        onDeleteAction={onDeleteAction}
        onReplyAction={onReplyAction}
        onEditAction={onEditAction}
        hrStyle={{ border: "0.5px solid #ff0072" }}
        inputStyle={{ border: "1px solid rgb(208 208 208)" }}
        formStyle={{ backgroundColor: "white" }}
        submitBtnStyle={{
          border: "1px solid black",
          backgroundColor: "black",
          padding: "7px 15px",
        }}
        cancelBtnStyle={{
          border: "1px solid gray",
          backgroundColor: "gray",
          color: "white",
          padding: "7px 15px",
        }}
        replyInputStyle={{ borderBottom: "1px solid black", color: "black" }}
        advancedInput={true}
        removeEmoji={false}
      />
      <Box sx={{ m: 5 }} display="flex" justifyContent="center">
        <Pagination
          defaultPage={1}
          page={currentPage}
          count={maxPageCount}
          siblingCount={2}
          boundaryCount={10}
          size="small"
          variant="outlined"
          shape="rounded"
          color="primary"
          showFirstButton
          showLastButton
          onChange={handleChangePage}
        />
      </Box>
    </div>
  );
};

export default ReactComments;


