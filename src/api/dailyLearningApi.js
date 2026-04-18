import axios from "axios";

const BASE_URL = "https://lbsschool.in/old/lms/MobileAppBackend";

export const fetchDailyLearning = async (school_id, class_id) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/fetchDailyLearning.php`,
            {
                params: {
                    school_id,
                    class_id
                }
            }
        );

        return response.data;

    } catch (error) {
        console.error("Error fetching daily learning:", error);
        throw error;
    }
};