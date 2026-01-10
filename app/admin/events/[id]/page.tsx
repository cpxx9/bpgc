import { Metadata } from "next";
import { notFound } from "next/navigation";
import UpdateEventForm from "@/components/admin/update-event-form";
import { requireAdmin } from "@/lib/auth-guard";
import { getEventById } from "@/lib/actions/event.actions";

export const metadata: Metadata = {
  title: "Update Event",
};

interface PropTypes {
  params: Promise<{ id: string }>;
}

const AdminEventUpdatePage = async ({ params }: PropTypes) => {
  await requireAdmin();
  const { id } = await params;

  const event = await getEventById(id);
  console.log(event);

  if (!event) notFound();

  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <h1 className="h2-bold">
        Update event <span className="text-sm">({id})</span>
      </h1>
      <UpdateEventForm event={event} />
    </div>
  );
};

export default AdminEventUpdatePage;
