import React from "react";
import { CommentSection } from "react-comments-section";
//import 'react-comments-section/dist/index.css';
import "../css/comment.css";

const ReactComments = () => {
  const data = [
    {
      userId: "02b",
      comId: "017",
      fullName: "Lily",
      userProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
      text: "I think you have a point🤔",
      avatarUrl: "https://ui-avatars.com/api/name=Lily&background=random",
      replies: [],
    },
  ];

  const onSubmitAction = (data) => {
    console.log("check submit, ", data);
  };

  // const onDeleteAction
  // const onReplyAction
  // const onEditAction

  const currentData = (data) => {
    console.log("current data", data);
  };

  const customNoComment = () => (
    <div className="no-com">Sheessh! Zero Comments posted here!</div>
  );

  return (
    <div>
      <CommentSection
        currentUser={{
          currentUserId: "01a",
          currentUserImg:
            "https://ui-avatars.com/api/name=Riya&background=random",
          currentUserProfile:
            "https://www.linkedin.com/in/riya-negi-8879631a9/",
          currentUserFullName: "Riya Negi",
        }}
        logIn={{
          loginLink: "http://localhost:3001/",
          signupLink: "http://localhost:3001/",
        }}
        commentData={data}
        currentData={currentData}
        onSubmitAction={onSubmitAction}
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
        customNoComment={() => customNoComment()}
      />
    </div>
  );
};

export default ReactComments;
