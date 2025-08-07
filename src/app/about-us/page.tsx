import React from 'react'
import { Shield, Users, Globe, Award, Clock, Heart } from 'lucide-react'

const AboutUs = () => {
    return (
        <div className="py-12">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About FootballTicketsHub</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Your trusted partner for premium football tickets worldwide. We've been connecting fans
                        with their favorite teams for over a decade.
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                            <p className="text-gray-600 mb-4">
                                Founded in 2010, FootballTicketsHub was born from a simple passion: making it easier
                                for football fans to experience the magic of live matches. What started as a small
                                operation has grown into one of the world's most trusted ticket platforms.
                            </p>
                            <p className="text-gray-600 mb-4">
                                We understand that football is more than just a game – it's a passion that brings
                                people together. That's why we're committed to providing authentic, secure, and
                                fairly-priced tickets to fans around the globe.
                            </p>
                            <p className="text-gray-600">
                                Today, we serve over 500,000 customers annually and have partnerships with major
                                clubs and venues worldwide, ensuring you get the best seats at the best prices.
                            </p>
                        </div>
                        <div>
                            <img
                                src="/placeholder.svg?height=400&width=600"
                                alt="Football stadium"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-4">Trust & Security</h3>
                            <p className="text-gray-600">
                                Every ticket is guaranteed authentic. We use advanced security measures to protect
                                your personal and payment information.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <Heart className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-4">Passion for Football</h3>
                            <p className="text-gray-600">
                                We're football fans ourselves. We understand the excitement and emotion that comes
                                with supporting your team.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-4">Customer First</h3>
                            <p className="text-gray-600">
                                Your satisfaction is our priority. Our dedicated support team is available 24/7
                                to assist with any questions or concerns.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose FootballTicketsHub?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-start space-x-4">
                            <Globe className="w-8 h-8 text-blue-600 mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
                                <p className="text-gray-600">
                                    Access to tickets for major leagues and tournaments worldwide, including Premier League,
                                    Champions League, World Cup, and more.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Award className="w-8 h-8 text-blue-600 mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Award-Winning Service</h3>
                                <p className="text-gray-600">
                                    Recognized by industry leaders for our exceptional customer service and innovative
                                    ticket delivery solutions.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Clock className="w-8 h-8 text-blue-600 mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Instant Delivery</h3>
                                <p className="text-gray-600">
                                    Get your tickets immediately via email or mobile delivery. No waiting, no worries
                                    about postal delays.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Shield className="w-8 h-8 text-blue-600 mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Money-Back Guarantee</h3>
                                <p className="text-gray-600">
                                    If your event is cancelled and not rescheduled, we'll provide a full refund.
                                    Your peace of mind is guaranteed.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <img
                                src="/placeholder.svg?height=150&width=150"
                                alt="Team member"
                                className="w-24 h-24 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">John Smith</h3>
                            <p className="text-blue-600 mb-2">CEO & Founder</p>
                            <p className="text-gray-600 text-sm">
                                Passionate football fan with 15+ years in the ticketing industry.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <img
                                src="/placeholder.svg?height=150&width=150"
                                alt="Team member"
                                className="w-24 h-24 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
                            <p className="text-blue-600 mb-2">Head of Customer Service</p>
                            <p className="text-gray-600 text-sm">
                                Dedicated to ensuring every customer has an exceptional experience.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <img
                                src="/placeholder.svg?height=150&width=150"
                                alt="Team member"
                                className="w-24 h-24 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">Mike Wilson</h3>
                            <p className="text-blue-600 mb-2">Head of Security</p>
                            <p className="text-gray-600 text-sm">
                                Expert in cybersecurity ensuring all transactions are safe and secure.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Experience Live Football?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of satisfied customers and secure your tickets today.
                    </p>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                        Browse Tickets Now
                    </button>
                </div>
            </section>
        </div>
    )
}

export default AboutUs
