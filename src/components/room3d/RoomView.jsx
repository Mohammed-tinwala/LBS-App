import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import RoomLoader from "../loader/RoomLoader";
import Room from "./Room";
import { roomBeds } from "../../data/roomData";

// ✅ Camera setup for front view
const CameraSetup = () => {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(0, 5, 10);   // center front view
        camera.lookAt(0, 2, 0);           // look at room center
    }, [camera]);

    return null;
};

const RoomView = () => {
    return (
        <Canvas
            style={{ width: "100%", height: "100%" }}
            camera={{ position: [0, 4, 10], fov: 55 }}
        >
            {/* Lights */}
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 10, 5]} intensity={1} />

            {/* Camera Fix */}
            <CameraSetup />

            {/* Disable interaction for card preview */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
            />

            {/* Scene */}
            <Suspense fallback={<RoomLoader />}>
                <group scale={1.2}>
                    <Room beds={roomBeds} />
                </group>
            </Suspense>
        </Canvas>
    );
};

export default RoomView;