import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getEventById } from "@/lib/actions/event.actions";
import { requireAdmin } from "@/lib/auth-guard";
import Link from "next/link";

interface PropTypes {
  params: Promise<{ id: string }>;
}

const EventInfo = async ({ params }: PropTypes) => {
  await requireAdmin();
  const { id } = await params;
  const { event } = await getEventById(id);
  return (
    <div className="flex flex-col gap-3">
      <header className="flex justify-between">
        <h1 className="h2-bold">Event Info</h1>
        <Link className="" href={`/admin/events/${id}/edit`}>
          <Button asChild>
            <h3>Update Event Details</h3>
          </Button>
        </Link>
      </header>
      <section>
        <Card>
          <CardHeader>
            <CardTitle>{event.location}</CardTitle>
          </CardHeader>
        </Card>
      </section>
      <section></section>
    </div>
  );
};

export default EventInfo;
