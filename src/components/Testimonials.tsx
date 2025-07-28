import React, { useRef, useState, useEffect } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  time: string;
  rating: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, time }) => {
  return (
    <div className="min-w-[300px] max-w-[320px] p-6 bg-white rounded-lg shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex text-green-500 mb-2">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <span key={i}>★</span>
            ))}
        </div>
        {/* ✅ Limit quote to exactly 4 lines */}
        <p className="mb-2 text-sm text-gray-700 line-clamp-4 overflow-hidden text-ellipsis" style={{
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
        }}>
          {quote}
        </p>
      </div>
      <div className="mt-auto text-sm text-gray-600 border-t pt-2">
        <span className="font-medium text-gray-800">{author}</span>
        <div className="text-xs text-gray-500">{time} ago</div>
      </div>
    </div>
  );
};



const Testimonials = () => {
  const testimonials = [
    {
      quote: "Absolutely fantastic experience! The tickets arrived right on time, and we had no trouble at the stadium. I was initially skeptical about buying tickets online, but everything went smoothly. Highly recommended!",
      author: "Matipacher",
      time: "10 hours",
      rating: 5
    },
    {
      quote: "Everything was perfect, thank you! The seats were exactly as described, and the atmosphere was electric. I will definitely use this service again for future matches!",
      author: "NIDA REPCIENE",
      time: "16 hours",
      rating: 5
    },
    {
      quote: "The entire process was super easy and stress-free. I got my tickets quickly, and they scanned perfectly at the venue. Customer support was also very helpful when I had a question.",
      author: "Geoff B",
      time: "21 hours",
      rating: 5
    },
    {
      quote: "Great experience, smooth and reliable! I was worried because this was my first time purchasing from this site, but it exceeded my expectations. The match itself was incredible!",
      author: "John Doe",
      time: "1 day",
      rating: 5
    },
    {
      quote: "Would definitely buy again! The ticket prices were fair, and I didn't have to worry about any last-minute issues. Such a smooth experience compared to other platforms I've used before.",
      author: "Jane Smith",
      time: "2 days",
      rating: 5
    },
    {
      quote: "I've used many ticketing platforms, but this one stands out for its reliability and ease of use. I received my tickets instantly, and everything worked flawlessly at the stadium entrance.",
      author: "Alex R.",
      time: "3 days",
      rating: 5
    },
    {
      quote: "Incredible service! The tickets were reasonably priced, and I received them immediately after purchase. I was able to surprise my dad with last-minute tickets, and he loved it!",
      author: "Emma T.",
      time: "5 days",
      rating: 5
    },
    {
      quote: "Had a slight issue with my email confirmation, but customer support was quick to resolve it. Once that was sorted, everything was perfect! The seats had an amazing view.",
      author: "Michael L.",
      time: "6 days",
      rating: 5
    },
    {
      quote: "I was a bit hesitant at first, but this turned out to be one of the best ticket-buying experiences I’ve had. No hidden fees, great customer support, and an unforgettable match!",
      author: "Sophia W.",
      time: "1 week",
      rating: 5
    },
    {
      quote: "Smooth process, easy to navigate website, and great ticket selection. My only regret is not buying sooner because the prices increased closer to the match date.",
      author: "Daniel K.",
      time: "1 week",
      rating: 5
    },
  ];

  const scrollContainer = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position
  const checkScroll = () => {
    if (scrollContainer.current) {
      setCanScrollLeft(scrollContainer.current.scrollLeft > 0);
      setCanScrollRight(
        scrollContainer.current.scrollLeft <
        scrollContainer.current.scrollWidth - scrollContainer.current.clientWidth
      );
    }
  };

  // Scroll handler
  const scroll = (direction: "left" | "right") => {
    if (scrollContainer.current) {
      const scrollAmount = 300;
      scrollContainer.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Add event listener for scroll updates
  useEffect(() => {
    if (scrollContainer.current) {
      scrollContainer.current.addEventListener("scroll", checkScroll);
      checkScroll(); // Initial check
    }
    return () => {
      if (scrollContainer.current) {
        scrollContainer.current.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  return (
    <section className="py-12 bg-gray-100">
      <div className="ticket-container">
        <h2 className="text-2xl font-bold mb-6 text-left">
          What other Football fans say about us
        </h2>

        <div className="relative">
          {/* Scrollable Container */}
          <div
            ref={scrollContainer}
            className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide px-4"
            style={{ scrollSnapType: "x mandatory", overflow: "hidden" }} // Hide scrollbar
          >
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                time={testimonial.time}
                rating={testimonial.rating}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full shadow-lg flex items-center justify-center z-10 
              ${canScrollLeft ? "bg-white" : "bg-gray-300 cursor-not-allowed opacity-50"}`}
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full shadow-lg flex items-center justify-center z-10 
              ${canScrollRight ? "bg-white" : "bg-gray-300 cursor-not-allowed opacity-50"}`}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
