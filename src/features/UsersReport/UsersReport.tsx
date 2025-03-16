import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import UsersReportMain from "./UsersReportMain";
import { UsersReportType } from "@/types/UsersReport";
import UserReportLightbox from "./UserReportLightbox";

export default function UsersReport() {
  const [search, setSearch] = useState("");
  const [showingUserReport, setShowingUserReport] = useState<UsersReportType | null>(null);

  const debouncedValue = useDebounce(search, 500);

  return (
    <section className="max-w-6xl px-2.5 w-full justify-self-center">
      <header className="mt-16 mb-8">
        <form onSubmit={(e) => e.preventDefault()} className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-[1px] rounded-3xl py-3 pl-6 pr-14 description outline-none hover:border-[var(--title)] focus:border-[var(--title)] focus:text-[var(--title)] hover:text-[var(--title)] transition-all"
          />
          <button className="absolute cursor-pointer hover:scale-[1.015] transition-all active:scale-[.99] right-6 top-1/2 -translate-y-1/2">
            <img src="/images/search.svg" alt="search" />
          </button>
        </form>
      </header>

      <UsersReportMain debouncedValue={debouncedValue} setShowingUserReport={setShowingUserReport} />

      {showingUserReport ? (
        <UserReportLightbox setShowingUserReport={setShowingUserReport} showingUserReport={showingUserReport} />
      ) : null}
    </section>
  );
}
