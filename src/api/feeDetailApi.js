import axios from "axios";

const BASE_URL = "https://lbsschool.in/old/lms/MobileAppBackend";

// ✅ Create axios instance (recommended for reuse)
const api = axios.create({
    baseURL: BASE_URL,
});

// ✅ Fetch Fee Details
export const fetchFeeDetails = async ({ enrollment, school }) => {
    try {
        const response = await api.get("/fetchFeeDetailsNew.php", {
            params: {
                enrollment,
                school
            }
        });

        return response.data;

    } catch (error) {
        console.error("Error fetching fee details:", error);
        throw error;
    }
};