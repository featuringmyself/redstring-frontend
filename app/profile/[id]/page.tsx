import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { IconLink, IconCheck } from "@tabler/icons-react";
import linkedinIcon from "@/public/linkedin.png";
import userImage from "@/public/userProfile.png";
import expIcon from "@/public/experienceIcon.png";
import twitterIcon from "@/public/twitter.png";
import CircularProgress from "@/components/CircularProgress";
import ProfileTopBar from "@/components/profileTopBar";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  interface College {
    course: string;
    institution: string;
    session: string;
  }

  interface Experience {
    company: string;
    profession: string;
    session: string;
  }

  interface NextOpportunity {
    package: string;
    profession: string;
  }

  interface Socials {
    linkedin: string;
    twitter: string;
  }

  interface UserProfile {
    _id: string;
    about: string;
    availability: string;
    clubMember: boolean;
    college: College;
    company: string;
    email: string;
    experience: Experience;
    location: string;
    name: string;
    nextOpportunity: NextOpportunity;
    profession: string;
    resume: string;
    score: number;
    skills: string[];
    socials: Socials;
    status: string;
    website: string;
    yoe: string;
  }

  const { id } = await params;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/profile/${id}`,
  );
  const profile: UserProfile = response.data;

  return (
    <>
      <ProfileTopBar profileStatus={profile.status} />
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 mt-6 md:mt-8 text-[#F7F7F7]">
        {/* Head */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <Image
            src={userImage}
            width={124}
            height={124}
            alt="Candidate Image"
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-[124px] md:h-[124px]"
          />
          <div className="flex-col flex gap-2 sm:gap-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center text-xl sm:text-2xl gap-1 sm:gap-2">
              <h1 className="font-semibold">{profile.name}</h1>
              <div className="hidden sm:block bg-text-disabled w-1.5 h-1.5 rounded-full"></div>
              <h2 className="text-blue-light">{profile.profession}</h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-x-2.5 text-sm sm:text-base text-text-secondary">
              <h4>{profile.yoe} Years of Experience</h4>
              <span className="hidden sm:inline text-text-disabled font-normal">
                |
              </span>
              <h4>{profile.company}</h4>
              <span className="hidden sm:inline text-text-disabled font-normal">
                |
              </span>
              <h4>{profile.location}</h4>
              <span className="hidden sm:inline text-text-disabled font-normal">
                |
              </span>
              <h4 className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[#17B26A] rounded-full"></span>
                {profile.availability}
              </h4>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-5 font-normal mt-6 md:mt-10 gap-6 lg:gap-5">
          <div className="lg:col-span-4 order-2 lg:order-1">
            {/* About */}
            <div className="flex flex-col items-start gap-3 md:gap-4">
              <h4 className="text-[#F7F7F7] text-base md:text-lg font-medium">
                About me
              </h4>
              <div className="max-w-full lg:max-w-md leading-6 text-sm md:text-base text-text-secondary">
                {profile.about}
              </div>
            </div>
            <div className="w-full h-[1px] bg-border-secondary my-6 md:my-8"></div>

            {/* Skills */}
            <div className="font-normal flex flex-col gap-3 md:gap-4">
              <h4 className="text-[#F7F7F7] text-base md:text-lg font-medium">
                Skills
              </h4>
              <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                {profile.skills.map((skill, i) => (
                  <div
                    className="bg-border-secondary shadow-sm px-2.5 py-1 rounded text-xs md:text-sm text-secondary text-nowrap"
                    key={i}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full h-[1px] bg-border-secondary my-6 md:my-8"></div>

            {/* College */}
            <div className="font-normal flex flex-col gap-3 md:gap-4">
              <p className="text-[#F7F7F7] text-base md:text-lg font-medium">
                College
              </p>
              <div>
                <h4 className="text-[#F7F7F7] text-sm md:text-base">
                  {profile.college.course}
                </h4>
                <p className="text-[#D6D6D6] text-sm md:text-base">
                  {profile.college.institution} | {profile.college.session}
                </p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-border-secondary my-6 md:my-8"></div>

            {/* Experience */}
            <div className="font-normal flex flex-col gap-4 md:gap-6">
              <h4 className="text-[#F7F7F7] text-base md:text-lg font-medium">
                Experience
              </h4>
              <div className="text-[#d6d6d6] flex items-center gap-3 md:gap-4">
                <div className="flex items-center p-2.5 md:p-3 bg-tertiary border-[1px] border-border-secondary shadow-sm rounded-lg flex-shrink-0">
                  <Image
                    src={expIcon}
                    alt="Experience Icon"
                    className="w-4 h-4 md:w-5 md:h-5 invert-100"
                  />
                </div>
                <div>
                  <h5 className="text-sm md:text-base text-[#F7F7F7]">
                    {profile.experience.company}
                  </h5>
                  <p className="text-sm md:text-base text-text-secondary">
                    {profile.experience.profession} |{" "}
                    <span>{profile.experience.session}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col items-start gap-4 md:gap-6 order-1 lg:order-2">
            <div className="flex flex-col items-start gap-3 md:gap-4">
              <span className="text-xs md:text-sm text-text-secondary">
                Score
              </span>
              <div className="flex flex-col items-center gap-1">
                <CircularProgress
                  value={profile.score}
                  size={64}
                  strokeWidth={5}
                />
              </div>
            </div>

            <div className="flex items-start flex-col gap-1.5 md:gap-2">
              <span className="text-xs md:text-sm font-normal text-text-secondary">
                Location
              </span>
              <h5 className="font-bold text-sm md:text-base text-[#f7f7f7]">
                {profile.location}
              </h5>
            </div>

            <div className="flex items-start flex-col gap-1.5 md:gap-2">
              <span className="text-xs md:text-sm font-normal text-text-secondary">
                Website
              </span>
              <Link
                href={profile.website}
                target="_blank"
                className="font-bold text-[#f7f7f7] text-sm md:text-base flex items-center gap-1 break-all"
              >
                {profile.website}{" "}
                <IconLink className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              </Link>
            </div>

            <div className="flex items-start flex-col gap-1.5 md:gap-2">
              <span className="text-xs md:text-sm font-normal text-text-secondary">
                Resume
              </span>
              <Link
                href={profile.resume}
                target="_blank"
                className="font-bold text-[#f7f7f7] text-sm md:text-base flex items-center gap-1"
              >
                Resume <IconLink className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </div>

            <div className="flex items-start flex-col gap-1.5 md:gap-2">
              <span className="text-xs md:text-sm font-normal text-text-secondary">
                Email
              </span>
              <Link
                href={`mailto:${profile.email}`}
                className="font-bold text-[#f7f7f7] text-sm md:text-base flex items-center gap-1 break-all"
              >
                {profile.email}{" "}
                <IconLink className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              </Link>
            </div>

            <div className="font-normal flex flex-col gap-1.5 md:gap-2">
              <p className="text-text-secondary text-xs md:text-sm">
                Ideal next opportunity
              </p>
              <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm flex-wrap">
                <div className="flex items-center bg-gray-blue py-1 px-2 md:px-2.5 text-[#D5D9EB] rounded gap-1.5">
                  <IconCheck className="h-3 w-auto" />
                  {profile.nextOpportunity.profession}
                </div>
                <div className="bg-utility-success text-success py-1 px-2 md:px-2.5 rounded">
                  ₹ {profile.nextOpportunity.package} LPA
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-1.5 md:gap-2">
              <span className="text-xs md:text-sm font-normal text-text-secondary">
                Socials
              </span>
              <div className="flex items-center gap-3 md:gap-4">
                <Link href={profile.socials?.linkedin} target="_blank">
                  <Image
                    src={linkedinIcon}
                    alt="LinkedIn"
                    className="w-5 h-5 md:w-6 md:h-6"
                  />
                </Link>
                <Link href={profile.socials?.twitter} target="_blank">
                  <Image
                    src={twitterIcon}
                    alt="Twitter"
                    className="w-5 h-5 md:w-6 md:h-6"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
