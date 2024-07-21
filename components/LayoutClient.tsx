"use client";
import React from "react";
import { NavbarProvider } from "./navbar-context";
export default function LayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <NavbarProvider>{children}</NavbarProvider>;
}
