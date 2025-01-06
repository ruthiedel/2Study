
import React, { useState } from "react";
import styles from "./InfoTooltip.module.css";

interface InfoTooltipProps {
  text: string; 
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return (
    <div className={styles.tooltipContainer}>
      <div
        className={styles.infoIcon}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        i
      </div>
      {isVisible && <div className={styles.tooltip}>{text}</div>}
    </div>
  );
};

export default InfoTooltip;
