import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import queryString from "query-string";

import * as ck from "../cookielibrary.js";

const clientID = process.env.REACT_APP_CLIENT_ID;

const GitHubLoginCallback = ({ loginStatus, setLoginStatus }) => {
  const navigate = useNavigate();

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

      let options = {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // seconds
        // secure: true, // https 연결에만 전송
        // httpOnly: true, // 클라이언트에서 read 불가
      };

      ck.setCookies("GITHUB_TOKEN", token, options);
      ck.setCookies("AVATAR_URL", avatarUrl, options);
      ck.setCookies("LOGIN_ID", loginID, options);
      
      setLoginStatus(true);

      navigate('/',  { replace: true });
    } catch (e) {
      console.log(e);
      setLoginStatus(false);
    }
  };

  const getCode = () => {
    let qs = queryString.parse(window.location.search);
    let code = qs.code;
    getAccessToken(code);
  };

  useEffect(() => getCode(), []);

  return <div>{loginStatus ? "로그인 성공!" : "로그인 실패..."}</div>;
};

export default GitHubLoginCallback;
