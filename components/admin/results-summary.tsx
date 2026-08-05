import Pagination from "@/components/shared/pagination";
import { PAGE_SIZE } from "@/lib/constants";

const ResultsSummary = ({
  totalCount,
  totalPages,
  page,
  query,
}: {
  totalCount: number;
  totalPages: number;
  page: number;
  query?: string;
}) => {
  const start = (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, totalCount);

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="text-muted-foreground">
          {query
            ? totalCount > 0
              ? `${totalCount} result${totalCount === 1 ? "" : "s"} for "${query}"`
              : "No search results found..."
            : totalCount <= PAGE_SIZE
              ? "Displaying all results..."
              : `Displaying ${start}-${end} of ${totalCount} results`}
        </p>
      </div>
      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </>
  );
};

export default ResultsSummary;
