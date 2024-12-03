'use client'
import React from 'react';
import { Homepage, QuestionCard } from '@/components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RatingComponent from '../components/rating/rating';
import { useUpdateBook } from '../hooks/booksDetails';
const SomeComponent = () => {
  const queryClient = new QueryClient();
  const updateBookMutation = useUpdateBook();

const handleRatingSubmit = async () => {
  await updateBookMutation.mutate({ id: "6748241ab441a87e376042a3", updatedData: { "rating": 6 } });
}

  return (
    <QueryClientProvider client={queryClient}>
    <div>
      <Homepage/>
      <button onClick={handleRatingSubmit}>שלח דירוג</button>
      <RatingComponent bookId='6748241ab441a87e376042a3'/>
    </div>
    </QueryClientProvider>
  );
};

export default SomeComponent;