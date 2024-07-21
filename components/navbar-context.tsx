"use client"
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface NavbarContextProps {
  backTo: {
    title: string;
    to: string;
  };
  navs: string[];
  changeNavs: (backTo?: { title: string; to: string }, navs?: string[]) => void;
}

const defaultContext: NavbarContextProps = {
  backTo: {
    title: "Index",
    to: "/",
  },
  navs: [],
  changeNavs: () => {},
};

const NavbarContext = createContext<NavbarContextProps>(defaultContext);

const NavbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [navs, setNavs] = useState<string[]>(defaultContext.navs);
  const [backTo, setBackTo] = useState<{ title: string; to: string }>(
    defaultContext.backTo
  );

  const changeNavs = (
    newBackTo?: { title: string; to: string },
    newNavs?: string[]
  ) => {
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

export { NavbarProvider, useNavbar };
