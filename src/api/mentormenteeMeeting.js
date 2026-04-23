import axios from "axios";

const BASE_URL = "https://lbsschool.in/old/lms/MobileAppBackend"; 

/* =========================
   GET Mentor-Mentee Meetings
========================= */
export const fetchMentorMenteeMeetings = async ({ student_id, school_id = 2 }) => {
  try {
    // ✅ Validation (frontend safety)
    if (!student_id) {
      throw new Error("student_id is required");
    }

    const response = await axios.get(
      `${BASE_URL}/fetchMentorMenteeMeeting.php`,
      {
        params: {
          student_id,
          ...(school_id && { school_id }), // optional param
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error("❌ MentorMentee API Error:", error);

    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};