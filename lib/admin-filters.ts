import { FilterConfig } from "@/types";

const LEAGUE_START_YEAR = 2024;

const yearOptions = () => {
  const now = new Date().getFullYear();
  const years: { value: string; label: string }[] = [];
  for (let y = now; y >= LEAGUE_START_YEAR; y--) {
    years.push({ value: String(y), label: String(y) });
  }
  return years;
};

const YES_NO = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

export const ADMIN_FILTERS: Record<string, FilterConfig[]> = {
  "/admin/users": [
    {
      name: "role",
      label: "All roles",
      options: [
        { value: "admin", label: "Admin" },
        { value: "user", label: "User" },
      ],
    },
  ],
  "/admin/golfers": [
    {
      name: "status",
      label: "All statuses",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  ],
  "/admin/two-man-teams": [
    {
      name: "status",
      label: "All statuses",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Disbanded" },
      ],
    },
  ],
  "/admin/events": [
    { name: "year", label: "All years", options: yearOptions() },
    { name: "twoman", label: "Two man match?", options: YES_NO },
    { name: "championship", label: "Championship?", options: YES_NO },
  ],
  "/admin/gallery": [
    {
      name: "displayed",
      label: "All images",
      options: [
        { value: "true", label: "Displayed" },
        { value: "false", label: "Not displayed" },
      ],
    },
    {
      name: "usage",
      label: "All usages",
      options: [
        { value: "used", label: "In use" },
        { value: "unused", label: "Not in use" },
      ],
    },
  ],
};
