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

    const login = (data) => {
        localStorage.setItem("student", JSON.stringify(data));
        setStudent(data);
    };

    const logout = () => {
        localStorage.removeItem("student");
        setStudent(null);
    };

    return (
        <AuthContext.Provider value={{ student, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);