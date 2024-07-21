"use client";
import { ArrowTopLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { useNavbar } from "./navbar-context";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();
  const { backTo, navs } = useNavbar();

  if (pathname === "/" || !backTo?.title || !backTo?.to) return null;
  return (
    <nav className="flex flex-col gap-4">
      <Link
        href={backTo.to}
        className="text-neutral-700 inline-flex items-center gap-1.5 italic font-serif"
      >
        <span>
          <ArrowTopLeftIcon className="w-4 h-4" />
        </span>
        <span className="">{backTo.title}</span>
      </Link>
    </nav>
  );
};

export default Navbar;
