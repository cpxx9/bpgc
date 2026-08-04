"use client";

import { Input } from "@/components/ui/input";
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
  );
};

export default AdminSearch;
