import axios from "axios";

const BASE_URL = "https://lbsschool.in/old/lms/MobileAppBackend";
// 🔁 same base URL

// ===============================
// ✅ Create Visitor Pass Request
// ===============================
export const createVisitorPass = async (data) => {
    try {
        const res = await axios.post(`${BASE_URL}/visitorPassReq.php`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return res.data;
    } catch (error) {
        console.error("Create VisitorPass Error:", error);
        return {
            status: false,
            message: "Network error while creating visitor pass",
        };
    }
};

// ===============================
// ✅ Fetch Visitor Pass List
// ===============================
export const fetchVisitorPass = async (sid, db_school = 2) => {
    try {
        const res = await axios.post(`${BASE_URL}/fetchVisitorPass.php`, {
            sid,
            db_school,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return res.data;
    } catch (error) {
        console.error("Fetch VisitorPass Error:", error);
        return {
            status: false,
            message: "Network error while fetching visitor passes",
            pending: [],
            approved: [],
            rejected: [],
            all: [],
        };
    }
};