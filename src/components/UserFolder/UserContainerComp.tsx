
import StudyComp from './StudyComp';
import RequireAuth from '../../layout/RequireAuth';
import ProgressComp from './ProgressComp';
import InfoComp from './InfoComp';
import React from 'react';
import Recommendations from './Recommendations';
import GoalSetting from './Goals/Goals';
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
