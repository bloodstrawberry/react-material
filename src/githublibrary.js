import axios from "axios";
import { Octokit } from "@octokit/rest";

const myKey = process.env.REACT_APP_MY_TOKEN.replaceAll("X", "");
const repo = `auto-test`;

const getSHA = async (path) => {
  const octokit = new Octokit({
    auth: myKey,
  });

  try {
    const result = await octokit.request(
      `GET /repos/bloodstrawberry/${repo}/contents/${path}`,
      {
        owner: "bloodstrawberry",
        repo: `${repo}`,
        path: `${path}`,
      }
    );
  
    return result.data.sha;
  }

  catch (e) {
    console.log("error : ", e);
    return undefined;
  }
};

export const fileDelete = async (path) => {
  let sha = await getSHA(path);
  if(sha === undefined) return undefined;
  try {
    const octokit = new Octokit({
      auth: myKey,
    });

    const result = await octokit.request(
      `DELETE /repos/bloodstrawberry/${repo}/contents/${path}`,
      {
        owner: "bloodstrawberry",
        repo,
        path,
        message: "delete!!",
        sha,
      }
    );

    return result;
  } catch (e) {
    console.log("error : ", e);
    return undefined;
  }
};

export const fileRead = async (path) => {
  try {
    const octokit = new Octokit({
      auth: myKey,
    });

    const result = await octokit.request(
      `GET /repos/bloodstrawberry/${repo}/contents/${path}`,
      {
        owner: "bloodstrawberry",
        repo: `${repo}`,
        path: `${path}`,
        encoding: "utf-8",
        decoding: "utf-8",
      }
    );
    return result;
  } catch (e) {
    console.log("error : ", e);
    return undefined;
  }
};

export const fileCreate = async (contents, path) => {
  const octokit = new Octokit({
    auth: myKey,
  });

  try {
    const result = await octokit.request(
      `PUT /repos/bloodstrawberry/${repo}/contents/${path}`,
      {
        owner: "bloodstrawberry",
        repo: `${repo}`,
        path: `${path}`,
        message: "make comments",
        committer: {
          name: "bloodstrawberry",
          email: "bloodstrawberry@github.com",
        },
        content: `${btoa(unescape(encodeURIComponent(`${contents}`)))}`,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    return result.status;
  } catch (e) {
    console.log("error : ", e);
    return undefined;
  }
};

export const loginCheck = async (setLoginStatus) => {
  let token = undefined;
  try {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    setLoginStatus(true);
  } catch (error) {
    console.error("Error fetching user data:", error);
    setLoginStatus(false);
  }
};

export const getLoginStatus = async () => {
  let token = undefined;
  try {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return true;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return false;
  }
};
