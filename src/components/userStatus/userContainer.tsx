import StudyCard from "@/components/userStatus/studyCard";
import ProgressCard from "@/components/userStatus/progressCard";
import Information from "@/components/userStatus/information";
import Recommendations from "@/components/userStatus/Recommendations";

export default function UserContainer() {
  return (
    <div className="">
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
