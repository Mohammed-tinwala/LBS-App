import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { color } from "framer-motion";

const HostelMenuu = ({ data = [] }) => {

    const [index, setIndex] = useState(0);

    // 📅 Today's date
    const todayDate = new Date().toISOString().split("T")[0];

    // 🎯 Get today's menu from API
    const todayMenu = useMemo(() => {
        return data.find(item => item.date === todayDate) || null;
    }, [data]);

    // 🧠 Convert API → UI meals
    const meals = useMemo(() => {
        if (!todayMenu) return [];

        return [
            {
                title: "Breakfast",
                time: todayMenu.breakfast?.timing,
                items: todayMenu.breakfast?.menu?.split(",") || [],
                image: "/images/breakfast.webp",
                text_color: "black",
                background_image: "/images/breakfast-background.webp",
            },
            {
                title: "Lunch",
                time: todayMenu.lunch?.timing,
                items: todayMenu.lunch?.menu?.split(",") || [],
                image: "/images/lunch-thali.webp",
                background_image: "/images/lunch-background.webp",
                text_color: "black",
                special: true,
            },
            {
                title: "Snacks",
                time: todayMenu.evening_snacks?.timing,
                items: todayMenu.evening_snacks?.menu?.split(",") || [],
                image: "/images/breakfast.webp",
                background_image: "/images/breakfast-background.webp",
                text_color: "black",
            },
            {
                title: "Dinner",
                time: todayMenu.dinner?.timing,
                items: todayMenu.dinner?.menu?.split(",") || [],
                image: "/images/dinner-thali.webp",
                background_image: "/images/dinner-background.webp",
                text_color: "white",
            },
        ];
    }, [todayMenu]);

    const next = () => setIndex((prev) => (prev + 1) % meals.length);
    const prev = () => setIndex((prev) => (prev === 0 ? meals.length - 1 : prev - 1));

    // 📅 Pretty date (minimal placement)
    const todayPretty = new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
    });

    return (
        <div className="container-padding">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Today’s Menu</h2>

                {/* Date + arrows */}
                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {todayPretty}
                    </span>

                    <div className="flex gap-1">
                        <button onClick={prev} className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                            <ChevronLeft size={16} />
                        </button>
                        <button onClick={next} className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            

            {/* ❌ No data */}
            {!todayMenu && (
                <p className="text-sm text-gray-400">No menu available for today</p>
            )}

            {/* ✅ Carousel */}
            {meals.length > 0 && (
                <>
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${index * 100}%)` }}
                        >
                            {meals.map((meal, i) => (
                                <div key={i} className="min-w-full px-1">

                                    {/* 🎨 MODERN CARD */}
                                    <div className={`relative rounded-3xl p-5 flex items-center justify-between ${meal.text_color === "white" ? "text-white" : "text-black"} shadow-lg`}>

                                        {/* Background Image */}
                                        <div className={`absolute rounded-2xl overflow-hidden opacity-80 inset-0 bg-[url('${meal.background_image}')] bg-cover bg-center`}>

                                        </div>

                                        {/* 🔥 Black Overlay */}
                                        {/* <div className="absolute inset-0 bg-black/50"></div> */}

                                        {/* Glow */}
                                        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] rounded-3xl"></div>

                                        {/* Left */}
                                        <div className="w-full relative flex flex-col gap-3 z-10">
                                            <div className="w-full flex items-center justify-between">

                                                <div>
                                                    <h3 className="text-lg font-semibold">
                                                        {meal.title}
                                                    </h3>
                                                    <p className="text-xs opacity-80">
                                                        {meal.time}
                                                    </p>
                                                </div>

                                                {meal.special && (
                                                    <span className="text-[10px] bg-white/20 px-2 py-1 rounded-full w-fit">
                                                        ⭐ Special
                                                    </span>
                                                )}

                                            </div>

                                            <div className="w-full flex items-center justify-between">

                                                <ul className="text-sm space-y-1 opacity-90">
                                                    {meal.items.map((item, idx) => (
                                                        <li key={idx}>• {item.trim()}</li>
                                                    ))}
                                                </ul>

                                                {/* Right Image */}
                                                <img
                                                    src={meal.image}
                                                    alt={meal.title}
                                                    className="w-28 h-28 object-contain relative z-10 drop-shadow-lg"
                                                />
                                            </div>
                                        </div>


                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Indicators */}
                    <div className="flex justify-center gap-2 mt-4">
                        {meals.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all ${index === i
                                    ? "w-6 bg-primary-dark"
                                    : "w-2 bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default HostelMenuu;