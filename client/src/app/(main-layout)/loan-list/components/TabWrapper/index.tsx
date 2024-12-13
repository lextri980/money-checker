"use client";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { DefaultResponseType } from "@/types/common.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tab, Tabs } from "@nextui-org/react";
import { Key } from "@react-types/shared";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DetailTab from "../DetailTab";
import TotalTab from "../TotalTab";
import { schema } from "./schema";
import "./style.scss";

export default function TabWrapper({
  loanListResponse,
}: {
  loanListResponse: DefaultResponseType;
}) {
  const [selectedTab, setSelectedTab] = useState<Key>("detail");
  const { control } = useForm({ resolver: yupResolver(schema) });

  /**
   * Handle change tab
   * @param key - Key of tab
   */
  const handleChangeTab = (key: Key) => {
    setSelectedTab(key);
  };

  return (
    <div className="loan-list-page__tab-wrapper-container">
      <div className="search-section">
        <FormInput
          control={control}
          name="search"
          placeholder="Search your name"
          className="w-6/12"
          variant="bordered"
        />
        <Button className="black-bg">Search</Button>
      </div>
      <Tabs
        aria-label="Options"
        size="lg"
        selectedKey={selectedTab}
        onSelectionChange={handleChangeTab}
      >
        <Tab key="total" title="Total">
          <TotalTab />
        </Tab>
        <Tab key="detail" title="Detail">
          <DetailTab loanListResponse={loanListResponse} />
        </Tab>
      </Tabs>
    </div>
  );
}
