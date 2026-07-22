import { Metadata } from "next";
import { notFound } from "next/navigation";
import UpdateGolferForm from "@/components/admin/update-golfer-form";
import { requireAdmin } from "@/lib/auth-guard";
import { getImageById } from "@/lib/actions/image.actions";
import UpdateImageForm from "@/components/admin/update-image-form";

export const metadata: Metadata = {
  title: "Update Image",
};

interface PropTypes {
  params: Promise<{ id: string }>;
}

const AdminImageUpdatePage = async ({ params }: PropTypes) => {
  await requireAdmin();
  const { id } = await params;

  const image = await getImageById(id);

  if (!image.success) notFound();

  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <h1 className="h2-bold">
        Update image <span className="text-sm">({id})</span>
      </h1>
      <UpdateImageForm image={image.data} />
    </div>
  );
};

export default AdminImageUpdatePage;
