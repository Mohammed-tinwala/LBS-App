import { useGLTF, Clone } from "@react-three/drei";

const StudyTable = ({ position, rotation = [0, 0, 0], scale }) => {
    const { scene } = useGLTF("/models/teachers_desk.glb");

    return (
        <group position={position} rotation={rotation}>
            <Clone object={scene} scale={scale} />
        </group>
    );
};

export default StudyTable;