import { useState } from "react";
import BedLabel from "./BedLabel";
import BedModel from "./BedModel";

const Bed = ({ position, name, isMine, vacant, rotation }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <group
            position={position}
            rotation={rotation}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            scale={hovered ? 1.1 : 1}
        >
            {/* 3D Bed Model */}
            <BedModel isMine={isMine} />

            {/* Label */}
            <BedLabel
                position={[0, -3, -2]} // relative to group
                name={name}
                isMine={isMine}
            />
        </group>
    );
};

export default Bed;