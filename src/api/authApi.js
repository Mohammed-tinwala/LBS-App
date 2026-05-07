import axios from "axios";

const BASE_URL = "https://lbsschool.in/old/lms/MobileAppBackend/";

export const loginParent = async (mobile, password) => {
  try {
    const params = new URLSearchParams();
    params.append("mobile", mobile);
    params.append("password", password);

    const res = await axios.post(BASE_URL + "loginParent.php", params);

    console.log("Login Response:", res.data);

    return res.data;
  } catch (error) {
    return {
      status: false,
      message: "Server error",
    };
  }
};