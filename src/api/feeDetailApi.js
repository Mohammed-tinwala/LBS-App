import axios from "axios";

const BASE_URL = "https://lbsschool.in/old/lms/MobileAppBackend";

const api = axios.create({
    baseURL: BASE_URL,
});

// ✅ Helper function to clean API response
const processFeeDetails = (data) => {
    const feeDetails = data?.student?.fee_details || [];

    // ✅ Keep only successful records
    const valid = feeDetails.filter(item => item.Status === "Success");

    if (valid.length === 0) {
        return {
            summary: null,
            sessions: []
        };
    }

    // ✅ Map clean structure
    const sessions = valid.map(item => ({
        classCode: item.FeeDataList?.[0]?.ClassCode,
        totalAmount: item.TotalAmount,
        paidAmount: item.PaidAmount,
        dueAmount: item.DueAmount,
        lessAmount: item.LessAmount,
        installments: item.FeeDataList || []
    }));

    return {
        schoolName: data.school_name,
        enrollment: data.student.enrollment,
        sessions
    };
};

// ✅ Fetch Fee Details (UPDATED)
export const fetchFeeDetails = async ({ student_id, school_id }) => {
    try {
        const response = await api.get("/fetchFeeDetailsSchoolPlus.php", {
            params: {
                student_id,
                school_id
            }
        });

        // console.log("Raw API:", response.data);

        // ✅ Process data before returning
        const cleanedData = processFeeDetails(response.data);

        // console.log("Cleaned Fee Data:", cleanedData);

        return cleanedData;

    } catch (error) {
        console.error("Error fetching fee details:", error);
        throw error;
    }
};