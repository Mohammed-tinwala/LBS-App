import axios from "axios";

const BASE_URL = "https://lbsschool.in/old/lms/MobileAppBackend/fetchAdmitCards.php";

export const fetchAdmitCard = async (sid) => {
    const res = await axios.post(BASE_URL, {
        sid,
        db_school: 2,
    });
    // console.log(res.data);  
    return res.data;
};