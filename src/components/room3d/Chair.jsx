import { useGLTF, Clone } from "@react-three/drei";

const Chair = ({ position, rotation = [0, 0, 0], scale }) => {
    const { scene } = useGLTF("/models/old_wooden_chair_low-poly.glb");

    return (
        <group position={position} rotation={rotation}>
            <Clone object={scene} scale={scale} />
        </group>
    )
}

export default Chair
