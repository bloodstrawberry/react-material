import React from "react";

import { useSelector, useDispatch } from "react-redux";
import * as actions from "../actions/loginAction";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

const clientID = process.env.REACT_APP_CLIENT_ID;
const callbackURL = "http://localhost:3000/callback";
const loginURL = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=repo:status read:repo_hook user:email&redirect_uri=${callbackURL}`;

const GitHubLoginButton = () => {
  const loginStatus = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("LOGIN_INFO");
    dispatch(actions.logout());
  };

  return (
    <div>
      <Box sx={{ m: 2 }}>
        {loginStatus.status === undefined && (
          <div>
            <Stack direction="row" spacing={2}>
              <Avatar alt="GitHub Login" src="/static/images/avatar/1.jpg" />
              <Button variant="outlined" color="secondary" href={loginURL}>
                로그인
              </Button>
            </Stack>
          </div>
        )}
        {loginStatus.status === true && (
          <div>
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="GitHub Login"
                src={localStorage.getItem("AVATAR_URL")}
              />
              <Button variant="outlined" color="error" onClick={logout}>
                로그아웃
              </Button>
            </Stack>
          </div>
        )}
      </Box>
    </div>
  );
};

export default GitHubLoginButton;
