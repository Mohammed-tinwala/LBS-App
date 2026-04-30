import axios from "axios";

const BASE_URL = "https://lbsschool.in/old/lms/MobileAppBackend";

/* =========================
   Submit Doubt
========================= */

export const submitDoubt = async ({
  std_id,
  class_id,
  subject,
  doubt,
  image
}) => {
  try {

    const formData = new FormData();

    formData.append("std_id", std_id);
    formData.append("class_id", class_id);
    formData.append("subject", subject);
    formData.append("doubt", doubt);

    if (image) {
      formData.append("image", image);
    }

    const response = await axios.post(
      `${BASE_URL}/submitStudentDoubt.php`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("❌ Submit Doubt Error:", error);

    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};


/* =========================
   📥 Fetch Doubts
========================= */
export const fetchDoubts = async ({ std_id }) => {
    try {
        // ✅ Validation
        if (!std_id) {
            throw new Error("std_id is required");
        }

        const response = await axios.get(
            `${BASE_URL}/fetchStudentDoubt.php`,
            {
                params: {
                    std_id
                }
            }
        );

        return response.data;

    } catch (error) {
        console.error("❌ Fetch Doubts API Error:", error);

        return {
            status: false,
            message: error.response?.data?.message || error.message,
        };
    }
};