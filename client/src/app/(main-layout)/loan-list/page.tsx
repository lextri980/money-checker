import { FetchService } from "@/services";
import TabWrapper from "./components/TabWrapper";
import "./style.scss";

export default async function LoanList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const loanListResponse = await FetchService.fetch(
    `/loan/list?userId=${searchParams.userId}`
  );

  return (
    <div className="loan-list-container">
      <TabWrapper loanListResponse={loanListResponse} />
    </div>
  );
}
