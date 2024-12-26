"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { Loading } from "../components";

const SomeComponent = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // ודא שהקוד רץ רק בצד הלקוח
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (user.state && user.state.user) {
        router.push("/BooksLearning");
      } else {
        router.push("/home");
      }
    }
  }, [user, router]);

  return <Loading />;
};

export default SomeComponent;
