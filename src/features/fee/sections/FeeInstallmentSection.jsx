import { Check, AlertCircle, Clock } from "lucide-react";
import FeeInstallmentLoader from "../../../components/loader/FeeInstallmentLoader";

const FeeInstallmentsSection = ({ sessions }) => {

    if (!sessions) {
        return <FeeInstallmentLoader />;
    }

    if (!sessions || sessions.length === 0) return null;

    const currentSession = sessions.find(s => s.dueAmount > 0) || sessions[0];

    const installments = (currentSession.installments || []).map((inst, index) => {
        const dueDate = new Date(inst.LastDueDate);
        const today = new Date();

        let status = "upcoming";

        if (inst.DueAmount === 0 && inst.PaidAmount > 0) {
            status = "paid";
        } else if (inst.DueAmount > 0 && dueDate < today) {
            status = "pending";
        }

        return {
            id: `${inst.InstallmentCode}-${index}`,
            title: inst.InstallmentName,
            amount: inst.FeeAmount,
            paid: inst.PaidAmount,
            due: inst.DueAmount,
            date: inst.LastDueDate,
            status
        };
    });

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

    // ✅ Find next due installment
    const nextDue = installments.find(i => i.status !== "paid");

    return (
        <div className="container-padding">

            {/* Header */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Installment Schedule</h2>
                {/* <p className="text-xs text-gray-400">Auto-generated</p> */}
            </div>

            {installments.map((item, index) => {
                const style = getStatusStyles(item.status);

                return (
                    <div key={item.id} className="flex items-center gap-2">

                        {/* Left Circle */}
                        <div
                            className={`w-6 h-6 text-[12px] flex items-center justify-center rounded-full text-white font-semibold ${style.leftCircle}`}
                        >
                            {item.status === "paid" ? <Check size={14} /> : index + 1}
                        </div>

                        {/* Card */}
                        <div
                            className={`flex-1 flex items-center mb-2 justify-between px-4 py-4 rounded-2xl ${style.card}`}
                        >

                            {/* Left Content */}
                            <div className="flex flex-col">
                                <h3 className="text-[14px] font-medium">
                                    {item.title}
                                </h3>

                                <p className="text-xs text-gray-500">
                                    Due: {item.date}
                                </p>

                                <p className="text-xs">
                                    ₹ {item.paid} paid / ₹ {item.amount} total
                                </p>
                            </div>

                            {/* Status Badge */}
                            <div
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${style.badge}`}
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
            {nextDue && (
                <div className="flex items-center gap-3 bg-yellow-200 rounded-2xl px-4 py-4 mt-3">
                    <AlertCircle className="text-yellow-700" />
                    <p className="text-black font-medium text-sm">
                        Next due: {nextDue.title} (₹ {nextDue.due})
                    </p>
                </div>
            )}

        </div>
    );
};

export default FeeInstallmentsSection;