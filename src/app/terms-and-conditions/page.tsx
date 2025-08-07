import { FileText, Shield, AlertCircle, CheckCircle } from "lucide-react"

const TermsConditions = () => {
    return (
        <div className="py-12">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <FileText className="w-16 h-16 mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms & Conditions</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Please read these terms carefully before using our services. Last updated: January 2024
                    </p>
                </div>
            </section>

            {/* Quick Summary */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-center">Quick Summary</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
                                <h3 className="text-lg font-semibold mb-2">What We Provide</h3>
                                <ul className="text-gray-600 space-y-1">
                                    <li>• Authentic football tickets</li>
                                    <li>• Secure payment processing</li>
                                    <li>• 24/7 customer support</li>
                                    <li>• Instant ticket delivery</li>
                                </ul>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <AlertCircle className="w-8 h-8 text-blue-600 mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Your Responsibilities</h3>
                                <ul className="text-gray-600 space-y-1">
                                    <li>• Provide accurate information</li>
                                    <li>• Use tickets responsibly</li>
                                    <li>• Follow venue rules</li>
                                    <li>• Respect other customers</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto prose prose-lg">
                        <h2 className="text-2xl font-bold mb-6">1. Acceptance of Terms</h2>
                        <p className="text-gray-600 mb-6">
                            By accessing and using FootballTicketsHub.com ("the Website"), you accept and agree to be bound by the
                            terms and provision of this agreement. If you do not agree to abide by the above, please do not use this
                            service.
                        </p>

                        <h2 className="text-2xl font-bold mb-6">2. Ticket Sales and Pricing</h2>
                        <div className="bg-gray-50 p-6 rounded-lg mb-6">
                            <h3 className="text-lg font-semibold mb-3">Pricing Policy</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• All prices are displayed in the currency selected and include applicable taxes</li>
                                <li>• Prices may vary based on demand, seat location, and event popularity</li>
                                <li>• Additional fees may apply and will be clearly shown before purchase</li>
                                <li>• We reserve the right to modify prices without prior notice</li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-bold mb-6">3. Booking and Payment</h2>
                        <p className="text-gray-600 mb-4">
                            When you place an order through our website, you are making an offer to purchase tickets. We reserve the
                            right to accept or decline your order for any reason. Payment must be made in full at the time of booking
                            using one of our accepted payment methods.
                        </p>
                        <div className="bg-blue-50 p-6 rounded-lg mb-6">
                            <h3 className="text-lg font-semibold mb-3">Payment Security</h3>
                            <p className="text-gray-600">
                                All payments are processed through secure, encrypted connections. We do not store your complete credit
                                card information on our servers. Your financial data is protected by industry-standard security
                                measures.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold mb-6">4. Ticket Delivery</h2>
                        <p className="text-gray-600 mb-4">
                            Tickets are delivered electronically via email as PDF attachments or mobile tickets. It is your
                            responsibility to ensure that the email address provided is correct and that you can receive emails from
                            our domain.
                        </p>
                        <ul className="text-gray-600 space-y-2 mb-6">
                            <li>• Tickets are typically delivered within 30 minutes of purchase</li>
                            <li>• Check your spam/junk folder if tickets don't arrive</li>
                            <li>• Contact support immediately if tickets are not received within 2 hours</li>
                            <li>• Print tickets clearly or ensure mobile display is bright and clear</li>
                        </ul>

                        <h2 className="text-2xl font-bold mb-6">5. Refunds and Cancellations</h2>
                        <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                            <h3 className="text-lg font-semibold mb-3">Refund Policy</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>
                                    • <strong>Event Cancellation:</strong> Full refund if event is cancelled and not rescheduled
                                </li>
                                <li>
                                    • <strong>Event Postponement:</strong> Tickets remain valid for new date, or refund available
                                </li>
                                <li>
                                    • <strong>Customer Cancellation:</strong> Generally not permitted unless specified otherwise
                                </li>
                                <li>
                                    • <strong>Processing Time:</strong> Refunds processed within 7-10 business days
                                </li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-bold mb-6">6. Ticket Authenticity and Guarantee</h2>
                        <p className="text-gray-600 mb-4">
                            We guarantee that all tickets sold through our platform are authentic and will provide entry to the
                            specified event. In the rare event that tickets are found to be invalid, we will provide replacement
                            tickets or a full refund.
                        </p>

                        <h2 className="text-2xl font-bold mb-6">7. User Conduct</h2>
                        <p className="text-gray-600 mb-4">You agree not to:</p>
                        <ul className="text-gray-600 space-y-2 mb-6">
                            <li>• Use the website for any unlawful purpose</li>
                            <li>• Attempt to gain unauthorized access to our systems</li>
                            <li>• Resell tickets for commercial purposes without authorization</li>
                            <li>• Provide false or misleading information</li>
                            <li>• Interfere with other users' enjoyment of our services</li>
                        </ul>

                        <h2 className="text-2xl font-bold mb-6">8. Limitation of Liability</h2>
                        <p className="text-gray-600 mb-6">
                            FootballTicketsHub shall not be liable for any indirect, incidental, special, consequential, or punitive
                            damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                            resulting from your use of our services.
                        </p>

                        <h2 className="text-2xl font-bold mb-6">9. Privacy and Data Protection</h2>
                        <p className="text-gray-600 mb-6">
                            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
                            website, to understand our practices regarding the collection and use of your personal information.
                        </p>

                        <h2 className="text-2xl font-bold mb-6">10. Changes to Terms</h2>
                        <p className="text-gray-600 mb-6">
                            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting
                            on the website. Your continued use of the service after changes are posted constitutes acceptance of the
                            modified terms.
                        </p>

                        <h2 className="text-2xl font-bold mb-6">11. Contact Information</h2>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <p className="text-gray-600 mb-4">
                                If you have any questions about these Terms & Conditions, please contact us:
                            </p>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Email: legal@footballticketshub.com</li>
                                <li>• Phone: +44 20 3808 1000</li>
                                <li>• Address: 123 Football Street, London, UK SW1A 1AA</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <Shield className="w-16 h-16 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-6">Questions About Our Terms?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Our legal team is available to clarify any questions you may have.
                    </p>
                    <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Contact Legal Team
                    </button>
                </div>
            </section>
        </div>
    )
}

export default TermsConditions
