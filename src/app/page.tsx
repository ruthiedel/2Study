"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { Loading } from "../components";

const SomeComponent = () => {
  const router = useRouter();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      const parsedUser = JSON.parse(user);
      if(parsedUser && parsedUser.state.user){
      router.push("/BooksLearning")
      }
      else{
        router.push("/home");
      }
    }
   
  }, []);

  return <Loading/>
};

export default SomeComponent;
