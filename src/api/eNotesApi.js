import axios from "axios";

// ✅ Base URL
const BASE_URL = "https://lbsschool.in/old/lms/MobileAppBackend";

// ✅ Axios instance (best practice)
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // ✅ important for cookie (db_school)
});


// ✅ Fetch E-Notes (with optional subject filter)
export const fetchENotes = async ({ class_id, subject_id }) => {
  try {
    const params = { class_id, db_school: 2 }; // ✅ always include db_school

    if (subject_id) {
      params.subject_id = subject_id;
    }

    const response = await api.get("/fetchENotes.php", { params });

    return response.data;
  } catch (error) {
    console.error("Error fetching E-Notes:", error);
    throw error;
  }
};


// ✅ Fetch ALL Subjects (NEW API)
export const fetchAllSubjects = async () => {
  try {
    const response = await api.get("/fetchAllSubjects.php");

    return response.data;
  } catch (error) {
    console.error("Error fetching all subjects:", error);
    throw error;
  }
};


// ✅ Fetch EBooks
export const fetchEBooks = async ({ class_id, subject_id }) => {
  try {
    const response = await api.get("/fetchEBooks.php", {
      params: { class_id, subject_id },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching EBooks:", error);
    throw error;
  }
};