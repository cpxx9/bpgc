import CredentialsSignInForm from "@/app/(auth)/sign-in/credentials-signin-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sign in",
};

interface PropTypes {
  searchParams: Promise<{ callbackUrl: string }>;
}

const SignInPage = async ({ searchParams }: PropTypes) => {
  const { callbackUrl } = await searchParams;

  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Logo />
          </Link>
          <CardTitle className="text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-x-4">
          <CredentialsSignInForm />
        </CardContent>
        <CardFooter className="flex-center space-y-4">
          <Button variant="outline" asChild>
            <Link href="/">Back Home &#10548;</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;
