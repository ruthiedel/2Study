"use client"
// import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from '../components';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// export const metadata: Metadata = {
//   title: "2Stady",
//   description: "Study anytime with 2Stady!",
//   icons: {
//     icon: "/ico2Stady.ico",
//   },
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
          <Header />
          {children}
          <Footer />    
        </QueryClientProvider>
      </body>
    </html>
  );
}
