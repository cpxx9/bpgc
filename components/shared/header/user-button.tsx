"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/user.actions";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading" || !session) {
    return null;
  }
  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-200 dark:text-gray-900"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium leading-none">
                {session.user?.name}
              </div>
              <div className="text-sm text-muted-foreground leading-none">
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Link className="w-full" href="/user/profile">
              Profile
            </Link>
          </DropdownMenuItem>
          {session?.user?.role === "admin" && (
            <DropdownMenuItem>
              <Link className="w-full" href="/admin/overview">
                Admin
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="p-0 mb-1"
            onSelect={(e) => {
              e.preventDefault();
              signOut({ redirectTo: "/" });
            }}
          >
            <Button
              className="w-full py-4 px-2 h-4 justify-start"
              variant="ghost"
            >
              Sign out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
