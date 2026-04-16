import React from "react";
import PageHeader from "../components/common/headers/PageHeader";

const SecurityScreen = () => {
    return (
        <div className="flex flex-col gap-4 bg-primary pt-4 min-h-screen">

            <PageHeader title="App Security & Privacy" color="white" />

            <div className="bg-white rounded-t-[40px] px-5 py-6 flex flex-col gap-6">

                {/* Intro */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Your Security is Our Priority
                    </h2>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        We are committed to protecting your personal data and ensuring a
                        safe and secure experience while using our application. This page
                        explains how we handle security, privacy, and data protection
                        practices.
                    </p>
                </div>

                {/* Data Protection */}
                <div>
                    <h3 className="text-md font-semibold text-gray-800">
                        Data Protection
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        All user data is securely stored using industry-standard encryption
                        protocols. Sensitive information such as login credentials,
                        personal details, and payment-related data are never stored in
                        plain text format.
                    </p>
                </div>

                {/* Authentication */}
                <div>
                    <h3 className="text-md font-semibold text-gray-800">
                        Secure Authentication
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        We use secure authentication mechanisms to ensure that only
                        authorized users can access their accounts. Session handling is
                        managed securely and automatically expires after inactivity.
                    </p>
                </div>

                {/* Payment Security */}
                <div>
                    <h3 className="text-md font-semibold text-gray-800">
                        Payment Security
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        All payment transactions are processed through trusted and secure
                        payment gateways. We do not store your card details on our servers,
                        ensuring maximum safety during transactions.
                    </p>
                </div>

                {/* Data Privacy */}
                <div>
                    <h3 className="text-md font-semibold text-gray-800">
                        Data Privacy
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        We respect your privacy and do not sell or share your personal data
                        with third parties without your consent. Data is only used to
                        improve user experience and provide essential services.
                    </p>
                </div>

                {/* Device Security */}
                <div>
                    <h3 className="text-md font-semibold text-gray-800">
                        Device & Access Security
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        Our application monitors suspicious activity to prevent unauthorized
                        access. Multiple login attempts and unusual activity may result in
                        temporary account protection measures.
                    </p>
                </div>

                {/* User Responsibility */}
                <div>
                    <h3 className="text-md font-semibold text-gray-800">
                        User Responsibility
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        Users are responsible for keeping their login credentials safe. We
                        recommend not sharing passwords and logging out from shared devices
                        after use.
                    </p>
                </div>

                {/* Updates */}
                <div>
                    <h3 className="text-md font-semibold text-gray-800">
                        Policy Updates
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        We may update our security and privacy policies from time to time.
                        Users are encouraged to review this page regularly for any changes.
                    </p>
                </div>

                {/* Footer Note */}
                <div className="bg-gray-100 p-4 rounded-2xl">
                    <p className="text-xs text-gray-600 leading-relaxed">
                        By using this application, you agree to our security and privacy
                        practices. If you have any concerns regarding data protection, you
                        can contact our support team for assistance.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default SecurityScreen;