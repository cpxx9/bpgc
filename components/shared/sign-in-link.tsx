"use client";

import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SignInLink = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading" || session) return null;

  const href = `/sign-in?callbackUrl=${encodeURIComponent(pathname)}`;

  if (!session) {
    return (
      <Button asChild>
        <Link href={href}>
          <UserIcon /> Sign in
        </Link>
      </Button>
    );
  }
};

export default SignInLink;
