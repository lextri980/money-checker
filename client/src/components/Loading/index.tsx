"use client";
import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import { RootState } from "@store";

export default function Loading() {
  const { isGlobalLoading } = useSelector((state: RootState) => state.common);

  return (
    isGlobalLoading && (
      <div className="component_loading-container">
        <div className="loader"></div>
      </div>
    )
  );
}
