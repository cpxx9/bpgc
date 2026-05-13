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
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="flex flex-col gap-4">
        <div className="w-full">
          {eventSchedule?.april.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                {event.date.toLocaleDateString("en-US", { timeZone: "UTC" })}
              </TableCell>
              <TableCell>
                {event.time.toLocaleTimeString("en-US", { timeZone: "UTC" })}
              </TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.description}</TableCell>
            </TableRow>
          ))}
        </div>
        <div className="w-full">
          {eventSchedule?.may.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                {event.date.toLocaleDateString("en-US", { timeZone: "UTC" })}
              </TableCell>
              <TableCell>
                {event.time.toLocaleTimeString("en-US", { timeZone: "UTC" })}
              </TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.description}</TableCell>
            </TableRow>
          ))}
        </div>
        <div className="w-full">
          {eventSchedule?.june.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                {event.date.toLocaleDateString("en-US", { timeZone: "UTC" })}
              </TableCell>
              <TableCell>
                {event.time.toLocaleTimeString("en-US", { timeZone: "UTC" })}
              </TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.description}</TableCell>
            </TableRow>
          ))}
        </div>
        <div className="w-full">
          {eventSchedule?.july.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                {event.date.toLocaleDateString("en-US", { timeZone: "UTC" })}
              </TableCell>
              <TableCell>
                {event.time.toLocaleTimeString("en-US", { timeZone: "UTC" })}
              </TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.description}</TableCell>
            </TableRow>
          ))}
        </div>
        <div className="w-full">
          {eventSchedule?.august.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                {event.date.toLocaleDateString("en-US", { timeZone: "UTC" })}
              </TableCell>
              <TableCell>
                {event.time.toLocaleTimeString("en-US", { timeZone: "UTC" })}
              </TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.description}</TableCell>
            </TableRow>
          ))}
        </div>
        <div className="w-full">
          {eventSchedule?.september.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                {event.date.toLocaleDateString("en-US", { timeZone: "UTC" })}
              </TableCell>
              <TableCell>
                {event.time.toLocaleTimeString("en-US", { timeZone: "UTC" })}
              </TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.description}</TableCell>
            </TableRow>
          ))}
        </div>
        <div className="w-full">
          {eventSchedule?.october.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                {event.date.toLocaleDateString("en-US", { timeZone: "UTC" })}
              </TableCell>
              <TableCell>
                {event.time.toLocaleTimeString("en-US", { timeZone: "UTC" })}
              </TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.description}</TableCell>
            </TableRow>
          ))}
        </div>
      </TableBody>
    </Table>
  );
};

export default EventSchedule;
