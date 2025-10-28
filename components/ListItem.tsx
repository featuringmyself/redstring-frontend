// in production, I'll ideally try to make it a server component
"use client";

import Image from "next/image";
import axios from "axios";
import userImage from "@/public/userProfile.png";
import personIcon from "@/public/personIcon.png";
import { IconCheck, IconX, IconLock } from "@tabler/icons-react";
import CircularProgress from "./CircularProgress";
import clubMemberIcon from "@/public/clubMember.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { showLoadingToast, updateLoadingToast } from "@/utils/toast";

export default function ListItem({
  id,
  name,
  proffession,
  yoe,
  clubMember,
  location,
  college,
  availability,
  skills,
  nextOpportunity,
  score,
  onReject,
}: {
  id: string;
  name: string;
  proffession: string;
  yoe: string;
  clubMember: boolean;
  location: string;
  college: string;
  availability: string;
  skills: string[];
  score: number;
  nextOpportunity: {
    proffesion: string;
    package: number;
  };
  onReject?: () => void;
}) {
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [credit, setCredit] = useState(0);
  const router = useRouter();

  const handleReject = () => {
    console.log("Reject button clicked for:", name);
    if (onReject) {
      onReject();
      toast.info(`${name} has been rejected`);
    } else {
      // Fallback behavior - you can customize this
      toast.info(`${name} has been rejected`);
    }
  };

  interface creditInterface {
    data: {
      success: boolean;
      credit: number;
    };
  }
  const handleUnlockProfile = async () => {
    const loadingToast = showLoadingToast("Loading credits...");

    try {
      setShowUnlockModal(true);
      const credit: creditInterface = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/credit/`,
      );

      setCredit(credit.data.credit);

      if (credit.data.success) {
        updateLoadingToast(loadingToast, 'success', "Credits loaded successfully!");
      } else {
        updateLoadingToast(loadingToast, 'error', "Failed to load credits");
        setShowUnlockModal(false);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to load credits";
      updateLoadingToast(loadingToast, 'error', errorMessage);
      setShowUnlockModal(false);
    }
  };

  const confirmUnlock = async () => {
    const loadingToast = showLoadingToast("Unlocking profile...");

    try {
      console.log("ID " + id);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/unlock`,
        {
          profileId: id,
        },
      );
      setCredit(credit-10)
      console.log(response);

      // Check if the response indicates success
      if (response.data.success !== false && response.status >= 200 && response.status < 300) {
        const successMessage = response.data.message || `Profile unlocked for ${name}!`;
        updateLoadingToast(loadingToast, 'success', successMessage);
        console.log("Profile unlocked for:", name);
        router.push(`/profile/${id}`);
      } else {
        const errorMessage = response.data.message || "Failed to unlock profile";
        updateLoadingToast(loadingToast, 'error', errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to unlock profile";
      updateLoadingToast(loadingToast, 'error', errorMessage);
    }
  };
  console.log("clubMember", clubMember);
  return (
    <div
      className={`rounded-2xl p-4 sm:p-6 flex flex-col h-full ${clubMember
        ? "bg-[#02000A] border border-[#3E1C96]"
        : "border-1 border-border-secondary bg-bg-secondary"
        }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <Image
          src={userImage}
          width={56}
          height={56}
          alt={"Candidate Image"}
          className={"rounded-full w-12 h-12 sm:w-14 sm:h-14"}
        />
        <div className="flex items-start gap-2 sm:gap-2.5 flex-col flex-1 min-w-0">
          {/* In Production we will have a random name  */}
          <div className="text-base sm:text-lg flex items-center gap-2 flex-wrap">
            {" "}
            <span className="blur-sm select-none">{name}</span>{" "}
            <span className="text-[#A3A3A3]">•</span>{" "}
            <span className={"text-blue-light"}>{proffession}</span>
          </div>
          <div
            className={
              "text-xs sm:text-sm flex items-center gap-2 sm:gap-2.5 flex-wrap"
            }
          >
            <span>{yoe} Years of Experience</span>
            <span className={"font-normal text-[#737373] hidden sm:inline"}>
              |
            </span>
            <span className={"blur-sm select-none"}>alskdjf</span>
            <span className={"font-normal text-[#737373] hidden sm:inline"}>
              |
            </span>
            <span>{location}</span>
          </div>
          <div
            className={
              "text-xs sm:text-sm flex items-center gap-2 sm:gap-2.5 flex-wrap"
            }
          >
            <span>{college}</span>
            <div className={"flex items-center gap-1"}>
              <span className="w-2 h-2 bg-[#17B26A] rounded-full"></span>
              <span>{availability}</span>
            </div>
          </div>
        </div>

        {/* Add score here */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <CircularProgress value={score} size={56} strokeWidth={5} />
        </div>
      </div>

      <div className={"w-full bg-border-secondary h-[1px] my-4 flex"}></div>

      {/* Skills */}
      <div className={"font-normal flex flex-col gap-2"}>
        <p className={"text-text-disabled text-sm "}>Skills</p>
        <div className={"flex items-center gap-2 sm:gap-3 flex-wrap"}>
          {skills.map((skill, i) => (
            <div
              className={
                "bg-border-secondary shadow-sm px-2 sm:px-2.5 py-1 rounded text-xs sm:text-sm text-secondary whitespace-nowrap"
              }
              key={i}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Ideal Next Opportunity */}
      <div className={"font-normal flex flex-col gap-2 mt-6"}>
        <p className={"text-text-disabled text-sm "}>Ideal next opportunity</p>
        <div
          className={
            "flex items-start sm:items-center text-xs sm:text-sm flex-col sm:flex-row gap-3 sm:justify-between"
          }
        >
          <div className={"flex items-center gap-2 sm:gap-3 flex-wrap"}>
            <div
              className={
                "flex items-center bg-gray-blue py-1 px-2 sm:px-2.5 text-[#D5D9EB] rounded gap-1.5 whitespace-nowrap"
              }
            >
              <IconCheck className={"h-3 w-auto"} />{" "}
              {nextOpportunity.proffesion}
            </div>
            <div
              className={
                "bg-utility-success text-success py-1 px-2 sm:px-2.5 rounded whitespace-nowrap"
              }
            >
              ₹ {nextOpportunity.package} LPA
            </div>
          </div>
          <span
            className={`font-normal flex items-center gap-2 sm:gap-3 text-xs sm:text-sm ${clubMember ? "bg-gradient-to-r from-[#5912A0] to-[#2E0755] py-1 pl-2 sm:pl-3 pr-2 sm:pr-2.5 rounded-[6px]" : "hidden"}`}
          >
            <Image
              src={clubMemberIcon}
              alt={"Club Member Badge"}
              className={"w-4 h-4 rounded-sm"}
            />{" "}
            Club Member
          </span>
        </div>
      </div>

      <div className={"w-full bg-border-secondary h-[1px] my-4 flex "}></div>
      <div className={"grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-auto"}>
        <button
          onClick={handleReject}
          className={
            "flex items-center justify-center gap-1.5 text-xs sm:text-sm bg-tertiary border-border-secondary border-[1px] px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-bold shadow-sm shadow-[var(--ColorsEffectsShadowsshadow-xs)] hover:bg-[#FCFCFC] duration-300 hover:text-zinc-800 transition-colors cursor-pointer"
          }
        >
          <IconX className={"text-xs text-[#F04438] font-bold"} /> Reject
        </button>
        <button
          onClick={handleUnlockProfile}
          className={
            "flex items-center justify-center gap-1.5 text-xs sm:text-sm text-tertiary border-border-secondary border-[1px] px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-bold bg-secondary shadow-[0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs)] hover:bg-blue-50 transition-colors cursor-pointer"
          }
        >
          <IconLock className={"text-xs font-bold"} /> Unlock Profile | 🌕 10
        </button>
      </div>

      {/* Unlock Profile Modal */}
      {showUnlockModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex flex-col items-center justify-center z-50 px-4 sm:px-8 py-8 sm:pb-8 sm:pt-10 gap-6 sm:gap-8">
          <button
            onClick={() => setShowUnlockModal(false)}
            className="cursor-pointer"
          >
            <IconX className={"h-6 w-auto text-[#A3A3A3]"} />
          </button>
          <div className="bg-black rounded-2xl sm:rounded-3xl border-[1px] border-[#424242] p-4 sm:p-6 max-w-lg w-full text-center flex gap-6 sm:gap-8 flex-col items-center justify-center">
            <Image
              src={personIcon}
              alt={"Person Icon"}
              className={"w-12 h-12 sm:w-16 sm:h-16"}
            />
            <h5
              className={
                "text-[#F7F7F7] text-2xl sm:text-4xl tracking-tight leading-tight sm:leading-11"
              }
            >
              Are you sure you want to unlock this profile?
            </h5>
            <p
              className={
                "text-foreground font-normal text-sm sm:text-base leading-6"
              }
            >
              Unlocking will cost 10 credits. Once confirmed, you'll be able to
              chat with this candidate directly.
            </p>

            <div className="flex flex-col gap-1 tracking-tight justify-end w-full">
              <p className="text-sm sm:text-base">
                <span className={"font-normal"}>Credit Available:</span>{" "}
                {credit}
              </p>

              <button
                onClick={confirmUnlock}
                className="px-3 sm:px-4 py-2 w-full bg-[#713B12] text-[#F7F7F7] text-sm sm:text-base rounded-lg hover:bg-[#713B12]/80 transition-colors border-[3px] border-solid custom-gradient-border"
              >
                Unlock <span className={"mx-1"}>🪙</span> 10 Credits
              </button>
            </div>

            <div
              className={"text-[#424242] border-t-[0.5px] w-full pt-4 sm:pt-5"}
            >
              <p className={"text-blue-light font-normal text-sm sm:text-base"}>
                Most startups find it worth it - top talents go fasts
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
