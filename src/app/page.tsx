'use client'
import React from 'react';
import { Homepage, QuestionCard } from '@/components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RatingComponent from '../components/rating/rating';
const SomeComponent = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <div>
      <Homepage/>
      <RatingComponent bookId='6748241ab441a87e376042a3'/>
    </div>
    </QueryClientProvider>
  );
};

export default SomeComponent;