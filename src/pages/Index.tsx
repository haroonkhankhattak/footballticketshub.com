import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

import Header from "@/components/layout/Header";
import TrustPilotRow from "@/components/TrustpilotRow";
import Hero from "@/components/Hero";
import PopularTeams from "@/components/PopularTeams";
import PopularMatchesList from "@/components/PopularMatchesList";
import Testimonials from "@/components/Testimonials";
import RecentNews from "@/components/RecentNews";
import FootballTickets from "@/components/FootballTickets";
import Footer from "@/components/layout/Footer";
import FeaturedMatches from "@/components/FeaturedMatches";

import { useTranslation } from "react-i18next";
import { client } from "@/lib/graphql/apollo-client";
import { GET_UPCOMING_POPULAR_MATCHES } from "@/lib/graphql/queries/PopularUpcomingMatches";

console.log("💥 This file is being evaluated");

export type Match = {
  id: string;
  title: string;
  date: string;
  slug: string;
};

export type HomePageProps = {
  featuredMatches: Match[];
};

// ✅ SSR Function
export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  try {
    const { data } = await client.query({
      query: GET_UPCOMING_POPULAR_MATCHES,
    });

    console.log("Fetched matches from Apollo:", data);

    return {
      props: {
        featuredMatches: data?.posts ?? [],
      },
    };
  } catch (error) {
    console.error("Apollo SSR error:", error);
    return { props: { featuredMatches: [] } };
  }
};

// ✅ Page Component
const Index = ({ featuredMatches }: HomePageProps) => {
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
        <TrustPilotRow />
        <main className="flex-grow pt-[120px]">
          <div ref={heroRef}>
            {/* <Hero featuredMatches={featuredMatches} /> */}
          </div>
          <PopularTeams />
          <PopularMatchesList />
          <Testimonials />
          <RecentNews />
          <FootballTickets />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
