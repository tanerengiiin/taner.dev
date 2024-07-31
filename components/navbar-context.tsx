"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface BackTo {
  title: string;
  to: string;
}

interface Nav {
  type: "title";
  content: string;
}
interface NavbarContextProps {
  backTo: BackTo;
  navs: Nav[] | null;
  changeNavs: (backTo?: BackTo, navs?: Nav[]) => void;
}

const defaultContext: NavbarContextProps = {
  backTo: {
    title: "Index",
    to: "/",
  },
  navs: null as Nav[] | null,
  changeNavs: () => {},
};

const NavbarContext = createContext<NavbarContextProps>(defaultContext);

const NavbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [navs, setNavs] = useState<Nav[] | null>(defaultContext.navs);
  const [backTo, setBackTo] = useState<BackTo>(defaultContext.backTo);

  const changeNavs = (newBackTo?: BackTo, newNavs?: Nav[]) => {
    setNavs(newNavs ?? defaultContext.navs);
    setBackTo(newBackTo ?? defaultContext.backTo);
  };

  return (
    <NavbarContext.Provider value={{ backTo, navs, changeNavs }}>
      {children}
    </NavbarContext.Provider>
  );
};

const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
};

export type {BackTo, Nav}
export { NavbarProvider, useNavbar };
