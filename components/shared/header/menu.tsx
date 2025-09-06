import Links from "@/components/shared/header/links";
import ModeToggle from "@/components/shared/header/ModeToggle";
import UserButton from "@/components/shared/header/user-button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { APP_NAME } from "@/lib/constants";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

const Menu = () => {
  return (
    <div className="flex gap-3">
      <nav className="hidden md:flex w-full gap-1">
        <ModeToggle />
        <Links />
        <UserButton />
      </nav>
      <nav className={"md:hidden"}>
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Beaver Point Golf Club</SheetTitle>
            <div className="flex self-stretch justify-between">
              <ModeToggle />
              <UserButton />
            </div>
            <Links />
            <SheetDescription className="flex-center flex-col">
              Est. 1989 | {APP_NAME}
              <span className="italic">
                Connecticut's First Golf Club Without Real Estate
              </span>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
