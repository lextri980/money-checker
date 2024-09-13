"use client";
import { AuthLayout } from "@/layouts";
import React from "react";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
