import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthGuard = ({ children }) => {
    const { student } = useAuth();

    if (!student && location.pathname !== "/select-student") {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AuthGuard;