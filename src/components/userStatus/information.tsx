"use client";

import React from "react";
import useUserStore from '../../services/zustand/userZustand/userStor';
import { Card, CardMedia, Typography } from "@mui/material";
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

        <div className={styles.infoContainerMain}>
          <div className={styles.infoContainer2}>
            <strong>
              <div className={styles.titles}>שם:</div>
            </strong>
            <div className={styles.infobutto}>{user?.name}</div>
          </div>
          <div className={styles.infoContainer2}>
            <strong>
              <div>מייל:</div>
            </strong>
            <div className={styles.infobutto}>{user?.email}</div>
          </div>
          {user?.age && user?.age > 0 && 
          <div className={styles.infoContainer2}>
            <strong>
              <div>גיל:</div>
            </strong>
            <div className={styles.infobutto}>{user?.age}
            </div>
          </div>
           }
        </div>

        <Box className={styles.numOfBooksContainer}>
          {/* {user.books.sum(if(mark !== -1))} */}
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
