import { requireAdmin } from "@/lib/auth-guard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Users",
};

interface PropTypes {
  searchParams: Promise<{ page: string }>;
}

const AdminGolfersPage = async ({ searchParams }: PropTypes) => {
  await requireAdmin();

  return (
    <div>
      <div></div>
    </div>
  );
};

export default AdminGolfersPage;
