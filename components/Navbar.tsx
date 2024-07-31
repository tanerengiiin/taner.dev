"use client";
import { ArrowTopLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { useNavbar } from "./navbar-context";
import { usePathname } from "next/navigation";
import { generateId } from "@/lib/utils";
const Navbar = () => {
  const pathname = usePathname();
  const { backTo, navs } = useNavbar();

  if (pathname === "/" || !backTo?.title || !backTo?.to) return null;

  const handleClickTitle = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const dataId = target.getAttribute("data-id");

    if (dataId) {
      const targetElement = document.getElementById(dataId);

      const offsetPosition = targetElement
        ? targetElement.getBoundingClientRect().top + window.pageYOffset - 160
        : 0;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <nav className="relative flex flex-col gap-4">
      <Link
        href={backTo.to}
        className="text-neutral-700 inline-flex items-center gap-1.5 italic font-serif"
      >
        <span>
          <ArrowTopLeftIcon className="w-4 h-4" />
        </span>
        <span className="">{backTo.title}</span>
      </Link>
      {navs && (
        <ul className="absolute top-16 left-2 hidden lg:flex flex-col gap-2.5">
          {navs.map((item, index) => (
            <li
              key={index}
              data-id={generateId(item.content)}
              onClick={(e) => handleClickTitle(e)}
              className="text-sm text-neutral-800 leading-tight cursor-pointer opacity-50 hover:opacity-100 transition-all"
            >
              {item.content}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
