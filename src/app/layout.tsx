'use client';

import "./globals.css";
import { Metadata } from 'next';
import RequireAuth from '../layout/RequireAuth';
import {QueryClient, QueryClientProvider } from '@tanstack/react-query';


// export const metadata: Metadata = {
//   title: "2Stady",
//   icons: {
//     icon: "/ico2Stady.ico",
//   }
// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
 
      <html lang="en">
        <body>
        <QueryClientProvider client={queryClient}>

          <RequireAuth>
            {children}
          </RequireAuth>
          </QueryClientProvider>
        </body>
      </html>

  );
}