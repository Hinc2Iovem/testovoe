import { useEffect, useState } from "react";
import useGetAllUserReports from "./hooks/useGetAllUserReports";
import { UsersReportType } from "@/types/UsersReport";

type UsersReportMainTypes = {
  debouncedValue: string;
  setShowingUserReport: React.Dispatch<React.SetStateAction<UsersReportType | null>>;
};

export default function UsersReportMain({ debouncedValue, setShowingUserReport }: UsersReportMainTypes) {
  const { data: userReports, isError, error } = useGetAllUserReports({ search: debouncedValue });

  const [cachedReports, setCachedReports] = useState(userReports || []);

  useEffect(() => {
    if (userReports) {
      setCachedReports(userReports);
    }
  }, [userReports]);

  if (isError) {
    console.error(error);
    return <h2>Oop, some error happend during fetching of userReports</h2>;
  }

  return (
    <main className="grid grid-cols-[repeat(auto-fit,minmax(357px,1fr))] auto-rows-[minmax(314px,auto)] gap-6 mb-4">
      {cachedReports?.map((u) => (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowingUserReport(u);
          }}
          className="flex flex-col gap-6 cursor-pointer hover:scale-[1.01] hover:bg-[#f7f7f7] active:scale-[1] transition-all | card"
          key={u.phone}
        >
          <h2 className="text-2xl font-bold | title">{u.name}</h2>
          <div className="text-[14px] flex flex-col gap-3 | description">
            <div className="flex gap-[14px] items-center">
              <img src="/images/telephone.svg" alt="phone" className="pl-[5px]" />
              <p>{u.phone}</p>
            </div>
            <div className="flex gap-[14px] items-center">
              <img src="/images/mail.svg" alt="email" />
              <p>{u.email}</p>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
