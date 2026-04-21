import axios from "axios";

const BASE_URL = "https://lbsschool.in/old/lms/MobileAppBackend";

/* =========================
   📥 FETCH HOSTEL MENU
========================= */
export const fetchHostelMenu = async ({ school_id, date = null }) => {
    try {
        const res = await axios.get(`${BASE_URL}/fetchHostelMenu.php`, {
            params: {
                school_id,
                date, // optional
            },
        });

        return res.data;

    } catch (error) {
        console.error("Fetch Hostel Menu Error:", error);

        return {
            status: false,
            message: "Failed to fetch hostel menu",
        };
    }
};

/* =========================
   🧠 FORMAT MENU DATA (UI HELPER)
========================= */
export const formatHostelMenu = (menuData) => {
    if (!menuData) return [];

    return [
        {
            title: "Breakfast",
            time: menuData.breakfast?.timing || "",
            items: menuData.breakfast?.menu
                ? menuData.breakfast.menu.split(",").map(i => i.trim())
                : [],
            image: "/images/breakfast.webp",
        },
        {
            title: "Lunch",
            time: menuData.lunch?.timing || "",
            items: menuData.lunch?.menu
                ? menuData.lunch.menu.split(",").map(i => i.trim())
                : [],
            image: "/images/lunch-thali.webp",
        },
        {
            title: "Snacks",
            time: menuData.evening_snacks?.timing || "",
            items: menuData.evening_snacks?.menu
                ? menuData.evening_snacks.menu.split(",").map(i => i.trim())
                : [],
            image: "/images/snacks.webp",
        },
        {
            title: "Dinner",
            time: menuData.dinner?.timing || "",
            items: menuData.dinner?.menu
                ? menuData.dinner.menu.split(",").map(i => i.trim())
                : [],
            image: "/images/dinner-thali.webp",
        },
    ];
};