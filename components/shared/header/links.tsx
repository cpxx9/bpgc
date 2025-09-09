"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";
import React from "react";

const links = [
  {
    title: "HOME",
    href: "/",
  },
  {
    title: "ABOUT",
    href: "/about",
  },
  {
    title: "SCHEDULE",
    href: "/schedule",
  },
  {
    title: "SCORING INFO",
    href: "/scoring-info",
  },
  {
    title: "EVENTS",
    href: "/events",
  },
  {
    title: "CONTESTS",
    href: "/contests",
  },
  {
    title: "GALLERY",
    href: "/gallery",
  },
];

interface PropTypes {
  withSheetClose?: boolean;
}

const Links = ({ withSheetClose = false }: PropTypes) => {
  const [SheetCloseWrapper, sheetCloseWrapperProps] = withSheetClose
    ? [SheetClose, { asChild: true }]
    : [React.Fragment, {}];

  let pathname = usePathname();
  pathname = pathname.slice(1);
  if (pathname.length < 1) pathname = "home";
  if (pathname.includes("-")) {
    const pathnameSplit = pathname.split("-");
    pathnameSplit.forEach((word, i) => {
      if (i === 0) {
        pathname = word;
      } else {
        pathname = pathname + ` ${word}`;
      }
    });
  }

  return (
    <div
      className={
        pathname.includes("admin")
          ? "hidden"
          : "mx-auto flex gap-2 flex-col md:flex-row"
      }
    >
      {links.map((link) => (
        <SheetCloseWrapper {...sheetCloseWrapperProps} key={link.href}>
          <Button
            className="p-2"
            asChild
            variant={
              link.title.toLowerCase().includes(pathname) ? "default" : "ghost"
            }
          >
            <Link href={link.href}>{link.title}</Link>
          </Button>
        </SheetCloseWrapper>
      ))}
    </div>
  );
};

export default Links;
