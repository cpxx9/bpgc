"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AdminSearch = () => {
  const pathname = usePathname();
  const formActionUrl = pathname.includes("/admin/users")
    ? "/admin/users"
    : pathname.includes("/admin/golfers")
      ? "/admin/golfers"
      : "/admin/overview";

  const searchParams = useSearchParams();
  const [queryValue, setQueryValue] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setQueryValue(searchParams.get("q") || "");
  }, [searchParams]);

  return (
    <form action={formActionUrl} method="GET">
      <Input
        type="search"
        placeholder="Search..."
        name="q"
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
        className="md:w-[100px] lg:w-[300px]"
      />
      <button type="submit" className="sr-only">
        Search
      </button>
    </form>
  );
};

export default AdminSearch;
