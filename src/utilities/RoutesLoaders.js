import axios from "axios";

export const checkLoggedIn = async (auth) => {
  if (
    auth.userInfo !== null &&
    typeof auth.userInfo === "object" &&
    auth.userToken !== null
  ) {
    // Check if token is correct
    const headers = {
      headers: {
        Authorization: `Bearer ${auth.userToken}`,
      },
    };

    const userInfos = await axios.post(
      `http://localhost:3001/api/v1/user/profile`,
      {},
      headers,
    );

    if (userInfos.data.status === 200) return true;
  }
  return false;
};
