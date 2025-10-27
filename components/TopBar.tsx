import Link from "next/link";

export default function TopBar() {
    return (
        <header className="border-b-1 py-4 px-10 flex items-end justify-between border-border-secondary">
            <div className="flex items-center text-sm gap-2">
                <span className="text-text-tertiary">Posted Gigs</span><span className="text-text-disabled">/</span><span className="bg-secondary text-tertiary px-2 py-1 rounded">Applicants</span>
            </div>
            <div className="flex items-center text-sm gap-4">
                <Link href="#" className="bg-bg-secondary py-2.5 px-4 rounded-lg border border-border-secondary text-secondary [box-shadow:0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs)]">Contact Us</Link>
                <Link href="#" className="text-white bg-button-primary py-2.5 px-4 rounded-lg gradient-border [box-shadow:0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs),0px_-2px_0px_0px_var(--ColorsEffectsShadowsshadow-skeumorphic-inner)_inset,0px_0px_0px_1px_var(--ColorsEffectsShadowsshadow-skeumorphic-inner-border)_inset]">Save & Next</Link>
            </div>
        </header>
    )
}