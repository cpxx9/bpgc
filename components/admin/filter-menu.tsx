"use client";

import AdminFilter from "@/components/admin/admin-filter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAdminFilters } from "@/hooks/use-admin-filters";
import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useAdminFilters();

  if (!filters.length) return null;

  const activeCount = filters.filter((f) => searchParams.get(f.name)).length;

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    filters.forEach((f) => params.delete(f.name));
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <Badge variant="secondary" className="ml-1 px-1.5">
              {activeCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        {filters.map((f) => (
          <AdminFilter key={f.name} filter={f} />
        ))}
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            Clear filters
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default FilterMenu;
