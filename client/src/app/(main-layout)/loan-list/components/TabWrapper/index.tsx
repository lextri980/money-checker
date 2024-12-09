"use client";
import FormInput from "@/components/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tab, Tabs } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import DetailTab from "../DetailTab";
import TotalTab from "../TotalTab";
import { schema } from "./schema";
import "./style.scss";
import Button from "@/components/Button";

export default function TabWrapper() {
  const { control } = useForm({ resolver: yupResolver(schema) });

  return (
    <div className="loan-list-page__tab-wrapper-container">
      <div className="search-section">
        <FormInput
          control={control}
          name="search"
          placeholder="Search your name"
          className="w-6/12"
        />
        <Button className="black-bg">Search</Button>
      </div>
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
