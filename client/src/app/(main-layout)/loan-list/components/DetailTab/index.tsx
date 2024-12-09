import React from "react";
import "./style.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export default function DetailTab() {
  const itemTable = [
    {
      id: "1sadfdfdsf",
      name: "A",
      count: 0,
      outstandingDebt: 0,
      paid: 0,
      total: 100,
    },
    {
      id: "asudhasuihd",
      name: "B",
      count: 0,
      outstandingDebt: 0,
      paid: 0,
      total: 150,
    },
    {
      id: "asudhasuihd",
      name: "C",
      count: 0,
      outstandingDebt: 0,
      paid: 0,
      total: 120,
    },
  ];

  return (
    <div className="loan-list-page__detail-tab-container">
      <Table aria-label="Total table" isStriped className="">
        <TableHeader>
          <TableColumn width={75}>DAY</TableColumn>
          <TableColumn width={120}>COST</TableColumn>
          <TableColumn width={200}>DEBTOR</TableColumn>
          <TableColumn>ITEM</TableColumn>
          <TableColumn width={120}>CHECK</TableColumn>
          <TableColumn width={75}>5500</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No datas to display."}>
          {itemTable?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.count}</TableCell>
              <TableCell>{item.outstandingDebt}</TableCell>
              <TableCell>{item.paid}</TableCell>
              <TableCell>{""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
