import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react'

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        orderNumber: ''
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
        setIsSubmitted(true)
        setTimeout(() => setIsSubmitted(false), 3000)
    }

    return (
        <div className="py-12">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        We're here to help! Get in touch with our friendly customer service team
                        available 24/7 to assist with your football ticket needs.
                    </p>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-8">Get In Touch</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
                            <p className="text-gray-600 mb-3">Speak directly with our team</p>
                            <p className="text-blue-600 font-semibold">+44 20 3808 1000</p>
                            <p className="text-sm text-gray-500">24/7 Available</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                            <p className="text-gray-600 mb-3">Send us a detailed message</p>
                            <p className="text-blue-600 font-semibold">support@footballticketshub.com</p>
                            <p className="text-sm text-gray-500">Response within 2 hours</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                            <p className="text-gray-600 mb-3">Instant help available</p>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                                Start Chat
                            </button>
                            <p className="text-sm text-gray-500 mt-2">Average wait: 30 seconds</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                            <p className="text-gray-600 mb-3">Our London office</p>
                            <p className="text-sm text-gray-600">123 Football Street<br />London, UK SW1A 1AA</p>
                            <p className="text-sm text-gray-500 mt-2">Mon-Fri: 9AM-6PM</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Form */}
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                                {isSubmitted ? (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-green-800 mb-2">Message Sent!</h3>
                                        <p className="text-green-600">Thank you for contacting us. We'll get back to you within 2 hours.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Your full name"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="your.email@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Subject *
                                                </label>
                                                <select
                                                    id="subject"
                                                    name="subject"
                                                    required
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="">Select a subject</option>
                                                    <option value="booking">Booking Inquiry</option>
                                                    <option value="payment">Payment Issue</option>
                                                    <option value="tickets">Ticket Delivery</option>
                                                    <option value="refund">Refund Request</option>
                                                    <option value="technical">Technical Support</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Order Number (if applicable)
                                                </label>
                                                <input
                                                    type="text"
                                                    id="orderNumber"
                                                    name="orderNumber"
                                                    value={formData.orderNumber}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="FTH-123456"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={6}
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Please describe your inquiry in detail..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                                        >
                                            <Send className="w-5 h-5 mr-2" />
                                            Send Message
                                        </button>
                                    </form>
                                )}
                            </div>

                            {/* Contact Info & FAQ */}
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Quick Help</h2>

                                {/* Office Hours */}
                                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                                    <div className="flex items-center mb-4">
                                        <Clock className="w-6 h-6 text-blue-600 mr-3" />
                                        <h3 className="text-lg font-semibold">Support Hours</h3>
                                    </div>
                                    <div className="space-y-2 text-gray-600">
                                        <div className="flex justify-between">
                                            <span>Phone & Live Chat:</span>
                                            <span className="font-semibold">24/7</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Email Response:</span>
                                            <span className="font-semibold">Within 2 hours</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Office Visits:</span>
                                            <span className="font-semibold">Mon-Fri 9AM-6PM</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Common Questions */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4">Common Questions</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-1">Where are my tickets?</h4>
                                            <p className="text-sm text-gray-600">Check your email (including spam folder) or contact us with your order number.</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-1">Can I change my booking?</h4>
                                            <p className="text-sm text-gray-600">Contact us immediately - we'll do our best to accommodate changes.</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-1">Payment not working?</h4>
                                            <p className="text-sm text-gray-600">Try a different card or payment method, or contact your bank.</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-1">Match cancelled?</h4>
                                            <p className="text-sm text-gray-600">We'll automatically process refunds for cancelled matches.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Emergency Contact */}
            <section className="py-12 bg-red-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-red-800">Emergency Match Day Support</h2>
                    <p className="text-red-600 mb-6">
                        Having issues on match day? Our emergency hotline is available for urgent ticket problems.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold">
                            Emergency Hotline: +44 20 3808 1001
                        </div>
                        <div className="text-red-600 font-medium">
                            Available 2 hours before kick-off until match end
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-8">Visit Our London Office</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-6">
                            <div className="text-center text-gray-600">
                                <MapPin className="w-12 h-12 mx-auto mb-2" />
                                <p>Interactive Map</p>
                                <p className="text-sm">123 Football Street, London, UK SW1A 1AA</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div>
                                <h3 className="font-semibold mb-2">🚇 Nearest Tube</h3>
                                <p className="text-gray-600">Westminster Station<br />2 minutes walk</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">🚌 Bus Routes</h3>
                                <p className="text-gray-600">Routes 11, 24, 88<br />Stop: Parliament Square</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">🚗 Parking</h3>
                                <p className="text-gray-600">Q-Park Westminster<br />5 minutes walk</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactUs
