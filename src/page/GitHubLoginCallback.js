import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../actions/loginAction";

import axios from "axios";
import queryString from "query-string";

const clientID = process.env.REACT_APP_CLIENT_ID;

const GitHubLoginCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAccessToken = async (code) => {
    try {
      let server = `http://192.168.55.120:3002`;
      let accessInfo = await axios.get(
        `${server}/githubLogin?code=${code}&clientID=${clientID}`
      );

      let token = accessInfo.data.token;

      const userResponse = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = userResponse.data;
      const avatarUrl = userData.avatar_url;
      const loginID = userData.login;

      console.log(userData);
      console.log(avatarUrl);
      console.log(loginID);

      let loginInfo = {
        avatarUrl, loginID
      }

      dispatch(actions.login(loginInfo));
      localStorage.setItem("LOGIN_INFO", JSON.stringify(loginInfo));     
      navigate('/',  { replace: true }); 
    } catch (e) {
      console.log("error ", e);
    }
  };

  const getCode = () => {
    let qs = queryString.parse(window.location.search);
    let code = qs.code;
    getAccessToken(code);
  };

  useEffect(() => getCode(), []);

  return <div>{"로그인 시도 중..."}</div>;
};

export default GitHubLoginCallback;
