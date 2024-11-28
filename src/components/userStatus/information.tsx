"use client";

import React from "react";
import useUserStore from "@/services/zustand/userZustand/userStor";
import { User } from "@/types";
import { Card, CardMedia, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import styles from "./userStatus.module.css";
import StarIcon from "@mui/icons-material/Star";

const Information = () => {
  const user = useUserStore((state) => state.user);

  return (
    <Card className={styles.mycard}>
      <Box>
        <CardMedia
          component="img"
          image={user?.userImagePath ? user.userImagePath : "defaultUser.png"}
          alt="user"
          className={styles.imgUser}
        />
      </Box>
      <CardContent className={styles.userbox}>
        <Box className={styles.infoContainer}>
          <Box>
            <Typography className={styles.info1}>שם: </Typography>
            <Typography className={styles.info1}>מייל: </Typography>
            {user?.age && user?.age > 0 && <Typography className={styles.info1}>גיל </Typography>}
          </Box>
          <Box className={styles.infoContainer2}>
            <Typography className={styles.infoButtonStyled}>
              {user?.name}
            </Typography>
            <Typography className={styles.infoButtonStyled}>
              {user?.email}
            </Typography>
            {user?.age && user?.age > 0 && (
              <Typography>
                {user?.age && user?.age > 0 ? user?.age : "אין גיל מעודכן"}
              </Typography>
            )}
          </Box>
        </Box>

        <Box className={styles.numOfBooksContainer}>
          {/*  <p>{user.books.sum(if(mark !== -1))}</p> */}
          <Typography className={styles.numOfBooks}>
            <StarIcon className={styles.starIcon} />
              {user?.books.length} ספרים בלמידה
            <StarIcon className={styles.starIcon} />
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Information;
