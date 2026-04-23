import { BedDouble, Home, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RoomView from "../../../components/room3d/RoomView";
import { roomBeds } from "../../../data/roomData";

const HostelRoomSection = ({ roomData }) => {
    const navigate = useNavigate();

    const handleNavigation = (e) => {
        e.stopPropagation();
        navigate("/hostel-room");
    };

    return (
        <div className="container-padding">

            {/* Main Card */}
            <div className="bg-primary/30 border rounded-3xl p-4 shadow-sm">

                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-[18px] font-semibold text-black">
                            Hostel Room
                        </h2>
                        <p className="text-sm text-label">
                            Room & Bed Details
                        </p>
                    </div>

                    <div
                        onClick={handleNavigation}
                        className="w-9 h-9 bg-primary-dark/80 rounded-full flex items-center justify-center cursor-pointer"
                    >
                        <ArrowUpRight size={18} className="text-white" />
                    </div>
                </div>

                {/* 3D Room Preview */}
                <div className="w-full h-55 rounded-2xl overflow-hidden border mb-4 bg-white relative">
                    <div className="absolute inset-0">
                        <RoomView beds={roomBeds} />
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-2 gap-3">

                    {/* Room Info */}
                    <div className="bg-primary/5 border rounded-2xl p-3">

                        <div className="flex items-center gap-2 mb-2">
                            <Home size={16} className="text-label" />
                            <p className="text-[13px] font-medium text-label">
                                Room No
                            </p>
                        </div>

                        <h3 className="text-[15px] font-semibold text-black">
                            {roomData?.room_no || "A-203"}
                        </h3>

                        <p className="text-[12px] text-label mt-1">
                            {roomData?.floor || "2nd Floor"}
                        </p>

                    </div>

                    {/* Bed Info */}
                    <div className="bg-primary/5 border rounded-2xl p-3">

                        <div className="flex items-center gap-2 mb-2">
                            <BedDouble size={16} className="text-label" />
                            <p className="text-[13px] font-medium text-label">
                                Your Bed
                            </p>
                        </div>

                        <h3 className="text-[15px] font-semibold text-black">
                            {roomData?.bed_no || "Bed A1"}
                        </h3>

                        <p className="text-[12px] text-label mt-1">
                            Highlighted in room
                        </p>

                    </div>

                </div>

                {/* CTA */}
                <button
                    onClick={handleNavigation}
                    className="w-full mt-4 h-11 bg-primary text-white rounded-2xl text-sm font-medium"
                >
                    View Room Details
                </button>

            </div>

        </div>
    );
};

export default HostelRoomSection;