import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGolferById } from "@/lib/actions/golfer.actions";
import UpdateGolferForm from "@/components/admin/update-golfer-form";
import { requireAdmin } from "@/lib/auth-guard";

export const metadata: Metadata = {
  title: "Update Golfer",
};

interface PropTypes {
  params: Promise<{ id: string }>;
}

const AdminGolferUpdatePage = async ({ params }: PropTypes) => {
  await requireAdmin();
  const { id } = await params;

  const golfer = await getGolferById(id);

  if (!golfer) notFound();

  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <h1 className="h2-bold">
        Update golfer <span className="text-sm">({id})</span>
      </h1>
      <UpdateGolferForm golfer={golfer} />
    </div>
  );
};

export default AdminGolferUpdatePage;
