"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { calculateBookRatings } from '../../lib/clientHelpers/graphsFunctions';
import useUserStore from '../../services/zustand/userZustand/userStor';
import { Book } from '../../types';
import { getBooks } from '../../hooks/booksDetails';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarsGraph = () => {
  const user = useUserStore((state) => state.user);
  const { data: books, isLoading } = getBooks();

  if (!user || !books || isLoading) {
    return <p>Loading...</p>;
  }
  const userBooksDetails = books.filter((book: Book) =>
    user?.books?.some((userBook) => userBook.book_id === book._id)
  );
  const progressData = calculateBookRatings(user?.books || [], userBooksDetails);
  const labels = Object.keys(progressData);
  const userRatings = Object.values(progressData).map((item) => item.userRating);
  const generalRatings = Object.values(progressData).map((item) => item.generalRating);

  const data = {
    labels, 
    datasets: [
      {
        label: 'הדירוג שלי:',
        data: userRatings,
        backgroundColor: 'rgba(217, 195, 156, 0.6)',
        borderColor: 'rgba(217, 195, 156, 1)',
        borderWidth: 1,
      },
      {
        label: 'הדירוג הכללי:',
        data: generalRatings,
        backgroundColor: 'rgba(169, 169, 169, 0.6)', 
        borderColor: 'rgba(169, 169, 169, 1)',
        borderWidth: 1,
      },      
    ],    
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5, 
        ticks: {
          stepSize: 1, 
        },
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: '20px auto' }}>
      <h3 style={{ textAlign: 'center' }}>גרף הדירוגים:</h3>
      {(user && user.books && user.books.length === 0) && <p className='text-xs'>כאן יופיע הדירוגים הכללים והדירוגים שלך לכל ספר שאתה לומד</p>}
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarsGraph;
