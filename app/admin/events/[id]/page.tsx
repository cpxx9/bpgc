import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getEventById } from "@/lib/actions/event.actions";
import { getAllGolfersList } from "@/lib/actions/golfer.actions";
import { requireAdmin } from "@/lib/auth-guard";
import Link from "next/link";

interface PropTypes {
  params: Promise<{ id: string }>;
}

const EventInfo = async ({ params }: PropTypes) => {
  await requireAdmin();
  const { id } = await params;
  const { event } = await getEventById(id);
  const { data: golfers } = await getAllGolfersList();
  console.log(golfers);
  return (
    <div className="flex flex-col gap-3">
      <header className="flex justify-between">
        <h1 className="h2-bold">Event Info</h1>
        <Button asChild>
          <Link href={`/admin/events/${id}/edit`}>Update Event Details</Link>
        </Button>
      </header>
      <section>
        <Card>
          <CardHeader>
            <CardTitle>{event.location}</CardTitle>
          </CardHeader>
        </Card>
      </section>
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Golfers</CardTitle>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
};

export default EventInfo;
