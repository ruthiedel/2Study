"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useUserStore from "../../services/zustand/userZustand/userStor";
import { calculateLearningProgress } from "../../lib/clientHelpers/graphsFunctions";
import { getBooks } from "@/hooks/booksDetails";
import { Book } from "@/types";

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = () => {
  const user = useUserStore((state) => state.user);
  const { data: books, isLoading } = getBooks();

  if (!user || !books || isLoading) {
    return <p>Loading...</p>;
  }

  const userBooksDetails = books.filter((book: Book) =>
    user.books.some((userBook) => userBook.book_id === book._id)
  );
  const progressData = calculateLearningProgress(user.books, userBooksDetails);

  const labels = Object.keys(progressData); 
  const dataValues = Object.values(progressData); 

  const data = {
    labels,
    datasets: [
      {
        label: "התקדמות באחוזים:",
        data: dataValues,
        backgroundColor: 'rgba(239, 236, 204, 0.6)', 
        borderColor: 'rgba(239, 236, 204, 1)', 
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "אחוזי התקדמות בספר:",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100, 
        title: {
          display: true,
          text: "התקדמות (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "ספרים",
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;
