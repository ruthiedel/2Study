import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getBookCategoriesCount } from '../../lib/clientHelpers/graphsFunctions';
import useUserStore from '../../services/zustand/userZustand/userStor';
import { getBooks } from '../../hooks/booksDetails';

function PieCategories() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const user = useUserStore((state) => state.user);
  const { data: books, isLoading } = getBooks();

  useEffect(() => {
    if (isLoading || !books || !user) return;

    const userBooksDetails = books.filter((book) =>
      user.books.some((userBook) => userBook.book_id === book._id)
    );
    const categoriesCount = getBookCategoriesCount(userBooksDetails);
    const totalBooks = Object.values(categoriesCount).reduce((sum, count) => sum + count, 0);

    const labels = Object.keys(categoriesCount);
    const dataValues = Object.values(categoriesCount);
    const percentageDataValues = Object.values(categoriesCount).map((count) =>
      parseFloat(((count / totalBooks) * 100).toFixed(1))
    );

    const data = {
      labels: labels.map((label, index) => `${label} (${percentageDataValues[index]}%)`),
      datasets: [
        {
          label: 'מספר ספרים',
          data: dataValues,
          backgroundColor: [
            '#F1E1B3', 
            '#D9C39C', 
            '#B69F68', 
            '#F5F5F5',
            '#D1D1D1', 
            '#7A7A7A',
            '#333333', 
          ],             
          hoverOffset: 4,
        },
      ],
    };

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true,
            },
          },
        },
      });
    }
  }, [books, user, isLoading]); 
  if (isLoading || !books || !user) return <p>Loading...</p>;
  return <canvas ref={chartRef} width="400" height="400"></canvas>;
}

export default PieCategories;
