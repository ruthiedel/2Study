import React from "react";
import useUserStore from "../../services/zustand/userZustand/userStor";
import styles from "./userStatus.module.css";
import StarIcon from "@mui/icons-material/Star";

const InfoComp = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className={styles.myinfocard}>
      <div className={styles.colorContainer}>
        <div className={styles.userContainer}>
          <div className={styles.imageWrapper}>
            <img
              src={user?.userImagePath || "/Default_User.png"}
              alt={user?.name}
              className={styles.imgUser}
            />
          </div>
          <div className={styles.infoContainer}>
            <div  className={styles.userName}>
            <strong>  שם משתמש: </strong> <div className={styles.text}>{user?.name}</div>
            </div>
            <div> <strong>מייל: </strong><div className={styles.text}>{user?.email}</div></div>
          </div>
        </div>
        <div className={styles.numOfBooksContainer}>
          <p className={styles.numOfBooks}>
            <StarIcon className={styles.starIcon} />
            {user?.books.length} ספרים בלמידה \ נלמדו
            <StarIcon className={styles.starIcon} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoComp;
