"use-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/components/shared/logo";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items items-center justify-center min-h-screen">
      <Logo />
      <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4"> Not Found</h1>
        <p className="text-destructive">Could not find the requested page!</p>
        <Button variant="outline" className="mt-4 ml-2" asChild>
          <Link href="/">Back Home &#10548;</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
