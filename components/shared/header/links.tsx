"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

const Links = () => {
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
        <Button
          key={link.href}
          className="p-2"
          asChild
          variant={
            link.title.toLowerCase().includes(pathname) ? "default" : "ghost"
          }
        >
          <Link href={link.href}>{link.title}</Link>
        </Button>
      ))}
    </div>
  );
};

export default Links;
