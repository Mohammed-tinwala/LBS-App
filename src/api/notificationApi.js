import axios from "axios";

const BASE_URL = 'https://lbsschool.in/old/lms/MobileAppBackend';

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

/**
 * Get Notifications
 */
export const fetchNotifications = async ({ school_id, class_id, date }) => {
    try {
        const { data } = await apiClient.get("/fetchNotifications.php", {
            params: {
                school_id,
                class_id,
                date,
            },
        });

        return data;
    } catch (error) {
        console.error("Notification API Error:", error);

        return {
            status: false,
            message: "Unable to load notifications",
        };
    }
};