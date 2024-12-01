'use client'
import React from 'react';
import Homepage from '@/components/homepage/homepage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import QuestionCard from '@/components/questionCard/questionCard';
const SomeComponent = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <div>
      <Homepage/>

      
      {/* <QuestionCard/> */}
    </div>
    </QueryClientProvider>
  );
};

export default SomeComponent;
