import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";

const LogoutSection = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);

            logout();
            toast.success("Logged out successfully");

            setOpen(false);
            navigate("/login");

        } catch (error) {
            console.error(error);
            toast.error("Logout failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Logout Card */}
            <div className="border border-top border-gray-200 rounded-2xl p-4 flex items-center justify-between">

                <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                        Logout Account
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                        You will be signed out from this device
                    </p>
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-xl transition"
                >
                    Logout
                </button>
            </div>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

                    <div className="bg-white w-[90%] max-w-sm rounded-2xl p-5 shadow-lg">

                        <h2 className="text-lg font-semibold text-gray-800">
                            Confirm Logout
                        </h2>

                        <p className="text-sm text-gray-600 mt-2">
                            Are you sure you want to logout? You will need to login again to access your account.
                        </p>

                        <div className="flex gap-3 mt-5">

                            <button
                                onClick={() => setOpen(false)}
                                className="flex-1 py-2 rounded-xl border border-gray-300 text-gray-700"
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleLogout}
                                className="flex-1 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
                                disabled={loading}
                            >
                                {loading ? "Logging out..." : "Logout"}
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </>
    );
};

export default LogoutSection;