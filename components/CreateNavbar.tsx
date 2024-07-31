"use client";
import React, { useEffect } from "react";
import { BackTo, Nav, useNavbar } from "./navbar-context";

type CreateNavbarProps = {
  backTo?: BackTo;
  navs?: Nav[];
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
