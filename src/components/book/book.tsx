import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Book as BookType } from "@/types";
import { Card, CardMedia, CardContent, Typography, CircularProgress, Box } from "@mui/material";

type BookProps = {
  book: BookType;
};

// פונקציה להמרת Blob ל-Base64
const convertBlobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject("Failed to read blob.");
      }
    };
    reader.readAsDataURL(blob);
  });
};

const Book: React.FC<BookProps> = ({ book }) => {
  const { data: coverImageUrl, isLoading, error } = useQuery({
    queryKey: ["coverImage", book._id],
    queryFn: async () => convertBlobToBase64(book.coverImage as Blob), // המרת Blob ל-Base64
    enabled: !!book.coverImage,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error loading image</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 345, margin: "16px auto", boxShadow: 3 }}>
      {coverImageUrl && (
        <CardMedia
          component="img"
          height="140"
          image={coverImageUrl}
          alt={book.book_name}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.book_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Categories: {book.categories.join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Book;