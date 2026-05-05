import axios from "axios";

const BASE_URL = "https://lbsschool.in/old/lms/MobileAppBackend";

/* =========================
   📤 Upload Student Document
========================= */
export const uploadStudentDocument = async ({
    student_id,
    document_type,
    file
}) => {
    try {
        const formData = new FormData();

        formData.append("student_id", student_id);
        formData.append("document_type", document_type);
        formData.append("file", file); // 🔥 IMPORTANT

        const res = await axios.post(
            "https://lbsschool.in/old/lms/MobileAppBackend/uploadStudentDocument.php",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return res.data;

    } catch (error) {
        console.error("Upload Document API Error:", error);
        return {
            status: false,
            message: "Upload failed"
        };
    }
};


/* =========================
   📥 Fetch Student Documents
========================= */
export const fetchStudentDocuments = async ({ student_id }) => {
    try {
        if (!student_id) {
            throw new Error("student_id is required");
        }

        const response = await axios.get(
            `${BASE_URL}/fetchStudentDocuments.php`,
            {
                params: {
                    student_id,
                },
            }
        );

        return response.data;

    } catch (error) {
        console.error("❌ Fetch Documents API Error:", error);

        return {
            status: false,
            message: error.response?.data?.message || error.message,
        };
    }
};