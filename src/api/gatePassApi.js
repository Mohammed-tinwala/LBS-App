import axios from "axios";

const BASE_URL = "https://lbsschool.in/old/lms/MobileAppBackend";
// 🔁 replace with your actual backend URL

// ===============================
// ✅ Create Gate Pass Request
// ===============================
export const createGatePass = async (data) => {
    try {
        const res = await axios.post(`${BASE_URL}/gatePassReq.php`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return res.data;
    } catch (error) {
        console.error("Create GatePass Error:", error);
        return {
            status: false,
            message: "Network error while creating gate pass",
        };
    }
};

// ===============================
// ✅ Fetch Gate Pass List
// ===============================
export const fetchGatePass = async (sid, db_school = 2) => {
    try {
        const res = await axios.post(`${BASE_URL}/fetchGatePass.php`, {
            sid,
            db_school,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return res.data;
    } catch (error) {
        console.error("Fetch GatePass Error:", error);
        return {
            status: false,
            message: "Network error while fetching gate passes",
            pending: [],
            approved: [],
            rejected: [],
            all: [],
        };
    }
};