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
            <TableCell className="py-0 pl-0 pr-4 text-lg font-semibold">
              {month} {day}
              {`${event.isTwoManMatch && event.isChampionship ? "*" : ""}`}
            </TableCell>
            <TableCell className="py-0 px-5 text-lg font-semibold">
              {event.time.toLocaleTimeString("en-US", { timeZone: "EST" })}
            </TableCell>
            <TableCell className="py-0 px-5 text-lg font-semibold">
              {event.location}
            </TableCell>
            <TableCell className="py-0 pr-5 pl-8 text-lg font-semibold">
              {event.description}
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default EventScheduleMonths;
