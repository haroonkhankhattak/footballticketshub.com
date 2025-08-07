// app/ApolloWrapper.tsx
'use client';

import { ReactNode, useMemo } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export function ApolloWrapper({ children }: { children: ReactNode }) {
  const client = useMemo(() => {
    return new ApolloClient({
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_API || 'http://localhost:4000/graphql',
        credentials: 'include',
      }),
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
