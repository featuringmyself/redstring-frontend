import Link from "next/link";

export default function ProfileTopBar({
  profileStatus,
}: {
  profileStatus: string;
}) {
  return (
    <header className="border-b-1 py-4 px-10 flex items-end justify-between border-border-secondary">
      <nav aria-label="Breadcrumb" className="flex items-center text-sm">
        <ol className="flex items-center gap-2">
          <li>
            <Link
              href="/"
              className="text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Posted Gigs
            </Link>
          </li>
          <li aria-hidden="true" className="text-text-disabled">
            /
          </li>
          <li aria-current="page">
            <span className="text-text-tertiary hover:text-text-secondary transition-colors">
              Applicants
            </span>
          </li>
          <li aria-hidden="true" className="text-text-disabled">
            /
          </li>
          <li aria-current="page">
            <span className="bg-secondary text-tertiary px-2 py-1 rounded">
              View Profile
            </span>
          </li>
        </ol>
      </nav>
      <div className="flex items-center text-sm gap-4">
        <span className={"text-sm font-normal"}>Candidate Status</span>
        <div className="bg-bg-secondary py-2.5 px-4 rounded-lg border border-border-secondary text-secondary [box-shadow:0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs)]">
          <span
            className={`py-1 px-2 rounded capitalize ${
              profileStatus === "approved"
                ? "bg-utility-success text-utility-green"
                : profileStatus === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-[#4E1D09] text-[#FEC84B]"
            }`}
          >
            {profileStatus}
          </span>
        </div>
      </div>
    </header>
  );
}
