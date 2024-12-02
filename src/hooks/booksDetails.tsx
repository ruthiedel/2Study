"use client"
import { useQuery } from '@tanstack/react-query';
import { getAllBooks } from '../services/bookService';
import { Book } from '../types'

const booksDetails = () => {
    
      return useQuery<Book[]>({
        queryKey: ["Books"],
        queryFn: getAllBooks,
        staleTime: 10000,
      });
};

export default booksDetails;
