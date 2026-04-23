import { useGLTF, Clone } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Fan = () => {
  const { scene } = useGLTF("/models/ceiling_fan.glb");
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.3;
    }
  });

  return (
    <group position={[0, 4.5, 0]} ref={ref}>
      <Clone object={scene} scale={1.5} color='#fff' />
    </group>
  );
};

export default Fan;