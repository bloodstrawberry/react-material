import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import * as ck from "../cookielibrary.js";

//https://iridescent-zeal.tistory.com/234

const ReactCookie = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["githubToken"]);
  const [token, setToken] = useState(cookies.githubToken || null);

  useEffect(() => {
    // 쿠키에서 토큰 읽어오기
    const storedToken = cookies.githubToken;
    if (storedToken) {
      setToken(storedToken);
    }
  }, [cookies.githubToken]);

  const handleLogin = () => {
    // GitHub OAuth 등의 로그인 절차 후 토큰 받아오기
    const receivedToken = "received_token_from_oauth"; // 실제로는 OAuth 로그인 과정에서 받은 토큰을 사용해야 합니다.

    // 쿠키에 토큰 저장 (7일 동안 유지)
    setCookie("githubToken", receivedToken, { maxAge: 60 * 60 * 24 * 7 });

    // 상태 업데이트
    setToken(receivedToken);
  };

  const handleLogout = () => {
    // 쿠키에서 토큰 제거
    removeCookie("githubToken");

    // 상태 업데이트
    setToken(null);
  };

  const onSet = () => {
    ck.setCookie("cookieKey", "cookieValue", {
      path: "/",
      secure: true,
      maxAge: 3,
    });
  };
  const onGet = () => {
    const getVal = ck.getCookie("cookieKey");
    console.log(getVal);
  };
  const onRemove = () => {
    ck.removeCookie("cookieKey");
  };
  return (
    <div>
      {token ? (
        <div>
          <p>You are logged in!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with GitHub</button>
      )}
      <div>
        <button onClick={onSet} type="button">
          set cookie
        </button>
        <button onClick={onGet} type="button">
          get cookie
        </button>
        <button onClick={onRemove} type="button">
          remove cookie
        </button>
      </div>
    </div>
  );
};

export default ReactCookie;
