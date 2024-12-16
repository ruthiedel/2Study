"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import useUserStore from "@/services/zustand/userZustand/userStor"; 

const SomeComponent = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      router.push("/BooksLearning");
    } else {
      router.push("/home");
    }
  }, []);

  return null; 
};

export default SomeComponent;
