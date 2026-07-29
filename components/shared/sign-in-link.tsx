"use client";

import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const SignInLink = () => {
  const { data: session, status } = useSession();

  if (status === "loading" || session) return null;

  if (!session) {
    return (
      <Button asChild>
        <Link href="/sign-in">
          <UserIcon /> Sign in
        </Link>
      </Button>
    );
  }
};

export default SignInLink;
