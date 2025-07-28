// import { ApolloClient, InMemoryCache } from "@apollo/client";

// export const client = new ApolloClient({
//   uri: "https://api.footballticketshub.com/graphql",
//   cache: new InMemoryCache(),
//   credentials: "include",
//   ssrMode: true,
// });

// export const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
//   cache: new InMemoryCache(),
//   credentials: "include",
//   ssrMode: true,
// });


// import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// export const getClient = () =>
//   new ApolloClient({
//     ssrMode: true,
//     link: new HttpLink({
//        uri: "https://api.footballticketshub.com/graphql",
//       fetch,
//     }),
//     credentials: "include",
//     cache: new InMemoryCache(),
//   });

  // lib/apollo-client.ts






// import{ ApolloClient, InMemoryCache } from "@apollo/client";

// export const client = new ApolloClient({
//   uri: "https://api.footballticketshub.com/graphql",
//   cache: new InMemoryCache(),
//   credentials: "include",
// });



import{ ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});