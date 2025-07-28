// lib/ApolloWrapper.tsx
'use client';

import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from '../api/client';

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
