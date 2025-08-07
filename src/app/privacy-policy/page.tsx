import { Shield, Eye, Lock, Users, Settings } from "lucide-react"

const PrivacyPolicy = () => {
    return (
        <div className="py-12">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <Shield className="w-16 h-16 mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Your privacy is our priority. Learn how we collect, use, and protect your personal information. Last
                        updated: January 2024
                    </p>
                </div>
            </section>

            {/* Privacy Principles */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-8">Our Privacy Principles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Secure by Design</h3>
                            <p className="text-gray-600 text-sm">We use industry-leading security measures to protect your data</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <Eye className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Transparent</h3>
                            <p className="text-gray-600 text-sm">We're clear about what data we collect and how we use it</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <Settings className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Your Control</h3>
                            <p className="text-gray-600 text-sm">You have full control over your personal information</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto prose prose-lg">
                        <h2 className="text-2xl font-bold mb-6">1. Information We Collect</h2>

                        <div className="bg-blue-50 p-6 rounded-lg mb-6">
                            <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                            <p className="text-gray-600 mb-3">When you use our services, we may collect:</p>
                            <ul className="text-gray-600 space-y-1">
                                <li>• Name and contact information (email, phone, address)</li>
                                <li>• Payment information (credit card details, billing address)</li>
                                <li>• Account credentials (username, password)</li>
                                <li>• Preferences and interests (favorite teams, notifications)</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg mb-6">
                            <h3 className="text-lg font-semibold mb-3">Automatically Collected Information</h3>
                            <ul className="text-gray-600 space-y-1">
                                <li>• Device information (IP address, browser type, operating system)</li>
                                <li>• Usage data (pages visited, time spent, clicks)</li>
                                <li>• Location data (if you enable location services)</li>
                                <li>• Cookies and similar tracking technologies</li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-bold mb-6">2. How We Use Your Information</h2>
                        <p className="text-gray-600 mb-4">We use your personal information to:</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-green-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-3">Service Delivery</h3>
                                <ul className="text-gray-600 space-y-1">
                                    <li>• Process ticket orders</li>
                                    <li>• Deliver tickets electronically</li>
                                    <li>• Provide customer support</li>
                                    <li>• Send order confirmations</li>
                                </ul>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-3">Improvement & Marketing</h3>
                                <ul className="text-gray-600 space-y-1">
                                    <li>• Improve our website and services</li>
                                    <li>• Send promotional offers (with consent)</li>
                                    <li>• Analyze usage patterns</li>
                                    <li>• Prevent fraud and abuse</li>
                                </ul>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-6">3. Information Sharing</h2>
                        <p className="text-gray-600 mb-4">
                            We do not sell, trade, or rent your personal information to third parties. We may share your information
                            only in the following circumstances:
                        </p>

                        <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                            <h3 className="text-lg font-semibold mb-3">When We May Share Information</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>
                                    • <strong>Service Providers:</strong> Trusted partners who help us operate our business (payment
                                    processors, email services)
                                </li>
                                <li>
                                    • <strong>Legal Requirements:</strong> When required by law or to protect our rights
                                </li>
                                <li>
                                    • <strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets
                                </li>
                                <li>
                                    • <strong>With Your Consent:</strong> When you explicitly agree to share information
                                </li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-bold mb-6">4. Data Security</h2>
                        <p className="text-gray-600 mb-4">
                            We implement comprehensive security measures to protect your personal information:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Technical Safeguards</h3>
                                <ul className="text-gray-600 space-y-1">
                                    <li>• 256-bit SSL encryption</li>
                                    <li>• Secure data centers</li>
                                    <li>• Regular security audits</li>
                                    <li>• Access controls and monitoring</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Operational Safeguards</h3>
                                <ul className="text-gray-600 space-y-1">
                                    <li>• Employee training programs</li>
                                    <li>• Background checks</li>
                                    <li>• Incident response procedures</li>
                                    <li>• Regular policy updates</li>
                                </ul>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-6">5. Your Rights and Choices</h2>
                        <p className="text-gray-600 mb-4">You have several rights regarding your personal information:</p>

                        <div className="bg-blue-50 p-6 rounded-lg mb-6">
                            <h3 className="text-lg font-semibold mb-3">Your Data Rights</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>
                                    • <strong>Access:</strong> Request a copy of your personal data
                                </li>
                                <li>
                                    • <strong>Correction:</strong> Update or correct inaccurate information
                                </li>
                                <li>
                                    • <strong>Deletion:</strong> Request deletion of your personal data
                                </li>
                                <li>
                                    • <strong>Portability:</strong> Receive your data in a portable format
                                </li>
                                <li>
                                    • <strong>Opt-out:</strong> Unsubscribe from marketing communications
                                </li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-bold mb-6">6. Cookies and Tracking</h2>
                        <p className="text-gray-600 mb-4">
                            We use cookies and similar technologies to enhance your browsing experience:
                        </p>

                        <div className="space-y-4 mb-6">
                            <div className="border-l-4 border-blue-500 pl-4">
                                <h4 className="font-semibold">Essential Cookies</h4>
                                <p className="text-gray-600 text-sm">Required for basic website functionality and security</p>
                            </div>
                            <div className="border-l-4 border-green-500 pl-4">
                                <h4 className="font-semibold">Performance Cookies</h4>
                                <p className="text-gray-600 text-sm">Help us understand how visitors interact with our website</p>
                            </div>
                            <div className="border-l-4 border-purple-500 pl-4">
                                <h4 className="font-semibold">Marketing Cookies</h4>
                                <p className="text-gray-600 text-sm">Used to deliver relevant advertisements (with your consent)</p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-6">7. Data Retention</h2>
                        <p className="text-gray-600 mb-6">
                            We retain your personal information only as long as necessary to provide our services and comply with
                            legal obligations. Typically, we keep account information for 7 years after account closure, and
                            transaction records for 10 years as required by financial regulations.
                        </p>

                        <h2 className="text-2xl font-bold mb-6">8. International Transfers</h2>
                        <p className="text-gray-600 mb-6">
                            Your information may be transferred to and processed in countries other than your own. We ensure
                            appropriate safeguards are in place to protect your data during international transfers, including
                            standard contractual clauses and adequacy decisions.
                        </p>

                        <h2 className="text-2xl font-bold mb-6">9. Children's Privacy</h2>
                        <p className="text-gray-600 mb-6">
                            Our services are not directed to children under 13. We do not knowingly collect personal information from
                            children under 13. If we become aware that we have collected such information, we will take steps to
                            delete it promptly.
                        </p>

                        <h2 className="text-2xl font-bold mb-6">10. Changes to This Policy</h2>
                        <p className="text-gray-600 mb-6">
                            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting
                            the new policy on our website and sending you an email notification if you have an account with us.
                        </p>

                        <h2 className="text-2xl font-bold mb-6">11. Contact Us</h2>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <p className="text-gray-600 mb-4">
                                If you have any questions about this Privacy Policy or our data practices, please contact us:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold mb-2">General Inquiries</h4>
                                    <ul className="text-gray-600 space-y-1">
                                        <li>Email: privacy@footballticketshub.com</li>
                                        <li>Phone: +44 20 3808 1000</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Data Protection Officer</h4>
                                    <ul className="text-gray-600 space-y-1">
                                        <li>Email: dpo@footballticketshub.com</li>
                                        <li>Address: 123 Football Street, London, UK</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <Users className="w-16 h-16 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-6">Manage Your Privacy Settings</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Take control of your personal information and privacy preferences.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Privacy Dashboard
                        </button>
                        <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
                            Cookie Settings
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PrivacyPolicy
