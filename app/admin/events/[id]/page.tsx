import { requireAdmin } from "@/lib/auth-guard";
import Link from "next/link";

interface PropTypes {
  params: Promise<{ id: string }>;
}

const EventInfo = async ({ params }: PropTypes) => {
  await requireAdmin();
  const { id } = await params;
  return (
    <div>
      <div>EventInfo</div>
      <Link href={`/admin/events/${id}/edit`}>Update Event Details</Link>
    </div>
  );
};

export default EventInfo;
