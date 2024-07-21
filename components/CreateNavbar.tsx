"use client"
import React, { useEffect } from "react";
import { useNavbar } from "./navbar-context";

type CreateNavbarProps = {
  backTo?: {
    title: string;
    to: string;
  };
  navs?: string[];
};

const CreateNavbar = ({ backTo, navs }: CreateNavbarProps) => {
  const { changeNavs } = useNavbar();
  useEffect(() => {
    if (!changeNavs) return;
    changeNavs(backTo, navs);
  }, [backTo, changeNavs, navs]);
  return true;
};

export default CreateNavbar;
