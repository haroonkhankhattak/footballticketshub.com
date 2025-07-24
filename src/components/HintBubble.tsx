import { useState, useRef, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

export const HintBubble = ({ item }: { item: any }) => {
    const [show, setShow] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setShow(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={ref}>
            <HelpCircle
                className={`h-4 w-4 ml-1 cursor-pointer ${item?.color || "bg-gray-100 text-gray-700"
                    } `}
                onClick={() => setShow(prev => !prev)}
            />
            {show && (
                <div className="absolute left-1/2 top-full min-w-[200px] max-w-[320px] z-50 mt-2 -translate-x-1/2 w-fit whitespace-normal rounded-md border border-gray-200 bg-white px-4 py-2 text-xs sm:text-sm  text-gray-700 shadow-2xl text-center">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-l border-t border-gray-200"></div>
                    {item?.description || "No description available."}
                </div>
            )}
        </div>
    );
};
