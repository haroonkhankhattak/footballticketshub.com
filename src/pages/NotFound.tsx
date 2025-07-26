import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header isScrolledPastHero={false} fixed={false} />
      <main className="flex-grow flex items-center justify-center bg-ticket-gray py-20">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="text-9xl font-bold text-ticket-red mb-6">404</div>
          <h1 className="text-3xl font-bold text-ticket-blue mb-4">
            Page Not Found
          </h1>
          <p className="text-ticket-darkgray mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-primary inline-flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Back to Homepage
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
