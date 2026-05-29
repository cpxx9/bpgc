"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";
import React, { useEffect, useMemo, useState } from "react";

const links = [
  { title: "HOME", href: "/" },
  { title: "ABOUT", href: "/about" },
  { title: "SCHEDULE", href: "/schedule" },
  {
    title: "SCORING INFO",
    href: "/scoring-info",
    links: [
      { title: "WEEKLY SCORES", href: "/scoring-info/weekly-scores" },
      { title: "SCORING AVERAGES", href: "/scoring-info/scoring-averages" },
    ],
  },
  {
    title: "EVENTS",
    href: "/events",
    links: [
      { title: "TWO MAN LEAGUE", href: "/events/two-man-league" },
      { title: "CLUB CHAMPIONSHIP", href: "/events/club-championship" },
    ],
  },
  { title: "CONTESTS", href: "/contests" },
  { title: "GALLERY", href: "/gallery" },
];

interface PropTypes {
  withSheetClose?: boolean;
}

const Links = ({ withSheetClose = false }: PropTypes) => {
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const startCloseTimer = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 1500); // 👈 adjust (ms)
  };

  const cancelCloseTimer = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const closeMenus = () => setOpenMenu(null);
  const toggleMenu = (key: string) =>
    setOpenMenu((prev) => (prev === key ? null : key));

  const [SheetCloseWrapper, sheetCloseWrapperProps] = withSheetClose
    ? [SheetClose, { asChild: true }]
    : [React.Fragment, {}];

  const pathnameRaw = usePathname();
  let pathname = usePathname();
  pathname = pathname.slice(1);
  if (pathname.length < 1) pathname = "home";
  if (pathname.includes("-")) {
    const pathnameSplit = pathname.split("-");
    pathname = pathnameSplit.join(" ");
  }

  useEffect(() => {
    closeMenus();
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
          <div
            key={link.href}
            className="flex flex-col relative gap-3 md:gap-0"
            onMouseEnter={() => {
              if (isDesktop) {
                cancelCloseTimer();
                setOpenMenu(link.href);
              }
            }}
            onMouseLeave={() => {
              if (isDesktop) {
                startCloseTimer();
              }
            }}
          >
            <Button
              className="p-2 justify-center"
              variant={
                pathname.includes(link.title.toLowerCase())
                  ? "default"
                  : "ghost"
              }
              onClick={() => {
                if (!isDesktop) toggleMenu(link.href);
              }}
            >
              <span
                className={cn(
                  "transition-transform md:hidden",
                  openMenu === link.href && "rotate-180",
                )}
              >
                {openMenu === link.href ? "-" : "+"}
              </span>{" "}
              {link.title}
            </Button>

            {openMenu === link.href && (
              <div
                className={cn(
                  "flex flex-col gap-2 bg-white",
                  "md:gap-0 md:mt-1 md:absolute md:top-full md:left-1/2 md:-translate-x-1/2 md:z-50",
                )}
                onMouseEnter={() => {
                  if (isDesktop) cancelCloseTimer();
                }}
                onMouseLeave={() => {
                  if (isDesktop) startCloseTimer();
                }}
              >
                {link.links.map((sublink) => (
                  <SheetCloseWrapper
                    {...sheetCloseWrapperProps}
                    key={sublink.href}
                  >
                    <Button
                      className="p-1 px-2 justify-center"
                      asChild
                      variant={
                        pathname.includes(sublink.title.toLowerCase())
                          ? "default"
                          : "ghost"
                      }
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
              className="p-2 justify-center"
              asChild
              variant={
                link.title.toLowerCase().includes(pathname)
                  ? "default"
                  : "ghost"
              }
              onClick={closeMenus}
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
