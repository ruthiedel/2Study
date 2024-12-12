
import StudyComp from './StudyComp';
import RequireAuth from '../../layout/RequireAuth';
import ProgressComp from './ProgressComp';
import InfoComp from './InfoComp';
import React from 'react';
import Recommendations from './Recommendations';
import GoalSetting from './Goals/Goals'

export default function UserContainer() {

  return (
      <RequireAuth>
        <div className="grid grid-cols-1 md:grid-cols-2 m-8">
          <div>
            <div>
              <InfoComp />
            </div>
            <div>
              <StudyComp />
            </div>
          </div>

          <div className="">
            <ProgressComp />
          </div>
          <div>
            <Recommendations />
          </div>
        </div>
        <GoalSetting/>
    </RequireAuth >
  );
}
