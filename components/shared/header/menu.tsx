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
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            <UserButton />
            <Links />
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
