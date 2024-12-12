"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js navigation hook
import useUserStore from "@/services/zustand/userZustand/userStor"; // Zustand store

const SomeComponent = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      router.push("/bookCatalog");
    } else {
      router.push("/about");
    }
  }, [user]);

  return null; 
};

export default SomeComponent;
