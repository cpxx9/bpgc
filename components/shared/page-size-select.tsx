"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from "@/lib/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const STORAGE_KEY = "adminPageSize";

const PageSizeSelect = ({ pageSize }: { pageSize: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("size")) return;
    const stored = Number(window.localStorage.getItem(STORAGE_KEY));
    if (!stored || stored === PAGE_SIZE) return;
    if (!PAGE_SIZE_OPTIONS.includes(stored)) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("size", String(stored));
    router.replace(`${pathname}?${params}`);
  }, [searchParams, pathname, router]);

  const handleChange = (value: string) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("size", value);
    params.delete("page");
    router.push(`${pathname}?${params}`);
  };

  return (
    <Select value={String(pageSize)} onValueChange={handleChange}>
      <SelectTrigger
        className="max-w-[120px] h-8"
        aria-label="Results per page"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {PAGE_SIZE_OPTIONS.map((option) => (
          <SelectItem key={option} value={String(option)}>
            {option} / page
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PageSizeSelect;
