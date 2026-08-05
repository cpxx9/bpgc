import "server-only";

import { PAGE_SIZE } from "@/lib/constants";
import { PaginatedResult, PaginateArgs, FilterResolvers } from "@/types";
import { requireAdminAction } from "@/lib/auth-guard";
import { formatError } from "@/lib/utils";

const containsPath = (path: string, value: string) =>
  path
    .split(".")
    .reduceRight<
      Record<string, unknown>
    >((acc, key) => Object.fromEntries([[key, acc]]), { contains: value, mode: "insensitive" });

export function buildFilterWhere<TWhere>(
  resolvers: FilterResolvers<TWhere>,
  params: Record<string, string | undefined> = {},
): TWhere {
  const clauses: TWhere[] = [];
  for (const [name, resolve] of Object.entries(resolvers)) {
    const value = params[name];
    if (!value) continue;
    const clause = resolve(value);
    if (clause) clauses.push(clause);
  }
  return (clauses.length ? { AND: clauses } : {}) as TWhere;
}

export async function paginate<TData, TWhere extends object>({
  page,
  limit = PAGE_SIZE,
  query,
  searchFields,
  buildWhere,
  baseWhere,
  findMany,
  count,
}: PaginateArgs<TData, TWhere>): Promise<PaginatedResult<TData>> {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");

    const q = query?.trim();

    let where = (baseWhere ?? {}) as TWhere;
    if (q) {
      const searchClause = buildWhere
        ? buildWhere(q)
        : searchFields?.length
          ? ({ OR: searchFields.map((f) => containsPath(f, q)) } as TWhere)
          : null;

      if (searchClause) {
        where = { AND: [baseWhere ?? {}, searchClause] } as unknown as TWhere;
      }
    }

    const currentPage = Math.max(1, Math.floor(page) || 1);

    const [data, totalCount] = await Promise.all([
      findMany({ where, take: limit, skip: (currentPage - 1) * limit }),
      count({ where }),
    ]);

    return {
      success: true,
      data,
      totalCount,
      totalPages: Math.max(1, Math.ceil(totalCount / limit)),
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
      data: [] as TData[],
      totalCount: 0,
      totalPages: 1,
    };
  }
}
