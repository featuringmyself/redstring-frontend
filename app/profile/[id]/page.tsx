import axios from "axios";
import Image from "next/image";
import userImage from "@/public/userProfile.png";
export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ id: string }>
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
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/${id}`);
    const profile:UserProfile = response.data;
    console.log(profile);

    return (
        <div className={"px-10 mt-8 text-[#F7F7F7]"}>
        {/* Head */}
            <div className={"flex items-center gap-[24px]"}>
                <Image src={userImage} width={124} height={124} alt={"Candidate Image"}/>
                <div className={"flex-col flex  gap-1"}>
                <div className={"flex items-center text-2xl gap-2"}>
                    <h1>{profile.name}</h1>
                    <div className={"bg-text-disabled w-1.5 h-1.5 rounded-full"}></div>
                    <h2 className={"text-blue-light "}>{profile.profession}</h2>
                </div>
                    <div className={"flex items-center gap-x-2.5 text-base text-text-secondary"}>
                        <h4>{profile.yoe} Years of Experience</h4>
                        <span className={"text-text-disabled font-normal"}>|</span>
                        <h4>{profile.company}</h4>
                        <span className={"text-text-disabled font-normal"}>|</span>
                        <h4>{profile.location}</h4>
                        <span className={"text-text-disabled font-normal"}>|</span>
                        <h4 className={"flex items-center gap-1"}><span className="w-2 h-2 bg-[#17B26A] rounded-full"></span>{profile.availability}</h4>
                    </div>
                </div>
            </div>
        {/* Body */}
            <div className={"grid grid-cols-5 font-normal mt-10"}>
                <div className={"col-span-4 "}>
                    {/*About*/}
                    <div className={"flex flex-col items-start gap-4 "}>
                        <h4 className={"text-[#F7F7F7]"}>About me</h4>
                        <div className={"max-w-md leading-6 text-base text-text-secondary"}>
                            {profile.about}
                        </div>
                    </div>
                    <div className={"w-full h-[1px] bg-border-secondary my-8"}></div>
                {/*    Skills*/}
                    <div className={"font-normal flex flex-col gap-4"}>
                        <p className={"text-[#F7F7F7] text-base "}>Skills</p>
                        <div className={"flex items-center gap-3 flex-wrap"}>
                            {profile.skills.map((skill, i) => (
                                <div className={"bg-border-secondary shadow-sm px-2.5 py-1 rounded text-sm text-secondary text-nowrap"} key={i}>{skill}</div>
                            ))}
                        </div>
                    </div>
                    <div className={"w-full h-[1px] bg-border-secondary my-8"}></div>
                {/*College*/}
                    <div className={"font-normal flex flex-col gap-[16px]"}>
                        <p className={"text-[#F7F7F7] text-base "}>College</p>
                        <div>
                        <h5 className={"text-[#F7F7F7]"}>{profile.college.course}</h5>
                        <p className={"text-[#D6D6D6]"}>{profile.college.institution} | {profile.college.session}</p>
                        </div>
                    </div>
                    <div className={"w-full h-[1px] bg-border-secondary my-8"}></div>
                {/*    Experience*/}

                </div>
            </div>
        </div>
    );
}