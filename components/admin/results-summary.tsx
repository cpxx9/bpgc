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
}) => (
  <>
    <div className="flex items-center justify-between gap-2 mb-2">
      <p className="text-muted-foreground">
        {totalCount < PAGE_SIZE && !query
          ? "Displaying all results..."
          : totalCount > 0
            ? `${totalCount} result${totalCount === 1 ? "" : "s"}${query ? ` for "${query}"` : ""}`
            : "No search results found..."}
      </p>
    </div>
    {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
  </>
);

export default ResultsSummary;
