
import {StudyComp, ProgressComp, InfoComp, GoalSetting} from '../index';
import RequireAuth from '../../layout/RequireAuth';
import React from 'react';
import Recommendations from './Recommendations';
import styles from './userStatus.module.css'

export default function UserContainer() {

  return (
    <RequireAuth>
      <div className={styles.mainContainer}>
        <div className={styles.firstLine}>
          <InfoComp />
          <Recommendations />
        </div>
        <div className={styles.secondLine}>
          <StudyComp />
          <ProgressComp />
        </div>
      </div>
      <GoalSetting />
      
    </RequireAuth >
  );
}
