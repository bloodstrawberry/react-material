import axios from "axios";

export const loginCheck = async (setLoginStatus) => {
  let token = localStorage.getItem("GITHUB_TOKEN");
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
  let token = localStorage.getItem("GITHUB_TOKEN");
  try {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return await true;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return await false;
  }
};
