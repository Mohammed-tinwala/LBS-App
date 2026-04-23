import { useGLTF, Clone } from "@react-three/drei";

const Cupboard = ({ position }) => {
  const { scene } = useGLTF("/models/wardrobe.glb");

  return (
    <Clone
      object={scene}
      position={position}
      scale={0.5}
    />
  );
};

export default Cupboard;