import StudyCard from './studyCard';
import ProgressCard from './progressCard';
import Information from './information';
import Recommendations from './Recommendations';

export default function UserContainer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 m-8">
      <div className="">
        <div className="">
          <Information />
        </div>
        <div className="">
          <StudyCard />
        </div>
      </div>

      <div>
        <div className="">
          <Recommendations />
        </div>
        <div className="">
          <ProgressCard />
        </div>
      </div>
    </div>
  );
}
