import Link from "next/link";

export default function ProfileTopBar({
  profileStatus,
}: {
  profileStatus: string;
}) {
  return (
    <header className="border-b-1 py-3 md:py-4 px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4 border-border-secondary">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center text-xs sm:text-sm w-full sm:w-auto overflow-x-auto"
      >
        <ol className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
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
            <span className="bg-secondary text-tertiary px-2 py-1 rounded-md text-xs sm:text-sm">
              View Profile
            </span>
          </li>
        </ol>
      </nav>
      <div className="flex items-center text-xs sm:text-sm gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
        <span className="text-xs sm:text-sm font-normal whitespace-nowrap">
          Candidate Status
        </span>
        <div className="bg-bg-secondary py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg border border-border-secondary text-secondary [box-shadow:0px_1px_2px_0px_var(--ColorsEffectsShadowsshadow-xs)]">
          <span
            className={`py-0.5 sm:py-1 px-1.5 sm:px-2 rounded capitalize text-xs sm:text-sm ${
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
