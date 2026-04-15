import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
    const { student } = useAuth();

    return student ? <Navigate to="/home" /> : children;
};

export default PublicRoute;