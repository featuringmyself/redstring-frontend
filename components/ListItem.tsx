import Image from "next/image";
import userImage from "@/public/userProfile.png"
import { IconCheck, IconX, IconLock } from "@tabler/icons-react"
import CircularProgress from "./CircularProgress"; // Add this import

export default function ListItem({ name, proffession, yoe, location, college, availability, skills, nextOpportunity, score}: { name: string, proffession: string, yoe: string, location: string, college: string, availability: string, skills: string[],score:number, nextOpportunity: {
        proffesion: string,
        package: number
    }}) {
    return(
        <div className="rounded-2xl border-1 border-border-secondary bg-bg-secondary p-6 flex flex-col h-full">
            <div className="flex items-start gap-4">
                <Image src={userImage} width={56} height={56} alt={"Candidate Image"} className={"rounded-full"}/>
                <div className="flex items-start gap-2.5 flex-col flex-1">
                    <div className="text-lg flex items-center gap-2"> <span className="blur-sm">{name}</span> <span className="text-[#A3A3A3]">•</span> <span className={"text-blue-light"}>{proffession}</span></div>
                    <div className={"text-sm flex items-center gap-2.5"}>{yoe} Years of Experience <span className={"font-normal text-[#737373]"}>|</span> <span className={"blur-sm"}>alskdjf</span> <span className={"font-normal text-[#737373]"}>|</span> {location}</div>
                    <div className={"text-sm flex items-center gap-2.5"}>{college} <div className={"flex items-center gap-1"}><span className="w-2 h-2 bg-[#17B26A] rounded-full"></span>{availability}</div></div>
                </div>

                {/* Add score here */}
                <div className="flex flex-col items-center gap-1">
                    <CircularProgress value={score} size={56} strokeWidth={5} />
                </div>
            </div>

            <div className={"w-full bg-border-secondary h-[1px] my-4 flex"}></div>

            {/* Skills */}
            <div className={"font-normal flex flex-col gap-2"}>
                <p className={"text-text-disabled text-sm "}>Skills</p>
                <div className={"flex items-center gap-3 flex-wrap"}>
                    {skills.map((skill, i) => (
                        <div className={"bg-border-secondary shadow-sm px-2.5 py-1 rounded text-sm text-secondary text-nowrap"} key={i}>{skill}</div>
                    ))}
                </div>
            </div>

            {/* Ideal Next Opportunity */}
            <div className={"font-normal flex flex-col gap-2 mt-6"}>
                <p className={"text-text-disabled text-sm "}>Ideal next opportunity</p>
                <div className={"flex items-center gap-3 text-sm"}>
                    <div className={"flex items-center bg-gray-blue py-1 px-2.5 text-[#D5D9EB] rounded gap-1.5"}><IconCheck className={"h-3 w-auto"} /> {nextOpportunity.proffesion}</div>
                    <div className={"bg-utility-success text-success py-1 px-2.5 rounded"}>₹ {nextOpportunity.package} LPA</div>
                </div>
            </div>

            <div className={"w-full bg-border-secondary h-[1px] my-4 flex "}></div>
            <div className={"grid grid-cols-2 gap-4 mt-auto"}>
                <div className={"flex items-center justify-center gap-1.5 text-sm bg-tertiary border-border-secondary border-[1px] px-4 py-2.5 rounded-lg font-bold shadow-sm shadow-[var(--ColorsEffectsShadowsshadow-xs)]"}>
                    <IconX className={"text-xs text-[#F04438] font-bold"}/> Reject
                </div>
                <div className={"flex items-center justify-center gap-1.5 text-sm text-tertiary border-border-secondary border-[1px] px-4 py-2.5 rounded-lg font-bold bg-secondary shadow-[0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs)]"}>
                    <IconLock className={"text-xs font-bold"}/> Unlock Profile  |  🌕 100
                </div>
            </div>

        </div>
    )
}