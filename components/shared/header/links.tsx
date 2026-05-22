"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";
import React from "react";
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
  onNavigate?: () => void;
}

const Links = ({ withSheetClose = false, onNavigate }: PropTypes) => {
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
      {links.map((link) =>
        link.links ? (
          <SheetCloseWrapper {...sheetCloseWrapperProps} key={link.href}>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  className="p-2"
                  variant={
                    pathname.includes(link.title.toLowerCase())
                      ? "default"
                      : "ghost"
                  }
                >
                  {link.title}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {link.links.map((sublink) => (
                  <DropdownMenuItem
                    asChild
                    key={sublink.href}
                    onSelect={() => onNavigate?.()}
                  >
                    <Button className="p-2" asChild variant="ghost">
                      <Link href={sublink.href}>{sublink.title}</Link>
                    </Button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SheetCloseWrapper>
        ) : (
          <SheetCloseWrapper {...sheetCloseWrapperProps} key={link.href}>
            <Button
              className="p-2"
              asChild
              variant={
                link.title.toLowerCase().includes(pathname)
                  ? "default"
                  : "ghost"
              }
            >
              <Link href={link.href} onClick={onNavigate}>
                {link.title}
              </Link>
            </Button>
          </SheetCloseWrapper>
        ),
      )}
    </div>
  );
};

export default Links;
