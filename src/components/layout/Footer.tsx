import React from "react";
import  Link  from "next/link";
import { PhoneCall, Mail, CreditCard, CheckCircle } from "lucide-react";
import { FaTiktok, FaYoutube, FaXTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-ticket-primarycolor text-white pt-12 pb-6 w-full ">
      <div className="ticket-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Company Information */}
          <div>
            <span className="font-bold text-xl mb-4 py-4">
              Foolball<span className="text-ticket-red">Tickets</span>Hub
            </span>
            <p className="text-sm opacity-80 mb-4">
              The world's leading football ticket marketplace, serving fans
              since 2006 with 100% guaranteed authentic tickets.
            </p>
            <div className="flex space-x-3">

              <a href="https://www.tiktok.com/@footballticketshub?lang=en" aria-label="TikTok">
                <FaTiktok className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Facebook">
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/@FootballTicketsHub" aria-label="YouTube">
                <FaYoutube className="w-6 h-6" />
              </a>
              <a href="#" aria-label="X (Twitter)">
                <FaXTwitter className="w-6 h-6" />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="opacity-80 hover:opacity-100 hover:text-ticket-red transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="opacity-80 hover:opacity-100 hover:text-ticket-red transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="opacity-80 hover:opacity-100 hover:text-ticket-red transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="opacity-80 hover:opacity-100 hover:text-ticket-red transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="opacity-80 hover:opacity-100 hover:text-ticket-red transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Popular Categories</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/league/premier-league"
                  className="opacity-80 hover:opacity-100 hover:text-ticket-red transition-colors">
                  Premier League Tickets
                </Link>
              </li>
              <li>
                <Link
                  href="/league/english-cups"
                  className="opacity-80 hover:opacity-100 hover:text-ticket-red transition-colors">
                  English Cups
                </Link>
              </li>
              <li>
                <Link
                  href="/league/european-cups"
                  className="opacity-80 hover:opacity-100 hover:text-ticket-red transition-colors">
                  European Cups
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <PhoneCall size={16} className="mr-3 mt-1 text-ticket-red" />
                <span className="opacity-80">
                  +44 800 123 4567
                  <br />
                  Mon-Fri, 9am-6pm (GMT)
                </span>
              </li>
              <li className="flex items-start">
                <Mail size={16} className="mr-3 mt-1 text-ticket-red" />
                <span className="opacity-80">
                  contact@footballticketshub.com
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <h5 className="font-medium mb-2">Secure Payments</h5>
              <div className="flex space-x-2">
                <img
                  src="/uploads/icons/apple-pay.svg"
                  alt="Apple Pay"
                  width={32}
                  height={32}
                />
                <img
                  src="/../../uploads/icons/apple-pay.svg"
                  alt="Apple Pay"
                  className="text-white"
                  width={32}
                  height={32}
                />
                <CreditCard size={32} className="text-white" />
                <CreditCard size={32} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 border-t border-white/20">
          <div className="flex items-center mb-4 md:mb-0">
            <CheckCircle size={20} className="text-ticket-red mr-2" />
            <span className="text-sm">
              SSL Secured | 100% Ticket Guarantee | Worldwide Shipping
            </span>
          </div>
          <div className="text-sm opacity-70">
            © 2023 FootballTicketsHub. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
