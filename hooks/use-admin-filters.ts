"use client";
import { ADMIN_FILTERS } from "@/lib/admin-filters";
import { usePathname } from "next/navigation";
export const useAdminFilters = () => {
  const pathname = usePathname();
  return ADMIN_FILTERS[pathname] ?? [];
};
