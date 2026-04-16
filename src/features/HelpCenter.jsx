import React from "react";
import PageHeader from "../components/common/headers/PageHeader";
import { Mail, Phone, Clock } from "lucide-react";

const HelpCenter = () => {
    return (
        <div className="flex flex-col gap-4 bg-primary pt-4 min-h-screen">

            <PageHeader title="Help Center" color="white" />

            <div className="bg-white rounded-t-[40px] px-5 py-6 flex flex-col gap-6">

                {/* Intro */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        How can we help you?
                    </h2>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        Welcome to the Help Center. Here you can find answers to common
                        questions, troubleshoot issues, and learn how to use the app
                        effectively. If you still need help, our support team is always
                        available.
                    </p>
                </div>

                {/* Account Help */}
                <div>
                    <h3 className="text-md font-semibold text-gray-800">
                        Account & Login Issues
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        If you are unable to log in, make sure your credentials are correct.
                        You can also try resetting your password or clearing app cache.
                        Ensure you are using the latest version of the app.
                    </p>
                </div>

                {/* Profile Issues */}
                <div>
                    <h3 className="text-md font-semibold text-gray-800">
                        Profile & Data Issues
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        If your profile information is not showing correctly, try refreshing
                        the page or re-login. Some updates may take a few seconds to sync
                        with the server.
                    </p>
                </div>

                {/* Fees / Payments */}
                <div>
                    <h3 className="text-md font-semibold text-gray-800">
                        Fees & Payment Issues
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        If a payment fails or is not updated, please check your transaction
                        status. In most cases, it gets updated within a few minutes. If not,
                        contact support with your transaction ID.
                    </p>
                </div>

                {/* App Issues */}
                <div>
                    <h3 className="text-md font-semibold text-gray-800">
                        App Performance Issues
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        If the app is slow or not responding, try restarting it or updating
                        to the latest version. Poor internet connection may also affect app
                        performance.
                    </p>
                </div>

                {/* FAQs */}
                <div>
                    <h3 className="text-md font-semibold text-gray-800">
                        Frequently Asked Questions
                    </h3>

                    <div className="mt-3 flex flex-col gap-3 text-sm text-gray-600 leading-relaxed">

                        <div>
                            <p className="font-medium text-gray-800">
                                Q: How do I reset my password?
                            </p>
                            <p>
                                A: Go to login page and click on "Forgot Password" to reset it
                                using your registered email or mobile number.
                            </p>
                        </div>

                        <div>
                            <p className="font-medium text-gray-800">
                                Q: Why is my profile not updating?
                            </p>
                            <p>
                                A: Try refreshing the app or logging out and logging back in.
                                Server sync may take a few moments.
                            </p>
                        </div>

                        <div>
                            <p className="font-medium text-gray-800">
                                Q: How do I check my fee details?
                            </p>
                            <p>
                                A: Go to the Fee Detail page from the dashboard to view
                                breakdown, installments, and payment history.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Contact Support */}
                <div>
                    <h3 className="text-md font-semibold text-gray-800">
                        Contact Support
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        If your issue is not resolved, you can reach our support team.
                        We usually respond within 24 hours on working days.
                    </p>

                    <div className="flex flex-col gap-3 mt-3 bg-gray-100 p-4 rounded-2xl text-sm text-gray-700">
                        <p className="flex items-center gap-2" ><Mail size={18} className="text-primary" /> Email: support@yourapp.com</p>
                        <p className="flex items-center gap-2"><Phone size={18} className="text-primary" /> Phone: +91 XXXXX XXXXX</p>
                        <p className="flex items-center gap-2"><Clock size={18} className="text-primary" /> Support Time: 9:00 AM - 6:00 PM</p>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="bg-gray-100 p-4 rounded-2xl">
                    <p className="text-xs text-gray-600 leading-relaxed">
                        We are always working to improve your experience. If you have any
                        feedback or suggestions, feel free to share them with our team.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default HelpCenter;