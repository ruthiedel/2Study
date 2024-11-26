'use client'

import React from 'react';
import Image from 'next/image'; 
import useUserStore from '@/services/zustand/userZustand/userStor'
import { User } from '@/types';
import { Book } from '@/types'

type partOfBook = {
    _id?: string;
    book_name: string;
    author: string;
    categories: string[];
    coverImage: string;
}

const localBooks: partOfBook[] = [
    {
        _id: '1',
        book_name: 'mesilat yesharim',
        author: 'Harav',
        categories: ['musar'],
        coverImage: '/pictures/mesilat.jpg',
    }
]

const Recommendations = () => {

    // const {books} : User = useQuery
    
  return (
    <>
    <div>
     
    </div>
    </>
  );
}

export default Recommendations;
