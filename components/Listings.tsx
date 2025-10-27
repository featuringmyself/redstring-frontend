import { IconArrowsUpDown } from '@tabler/icons-react';
import ListItem from "@/components/ListItem";
export default function Listings() {

    return(
        <div className="py-8 px-10">
            {/* Head Section */}
            <div>
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl">Product Designer</h1>
                    <div className="bg-utility-success text-utility-green flex items-center gap-1 px-2 py-1 rounded-lg">
                       <span className="w-2 h-2 bg-[#17B26A] rounded-full"></span> <p className="text-xs font-normal">59 Applicant</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-sm mt-2 border-border-secondary border-b pb-4">
                    <span className="">0-1 Years of Experience</span>
                    <span className="text-text-disabled">|</span>
                    <span className="">Zepto</span>
                    <span className="text-text-disabled">|</span>
                    <span className="">New Delhi, India</span>
                    <span className="text-text-disabled">|</span>
                    <span className="flex items-center gap-1 text-text-secondary"> <span className="w-2 h-2 bg-[#17B26A] rounded-full"></span> Available Immediately</span>
                </div>
            </div>
            {/* Listing Section */}

            {/* Filters */}
            <div className="mt-10 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-secondary">
                    <div className="py-1.5 px-3 bg-bg-secondary border-border-secondary rounded-md [box-shadow:0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs)] ">Experience Level</div>
                    <div className="py-1.5 px-3 bg-bg-secondary border-border-secondary rounded-md [box-shadow:0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs)] ">Availability</div>
                    <div className="py-1.5 px-3 bg-bg-secondary border-border-secondary rounded-md [box-shadow:0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs)] ">Preferred Location</div>
                    <div className="py-1.5 px-3 bg-bg-secondary border-border-secondary rounded-md [box-shadow:0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs)] ">Skills</div>
                    <div className="py-1.5 px-3 bg-bg-secondary border-border-secondary rounded-md [box-shadow:0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs)] ">Expected CTC</div>
                </div>
                <div className="py-1.5 px-3 bg-bg-secondary border-border-secondary rounded-md [box-shadow:0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs)] text-xs text-secondary flex items-center gap-1.5"><IconArrowsUpDown className="w-3 h-3"/>Sort</div>
            </div>

            <div className={"grid grid-cols-2 gap-8 mt-2.5"}>
            <ListItem  name="Rudra N Ghosh" proffession={"Product Designer"} yoe={"0-1 Years of Experience"} location={"New Delhi, India"} college={"IIT, 2026"} availability={"Available Immediately"} skills={["UX Design", "Motion Design", "UX Research", "UX Thought Process", "Critical Thinking"]} nextOpportunity={{
                proffesion: "UX Designer",
                package: 12
            }}/>
                <ListItem  name="Rudra N Ghosh" proffession={"Product Designer"} yoe={"0-1 Years of Experience"} location={"New Delhi, India"} college={"IIT, 2026"} availability={"Available Immediately"} skills={["UX Design", "Motion Design", "UX Research", "UX Thought Process", "Critical Thinking"]} nextOpportunity={{
                    proffesion: "UX Designer",
                    package: 12
                }}/>
                <ListItem  name="Rudra N Ghosh" proffession={"Product Designer"} yoe={"0-1 Years of Experience"} location={"New Delhi, India"} college={"IIT, 2026"} availability={"Available Immediately"} skills={["UX Design", "Motion Design", "UX Research", "UX Thought Process", "Critical Thinking"]} nextOpportunity={{
                    proffesion: "UX Designer",
                    package: 12
                }}/>
                <ListItem  name="Rudra N Ghosh" proffession={"Product Designer"} yoe={"0-1 Years of Experience"} location={"New Delhi, India"} college={"IIT, 2026"} availability={"Available Immediately"} skills={["UX Design", "Motion Design", "UX Research", "UX Thought Process", "Critical Thinking"]} nextOpportunity={{
                    proffesion: "UX Designer",
                    package: 12
                }}/>
            </div>
        </div>
    )
}