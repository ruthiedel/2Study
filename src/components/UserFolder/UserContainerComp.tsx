import StudyComp from './StudyComp';
import ProgressComp from './ProgressComp';
import InfoComp from './InfoComp';
import Recommendations from './Recommendations';

export default function UserContainer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 m-8">
      <div className="">
        <div className="">
          <InfoComp />
        </div>
        <div className="">
          <StudyComp />
        </div>
      </div>

      <div>
        <div className="">
          <Recommendations />
        </div>
        <div className="">
          <ProgressComp />
        </div>
      </div>
    </div>
  );
}
