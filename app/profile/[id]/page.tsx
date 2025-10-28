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
      <div className={"px-10 mt-8 text-[#F7F7F7]"}>
        {/* Head */}
        <div className={"flex items-center gap-[24px]"}>
          <Image
            src={userImage}
            width={124}
            height={124}
            alt={"Candidate Image"}
          />
          <div className={"flex-col flex  gap-1"}>
            <div className={"flex items-center text-2xl gap-2"}>
              <h1>{profile.name}</h1>
              <div
                className={"bg-text-disabled w-1.5 h-1.5 rounded-full"}
              ></div>
              <h2 className={"text-blue-light "}>{profile.profession}</h2>
            </div>
            <div
              className={
                "flex items-center gap-x-2.5 text-base text-text-secondary"
              }
            >
              <h4>{profile.yoe} Years of Experience</h4>
              <span className={"text-text-disabled font-normal"}>|</span>
              <h4>{profile.company}</h4>
              <span className={"text-text-disabled font-normal"}>|</span>
              <h4>{profile.location}</h4>
              <span className={"text-text-disabled font-normal"}>|</span>
              <h4 className={"flex items-center gap-1"}>
                <span className="w-2 h-2 bg-[#17B26A] rounded-full"></span>
                {profile.availability}
              </h4>
            </div>
          </div>
        </div>
        {/* Body */}
        <div className={"grid grid-cols-5 font-normal mt-10 gap-5"}>
          <div className={"col-span-4 "}>
            {/*About*/}
            <div className={"flex flex-col items-start gap-4 "}>
              <h4 className={"text-[#F7F7F7]"}>About me</h4>
              <div
                className={"max-w-md leading-6 text-base text-text-secondary"}
              >
                {profile.about}
              </div>
            </div>
            <div className={"w-full h-[1px] bg-border-secondary my-8"}></div>
            {/*    Skills*/}
            <div className={"font-normal flex flex-col gap-4"}>
              <h4 className={"text-[#F7F7F7] text-base "}>Skills</h4>
              <div className={"flex items-center gap-3 flex-wrap"}>
                {profile.skills.map((skill, i) => (
                  <div
                    className={
                      "bg-border-secondary shadow-sm px-2.5 py-1 rounded text-sm text-secondary text-nowrap"
                    }
                    key={i}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div className={"w-full h-[1px] bg-border-secondary my-8"}></div>
            {/*College*/}
            <div className={"font-normal flex flex-col gap-[16px]"}>
              <p className={"text-[#F7F7F7] text-base "}>College</p>
              <div>
                <h4 className={"text-[#F7F7F7]"}>{profile.college.course}</h4>
                <p className={"text-[#D6D6D6]"}>
                  {profile.college.institution} | {profile.college.session}
                </p>
              </div>
            </div>
            <div className={"w-full  h-[1px] bg-border-secondary my-8"}></div>
            {/*    Experience*/}
            <div className={"font-normal flex flex-col gap-6"}>
              <h4 className={"text-[#F7F7F7] text-base"}>Experience</h4>
              {/*Make it a object in production*/}

              <div className={"text-[#d6d6d6] flex items-center gap-4"}>
                <div
                  className={
                    "flex items-center p-3 bg-tertiary border-[1px] border-border-secondary shadow-sm rounded-lg"
                  }
                >
                  <Image
                    src={expIcon}
                    alt={"Experience Icon"}
                    className={"w-5 h-5 invert-100"}
                  />
                </div>
                <div>
                  <h5 className={"text-base text-[#F7F7F7]"}>
                    {profile.experience.company}
                  </h5>
                  <p className={"text-base text-text-secondary"}>
                    {profile.experience.profession} |{" "}
                    <span>{profile.experience.session}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={"flex flex-col items-start gap-6"}>
            <div className={"flex flex-col items-start gap-4"}>
              <span className={"text-sm text-text-secondary"}>Score</span>
              <div className={"flex flex-col items-center gap-1"}>
                <CircularProgress
                  value={profile.score}
                  size={64}
                  strokeWidth={5}
                />
              </div>
            </div>
            <div className={"flex items-start flex-col gap-2"}>
              <span className={"text-sm font-normal text-text-secondary"}>
                Location
              </span>
              <h5 className={"font-bold text-base text-[#f7f7f7]"}>
                {profile.location}
              </h5>
            </div>
            <div className={"flex items-start flex-col gap-2"}>
              <span className={"text-sm font-normal text-text-secondary"}>
                Website
              </span>
              <Link
                href={profile.website}
                target={"_blank"}
                className={
                  "font-bold text-[#f7f7f7] text-base flex items-center gap-1"
                }
              >
                {profile.website} <IconLink className={"w-5 h-5 "} />
              </Link>
            </div>
            <div className={"flex items-start flex-col gap-2"}>
              <span className={"text-sm font-normal text-text-secondary"}>
                Resume
              </span>
              <Link
                href={profile.resume}
                target={"_blank"}
                className={
                  "font-bold text-[#f7f7f7] text-base flex items-center gap-1"
                }
              >
                Resume <IconLink className={"w-5 h-5 "} />
              </Link>
            </div>
            <div className={"flex items-start flex-col gap-2"}>
              <span className={"text-sm font-normal text-text-secondary"}>
                Email
              </span>
              <Link
                href={`mailto:${profile.email}`}
                className={
                  "font-bold text-[#f7f7f7] text-base flex items-center gap-1"
                }
              >
                {profile.email} <IconLink className={"w-5 h-5 "} />{" "}
              </Link>
            </div>
            <div className={"font-normal flex flex-col gap-2"}>
              <p className={"text-text-secondary text-sm "}>
                Ideal next opportunity
              </p>
              <div className={"flex items-center gap-3 text-sm"}>
                <div
                  className={
                    "flex items-center bg-gray-blue py-1 px-2.5 text-[#D5D9EB] rounded gap-1.5"
                  }
                >
                  <IconCheck className={"h-3 w-auto"} />{" "}
                  {profile.nextOpportunity.profession}
                </div>
                <div
                  className={
                    "bg-utility-success text-success py-1 px-2.5 rounded"
                  }
                >
                  ₹ {profile.nextOpportunity.package} LPA
                </div>
              </div>
            </div>
            <div className={"flex flex-col items-start gap-2"}>
              <span className={"text-sm font-normal text-text-secondary"}>
                Socials
              </span>
              <div className={"flex items-center gap-4"}>
                <Link href={profile.socials?.linkedin} target={"_blank"}>
                  <Image
                    src={linkedinIcon}
                    alt={"LinkedIn"}
                    className={"w-6 h-6"}
                  />
                </Link>
                <Link href={profile.socials?.twitter} target={"_blank"}>
                  <Image
                    src={twitterIcon}
                    alt={"Twitter"}
                    className={"w-6 h-6"}
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
