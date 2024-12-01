'use client'
import React from 'react';
import { Homepage, QuestionCard } from '@/components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const SomeComponent = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <div>
      <Homepage/>

      
      <QuestionCard p={{
          _id: undefined,
          text: '',
          questions: []
        }}/>
    </div>
    </QueryClientProvider>
  );
};

export default SomeComponent;
