import Header from "@/components/header/Header";
import "./globals.css";
import RequireAuth from "@/layout/RequireAuth";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/services/reactQueryClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RequireAuth>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </RequireAuth>
      </body>
    </html>
  );
}
