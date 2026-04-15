import { Check, AlertCircle, Clock } from "lucide-react";

const FeeInstallmentsSection = () => {
    const installments = [
        {
            id: 1,
            title: "1st Term",
            amount: "₹ 15,000",
            date: "Jan 10",
            status: "paid",
        },
        {
            id: 2,
            title: "2nd Term",
            amount: "₹ 15,000",
            date: "April 10",
            status: "pending",
        },
        {
            id: 3,
            title: "3rd Term",
            amount: "₹ 15,000",
            date: "July 10",
            status: "upcoming",
        },
    ];

    const getStatusStyles = (status) => {
        switch (status) {
            case "paid":
                return {
                    card: "bg-green-100",
                    badge: "bg-green-500 text-white",
                    iconBg: "bg-green-500",
                    icon: <Check size={14} />,
                    label: "Paid",
                    leftCircle: "bg-green-500",
                };

            case "pending":
                return {
                    card: "bg-red-100",
                    badge: "bg-red-500 text-white",
                    iconBg: "bg-white",
                    icon: <AlertCircle size={14} className="text-red-500" />,
                    label: "Pending",
                    leftCircle: "bg-red-500",
                };

            case "upcoming":
                return {
                    card: "bg-yellow-100",
                    badge: "bg-yellow-300 text-black",
                    iconBg: "bg-white",
                    icon: <Clock size={14} className="text-yellow-600" />,
                    label: "Upcoming",
                    leftCircle: "bg-yellow-500",
                };

            default:
                return {};
        }
    };

    return (
        <div className="container-padding">

            {/* Sub heading */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Installment Schedule</h2>
                <p className="text-xs font-normal">See more</p>
            </div>

            {installments.map((item) => {
                const style = getStatusStyles(item.status);

                return (
                    <div key={item.id} className="flex items-center gap-2">

                        {/* Left Circle */}
                        <div
                            className={`w-6 h-6 text-[12px] flex items-center justify-center rounded-full text-white font-semibold ${style.leftCircle}`}
                        >
                            {item.status === "paid" ? <Check size={14} /> : item.id}
                        </div>

                        {/* Card */}
                        <div
                            className={`flex-1 flex items-center mb-2 justify-between px-4 py-4 rounded-2xl ${style.card}`}
                        >

                            {/* Left Content */}
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-[14px] sm:text-[14px] font-medium">
                                    {item.title} {item.amount}
                                </h3>
                                <span className="text-gray-500 text-[12px]">
                                    {item.date}
                                </span>
                            </div>

                            {/* Status Badge */}
                            <div
                                className={`flex items-center gap-2 px-2 py-2 rounded-full ${style.badge}`}
                            >
                                <div
                                    className={`w-4 h-4 flex items-center justify-center rounded-full ${style.iconBg}`}
                                >
                                    {style.icon}
                                </div>
                                <span className="text-[12px] font-medium">
                                    {style.label}
                                </span>
                            </div>

                        </div>
                    </div>
                );
            })}

            {/* Bottom Alert */}
            <div className="flex items-center gap-3 bg-yellow-300 rounded-2xl px-4 py-4">
                <AlertCircle className="text-yellow-700" />
                <p className="text-black font-medium text-sm sm:text-base">
                    Next installment Due in 3 days.
                </p>
            </div>

        </div>
    );
};

export default FeeInstallmentsSection;