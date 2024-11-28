import "./globals.css";
import { Metadata } from 'next';
import RequireAuth from "@/layout/RequireAuth";

export const metadata: Metadata = {
  title: "2Stady",
  icons: {
    icon: "/ico2Stady.ico",
  }
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <RequireAuth>
        {children}
      </RequireAuth>
      </body>
    </html>
  );
}