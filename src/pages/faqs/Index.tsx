"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Search, Shield, CreditCard, Ticket, Users, Clock } from "lucide-react"

const FAQ = () => {
    const [openItems, setOpenItems] = useState<number[]>([])
    const [searchTerm, setSearchTerm] = useState("")

    const toggleItem = (index: number) => {
        setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
    }

    const faqCategories = [
        {
            title: "Booking & Payment",
            icon: <CreditCard className="w-6 h-6" />,
            questions: [
                {
                    question: "How do I book tickets?",
                    answer:
                        "Booking tickets is simple! Search for your desired match, select your preferred seats, and complete the secure checkout process. You'll receive your tickets instantly via email.",
                },
                {
                    question: "What payment methods do you accept?",
                    answer:
                        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All payments are processed securely using 256-bit SSL encryption.",
                },
                {
                    question: "Can I get a refund if the match is cancelled?",
                    answer:
                        "Yes, if a match is officially cancelled and not rescheduled, we provide a full refund within 7-10 business days. If the match is postponed, your tickets remain valid for the new date.",
                },
                {
                    question: "Are there any booking fees?",
                    answer:
                        "We strive to keep our fees transparent and competitive. Any applicable booking fees will be clearly displayed during checkout before you complete your purchase.",
                },
            ],
        },
        {
            title: "Ticket Delivery & Security",
            icon: <Ticket className="w-6 h-6" />,
            questions: [
                {
                    question: "How will I receive my tickets?",
                    answer:
                        "Tickets are delivered instantly via email as PDF attachments or mobile tickets. You can print them at home or show them on your mobile device at the venue.",
                },
                {
                    question: "Are your tickets authentic?",
                    answer:
                        "All our tickets are 100% authentic and sourced directly from official channels, authorized resellers, or trusted partners. We guarantee entry to the venue.",
                },
                {
                    question: "What if I don't receive my tickets?",
                    answer:
                        "If you don't receive your tickets within 30 minutes of booking, please check your spam folder first. If still not found, contact our 24/7 support team immediately.",
                },
                {
                    question: "Can I transfer my tickets to someone else?",
                    answer:
                        "Yes, most tickets can be transferred. The process varies by venue and event. Contact our support team for assistance with ticket transfers.",
                },
            ],
        },
        {
            title: "Account & Support",
            icon: <Users className="w-6 h-6" />,
            questions: [
                {
                    question: "Do I need to create an account to buy tickets?",
                    answer:
                        "While you can purchase as a guest, creating an account allows you to track orders, save favorite teams, and receive exclusive offers and early access to tickets.",
                },
                {
                    question: "How can I contact customer support?",
                    answer:
                        "Our customer support team is available 24/7 via phone (+44 20 3808 1000), email (support@footballticketshub.com), or live chat on our website.",
                },
                {
                    question: "Can I modify my booking after purchase?",
                    answer:
                        "Modifications depend on the specific event and ticket type. Contact our support team as soon as possible, and we'll do our best to accommodate your request.",
                },
                {
                    question: "How do I reset my password?",
                    answer:
                        "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a secure link to reset your password.",
                },
            ],
        },
        {
            title: "Match Information",
            icon: <Clock className="w-6 h-6" />,
            questions: [
                {
                    question: "What happens if a match is postponed?",
                    answer:
                        "If a match is postponed, your tickets remain valid for the rescheduled date. We'll notify you immediately of any changes via email and SMS.",
                },
                {
                    question: "Can I choose my exact seats?",
                    answer:
                        "For many events, you can select specific seats from our interactive seating map. For others, you'll choose a price category and we'll assign the best available seats.",
                },
                {
                    question: "What's included with my ticket?",
                    answer:
                        "Your ticket includes entry to the match. Some premium packages may include additional benefits like hospitality, parking, or merchandise - these will be clearly stated.",
                },
                {
                    question: "Are there age restrictions for tickets?",
                    answer:
                        "Age restrictions vary by venue and event. Children under 2 may not require a ticket if sitting on an adult's lap, but this varies by stadium policy.",
                },
            ],
        },
    ]

    const filteredCategories = faqCategories
        .map((category) => ({
            ...category,
            questions: category.questions.filter(
                (q) =>
                    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        }))
        .filter((category) => category.questions.length > 0)

    return (
        <div className="py-12">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Find answers to common questions about booking tickets, payments, delivery, and more.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search FAQ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 pl-12 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </section>

            {/* Quick Help */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-8">Need Quick Help?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Secure Booking</h3>
                            <p className="text-gray-600 text-sm">All transactions are protected with bank-level security</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                            <p className="text-gray-600 text-sm">Our customer service team is always here to help</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <Ticket className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Instant Delivery</h3>
                            <p className="text-gray-600 text-sm">Get your tickets immediately via email</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Categories */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    {filteredCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className="text-blue-600 mr-3">{category.icon}</div>
                                <h2 className="text-2xl font-bold">{category.title}</h2>
                            </div>

                            <div className="space-y-4">
                                {category.questions.map((faq, index) => {
                                    const globalIndex = categoryIndex * 100 + index
                                    const isOpen = openItems.includes(globalIndex)

                                    return (
                                        <div key={index} className="border border-gray-200 rounded-lg">
                                            <button
                                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                                                onClick={() => toggleItem(globalIndex)}
                                            >
                                                <span className="font-semibold text-gray-900">{faq.question}</span>
                                                {isOpen ? (
                                                    <ChevronUp className="w-5 h-5 text-gray-500" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                                )}
                                            </button>
                                            {isOpen && (
                                                <div className="px-6 pb-4">
                                                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Support */}
            <section className="py-16 bg-blue-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
                    <p className="text-xl text-blue-100 mb-8">Our friendly support team is here to help you 24/7</p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Live Chat
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-colors">
                            Call +44 20 3808 1000
                        </button>
                        <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
                            Email Support
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FAQ
