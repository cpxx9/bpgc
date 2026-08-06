"use client";

import AdminFilter from "@/components/admin/admin-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminFilters } from "@/hooks/use-admin-filters";
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

  const filters = useAdminFilters();
  const size = searchParams.get("size");
  const hasActiveFilter = filters.some((f) => searchParams.get(f.name));
  const showReset = Boolean(q) || hasActiveFilter;
  const resetHref = size ? `${pathname}?size=${size}` : pathname;

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
        {size && <input type="hidden" name="size" value={size} />}
        {filters.map((f) => {
          const value = searchParams.get(f.name);
          return value ? (
            <input key={f.name} type="hidden" name={f.name} value={value} />
          ) : null;
        })}
        <button type="submit" className="sr-only">
          Search
        </button>
      </form>
      {filters.map((f) => (
        <AdminFilter key={f.name} filter={f} />
      ))}
      {showReset ? (
        <Button asChild variant="outline" size="sm">
          <Link href={resetHref}>Reset</Link>
        </Button>
      ) : null}
    </div>
  );
};

export default AdminSearch;
