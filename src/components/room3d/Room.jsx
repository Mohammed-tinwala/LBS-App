import { useTexture } from "@react-three/drei";
import Cupboard from "./CupBoard";
import StudyTable from "./Studytable";
import WallFan from "./WallFan";
import Fan from "./Fan";
import Bed from "./Bed";
import RoomWindow from "./RoomWindow";
import Chair from "./Chair";

const Room = ({ beds }) => {
    const floorTexture = useTexture("/textures/floor/wooden_floor.jpg");
    const wallTexture = useTexture("/textures/wall/Concrete046_2K-JPG_Displacement.jpg");
    const frontWallTexture = useTexture("/textures/wall/concrete_wall_003_disp_4k.png");

    return (
        <>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[12, 12]} />
                <meshStandardMaterial map={floorTexture} />
            </mesh>

            {/* Divider Wall (short height) */}
            <mesh position={[0, 1.2, 0]}>
                <boxGeometry args={[0.2, 2.5, 12]} />
                <meshStandardMaterial map={wallTexture} />
            </mesh>

            {/* Back Wall */}
            <mesh position={[0, 2.5, -6]}>
                <boxGeometry args={[12, 5, 0.2]} />
                <meshStandardMaterial color="#faf3e0" />
            </mesh>

            {/* Left Wall */}
            <mesh position={[-6, 2.5, 0]}>
                <boxGeometry args={[0.2, 5, 12]} />
                <meshStandardMaterial map={wallTexture} />
            </mesh>

            {/* Right Wall */}
            <mesh position={[6, 2.5, 0]}>
                <boxGeometry args={[0.2, 5, 12]} />
                <meshStandardMaterial map={wallTexture} />
            </mesh>

            <Fan />

            <Cupboard position={[-2, 0, -5]} />
            <Cupboard position={[2, 0, -5]} />

            <StudyTable
                position={[-4.9, 0, 2]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={8}
            />

            <StudyTable
                position={[4.9, 0, 2]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={8}
            />

            <Chair
                position={[-3.8, 0, 2]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={2}
            />

            <Chair
                position={[3.8, 0, 2]}
                rotation={[0, Math.PI / 2, 0]}
                scale={2}
            />

            <WallFan position={[-5.8, 4, -2]} rotation={[4, Math.PI / 2, 2]} />
            <WallFan position={[5.8, 4, -2]} rotation={[0, -Math.PI / 2, 0]} />

            {/* <RoomWindow
                position={[3.6, -1, 12]}
                rotation={[0, Math.PI / 2, 0]}
                scale={0.5}
            />
            <RoomWindow
                position={[3.9, 2.5, 0]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={0.5}
            /> */}

            {/* Beds */}
            {beds.map((bed, index) => (
                <Bed key={index} {...bed} />
            ))}
        </>
    );
};

export default Room;