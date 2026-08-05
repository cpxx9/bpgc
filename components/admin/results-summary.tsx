import PageSizeSelect from "@/components/shared/page-size-select";
import Pagination from "@/components/shared/pagination";

const ResultsSummary = ({
  totalCount,
  totalPages,
  page,
  pageSize,
  query,
}: {
  totalCount: number;
  totalPages: number;
  page: number;
  pageSize: number;
  query?: string;
}) => {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-2 pt-2 px-2">
        <p className="text-muted-foreground">
          {query
            ? totalCount > 0
              ? `${totalCount} result${totalCount === 1 ? "" : "s"} for "${query}"`
              : "No search results found..."
            : totalCount <= pageSize
              ? "Displaying all results..."
              : `Displaying ${start}-${end} of ${totalCount} results`}
        </p>
        <PageSizeSelect pageSize={pageSize} />
      </div>
      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </>
  );
};

export default ResultsSummary;
