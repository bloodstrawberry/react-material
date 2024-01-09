import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import axios from "axios";

const ReactCookie = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["githubToken"]);
  const [token, setToken] = useState(cookies.githubToken || null);

  useEffect(() => {
    const storedToken = cookies.githubToken;
    if (storedToken) {
      setToken(storedToken);
    }
  }, [cookies.githubToken]);

  const handleLogin = () => {
    // github oauth callback으로 token 획득
    const receivedToken = "received_token_from_oauth";

    setCookie("githubToken", receivedToken, {
      maxAge: 3, // seconds
      // secure: true, // https 연결에만 전송
      // httpOnly: true, // 클라이언트에서 read 불가
    });

    setToken(receivedToken);
  };

  const handleCheck = () => {
    console.log(cookies);
  };

  const handleLogout = () => {
    removeCookie("githubToken");
    setToken(null);
  };

  const test = async () => {
    axios.defaults.withCredentials = true;
    // const userResponse = await axios.get(
    //   "http://192.168.55.120:3002/cookietest",
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   },
    //   { withCredentials: true }
    // );
    // console.log(userResponse);

    let username = "hello";
    let password = "world";

    axios
      .post(
        "http://192.168.55.120:3002/cookietest",
        { profile: { username: username, password: password } },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
      });
  };

  return (
    <div>
      {token ? <p>login</p> : <p>logout</p>}
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleCheck}>쿠키 확인</button>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={test}>test</button>
    </div>
  );
};

export default ReactCookie;
