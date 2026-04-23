import { useGLTF, Clone } from "@react-three/drei";

const RoomWindow = ({ position, rotation, scale = 1 }) => {
  const { scene } = useGLTF("/models/curtain.glb");

  return (
    <group position={position} rotation={rotation}>
      <Clone object={scene} scale={scale} />
    </group>
  );
};

export default RoomWindow;