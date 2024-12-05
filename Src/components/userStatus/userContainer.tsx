import StudyCard from './StudyCard';
import ProgressCard from './ProgressCard';
import Information from './Information';
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

