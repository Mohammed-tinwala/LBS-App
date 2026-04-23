import RoomView from "../components/room3d/RoomView";
import { roomBeds } from "../data/roomData";

const HostelRoom = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold mb-4">
        Room 101 - Bed Allocation
      </h1>

      <RoomView beds={roomBeds} />

      {/* Info Panel */}
      <div className="mt-4 bg-white p-4 rounded-xl shadow">
        <p><strong>Your Bed:</strong> B2 - Ali Khan</p>
      </div>
    </div>
  );
};

export default HostelRoom;