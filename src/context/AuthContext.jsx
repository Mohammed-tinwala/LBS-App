import { createContext, useContext, useState } from "react";

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
    const [profile, setProfile] = useState(null); // ✅ ADD THIS

    const login = (data) => {
        localStorage.setItem("student", JSON.stringify(data));
        setStudent(data);
    };

    const logout = () => {
        localStorage.removeItem("student");
        setStudent(null);
        setProfile(null); // ✅ clear profile too
    };

    return (
        <AuthContext.Provider value={{ student, profile, setProfile, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);