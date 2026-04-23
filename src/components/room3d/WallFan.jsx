import { useGLTF, Clone } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const WallFan = ({ position, rotation }) => {
    const { scene } = useGLTF("/models/lowpoly_fan.glb");
    const ref = useRef();

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.z += 0.3;
        }
    });

    return (
        <group position={position} rotation={rotation} ref={ref}>
            <Clone object={scene} scale={0.5} />
        </group>
    );
};

export default WallFan;