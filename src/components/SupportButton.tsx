'use client';

import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FiHelpCircle } from 'react-icons/fi';
import { gql, useMutation } from '@apollo/client';

const SEND_EMAIL_TO_SUPPORT = gql`
  mutation SendSupportMessage($name: String!, $email: String!, $message: String!) {
    sendSupportMessage(name: $name, email: $email, message: $message)
  }
`;

const SupportChat = () => {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const [sendSupportMessage, { loading, error, data, reset }] = useMutation(SEND_EMAIL_TO_SUPPORT);

    const openChat = () => {
        setOpen(true);
        reset(); // Clear previous messages/errors when opening
    };

    const closeChat = () => {
        setOpen(false);
        reset(); // Clear previous messages/errors when closing
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await sendSupportMessage({
                variables: {
                    name: form.name,
                    email: form.email,
                    message: form.message,
                },
            });

            if (response.data.sendSupportMessage) {
                // alert('Message sent successfully!');
                setForm({ name: '', email: '', message: '' });
                setOpen(false);
            } else {
                // alert('Failed to send message.');
            }
        } catch (err) {
            //   alert('Error sending message: ' + err.message);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 text-sm font-sans">
            {!open && (
                <button
                    onClick={openChat}
                    className="bg-ticket-blue text-white rounded-full shadow-lg p-3 hover:bg-ticket-red transition-all flex items-center gap-2"
                    aria-label="Open Support"
                >
                    <FiHelpCircle className="text-xl" />
                    <span className="hidden sm:inline font-semibold">Support</span>
                </button>
            )}

            {open && (
                <div className="w-80 bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200">
                    <div className="bg-ticket-primarycolor text-white p-3 flex justify-between items-center">
                        <FiHelpCircle className="text-xl" />

                        <h4 className="text-base font-semibold">Support</h4>
                        <button onClick={closeChat} aria-label="Close">
                            <IoClose className="text-xl hover:text-gray-300" />
                        </button>
                    </div>

                    <div className="p-4 max-h-[400px] overflow-y-auto">
                        <p className="text-gray-700 mb-4">
                            Please leave your message, and we’ll get back to you as soon as possible. Thank you!
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="block font-medium text-gray-800 mb-1">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-ticket-primarycolor"
                                />
                            </div>

                            <div>
                                <label className="block font-medium text-gray-800 mb-1">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-ticket-primarycolor"
                                />
                            </div>

                            <div>
                                <label className="block font-medium text-gray-800 mb-1">Message</label>
                                <textarea
                                    name="message"
                                    rows={3}
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-ticket-primarycolor"
                                />
                            </div>

                            <div className="text-right pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`px-4 py-2 rounded-md text-white transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-ticket-primarycolor hover:bg-ticket-red'
                                        }`}
                                >
                                    {loading ? 'Sending...' : 'Send message'}
                                </button>
                            </div>

                            {error && <p className="text-red-500 text-sm mt-1">Error sending message: {error.message}</p>}
                            {data && data.sendSupportMessage && <p className="text-green-600 text-sm mt-1">Message sent successfully!</p>}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SupportChat;
