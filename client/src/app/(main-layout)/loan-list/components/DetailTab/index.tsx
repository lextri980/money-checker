"use client";
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
import { RootState } from "@store";
import { useSelector } from "react-redux";
import "./style.scss";

export default function DetailTab() {
  const { loanList } = useSelector((state: RootState) => state.loan);

  const totalCost = loanList?.reduce(
    (acc: number, item: any) => acc + item.amount,
    0
  );

  return (
    <div className="loan-list-page__detail-tab-container">
      <Table
        className="table-container detail-loan-table"
        aria-label="Total table"
        isStriped
        isHeaderSticky
      >
        <TableHeader>
          <TableColumn width={75}>NO.</TableColumn>
          <TableColumn width={75}>DAY</TableColumn>
          <TableColumn width={120}>COST</TableColumn>
          <TableColumn width={200}>DEBTOR</TableColumn>
          <TableColumn>ITEM</TableColumn>
          <TableColumn width={120}>DONE</TableColumn>
          <TableColumn key="total-cost" width={75}>
            {totalCost}
          </TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No loan to display."}>
          {loanList?.map((item: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {DateUtil.formatDate(item.triggerDate, "DD-MM")}
              </TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.userLoan.name}</TableCell>
              <TableCell>{item.content}</TableCell>
              <TableCell>
                <Chip
                  className={`${
                    item.isDebt
                      ? "error-bg text-white"
                      : "warning-bg text-white"
                  } chip-width`}
                >
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
