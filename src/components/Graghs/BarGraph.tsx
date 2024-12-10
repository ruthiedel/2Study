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

  const labels = Object.keys(progressData); // Book names
  const dataValues = Object.values(progressData); // Percentages

  const data = {
    labels,
    datasets: [
      {
        label: "Learning Progress (%)",
        data: dataValues,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
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
        text: "Learning Progress by Book",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // Percentage max
        title: {
          display: true,
          text: "Progress (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Books",
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
