import { Fragment } from "react";
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
import { getLeagueYear } from "@/lib/actions/siteSettings.actions";

const MONTHS = [
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
] as const;

const EventSchedule = async () => {
  // Uncomment for delay to test suspense layout
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const [{ data: eventSchedule }, leagueYearResult] = await Promise.all([
    getEventSchedule(),
    getLeagueYear(),
  ]);

  const leagueYear = leagueYearResult.success
    ? leagueYearResult.data
    : new Date().getFullYear();

  const monthsWithEvents = eventSchedule
    ? MONTHS.filter((m) => eventSchedule[m].length > 0)
    : [];

  const title = (
    <h3 className="text-2xl font-bold text-white">
      {leagueYear} BPGC Schedule
    </h3>
  );

  if (!eventSchedule || monthsWithEvents.length === 0) {
    return (
      <>
        {title}
        <h3 className="text-4xl font-black tracking-[0.2em] text-center mb-4 text-yellow-300">
          No events scheduled yet...
        </h3>
        <h4 className="text-2xl font-extrabold text-[rgb(247,154,14)]">
          Check back soon!
        </h4>
      </>
    );
  }

  return (
    <>
      {title}
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
          {monthsWithEvents.map((month, i) => (
            <Fragment key={month}>
              {/* spacer row between months, but not before the first */}
              {i > 0 && (
                <TableRow className="border-none">
                  <TableCell className="p-0">
                    <br />
                  </TableCell>
                </TableRow>
              )}
              <EventScheduleMonths events={eventSchedule[month]} />
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default EventSchedule;
