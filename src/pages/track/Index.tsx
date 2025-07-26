import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

import Header from "../../components/layout/Header";
import TrustPilotRow from "../../components/TrustpilotRow";
import TrackHero from "../../components/HeroTrack";
import PopularTeams from "../..//components/PopularTeams";
import PopularMatchesList from "../..//components/PopularMatchesList";
import Testimonials from "../..//components/Testimonials";
import RecentNews from "../../components/RecentNews";
import FootballTickets from "../..//components/FootballTickets";
import Footer from "../../components/layout/Footer";
import { useTranslation } from "react-i18next";
import { getHomePageProps } from "../../api/queries/getHomePageProps";
import { HomePageProps } from "../../api/queries/getHomePageProps";


export const getServerSideProps = getHomePageProps;


const Track = () => {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const handleScroll = () => {
      if (heroRef.current) {
        const { bottom } = heroRef.current.getBoundingClientRect();
        setIsScrolledPastHero(bottom <= 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>Buy Football Tickets - All Matches</title>
        <meta
          name="description"
          content="Get tickets to all major football matches across Europe. Book securely and fast!"
        />
      </Head>

      <div className="min-h-screen flex-grow">
        <Header isScrolledPastHero={isScrolledPastHero} fixed />
        {/* <TrustPilotRow /> */}
        <main className="flex-grow pt-[120px]">
          <div ref={heroRef}>
            <TrackHero />
          </div>
          {/* <PopularTeams /> */}
          <Testimonials />
          <RecentNews />
          {/* <FootballTickets /> */}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Track;
