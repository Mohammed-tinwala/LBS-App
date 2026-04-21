import axios from "axios";

// ✅ Base URL (update if needed)
const BASE_URL = "https://lbsschool.in/old/lms/MobileAppBackend/";
// e.g. http://localhost/lbs-school-api/

// ==============================
// 📌 SUBMIT GRIEVANCE
// ==============================
export const submitGrievance = async ({
    student_id,
    class_id,
    subject,
    category,
    message,
    files = [],
}) => {
    try {
        const formData = new FormData();

        formData.append("student_id", student_id);
        formData.append("class_id", class_id);
        formData.append("subject", subject);
        formData.append("category", category);
        formData.append("message", message);

        // 📎 multiple files
        files.forEach((file) => {
            formData.append("files[]", file);
        });

        const res = await axios.post(
            `${BASE_URL}submitGrievance.php`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return res.data;
    } catch (error) {
        console.error("Submit Grievance Error:", error);
        return {
            status: false,
            message: "Something went wrong",
        };
    }
};

// ==============================
// 📌 FETCH GRIEVANCES
// ==============================
export const fetchGrievances = async ({
    student_id,
    class_id,
    status = null,
}) => {
    try {
        const res = await axios.get(
            `${BASE_URL}fetchGrievance.php`,
            {
                params: {
                    student_id,
                    class_id,
                    status,
                },
            }
        );

        return res.data;
    } catch (error) {
        console.error("Fetch Grievances Error:", error);
        return {
            status: false,
            grievances: [],
        };
    }
};