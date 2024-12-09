import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import "./style.scss";

export default function TotalTab() {
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
    <div className="loan-list-page__total-tab-container">
      <Table aria-label="Total table" isStriped className="">
        <TableHeader>
          <TableColumn width={75}>NO.</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn width={120}>COUNT</TableColumn>
          <TableColumn width={150}>OUTSTANDING DEBT</TableColumn>
          <TableColumn width={120}>PAID</TableColumn>
          <TableColumn width={120}>TOTAL</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No datas to display."}>
          {itemTable?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.count}</TableCell>
              <TableCell>{item.outstandingDebt}</TableCell>
              <TableCell>{item.paid}</TableCell>
              <TableCell>{item.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
