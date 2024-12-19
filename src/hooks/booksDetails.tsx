"use client"
import {  useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllBooks, updateBook } from '../services/bookService';
import { Book } from '../types'

export const getBooks = () => {
  return useQuery<Book[]>({
    queryKey: ["Books"],
    queryFn: getAllBooks,
    staleTime: 1000,
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBook,
    onMutate: async ({ id, updatedData }: { id: string; updatedData: Partial<Record<string, any>> }) => {
      await queryClient.cancelQueries({ queryKey: ["Books"] });

      const previousBooks = queryClient.getQueryData<Book[]>(["Books"]);

      queryClient.setQueryData<Book[] | undefined>(["Books"], (old) =>
        old?.map((oldBook) => (oldBook._id === id ? { ...oldBook, ...updatedData } : oldBook))
      );

      return { previousBooks };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Books"] });
    },
  });
};

export const getBookById = (id: string) => {
  const queryClient = useQueryClient();
  const books = queryClient.getQueryData<Book[]>(["Books"]);
  if (books) {
    return books.find(book => book._id === id);
  }
  return null;
};
