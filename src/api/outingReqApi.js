import axios from "axios";

const BASE_URL = "https://lbsschool.in/old/lms/MobileAppBackend";

// ===============================
// ✅ Create Outing Request
// ===============================
export const createOutingRequest = async (data) => {
    try {
        const res = await axios.post(`${BASE_URL}/outingReq.php`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return res.data;
    } catch (error) {
        console.error("Create Outing Error:", error);
        return {
            status: false,
            message: "Network error while creating outing request",
        };
    }
};

// ===============================
// ✅ Fetch Outing Requests
// ===============================
export const fetchOutingRequest = async (sid, db_school = 2) => {
    try {
        const res = await axios.post(`${BASE_URL}/fetchOutingPass.php`, {
            sid,
            db_school,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return res.data;
    } catch (error) {
        console.error("Fetch Outing Error:", error);
        return {
            status: false,
            message: "Network error while fetching outing requests",
            pending: [],
            approved: [],
            rejected: [],
            all: [],
        };
    }
};