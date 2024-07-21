"use client";
import { ArrowTopLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useNavbar } from "./navbar-context";
import { usePathname } from "next/navigation";
import { generateId } from "@/lib/utils";
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
      {/* <ul>
        {navsObject?.map((item, index) => (
          <li key={index}>
            <Link href={item.id} className="">
              {item.title}
            </Link>
          </li>
        ))}
      </ul> */}
    </nav>
  );
};

export default Navbar;
