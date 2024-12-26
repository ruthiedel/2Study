"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import useUserStore from "@/services/zustand/userZustand/userStor"; 
import HomePage from "./home/page";

const SomeComponent = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      router.push("/BooksLearning");
    }
    router.push("/home");
  }, []);

  return <HomePage/>;
};

export default SomeComponent;
