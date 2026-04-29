import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef, Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import RoomLoader from "../loader/RoomLoader";
import Room from "./Room";

const CameraSetup = ({ resetTrigger }) => {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(0, 5, 10);
        camera.lookAt(0, 2, 0);
    }, [camera, resetTrigger]); // 👈 important

    return null;
};

const RoomView = ({ beds, resetTrigger }) => {
    return (
        <Canvas
            style={{ width: "100%", height: "100%" }}
            camera={{ position: [0, 4, 10], fov: 55 }}
        >
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 10, 5]} intensity={1} />

            <CameraSetup resetTrigger={resetTrigger} />

            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                minDistance={5}
                maxDistance={20}
                maxPolarAngle={Math.PI / 2}
                enableDamping
            />

            <Suspense fallback={<RoomLoader />}>
                <group scale={1.2}>
                    <Room beds={beds} />
                </group>
            </Suspense>
        </Canvas>
    );
};

export default RoomView;