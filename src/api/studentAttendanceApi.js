import axios from "axios";

const BASE_URL = "https://lbsschool.in/old/lms/MobileAppBackend";

/* =========================
   GET Student Attendance
========================= */
export const fetchStudentAttendance = async ({
    student_id,
    db_school = 2,
    from_date,
    to_date,
}) => {
    try {
        // ✅ Validation (frontend safety)
        if (!student_id) {
            throw new Error("student_id is required");
        }

        const response = await axios.post(`${BASE_URL}/fetchStudentAttendance.php`, {
            sid: student_id,
            db_school,
        });

        // console.log("✅ Student Attendance API Response:", response.data);

        return response.data;

    } catch (error) {
        console.error("❌ Student Attendance API Error:", error);

        return {
            status: false,
            message: error.response?.data?.message || error.message,
            data: [],
            summary: {
                total_days: 0,
                present: 0,
                absent: 0,
            },
        };
    }
};