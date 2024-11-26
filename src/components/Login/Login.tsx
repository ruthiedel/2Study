"use client";
import React from "react";
import { Box, Button, Typography, Card } from "@mui/material";
import { styled } from "@mui/system";
import { auth, provider, signInWithPopup } from "@/lib/firebase";
import useUserStore from "@/services/zustand/userZustand/userStor";
import { logInUser } from "@/services/userService";


const IconContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "20px",
});

const IconCircle = styled(Box)({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: "#d4a200",
});

const IconBase = styled(Box)({
  width: "80px",
  height: "20px",
  marginTop: "-10px",
  borderRadius: "10px",
  backgroundColor: "#a17f00",
});
const Login = () => {
  const setUser = useUserStore((state) => state.setUser);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const localUser = {
        _id: user.uid,
        email: user.email || '',
        name: user.displayName || '',
        books: [],
      }
      setUser(localUser);
      logInUser(localUser);
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#333",
      }}
    >
      <Card
        sx={{
          padding: "20px",
          borderRadius: "16px",
          textAlign: "center",
          width: "300px",
          backgroundColor: "#222",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <IconContainer>
          <IconCircle />
          <IconBase />
        </IconContainer>
        <Typography variant="h6" sx={{ color: "#fff", marginBottom: "20px" }}>
          בוא נחבר אותך:
        </Typography>
        <Button
          onClick={handleGoogleLogin}
          variant="contained"
          sx={{
            backgroundColor: "#d4a200",
            color: "#fff",
            fontSize: "16px",
            padding: "10px 20px",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#b38600",
            },
          }}
        >
          המשך עם Google
        </Button>
      </Card>
    </Box>
  );
};

export default Login;