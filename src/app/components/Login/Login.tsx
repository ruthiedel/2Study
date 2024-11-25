"use client";
import React from "react";
import { Box, Button, Typography, Card } from "@mui/material";
import { styled } from "@mui/system";
import { auth, provider, signInWithPopup } from "@/lib/firebase";

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
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User info:", user);
      // את יכולה לשמור את המשתמש ב-DB או לנתב לדף אחר
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  // return (
  //   <div style={styles.container}>
  //     <div style={styles.card}>
  //       <div style={styles.iconContainer}>
  //         <div style={styles.iconCircle}></div>
  //         <div style={styles.iconBase}></div>
  //       </div>
  //       <h2 style={styles.title}>בוא נחבר אותך:</h2>
  //       <button style={styles.button} onClick={handleGoogleLogin}>המשך עם Google</button>
  //     </div>
  //   </div>
  // );
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

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#333",
  },
  card: {
    backgroundColor: "#222",
    borderRadius: "16px",
    padding: "20px",
    textAlign: "center",
    width: "300px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  iconCircle: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#d4a200",
  },
  iconBase: {
    width: "80px",
    height: "20px",
    marginTop: "-10px",
    borderRadius: "10px",
    backgroundColor: "#a17f00",
  },
  title: {
    color: "#fff",
    fontSize: "18px",
    margin: "10px 0",
  },
  button: {
    backgroundColor: "#d4a200",
    color: "#fff",
    fontSize: "16px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default Login;