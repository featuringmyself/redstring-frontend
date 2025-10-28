import { IconArrowsUpDown } from "@tabler/icons-react";
import axios from "axios";
import ListItem from "@/components/ListItem";

interface College {
  course: string;
  institution: string;
  session: string;
}

interface NextOpportunity {
  profession: string;
  package: string;
}

interface CandidateData {
  _id: string;
  name: string;
  profession: string;
  college: College;
  nextOpportunity: NextOpportunity;
  location: string;
  availability: string;
  skills: string[];
  yoe: string;
  score: number;
}

interface CandidateResponse {
  data: CandidateData[];
}

export default async function Listings() {
  const listings = await axios.get<CandidateResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/profile`,
  );
  const candidates = listings.data;

  if (!candidates) {
    return <div>Loading...</div>;
  }
  console.log(candidates);
  return (
    <div className="py-8 px-10">
      {/* Head Section */}
      <div>
        <div className="flex items-center gap-4">
          <h1 className="text-2xl">Product Designer</h1>
          <div className="bg-utility-success text-utility-green flex items-center gap-1 px-2 py-1 rounded-lg">
            <span className="w-2 h-2 bg-[#17B26A] rounded-full"></span>{" "}
            <p className="text-xs font-normal">
              {candidates.length} Applicant{candidates.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm mt-2 border-border-secondary border-b pb-4">
          <span className="">0-1 Years of Experience</span>
          <span className="text-text-disabled">|</span>
          <span className="">Zepto</span>
          <span className="text-text-disabled">|</span>
          <span className="">New Delhi, India</span>
          <span className="text-text-disabled">|</span>
          <span className="flex items-center gap-1 text-text-secondary">
            {" "}
            <span className="w-2 h-2 bg-[#17B26A] rounded-full"></span>{" "}
            Available Immediately
          </span>
        </div>
      </div>
      {/* Listing Section */}

      {/* Filters */}
      <div className="mt-10 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-secondary">
          <div className="py-1.5 px-3 bg-bg-secondary  rounded-md [box-shadow:0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs)] border-[1px] border-border-secondary ">
            Experience Level
          </div>
          <div className="py-1.5 px-3 bg-bg-secondary  rounded-md [box-shadow:0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs)] border-[1px] border-border-secondary ">
            Availability
          </div>
          <div className="py-1.5 px-3 bg-bg-secondary  rounded-md [box-shadow:0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs)] border-[1px] border-border-secondary ">
            Preferred Location
          </div>
          <div className="py-1.5 px-3 bg-bg-secondary  rounded-md [box-shadow:0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs)] border-[1px] border-border-secondary ">
            Skills
          </div>
          <div className="py-1.5 px-3 bg-bg-secondary  rounded-md [box-shadow:0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs)] border-[1px] border-border-secondary ">
            Expected CTC
          </div>
        </div>
        <div className="py-1.5 px-3 bg-bg-secondary  rounded-md [box-shadow:0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs)] border-[1px] border-border-secondary text-xs text-secondary flex items-center gap-1.5">
          <IconArrowsUpDown className="w-3 h-3" />
          Sort
        </div>
      </div>

      <div className={"grid lg:grid-cols-2 grid-cols-1 gap-8 mt-4"}>
        {candidates.map((candidate) => (
          <ListItem
            key={candidate._id}
            id={candidate._id}
            name={candidate.name}
            proffession={candidate.profession}
            yoe={candidate.yoe}
            location={candidate.location}
            college={`${candidate.college.institution}, ${candidate.college.session.split("-")[1]}`}
            availability={candidate.availability}
            skills={candidate.skills}
            score={candidate.score}
            nextOpportunity={{
              proffesion: candidate.nextOpportunity.profession,
              package: candidate.nextOpportunity.package,
            }}
          />
        ))}
      </div>
    </div>
  );
}
