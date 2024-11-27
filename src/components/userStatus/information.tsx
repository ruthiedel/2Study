"use client";

import React from "react";
import useUserStore from "@/services/zustand/userZustand/userStor";
import { User } from "@/types";
import { Card, CardMedia, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import styles from "./userStatus.module.css";

const Information = () => {
  const user = useUserStore((state) => state.user);

  return (
    <Card className={styles.mycard}>
      <Box>
        <CardMedia
          component="img"
          image={(user?.userImagePath) ? user.userImagePath : "defaultUser.png"}
          alt="user"
          style={{
            objectFit: "cover",
            borderRadius: "50%",
            maxWidth: "50px",
            maxHeight: "50px",
          }}
        />
      </Box>
      <Box className={styles.userbox} >
        <Typography>שם:</Typography>
        <Typography>כתובת מייל</Typography>
        {(user?.age && user?.age > 0) && <Typography>גיל </Typography>}
      </Box>

      <Box className={styles.userbox} >
        <Typography>{user?.name}</Typography>
        <Typography>{user?.email}</Typography>
        <Typography>{(user?.age && user?.age > 0) ? user?.age : 'אין גיל מעודכן'}</Typography>
      </Box>

        <Box >
                {/* 
      <p>{user.books.sum(if(mark !== -1))}</p> */}

          <Typography>{user?.books.length}{" "}ספרים בלמידה</Typography>
        </Box>

    </Card>
  );
};

export default Information;
