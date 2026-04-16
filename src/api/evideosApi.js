import axios from "axios";

const BASE_URL = "https://lbsschool.in/old/lms/MobileAppBackend/fetchEVideos.php";

// 🔥 Format YouTube ID → URL
const formatVideoLink = (link) => {
    if (!link) return "#";

    // If already full URL
    if (link.startsWith("http")) return link;

    // Assume YouTube ID
    return `https://www.youtube.com/embed/${link}`;
};

export const getEVideos = async (class_id) => {
    try {
        const res = await axios.get(BASE_URL, {
            params: { class_id }
        });

        if (res.data.status) {
            // ✅ format links here (clean UI later)
            const formattedVideos = res.data.evideos.map(video => ({
                ...video,
                link: formatVideoLink(video.link)
            }));

            return {
                status: true,
                data: formattedVideos
            };
        }

        return {
            status: false,
            message: res.data.message,
            data: []
        };

    } catch (error) {
        console.error("EVideos API Error:", error);

        return {
            status: false,
            message: "Failed to fetch videos",
            data: []
        };
    }
};