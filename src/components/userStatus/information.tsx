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
      <div className={styles.userbox}>
        {/* <Box className={styles.infoContainer}>
          <Box>
            <div className={styles.infoContainer2}>
              <Typography className={styles.info1}>שם: </Typography>
              <Typography className={styles.infoButtonStyled}>
                {user?.name}
              </Typography>
            </div>
            <div className={styles.infoContainer2}>
              <Typography className={styles.info1}>מייל: </Typography>
              <Typography className={styles.infoButtonStyled}>
                {user?.email}
              </Typography>
            </div>
            <div className={styles.infoContainer2}>
              {user?.age && user?.age > 0 && <Typography className={styles.info1}>גיל </Typography>}

              {user?.age && user?.age > 0 && (
                <Typography>
                  {user?.age && user?.age > 0 ? user?.age : "אין גיל מעודכן"}
                </Typography>
              )}
            </div>
          </Box>
        </Box> */}

        <div className={styles.infoContainerMain}>
          <div className={styles.infoContainer2}>
            <strong>
              <div>שם</div>
            </strong>
            <div>{":  "+user?.name}</div>
          </div>
          <div className={styles.infoContainer2}>
            <strong>
              <div>מייל</div>
            </strong>
            <div>{":  "+user?.email}</div>
          </div>
        </div>

        <Box className={styles.numOfBooksContainer}>
          {/*  <p>{user.books.sum(if(mark !== -1))}</p> */}
          <Typography className={styles.numOfBooks}>
            <StarIcon className={styles.starIcon} />
            {user?.books.length} ספרים בלמידה
            <StarIcon className={styles.starIcon} />
          </Typography>
        </Box>
      </div>
    </Card>
  );
};

export default Information;
