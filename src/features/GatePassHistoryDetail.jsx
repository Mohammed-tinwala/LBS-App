import React, { useEffect, useState } from 'react'
import PageHeader from '../components/common/headers/PageHeader'
import { fetchGatePass } from '../api/gatePassApi'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-hot-toast'
import { Clock, CheckCircle2, XCircle } from "lucide-react";

const GatePassHistoryDetail = () => {

    const { student } = useAuth();

    const [loading, setLoading] = useState(true);
    const [gatePasses, setGatePasses] = useState([]);

    // =========================
    // Fetch All Gate Pass
    // =========================
    useEffect(() => {
        const loadGatePass = async () => {
            try {
                const res = await fetchGatePass(student?.id, 2);

                if (res.status) {
                    setGatePasses(res.all || []);
                } else {
                    toast.error(res.message);
                }

            } catch (err) {
                toast.error("Failed to load gate pass data");
            } finally {
                setLoading(false);
            }
        };

        if (student?.id) loadGatePass();
    }, [student]);

    return (
        <div className="flex flex-col gap-4 bg-primary pt-4">
            <PageHeader title="Gate Pass History Detail" color="white" />

            <div className='relative flex flex-col gap-3 pb-12 px-4 bg-white py-4 rounded-t-[50px]'>

                {/* 🔄 Loading */}
                {loading ? (
                    <p className='text-center text-sm text-gray-500 mt-4'>
                        Loading Detail...
                    </p>
                ) : gatePasses.length === 0 ? (
                    <p className='text-center text-sm text-gray-500 mt-4'>
                        No gate pass history found
                    </p>
                ) : (
                    gatePasses.map((item) => (
                        <div
                            key={item.id}
                            className="bg-gray-100 rounded-2xl p-4 flex justify-between items-center"
                        >
                            <div>
                                <p className="text-sm font-medium">{item.reason}</p>
                                <p className="text-xs text-gray-500">
                                    {item.out_date} • {item.out_time}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                                {item.status === "approved" && (
                                    <CheckCircle2 className="text-green-400" size={14} />
                                )}
                                {item.status === "pending" && (
                                    <Clock className="text-yellow-400" size={14} />
                                )}
                                {item.status === "rejected" && (
                                    <XCircle className="text-red-400" size={14} />
                                )}

                                {item.status}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default GatePassHistoryDetail