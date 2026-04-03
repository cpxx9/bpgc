import EventScoreWinners from "@/components/admin/event-score-winners";
import UpdateScoreForm from "@/components/admin/update-score-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEventById } from "@/lib/actions/event.actions";
import {
  getAllGolfersList,
  getAllGolfersWithEventScoreList,
} from "@/lib/actions/golfer.actions";
import { requireAdmin } from "@/lib/auth-guard";
import Link from "next/link";

interface PropTypes {
  params: Promise<{ id: string }>;
}

const EventInfo = async ({ params }: PropTypes) => {
  await requireAdmin();
  const { id } = await params;
  const { event } = await getEventById(id);
  const { data: golfers } = await getAllGolfersWithEventScoreList(id);
  console.log(golfers);
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
        <Card>
          <CardHeader>
            <CardTitle>Scores</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col">
            {golfers?.map((golfer) => (
              <div
                key={golfer.id}
                className="flex items-center justify-between border-t-2 pt-2 pb-2"
              >
                <h4>{`${golfer.firstName} ${golfer.lastName}`}</h4>
                {golfer.scores.length > 0 ? (
                  <UpdateScoreForm score={golfer.scores[0]} />
                ) : (
                  <div>test</div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default EventInfo;
