import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

export default function TotalTab() {
  const itemTable = [
    {
      id: "1sadfdfdsf",
      name: "A",
      paid: 0,
      total: 100,
    },
    {
      id: "asudhasuihd",
      name: "B",
      paid: 0,
      total: 150,
    },
    {
      id: "asudhasuihd",
      name: "C",
      paid: 0,
      total: 120,
    },
  ];
  return (
    <div className="total-tab-page-component">
      <Table aria-label="Total table" isStriped>
        <TableHeader>
          <TableColumn width={75}>NO.</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>PAID</TableColumn>
          <TableColumn>TOTAL</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No datas to display."}>
          {itemTable?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.paid}</TableCell>
              <TableCell>{item.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
