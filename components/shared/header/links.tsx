"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
  if (pathname === "scoring-info") pathname = "scoring info";
  console.log(pathname);

  return (
    <>
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
    </>
  );
};

export default Links;
