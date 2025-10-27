"use client";

import Image from "next/image"
import axios from "axios";
import userImage from "@/public/userProfile.png"
import personIcon from "@/public/personIcon.png"
import { IconCheck, IconX, IconLock } from "@tabler/icons-react"
import CircularProgress from "./CircularProgress"; // Add this import
import { useState } from "react";
import {redirect} from "next/navigation";

export default function ListItem({ id, name, proffession, yoe, location, college, availability, skills, nextOpportunity, score, onReject }: {
    id: string, name: string, proffession: string, yoe: string, location: string, college: string, availability: string, skills: string[], score: number, nextOpportunity: {
        proffesion: string,
        package: number
    }, onReject?: () => void
}) {
    const [showUnlockModal, setShowUnlockModal] = useState(false);

    const handleReject = () => {
        console.log("Reject button clicked for:", name);
        if (onReject) {
            onReject();
        } else {
            // Fallback behavior - you can customize this
            alert(`${name} has been rejected`);
        }
    };

    const handleUnlockProfile = () => {
        setShowUnlockModal(true);
    };

    const confirmUnlock = async () => {
        console.log("ID "+ id)
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/unlock`, {
            profileId: id,
        });
        console.log(response)
        console.log("Profile unlocked for:", name);
        redirect(`/profile/${id}`);
        setShowUnlockModal(false);
    };
    return (
        <div className="rounded-2xl border-1 border-border-secondary bg-bg-secondary p-6 flex flex-col h-full">
            <div className="flex items-start gap-4">
                <Image src={userImage} width={56} height={56} alt={"Candidate Image"} className={"rounded-full"} />
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
                <button
                    onClick={handleReject}
                    className={"flex items-center justify-center gap-1.5 text-sm bg-tertiary border-border-secondary border-[1px] px-4 py-2.5 rounded-lg font-bold shadow-sm shadow-[var(--ColorsEffectsShadowsshadow-xs)] hover:bg-[#FCFCFC] duration-300 hover:text-zinc-800 transition-colors cursor-pointer"}
                >
                    <IconX className={"text-xs text-[#F04438] font-bold"} /> Reject
                </button>
                <button
                    onClick={handleUnlockProfile}
                    className={"flex items-center justify-center gap-1.5 text-sm text-tertiary border-border-secondary border-[1px] px-4 py-2.5 rounded-lg font-bold bg-secondary shadow-[0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs)] hover:bg-blue-50 transition-colors cursor-pointer"}
                >
                    <IconLock className={"text-xs font-bold"} /> Unlock Profile  |  🌕 100
                </button>
            </div>

            {/* Unlock Profile Modal */}
            {showUnlockModal && (
                <div className="fixed inset-0 backdrop-blur-sm flex flex-col items-center justify-center z-50 rounded-3xl px-8 pb-8 pt-10 gap-8">
                    <button
                        onClick={() => setShowUnlockModal(false)}
                        className="cursor-pointer"
                    >
                        <IconX className={"h-6 w-auto text-[#A3A3A3]"} />
                    </button>
                    <div className="bg-black rounded-3xl border-[1px] border-[#424242] p-6 max-w-lg w-full mx-4 text-center flex gap-8 flex-col items-center justify-center">
                        <Image src={personIcon} alt={"Person Icon"} className={"w-16 h-16"}/>
                        <h5 className={"text-[#F7F7F7] text-4xl tracking-tight leading-11"}>Are you sure you want to unlock this profile?</h5>
                        <p className={"text-foreground font-normal text-base leading-6"}>
                            Unlocking will cost 10 credits. Once confirmed, you'll be able to chat with this candidate directly.
                        </p>

                        <div className="flex flex-col gap-1 tracking-tight justify-end w-full">
                            <p><span className={"font-normal"}>Credit Available:</span> 200</p>

                            <button
                                onClick={confirmUnlock}
                                className="px-4 py-2 w-full bg-[#713B12] text-[#F7F7F7] text-base rounded-lg hover:bg-[#713B12]/80 transition-colors border-[3px] border-solid custom-gradient-border"
                            >
                                Unlock <span className={"mx-1"}>🪙</span> 10 Credits
                            </button>
                        </div>

                        <div className={" text-[#424242] border-t-[0.5px] w-full pt-5"}>
                            <p className={"text-blue-light font-normal"}>Most startups find it worth it - top talents go fasts</p>
                        </div>
                    </div>

                </div>
            )}

        </div>
    )
}