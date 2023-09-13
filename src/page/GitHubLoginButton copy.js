import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GitHubLoginButton = () => {
  const clientID = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const callbackURL = "http://localhost:3000/callback";
  const loginURL = 
    `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=repo:status read:repo_hook user:email&redirect_uri=${callbackURL}`;

const code = "b0dbc07ec4bd862bad7b";

  const handleLogin = () => {
    console.log(clientID, clientSecret, loginURL);
  };

  const test = async () => {
    let token = localStorage.getItem("token");
    console.log("here", token);
    try {
        const response = await axios.get('https://api.github.com/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response);
        console.log("login!!");
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
  }

  const logout = async () => {
    localStorage.removeItem('token');
  }

  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ m: 2 }}>
        <Button variant="outlined" color="secondary" onClick={handleLogin}>
          로그인
        </Button>
        <Button variant="outlined" color="secondary" href={loginURL} target="_blank">
          로그인
        </Button>
        <Button variant="outlined" color="secondary" onClick={test}>
          로그인 확인
        </Button>     
        <Button variant="outlined" color="secondary" onClick={logout}>
          로그아웃
        </Button>     
        <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>
          홈으로
        </Button>     
        
      </Box>
    </div>
  );
};

export default GitHubLoginButton;
