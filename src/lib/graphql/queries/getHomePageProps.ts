// lib/graphql/queries/getHomePageProps.ts

import { client } from "@/lib/graphql/apollo-client";
import { GET_UPCOMING_POPULAR_MATCHES } from "@/lib/graphql/queries/PopularUpcomingMatches";
import { GetServerSideProps } from "next";

export type Match = {
  id: string;
  title: string;
  date: string;
  slug: string;
};

export type HomePageProps = {
  featuredMatches: Match[];
};

export const getHomePageProps: GetServerSideProps<HomePageProps> = async () => {
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
