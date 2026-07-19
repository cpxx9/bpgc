import { TableRow, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Event } from "@/types";

interface PropTypes {
  events: Event[];
}

const EventScheduleMonths = ({ events }: PropTypes) => {
  return (
    <>
      {events.map((event) => {
        const month = event.date.toLocaleDateString("en-US", {
          month: "long",
          timeZone: "UTC",
        });
        const day = event.date.toLocaleDateString("en-US", {
          day: "2-digit",
          timeZone: "UTC",
        });
        return (
          <TableRow
            className={cn(
              "border-none text-white",
              `${!event.isTwoManMatch && !event.isChampionship ? "text-blue-600" : ""}`,
              `${event.isChampionship && !event.isTwoManMatch ? "text-orange-500" : ""}`,
              `${event.date < new Date() ? "text-gray-400" : ""}`,
            )}
            key={event.id}
          >
            <TableCell className="text-[1.11em] md:font-semibold py-0 px-0 md:text-lg md:pl-0 md:pr-4">
              {month} {day}
              {`${event.isTwoManMatch && event.isChampionship ? "*" : ""}`}
            </TableCell>
            <TableCell className="text-[1.1em] md:font-semibold py-0 px-0 md:px-5 md:text-lg">
              {event.time.toLocaleTimeString("en-US", { timeZone: "EST" })}
            </TableCell>
            <TableCell className="text-[1.1em] md:font-semibold py-0 px-0 md:px-5 md:text-lg">
              {event.location}
            </TableCell>
            <TableCell className="hidden text-[1.1em] md:font-semibold py-0 px-0 md:pr-5 md:pl-8 md:table-cell md:text-lg">
              {event.description}
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default EventScheduleMonths;
