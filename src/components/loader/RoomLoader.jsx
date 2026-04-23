import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
    const { progress } = useProgress();

    return (
        <Html center>
            <div className="bg-white/80 backdrop-blur-md px-4 py-3 rounded-2xl shadow border flex flex-col items-center gap-2">

                <div className="w-7 h-7 border-primary border-t-transparent rounded-full animate-spin"></div>

                <p className="text-[12px] text-label">
                    Loading Room... {progress.toFixed(0)}%
                </p>

            </div>
        </Html>
    );
};

export default Loader;