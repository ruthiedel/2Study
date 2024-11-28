'use client'
import React from 'react';
import Homepage from '@/components/homepage/homepage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const SomeComponent = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <div>
      <Homepage/>
    </div>
    </QueryClientProvider>
  );
};

export default SomeComponent;
