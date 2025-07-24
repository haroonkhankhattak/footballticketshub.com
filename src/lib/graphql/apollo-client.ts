import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
  ssrMode: true,
});

// export const client = new ApolloClient({
//   uri: "https://api.footballticketshub.com/graphql",
//   cache: new InMemoryCache(),
//   credentials: "include",
//   ssrMode: true,
// });

// const client = new ApolloClient({
//   uri: process.env.NEXT_PUBLIC_GRAPHQL_API || 'http://localhost:3000/',
//   cache: new InMemoryCache(),
// });

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
