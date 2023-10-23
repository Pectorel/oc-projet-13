import axios from "axios";

export const loginAction = async (formData) => {
  let payload = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const res = await axios.post(
    "http://localhost:3001/api/v1/user/login",
    payload,
  );

  if (res.status === 200 && res.data.status === 200) {
    return true;
  }
};
