import { PaginationState } from "@tanstack/react-table";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useTableServerPagination(): [
  PaginationState,
  React.Dispatch<React.SetStateAction<PaginationState>>
] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams?.get("page") ?? "1";
  const limit = searchParams?.get("limit") ?? "10";

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: Number(page) - 1,
    pageSize: Number(limit),
  });

  const { pageIndex, pageSize } = pagination;

  // Cuando cambien los searchParams, actualizo el PaginationState
  useEffect(() => {
    setPagination({
      pageIndex: Number(page) - 1,
      pageSize: Number(limit),
    });
  }, [page, limit]);

  // Cada vez que que cambie el PaginationState, actualizo los searchParams
  useEffect(() => {
    const params = new URLSearchParams({
      page: String(pageIndex + 1),
      limit: String(pageSize),
    });

    router.push(`${pathname}?${params}`);
  }, [pageIndex, pageSize, pathname, router]);

  return [pagination, setPagination];
}
