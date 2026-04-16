import axios from "axios";

const BASE_URL = "https://lbsschool.in/old/lms/MobileAppBackend/fetchMedicalData.php";

export const getMedicalData = async (student_id) => {
    try {
        const res = await axios.get(BASE_URL, {
            params: { student_id }
        });

        console.log(res.data);

        return res.data;

    } catch (error) {
        console.error("Medical API Error:", error);
        return {
            status: false,
            medical: null
        };
    }
};