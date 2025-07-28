// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { ApolloWrapper } from '../api/apollo-provider';

export const metadata = {
  title: 'Football Tickets Hub',
  description: 'Buy tickets for major football matches in Europe.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
