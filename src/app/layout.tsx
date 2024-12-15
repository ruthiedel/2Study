import type { Metadata } from "next";
import "./globals.css";
import LayoutReactComponent from "@/layout/LayoutReactComponent";

export const metadata: Metadata = {
  title: "2Stady",
  description: "Study anytime with 2Stady!",
  icons: {
    icon: "/2StadyIco.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <LayoutReactComponent>
          {children}

        </LayoutReactComponent>
      </body>
    </html>
  );
}
