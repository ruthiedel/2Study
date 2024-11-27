import Header from "@/components/header/Header";
import "./globals.css";
import RequireAuth from "@/layout/RequireAuth";

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