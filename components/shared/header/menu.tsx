import Links from "@/components/shared/header/links";
import ModeToggle from "@/components/shared/header/ModeToggle";
import UserButton from "@/components/shared/header/user-button";
import { Button } from "@/components/ui/button";
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
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            <UserButton />
            <Button className="p-2" asChild variant="ghost">
              <Link href="/home">HOME</Link>
            </Button>
            <Button className="p-2" asChild variant="ghost">
              <Link href="/about">ABOUT</Link>
            </Button>
            <Button className="p-2" asChild variant="ghost">
              <Link href="/schedule">SCHEDULE</Link>
            </Button>
            <Button className="p-2" asChild variant="ghost">
              <Link href="/scoring-info">SCORING INFO</Link>
            </Button>
            <Button className="p-2" asChild variant="ghost">
              <Link href="/events">EVENTS</Link>
            </Button>
            <Button className="p-2" asChild variant="ghost">
              <Link href="/contests">CONTESTS</Link>
            </Button>
            <Button className="p-2" asChild variant="ghost">
              <Link href="/gallery">GALLERY</Link>
            </Button>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
