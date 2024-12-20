import { FetchService } from "@/services";
import { cookies } from "next/headers";
import TabWrapper from "./components/TabWrapper";
import "./style.scss";

export default async function LoanList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cookie = cookies();
  const userInfo = cookie.get("userInfo")?.value
    ? JSON.parse(cookie.get("userInfo")?.value ?? "{}")
    : null;
  const inSession = cookie.get("inSession")?.value;

  const loanListResponse = await FetchService.fetch(
    `/loan/list?userId=${inSession ? userInfo.userId : searchParams.userId}`
  );

  return (
    <div className="loan-list-container">
      <TabWrapper loanListResponse={loanListResponse} />
    </div>
  );
}
