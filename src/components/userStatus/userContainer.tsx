import StudyCard from "@/components/userStatus/studyCard";
import ProgressCard from "@/components/userStatus/progressCard";
import Information from "@/components/userStatus/information";
import Recommendations from "@/components/userStatus/Recommendations";

export default function UserContainer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-screen">
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
