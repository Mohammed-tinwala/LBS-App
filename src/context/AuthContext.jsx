import { createContext, useContext, useState, useEffect } from "react";
import { getStudentProfile } from "../api/studentApi"; 

const AuthContext = createContext();

const getStoredStudent = () => {
    try {
        return JSON.parse(localStorage.getItem("student"));
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [student, setStudent] = useState(getStoredStudent());
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = (data) => {
        localStorage.setItem("student", JSON.stringify(data));
        setStudent(data);
    };

    const logout = () => {
        localStorage.removeItem("student");
        setStudent(null);
        setProfile(null);
    };

    // ✅ 🔥 AUTO LOAD PROFILE
    useEffect(() => {
        const loadProfile = async () => {
            if (!student?.id) return;

            try {
                setLoading(true);

                const res = await getStudentProfile(
                    student.id,
                    student.ayear // ⚠️ make sure this exists
                );

                // console.log("Profile API:", res);

                if (res?.status) {
                    setProfile(res.data || res); // handle both structures
                } else {
                    setProfile(null);
                }

            } catch (err) {
                console.error("Profile error:", err);
                setProfile(null);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [student?.id]);

    return (
        <AuthContext.Provider
            value={{
                student,
                profile,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);