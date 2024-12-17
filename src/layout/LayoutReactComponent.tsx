"use client";
import React from "react";
import { Header, Footer } from "../components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

function LayoutReactComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Header />
        {children}
      <Footer />
    </QueryClientProvider>
  );
}

export default LayoutReactComponent;
