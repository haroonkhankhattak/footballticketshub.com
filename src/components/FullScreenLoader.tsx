// components/FullScreenLoader.tsx
import React from "react";

const FullScreenLoader = () => {
    return (
        <div className="fixed inset-0 bg-white/60 z-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-ticket-primarycolor"></div>
        </div>
    );
};

export default FullScreenLoader;
