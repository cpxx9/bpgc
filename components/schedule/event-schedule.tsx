import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEventSchedule } from "@/lib/actions/event.actions";

const EventSchedule = async () => {
  const { data: eventSchedule } = await getEventSchedule();
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
        {eventSchedule?.april.map((event) => {
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
              className={`border-none ${event.date < new Date() ? "text-gray-200" : event.isTwoManMatch ? "text-white" : "text-blue-600"}`}
              key={event.id}
            >
              <TableCell className="py-1 pl-0 pr-4 text-lg font-semibold">
                {month} {day}
              </TableCell>
              <TableCell className="py-1 px-5 text-lg font-semibold">
                {event.time.toLocaleTimeString("en-US", { timeZone: "EST" })}
              </TableCell>
              <TableCell className="py-1 px-5 text-lg font-semibold">
                {event.location}
              </TableCell>
              <TableCell className="py-1 pr-5 pl-8 text-lg font-semibold">
                {event.description}
              </TableCell>
            </TableRow>
          );
        })}
        <TableRow className="border-none">
          <TableCell className="p-0">
            <br />
          </TableCell>
        </TableRow>
        {eventSchedule?.may.map((event) => {
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
              className={`border-none ${event.date < new Date() ? "text-gray-200" : event.isTwoManMatch ? "text-white" : "text-blue-600"}`}
              key={event.id}
            >
              <TableCell className="py-1 pl-0 pr-4 text-lg font-semibold">
                {month} {day}
              </TableCell>
              <TableCell className="py-1 px-5 text-lg font-semibold">
                {event.time.toLocaleTimeString("en-US", { timeZone: "EST" })}
              </TableCell>
              <TableCell className="py-1 px-5 text-lg font-semibold">
                {event.location}
              </TableCell>
              <TableCell className="py-1 pr-5 pl-8 text-lg font-semibold">
                {event.description}
              </TableCell>
            </TableRow>
          );
        })}
        <TableRow className="border-none">
          <TableCell className="p-0">
            <br />
          </TableCell>
        </TableRow>
        {eventSchedule?.june.map((event) => {
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
              className={`border-none ${event.date < new Date() ? "text-gray-200" : event.isTwoManMatch ? "text-white" : "text-blue-600"}`}
              key={event.id}
            >
              <TableCell className="py-1 pl-0 pr-4 text-lg font-semibold">
                {month} {day}
              </TableCell>
              <TableCell className="py-1 px-5 text-lg font-semibold">
                {event.time.toLocaleTimeString("en-US", { timeZone: "EST" })}
              </TableCell>
              <TableCell className="py-1 px-5 text-lg font-semibold">
                {event.location}
              </TableCell>
              <TableCell className="py-1 pr-5 pl-8 text-lg font-semibold">
                {event.description}
              </TableCell>
            </TableRow>
          );
        })}
        <TableRow className="border-none">
          <TableCell className="p-0">
            <br />
          </TableCell>
        </TableRow>
        {eventSchedule?.july.map((event) => {
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
              className={`border-none ${event.date < new Date() ? "text-gray-200" : event.isTwoManMatch ? "text-white" : "text-blue-600"}`}
              key={event.id}
            >
              <TableCell className="py-1 pl-0 pr-4 text-lg font-semibold">
                {month} {day}
              </TableCell>
              <TableCell className="py-1 px-5 text-lg font-semibold">
                {event.time.toLocaleTimeString("en-US", { timeZone: "EST" })}
              </TableCell>
              <TableCell className="py-1 px-5 text-lg font-semibold">
                {event.location}
              </TableCell>
              <TableCell className="py-1 pr-5 pl-8 text-lg font-semibold">
                {event.description}
              </TableCell>
            </TableRow>
          );
        })}
        <TableRow className="border-none">
          <TableCell className="p-0">
            <br />
          </TableCell>
        </TableRow>
        {eventSchedule?.august.map((event) => {
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
              className={`border-none ${event.date < new Date() ? "text-gray-200" : event.isTwoManMatch ? "text-white" : "text-blue-600"}`}
              key={event.id}
            >
              <TableCell className="py-1 pl-0 pr-4 text-lg font-semibold">
                {month} {day}
              </TableCell>
              <TableCell className="py-1 px-5 text-lg font-semibold">
                {event.time.toLocaleTimeString("en-US", { timeZone: "EST" })}
              </TableCell>
              <TableCell className="py-1 px-5 text-lg font-semibold">
                {event.location}
              </TableCell>
              <TableCell className="py-1 pr-5 pl-8 text-lg font-semibold">
                {event.description}
              </TableCell>
            </TableRow>
          );
        })}
        <TableRow className="border-none">
          <TableCell className="p-0">
            <br />
          </TableCell>
        </TableRow>
        {eventSchedule?.september.map((event) => {
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
              className={`border-none ${event.date < new Date() ? "text-gray-200" : event.isTwoManMatch ? "text-white" : "text-blue-600"}`}
              key={event.id}
            >
              <TableCell className="py-1 pl-0 pr-4 text-lg font-semibold">
                {month} {day}
              </TableCell>
              <TableCell className="py-1 px-5 text-lg font-semibold">
                {event.time.toLocaleTimeString("en-US", { timeZone: "EST" })}
              </TableCell>
              <TableCell className="py-1 px-5 text-lg font-semibold">
                {event.location}
              </TableCell>
              <TableCell className="py-1 pr-5 pl-8 text-lg font-semibold">
                {event.description}
              </TableCell>
            </TableRow>
          );
        })}
        <TableRow className="border-none">
          <TableCell className="p-0">
            <br />
          </TableCell>
        </TableRow>
        {eventSchedule?.october.map((event) => {
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
              className={`border-none ${event.date < new Date() ? "text-gray-200" : event.isTwoManMatch ? "text-white" : "text-blue-600"}`}
              key={event.id}
            >
              <TableCell className="py-1 pl-0 pr-4 text-lg font-semibold">
                {month} {day}
              </TableCell>
              <TableCell className="py-1 px-5 text-lg font-semibold">
                {event.time.toLocaleTimeString("en-US", { timeZone: "EST" })}
              </TableCell>
              <TableCell className="py-1 px-5 text-lg font-semibold">
                {event.location}
              </TableCell>
              <TableCell className="py-1 pr-5 pl-8 text-lg font-semibold">
                {event.description}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default EventSchedule;
