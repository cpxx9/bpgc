import EventScheduleMonths from "@/components/schedule/event-schedule-months";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEventSchedule } from "@/lib/actions/event.actions";
import { cn } from "@/lib/utils";
import { Event } from "@/types";

const EventSchedule = async () => {
  let { data: eventSchedule } = await getEventSchedule();
  if (!eventSchedule) {
    eventSchedule = {} as {
      april: Event[];
      may: Event[];
      june: Event[];
      july: Event[];
      august: Event[];
      september: Event[];
      october: Event[];
    };
  }
  return (
    <Table>
      <TableHeader className="border-none">
        <TableRow className="border-none flex gap-5">
          <TableHead></TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <EventScheduleMonths events={eventSchedule?.april} />
        <EventScheduleMonths events={eventSchedule?.may} />
        <EventScheduleMonths events={eventSchedule?.june} />
        <EventScheduleMonths events={eventSchedule?.july} />
        <EventScheduleMonths events={eventSchedule?.august} />
        <EventScheduleMonths events={eventSchedule?.september} />
        <EventScheduleMonths events={eventSchedule?.october} />
      </TableBody>
    </Table>
  );
};

export default EventSchedule;
