import StudyCard from "@/app/components/userStatus/studyCard";
import ProgressCard from "@/app/components/userStatus/progressCard";
import Information from "@/app/components/userStatus/information";
import Recommendations from "@/app/components/userStatus/Recommendations";

export default function UserContainer() {
  return (
    <div className="flex h-screen flex-wrap md:flex-nowrap">
      <div className="flex flex-col w-full md:w-1/2 gap-y-2">
        <div className="h-[40%] gap-16"><Information /></div>
        <Recommendations />
      </div>

      <div>
        <ProgressCard />
        <div className="h-[40%] gap-16">
        <StudyCard />
        </div>

      </div>
    </div>
  );
}
