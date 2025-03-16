import Lightbox from "@/components/Lightbox";
import useOutOfModal from "@/hooks/useOutOfModal";
import { UsersReportType } from "@/types/UsersReport";
import { useRef } from "react";

type UserReportLightboxTypes = {
  setShowingUserReport: React.Dispatch<React.SetStateAction<UsersReportType | null>>;
  showingUserReport: UsersReportType;
};

export default function UserReportLightbox({ setShowingUserReport, showingUserReport }: UserReportLightboxTypes) {
  const modalRef = useRef<HTMLDivElement>(null);
  useOutOfModal<UsersReportType>({ modalRef, setShowModal: setShowingUserReport, showModal: showingUserReport });

  return (
    <>
      <Lightbox />
      <div
        ref={modalRef}
        className="max-w-[320px] sm:max-w-[500px] w-full min-h-[468px] flex flex-col gap-10 fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 | card"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold | title">{showingUserReport.name}</h2>
          <button onClick={() => setShowingUserReport(null)} className="cursor-pointer active:scale-[.99]">
            <img src="/images/exit.svg" alt="X" />
          </button>
        </div>

        <div className="flex flex-col gap-[14px]">
          <UserInfoLine naming="Телефон" namingValue={showingUserReport.phone} />
          <UserInfoLine naming="Почта" namingValue={showingUserReport.email} />
          <UserInfoLine naming="Дата приёма" namingValue={showingUserReport.hire_date} />
          <UserInfoLine naming="Должность" namingValue={showingUserReport.position_name} />
          <UserInfoLine naming="Подразделение" namingValue={showingUserReport.department} />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="title text-[18px]">Дополнительная информация:</h3>
          <p className="description text-4 leading-[18px]">
            Разработчики используют текст в качестве заполнителя макта страницы. Разработчики используют текст в
            качестве заполнителя макта страницы.
          </p>
        </div>
      </div>
    </>
  );
}

type UserInfoLineTypes = {
  naming: string;
  namingValue: string;
};

function UserInfoLine({ naming, namingValue }: UserInfoLineTypes) {
  return (
    <div className="flex sm:gap-[40px] sm:flex-row flex-col">
      <h3 className="sm:w-[27.4%] title text-[18px]">{naming}:</h3>
      <p className="grow sm:max-w-[64.6%] description text-4 self-start">{namingValue}</p>
    </div>
  );
}
