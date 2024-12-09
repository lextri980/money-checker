"use client";
import { Tab, Tabs } from "@nextui-org/react";
import React from "react";
import TotalTab from "../TotalTab";
import DetailTab from "../DetailTab";

export default function TabWrapper() {
  return (
    <div>
      <Tabs aria-label="Options" size="lg">
        <Tab key="total" title="Total">
          <TotalTab />
        </Tab>
        <Tab key="detail" title="Detail">
          <DetailTab />
        </Tab>
      </Tabs>
    </div>
  );
}
