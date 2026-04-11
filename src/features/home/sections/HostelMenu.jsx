import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const getDates = () => {
    const today = new Date()
    const dates = []

    for (let i = -6; i <= 6; i++) {
        const d = new Date()
        d.setDate(today.getDate() + i)

        dates.push({
            date: d.getDate(),
            day: d.toLocaleDateString("en-US", { weekday: "short" }), // Mon, Tue
            fullDate: d
        })
    }

    return dates
}

const HostelMenu = () => {
    const datesArray = getDates()

    const [activeDate, setActiveDate] = useState(
        new Date().getDate()
    )
    const containerRef = useRef(null);

    // 👉 Center today's date on load
    useEffect(() => {
        const todayIndex = 6 // because range is -6 to +6
        const container = containerRef.current

        if (container && container.children[todayIndex]) {
            const el = container.children[todayIndex]
            const offset =
                el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2

            container.scrollTo({ left: offset, behavior: "smooth" })
        }
    }, [])

    const scroll = (dir) => {
        containerRef.current.scrollBy({
            left: dir === "left" ? -150 : 150,
            behavior: "smooth",
        });
    };

    return (
        <div>

            {/* Sub heading */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">March 2026</h2>
                {/* Arrows */}
                <div className="flex gap-2 z-10">
                    <button onClick={() => scroll("left")} className="bg-white w-8 h-8 rounded-full flex-center shadow">
                        <ChevronLeft size={18} />
                    </button>
                    <button onClick={() => scroll("right")} className="bg-white w-8 h-8 rounded-full flex-center shadow">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Date Selector */}
            <div className="relative mb-6">

                {/* Scrollable Dates */}
                <div
                    ref={containerRef}
                    className="flex gap-4 overflow-x-auto hide-scrollbar py-2"
                >
                    {datesArray.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveDate(item.date)}
                            className={`min-w-15 h-15 flex flex-col items-center justify-center rounded-2xl cursor-pointer transition
            ${activeDate === item.date
                                    ? "bg-primary text-white scale-105"
                                    : "bg-primary/20 text-primary"
                                }`}
                        >
                            <span className="text-xs">{item.day}</span>
                            <span className="text-sm font-semibold">{item.date}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Meal Cards */}
            <div className="flex flex-col gap-4">

                {/* Breakfast */}
                <div className="rounded-3xl p-5 text-black relative overflow-hidden 
bg-[url('/images/breakfast-background.webp')] bg-cover bg-center">

                    <div className="flex justify-between items-center mb-3">
                        <div className="flex flex-center items-center gap-1">
                            <img src="/images/sunrise-svg.webp" alt="sun" className="inline w-5 mr-1" />
                            <h3 className="font-semibold text-lg text-center mt-1">
                                Breakfast
                            </h3>
                        </div>
                        <p className="text-sm">7:30am - 9:30am</p>
                    </div>

                    <hr className="mb-3 opacity-40" />

                    <div className="flex items-center justify-between w-full">

                        <ul className="space-y-1 text-sm">
                            <li>• Poha</li>
                            <li>• Hot Tea</li>
                            <li>• Apple Juice</li>
                            <li>• Banana</li>
                        </ul>

                        <img src="/images/breakfast.webp" className="w-24 h-24 rounded-2xl object-contain" alt="breakfast" />

                    </div>

                </div>

                {/* Lunch */}
                <div className="rounded-3xl p-5 text-black relative overflow-hidden bg-[url('/images/lunch-background.webp')] bg-cover bg-center from-orange-100 to-orange-300">

                    <div className="flex justify-between items-center mb-3">
                        <div className="flex flex-center items-center gap-1">
                            <img src="/images/afternoon-svg.webp" alt="sun" className="inline w-5 mr-1" />
                            <h3 className="font-semibold text-lg text-center">
                                Lunch
                            </h3>
                        </div>
                        <p className="text-sm">12:30pm - 2:30pm</p>
                    </div>

                    <div className="mb-3">
                        <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full mr-2">
                            ⭐ Today’s Special
                        </span>
                    </div>

                    <div className="flex items-center justify-between w-full">

                        <ul className="space-y-1 text-sm">
                            <li>• Chapati</li>
                            <li>• Jeera Rice</li>
                            <li>• Dal Tadka</li>
                            <li>• Mix Veg & Salad</li>
                        </ul>

                        <img src="/images/lunch-thali.webp" className="w-24 h-24 rounded-2xl object-contain" alt="lunch" />

                    </div>

                </div>

                {/* Dinner */}
                <div className="rounded-3xl p-5 text-white relative overflow-hidden bg-[url('/images/dinner-background.webp')] bg-cover bg-center from-blue-900 to-indigo-900">

                    <div className="flex justify-between items-center mb-3">
                        <div className="flex flex-center items-center gap-1">
                            <img src="/images/moon-svg.webp" alt="sun" className="inline w-5 mr-1" />
                            <h3 className="font-semibold text-lg text-center mt-1">
                                Dinner
                            </h3>
                        </div>
                        <p className="text-sm">7:00pm - 8:30pm</p>
                    </div>

                    <hr className="mb-3 opacity-30 border-white" />

                    <div className="flex items-center justify-between w-full">

                    <ul className="space-y-1 text-sm">
                        <li>• Paneer Sabzi</li>
                        <li>• Roti</li>
                        <li>• Sticky Rice</li>
                        <li>• Gulab Jamun</li>
                    </ul>

                    <img src="/images/dinner-thali.webp" className="w-22 h-22 rounded-2xl object-contain" alt="dinner" />

                    </div>

                </div>

            </div>

        </div>
    );
};

export default HostelMenu;