import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_UPCOMING_POPULAR_MATCHES } from "../graphql/queries/PopularUpcomingMatches";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  ssrMode: true,
});

// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// // Create a simple query to test the connection
// const TEST_QUERY = gql`
//   query {
//     matches {
//       id
//       slug
//       title
//       date
//     }
//   }
// `;

// export const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
//   cache: new InMemoryCache(),
//   ssrMode: true,
// });

// // Test the connection right after client initialization
// client
//   .query({
//     query: GET_UPCOMING_POPULAR_MATCHES,
//   })
//   .then((result) => {
//     console.log("Apollo Client connected successfully:", result);
//   })
//   .catch((error) => {
//     console.error("Error connecting to Apollo Server:", error);
//   });
