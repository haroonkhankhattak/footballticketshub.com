"use client";

import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { throttle } from "lodash";


import Header from "../../components/layout/Header";
import TrackHero from "../../components/HeroTrack";
import Testimonials from "../../components/Testimonials";
import RecentNews from "../../components/RecentNews";
import Footer from "../../components/layout/Footer";
// import { useTranslation } from "react-i18next";

const Track = () => {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const throttledHandleScroll = throttle(() => {
    if (heroRef.current) {
      const { bottom } = heroRef.current.getBoundingClientRect();
      const isPast = bottom <= 300;
      if (isScrolledPastHero !== isPast) {
        setIsScrolledPastHero(isPast);
      }
    }
  }, 200); // throttled to 1 every 200ms

  window.addEventListener("scroll", throttledHandleScroll);
  throttledHandleScroll();

  return () => window.removeEventListener("scroll", throttledHandleScroll);
}, [isScrolledPastHero]);



  return (
    <>
      <Head>
        <title>Buy Football Tickets - All Matches</title>
        <meta
          name="description"
          content="Get tickets to all major football matches across Europe. Book securely and fast!"
        />
      </Head>

      <div className="min-h-screen flex-grow">
           <Header isScrolledPastHero={false} fixed />
        <main className="flex-grow pt-[120px]">
          <div ref={heroRef}>
            <TrackHero />
          </div>
          <Testimonials />
          <RecentNews />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Track;
