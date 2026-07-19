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
  // Uncomment for delay to test suspense layout
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  let { data: eventSchedule } = await getEventSchedule();
  if (!eventSchedule) {
    eventSchedule = {
      april: [],
      may: [],
      june: [],
      july: [],
      august: [],
      september: [],
      october: [],
    } as {
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
    <Table className="table-fixed mt-4 md:table-auto">
      <TableHeader className="border-none">
        <TableRow className="border-none flex gap-5">
          <TableHead className="hidden"></TableHead>
          <TableHead className="hidden"></TableHead>
          <TableHead className="hidden"></TableHead>
          <TableHead className="hidden"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <EventScheduleMonths events={eventSchedule?.april} />
        <TableRow className="border-none">
          <TableCell className="p-0">
            <br />
          </TableCell>
        </TableRow>
        <EventScheduleMonths events={eventSchedule?.may} />
        <TableRow className="border-none">
          <TableCell className="p-0">
            <br />
          </TableCell>
        </TableRow>
        <EventScheduleMonths events={eventSchedule?.june} />
        <TableRow className="border-none">
          <TableCell className="p-0">
            <br />
          </TableCell>
        </TableRow>
        <EventScheduleMonths events={eventSchedule?.july} />
        <TableRow className="border-none">
          <TableCell className="p-0">
            <br />
          </TableCell>
        </TableRow>
        <EventScheduleMonths events={eventSchedule?.august} />
        <TableRow className="border-none">
          <TableCell className="p-0">
            <br />
          </TableCell>
        </TableRow>
        <EventScheduleMonths events={eventSchedule?.september} />
        <TableRow className="border-none">
          <TableCell className="p-0">
            <br />
          </TableCell>
        </TableRow>
        <EventScheduleMonths events={eventSchedule?.october} />
      </TableBody>
    </Table>
  );
};

export default EventSchedule;
