import React from "react";
import axios from "axios";
import queryString from 'query-string'; // npm install
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GitHubLoginCallback = () => {
  const clientID = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const loginURL = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=repo:status read:repo_hook user:email&redirect_uri=http://localhost:3000/callback`;


  const navigate = useNavigate();

  const test = async () => {
    
    let qs = queryString.parse(window.location.search);
    let code = qs.code;
    
    
    console.log(code);
    //const response = await fetch(`${authUri}?code=${code}`);
    //const data = await response.json();

    let server = `http://192.168.55.120:3002`;
    let info = await axios.get(`${server}/githubLogin?code=${code}`);

    console.log(info.data);
    let token = info.data.token;

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const userData = userResponse.data;
    console.log(userData);

    // Extract avatar_url from userData
    const avatarUrl = userData.avatar_url;
    console.log(avatarUrl);
    
    localStorage.setItem("token", token);
    
    navigate('/',  { replace: true });

    return;
    // const response = await axios.post(
    //   "https://github.com/login/oauth/access_token",
    //   {
    //     code,
    //     client_id : clientID, // SAFU application의 정보
    //     client_secret : clientSecret, // SAFU application의 정보
    //   },
    //   {
    //     headers: {
    //       accept: "application/json",
    //     },
    //   }
    // );

    // //Github가 access_token을 응답으로 줄 것이다.
    // const token = response.data.access_token;
    // console.log(response);
    // console.log(response.data);
    // console.log(token);
  };

  useEffect(() => {
    test();
  }, []);

  return <div>callback</div>;
};

export default GitHubLoginCallback;
