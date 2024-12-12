import { DefaultResponseType } from "@/types/common.type";
import { DateUtil } from "@/utils";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import "./style.scss";

export default function DetailTab({
  loanListResponse,
}: {
  loanListResponse: DefaultResponseType;
}) {
  return (
    <div className="loan-list-page__detail-tab-container">
      <Table aria-label="Total table" isStriped className="">
        <TableHeader>
          <TableColumn width={75}>NO.</TableColumn>
          <TableColumn width={75}>DAY</TableColumn>
          <TableColumn width={120}>COST</TableColumn>
          <TableColumn width={200}>DEBTOR</TableColumn>
          <TableColumn>ITEM</TableColumn>
          <TableColumn width={120}>DONE</TableColumn>
          <TableColumn width={75}>5500</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No loan to display."}>
          {loanListResponse.data?.map((item: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {DateUtil.formatDate(item.triggerDate, "DD-MM")}
              </TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.userLoan.name}</TableCell>
              <TableCell>{item.content}</TableCell>
              <TableCell>
                <Chip className={item.isDebt ? "error-bg text-white" : "warning-bg text-white"}>
                  {item.isDebt ? "Borrowed" : "Lent"}
                </Chip>
              </TableCell>
              <TableCell>{""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
