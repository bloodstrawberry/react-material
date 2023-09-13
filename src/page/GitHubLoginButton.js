import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Swal from "sweetalert2";

const clientID = process.env.REACT_APP_CLIENT_ID;
const callbackURL = "http://localhost:3000/callback";
const loginURL = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=repo:status read:repo_hook user:email&redirect_uri=${callbackURL}`;

const GitHubLoginButton = ({ loginStatus, setLoginStatus }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [user, setUser] = useState("Guest");

  const logout = () => {
    setLoginStatus(false);

    setImageSrc("");
    setUser("Guest");
    localStorage.removeItem("GITHUB_TOKEN");
    localStorage.removeItem("AVATAR_URL");
    localStorage.removeItem("LOGIN_ID");
  };

  useEffect(() => {
    let url = localStorage.getItem("AVATAR_URL");
    let loginID = localStorage.getItem("LOGIN_ID");
    console.log(url);
    if (loginStatus) {
      setUser(loginID);
      setImageSrc(url);
    }
  }, [loginStatus]);

  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "로그아웃?",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
};

  return (
    <div>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? "grey.300" : "transparent",
          borderRadius: 1,
          "&:hover": { bgcolor: "secondary.lighter" },
        }}
        aria-label="open profile"
        onClick={handleToggle}
        //ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"

      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar
            alt="profile user"
            src={imageSrc}
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="subtitle1" >{user}</Typography>
        </Stack>
      </ButtonBase>

      <Avatar alt="GitHub Login" src={imageSrc} />
      <Box sx={{ m: 2 }}>
        {loginStatus === false && (
          <div>
            <Stack direction="row" spacing={2}>
              <Avatar alt="GitHub Login" src="/static/images/avatar/1.jpg" />
              <Button variant="outlined" color="secondary" href={loginURL}>
                로그인
              </Button>
            </Stack>
          </div>
        )}
        {loginStatus === true && (
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
