"use client";
import { AuthLayout } from '@/layouts';
import React, { Suspense } from "react";
import Loading from './loading';

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <AuthLayout>{children}</AuthLayout>
    </Suspense>
  );
}
