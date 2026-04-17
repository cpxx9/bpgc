import CreateScoreForm from "@/components/admin/create-score-form";
import CreateScoreFormSection from "@/components/admin/create-score-form-section";
import EventScoreWinners from "@/components/admin/event-score-winners";
import UpdateScoreForm from "@/components/admin/update-score-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEventById } from "@/lib/actions/event.actions";
import { getAllGolfersWithEventScoreList } from "@/lib/actions/golfer.actions";
import { requireAdmin } from "@/lib/auth-guard";
import { GolferWithScores } from "@/types";
import Link from "next/link";

interface PropTypes {
  params: Promise<{ id: string }>;
}

const EventInfo = async ({ params }: PropTypes) => {
  await requireAdmin();
  const { id } = await params;
  const { event } = await getEventById(id);
  const { data: golfers } = await getAllGolfersWithEventScoreList(id);
  return (
    <div className="flex flex-col gap-3">
      <header className="flex justify-between">
        <h1 className="h2-bold">Event Info</h1>
        <Button asChild>
          <Link href={`/admin/events/${id}/edit`}>Update Event Details</Link>
        </Button>
      </header>
      <section className="flex gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>{event.location}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Week: {event.leagueWeek}</p>
            {event.isTwoManMatch ? (
              <Badge variant="default">Two Man Match</Badge>
            ) : (
              <Badge variant="secondary">Off Week</Badge>
            )}
            <p>{event.description}</p>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Contests</CardTitle>
          </CardHeader>
          <CardContent>
            <EventScoreWinners eventId={id} />
          </CardContent>
        </Card>
      </section>
      <section>
        <CreateScoreFormSection id={id} golfers={golfers} />
      </section>
    </div>
  );
};

export default EventInfo;
