import * as React from "react";
import styles from './userStatus.module.css'
import { Wizard, PieCategories, BarGraph, BarsGraph } from '../index'

export default function ProgressComp() {

  const steps = [
    <PieCategories />,
    <BarGraph />,
    <BarsGraph />,
  ];

  return (
    <div className={styles.myprogresscard}>
      <div style={{ textAlign: 'center' }}>
        <p>
          <strong>
            ההתקדמות שלך
          </strong>
        </p>
        <Wizard steps={steps} />
      </div>
    </div>
  );
}
