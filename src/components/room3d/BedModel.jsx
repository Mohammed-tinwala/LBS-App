import { useGLTF, Clone } from "@react-three/drei";

const BedModel = ({ isMine }) => {
    const { scene } = useGLTF("/models/low_poly_single_bed.glb");

    return (
        <Clone
            object={scene}
            scale={2}
        />
    );
};

export default BedModel;