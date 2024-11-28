'use client'
import React, { useState } from "react";
import { Box, TextField, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const QuestionCard: React.FC = () => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: "black",
        color: "white",
        borderRadius: "10px",
        p: 2,
        width: "400px",
        position: "relative",
      }}
    >
      <Box
        component="img"
        src="/pictures/easy.jpg"
        alt="Question Icon"
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "80px",
          height: "auto",
        }}
      />

      {/* Question Section */}
      <Box sx={{ mb: 2, width: "100%" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          שאלה לתרגול:
        </Typography>
        <TextField
          fullWidth
          value="מה מזג האוויר היום?"
          InputProps={{
            readOnly: true,
            style: { backgroundColor: "white", borderRadius: "5px" },
          }}
          variant="outlined"
          sx={{ mt: 1 }}
        />
      </Box>

      {/* Answer Section */}
      <Box sx={{ mb: 2, width: "100%" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          חשוף את התשובה:
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <TextField
            fullWidth
            value="קר וגשום"
            InputProps={{
              readOnly: true,
              style: {
                backgroundColor: "white",
                borderRadius: "5px",
                transition: "width 0.3s ease",
                width: isAnswerVisible ? "100%" : "60%",
              },
            }}
            variant="outlined"
          />
          <IconButton
            onClick={() => setIsAnswerVisible(!isAnswerVisible)}
            sx={{ ml: 1, color: "white" }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Change Question Button */}
      <Button
        variant="contained"
        sx={{
          alignSelf: "center",
          backgroundColor: "#f0a500",
          color: "black",
          "&:hover": { backgroundColor: "#ffa726" },
        }}
      >
        שנה שאלה
      </Button>
    </Box>
  );
};

export default QuestionCard;
