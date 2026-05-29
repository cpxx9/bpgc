import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EventScheduleSkeleton = () => {
  return (
    <Table className="min-h-[900px] min-w-[700px]">
      <TableHeader className="border-none">
        <TableRow className="border-none flex gap-5">
          <TableHead></TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="py-0 pl-0 pr-4 text-lg font-semibold">
            Loading...
          </TableCell>
          <TableCell className="py-0 px-5 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 px-5 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 pr-5 pl-8 text-lg font-semibold"></TableCell>
        </TableRow>
        <TableRow className="border-none">
          <TableCell className="p-0">
            <br />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="py-0 pl-0 pr-4 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 px-5 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 px-5 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 pr-5 pl-8 text-lg font-semibold"></TableCell>
        </TableRow>
        <TableRow className="border-none">
          <TableCell className="p-0">
            <br />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="py-0 pl-0 pr-4 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 px-5 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 px-5 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 pr-5 pl-8 text-lg font-semibold"></TableCell>
        </TableRow>
        <TableRow className="border-none">
          <TableCell className="p-0">
            <br />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="py-0 pl-0 pr-4 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 px-5 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 px-5 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 pr-5 pl-8 text-lg font-semibold"></TableCell>
        </TableRow>
        <TableRow className="border-none">
          <TableCell className="p-0">
            <br />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="py-0 pl-0 pr-4 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 px-5 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 px-5 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 pr-5 pl-8 text-lg font-semibold"></TableCell>
        </TableRow>
        <TableRow className="border-none">
          <TableCell className="p-0">
            <br />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="py-0 pl-0 pr-4 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 px-5 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 px-5 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 pr-5 pl-8 text-lg font-semibold"></TableCell>
        </TableRow>
        <TableRow className="border-none">
          <TableCell className="p-0">
            <br />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="py-0 pl-0 pr-4 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 px-5 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 px-5 text-lg font-semibold"></TableCell>
          <TableCell className="py-0 pr-5 pl-8 text-lg font-semibold"></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default EventScheduleSkeleton;
