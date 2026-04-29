import { Download } from 'lucide-react'
import PaymentHistoryLoader from '../../../components/loader/PaymentHistoryLoader';
import React from 'react'

const PaymentHistory = ({ sessions }) => {

    if (!sessions) {
        return <PaymentHistoryLoader />;
    }

    if (!sessions || sessions.length === 0) return null;

    // ✅ Extract all receipts
    const payments = sessions.flatMap(session =>
        (session.installments || []).flatMap(inst =>
            (inst.ReceiptDetailList || [])
                .filter(r => r.Amount > 0) // ignore 0 entries
                .map(r => ({
                    receiptNo: r.ReceiptNo?.trim(),
                    amount: r.Amount,
                    date: r.ReceiptDate,
                    installment: inst.InstallmentName
                }))
        )
    );

    // ✅ Sort latest first
    payments.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="container-padding">

            {/* Header */}
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-lg font-semibold">Payment History</h2>
                <p className="text-xs text-gray-400">
                    {payments.length} Transactions
                </p>
            </div>

            {/* Empty State */}
            {payments.length === 0 ? (
                <p className="text-sm text-gray-400">No payments found</p>
            ) : (
                <div className="flex flex-col gap-2">

                    {payments.map((item, index) => (

                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-primary/30 rounded-xl shadow-sm"
                        >

                            {/* Left */}
                            <div className='flex flex-col'>
                                <h3 className='text-[14px] font-semibold'>
                                    ₹ {item.amount.toLocaleString()}
                                </h3>

                                <p className='text-[12px] text-gray-500'>
                                    {item.date}
                                </p>

                                <p className='text-[11px] text-gray-400'>
                                    {item.installment}
                                </p>

                                <p className='text-[11px] text-gray-400'>
                                    Receipt: {item.receiptNo}
                                </p>
                            </div>

                            {/* Right */}
                            <div className="flex items-center gap-2">

                                <span className="text-[11px] text-green-600 font-medium">
                                    Paid
                                </span>

                                {/* <Download
                                    size={16}
                                    className="text-gray-500 cursor-pointer"
                                /> */}

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    )
}

export default PaymentHistory