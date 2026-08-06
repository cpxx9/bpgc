"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterConfig } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ALL = "all";

const AdminFilter = ({
  filter,
  className = "w=[150px]",
}: {
  filter: FilterConfig;
  className?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = searchParams.get(filter.name) ?? ALL;

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === ALL) params.delete(filter.name);
    else params.set(filter.name, value);
    params.delete("page");
    router.push(`${pathname}?${params}`);
  };

  return (
    <Select value={current} onValueChange={handleChange}>
      <SelectTrigger className={`${className} h-9`} aria-label={filter.label}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>{filter.label}</SelectItem>
        {filter.options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AdminFilter;
