import axios from "axios";

// 🔹 Base URL (change this)
const BASE_URL = "https://lbsschool.in/old/lms/MobileAppBackend/"; 

// 🔹 Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================================================
// ✅ Fetch Outing Requests
// =====================================================
export const fetchOutingRequests = async ({ sid, db_school }) => {
  try {
    const res = await api.post("fetchOutingRequests.php", {
      sid,
      db_school: 2, // 🔥 Hardcoded for now, change if needed
    });

    // console.log(res.data);

    if (res.data?.status) {
      return {
        success: true,
        data: res.data,
      };
    } else {
      return {
        success: false,
        message: res.data?.message || "Failed to fetch outing requests",
      };
    }
  } catch (error) {
    console.error("Fetch Outing Error:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

// =====================================================
// ✅ Update Outing Status (Approve / Reject)
// =====================================================
export const updateOutingStatus = async ({
  id,
  status,
  remark = "",
  db_school,
}) => {
  try {
    const res = await api.post("updateOutingStatus.php", {
      id,
      status,
      remark,
      db_school,
    });

    if (res.data?.status) {
      return {
        success: true,
        message: res.data.message,
      };
    } else {
      return {
        success: false,
        message: res.data?.message || "Update failed",
      };
    }
  } catch (error) {
    console.error("Update Outing Error:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};