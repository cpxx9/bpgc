"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AdminSearch = ({
  placeholder = "Search...",
}: {
  placeholder?: string;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [queryValue, setQueryValue] = useState(q);

  useEffect(() => {
    setQueryValue(q);
  }, [q]);

  return (
    <div className="flex items-center gap-2">
      <form action={pathname} method="GET">
        <Input
          type="search"
          placeholder={placeholder}
          name="q"
          value={queryValue}
          onChange={(e) => setQueryValue(e.target.value)}
          className="md:w-[100px] lg:w-[300px]"
        />
        <button type="submit" className="sr-only">
          Search
        </button>
      </form>
      {searchParams.get("q") ? (
        <Button asChild variant="outline" size="sm">
          <Link href={pathname}>Reset</Link>
        </Button>
      ) : null}
    </div>
  );
};

export default AdminSearch;
