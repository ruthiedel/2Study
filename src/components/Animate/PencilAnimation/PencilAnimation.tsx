import React from "react";
import Image from "next/image";
import styles from "./PencilAnimation.module.css";
import pencil from "../../../../public/animate/pencil-removebg-preview.png";

const PencilAnimation: React.FC = () => {
  return (
    <div className={styles.scene}>
      <div className={styles.pencil}>
        <Image src={pencil} alt="Pencil" className={styles.pencilImage} />
      </div>
      <svg className={styles.sketch} viewBox="0 0 100 100">
        <path
          className={styles.line}
          d="M10,90 Q30,60 50,70 T80,30 T90,10"
        />
      </svg>
    </div>
  );
};

export default PencilAnimation;
