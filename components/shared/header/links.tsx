"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    links: [
      {
        title: "SCORING AVERAGES",
        href: "/scoring-info/scoring-averages",
      },
      {
        title: "WEEKLY SCORES",
        href: "/scoring-info/weekly-scores",
      },
    ],
  },
  {
    title: "EVENTS",
    href: "/events",
    links: [
      {
        title: "TWO MAN LEAGUE",
        href: "/events/two-man-league",
      },
      {
        title: "CLUB CHAMPIONSHIP",
        href: "/events/club-championship",
      },
    ],
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
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (key: string) => {
    setOpenMenus({ [key]: !openMenus[key] });
  };

  const closeMenus = () => {
    setOpenMenus({});
  };

  const [SheetCloseWrapper, sheetCloseWrapperProps] = withSheetClose
    ? [SheetClose, { asChild: true }]
    : [React.Fragment, {}];

  const pathnameRaw = usePathname();
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

  useEffect(() => {
    setOpenMenus({});
  }, [pathnameRaw]);

  return (
    <div
      className={
        pathname.includes("admin")
          ? "hidden"
          : "mx-auto flex gap-2 flex-col md:flex-row"
      }
    >
      {links.map((link) =>
        link.links ? (
          <div key={link.href} className="flex flex-col relative">
            <Button
              className="p-2 justify-start"
              variant={
                pathname.includes(link.title.toLowerCase())
                  ? "default"
                  : "ghost"
              }
              onClick={() => toggleMenu(link.href)}
            >
              <span
                className={cn(
                  "transition-transform",
                  openMenus[link.href] && "rotate-180",
                )}
              >
                {openMenus[link.href] ? "-" : "+"}
              </span>{" "}
              {link.title}
            </Button>

            {openMenus[link.href] && (
              <div className="flex flex-col bg-white md:absolute top-10">
                {link.links.map((sublink) => (
                  <SheetCloseWrapper
                    {...sheetCloseWrapperProps}
                    key={sublink.href}
                  >
                    <Button
                      className="p-1 justify-start"
                      asChild
                      variant="ghost"
                      onClick={closeMenus}
                    >
                      <Link className="h-auto" href={sublink.href}>
                        {sublink.title}
                      </Link>
                    </Button>
                  </SheetCloseWrapper>
                ))}
              </div>
            )}
          </div>
        ) : (
          <SheetCloseWrapper {...sheetCloseWrapperProps} key={link.href}>
            <Button
              className="p-2 justify-start"
              asChild
              variant={
                link.title.toLowerCase().includes(pathname)
                  ? "default"
                  : "ghost"
              }
            >
              <Link href={link.href}>{link.title}</Link>
            </Button>
          </SheetCloseWrapper>
        ),
      )}
    </div>
  );
};

export default Links;
