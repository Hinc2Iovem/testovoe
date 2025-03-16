import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../../consts/apiBaseUrl";
import { UsersReportType } from "../../../types/UsersReport";

type GetAllUserReportsTypes = {
  search?: string;
};

export default function useGetAllUserReports({ search }: GetAllUserReportsTypes) {
  return useQuery({
    queryKey: ["user-reports", search],
    queryFn: (): Promise<UsersReportType[]> => fetch(`${API_BASE_URL}?term=${search}`).then((r) => r.json()),
  });
}
