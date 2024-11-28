'use client'
import React, { useState } from 'react';
import Homepage from '@/components/homepage/homepage';
import RatingComponent from '@/components/rating/rating';

const SomeComponent = () => {
  const [showRatingModal, setShowRatingModal] = useState(true);

  const handleCloseModal = () => {
    setShowRatingModal(false);
  };

  const handleSubmitRating = async (bookId: string, rating: number) => {
    try {
      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId, rating }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit rating");
      }

      const data = await response.json();
      console.log("Rating submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div>
      <Homepage />
      <h1>פרטי הספר</h1>
      <h1>פרטי הספר</h1>
      <h1>פרטי הספר</h1>
      <h1>פרטי הספר</h1>

      {/* רק אם showRatingModal הוא true, נראה את ה-RatingComponent */}
      {showRatingModal && (
        <RatingComponent
          bookId='123'
          onClose={handleCloseModal}
          onSubmitRating={handleSubmitRating}
        />
      )}
    </div>
  );
};

export default SomeComponent;
