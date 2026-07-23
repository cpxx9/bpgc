import UploadImageButton from "@/components/admin/upload-image-button";
import CopyText from "@/components/shared/copy-text";
import DeleteDialog from "@/components/shared/delete-dialog";
import Pagination from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteImage, getAllImages } from "@/lib/actions/image.actions";
import { requireAdmin } from "@/lib/auth-guard";
import { shortenUuid } from "@/lib/utils";
import Link from "next/link";

interface PropTypes {
  searchParams: Promise<{ page: string }>;
}

const AdminGalleryPage = async ({ searchParams }: PropTypes) => {
  await requireAdmin();
  const { page = "1" } = await searchParams;
  const pageParam = Number(page);
  const images = await getAllImages({ page: pageParam });
  if (images.success === false)
    return (
      <div className="space-y-2 flex-1">
        <div className="flex justify-between">
          <h2 className="h2-bold">Images</h2>
          <UploadImageButton />
        </div>
        <div>Failed to get images</div>
      </div>
    );
  if (!images.totalPages) images.totalPages = 1;

  return (
    <div className="space-y-2 flex-1">
      <div className="flex justify-between">
        <h2 className="h2-bold">Images</h2>
        <UploadImageButton />
      </div>
      <div className="overflow-x-auto">
        {images?.totalPages > 1 ? (
          <Pagination
            page={Number(page) || 1}
            totalPages={images?.totalPages}
          />
        ) : (
          <p className="text-muted-foreground">Displaying all results...</p>
        )}
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">ID</TableHead>
              <TableHead className="w-40">FILENAME</TableHead>
              <TableHead className="">URL (click to copy)</TableHead>
              <TableHead className="">KEY</TableHead>
              <TableHead className="w-28">IN GALLERY?</TableHead>
              <TableHead className="w-48">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {images.data?.map((image) => (
              <TableRow key={image.id}>
                <TableCell>{shortenUuid(image.id)}</TableCell>
                <TableCell>{image.fileName}</TableCell>
                <TableCell className="truncate">
                  <CopyText text={image.url} />
                </TableCell>
                <TableCell>{image.key}</TableCell>
                <TableCell>
                  <Badge variant={image.displayed ? "default" : "secondary"}>
                    {image.displayed ? "In Gallery" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button className="mr-1" asChild variant="outline" size="sm">
                    <Link href={`/admin/gallery/${image.id}`}>Edit</Link>
                  </Button>
                  <DeleteDialog
                    id={image.id}
                    action={deleteImage}
                    options={[image.key]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminGalleryPage;
