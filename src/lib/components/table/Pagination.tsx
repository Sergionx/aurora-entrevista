import { Table } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/shadcn/select";
import {
  IconChevronLeft,
  IconChevronLeftPipe,
  IconChevronRight,
  IconChevronRightPipe,
} from "@tabler/icons-react";

export interface PaginationData {
  lastPage: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
}

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <footer
      className="flex items-center justify-center md:justify-end flex-wrap
        gap-y-4 space-x-6 lg:space-x-8 px-2 mt-4"
    >
      <SelectRowsPerPage table={table} />

      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </div>

      <ButtonsPagination table={table} />
    </footer>
  );
}

function SelectRowsPerPage<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center space-x-2">
      <p className="text-sm font-medium">Rows per page</p>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function ButtonsPagination<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center space-x-2 mt-2">
      <button
        className="h-12 w-12 rounded-md border
          flex items-center justify-center
          hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to first page</span>
        <IconChevronLeftPipe className="h-8 w-8" />
      </button>

      <button
        className="h-12 w-12 rounded-md border
          flex items-center justify-center
        hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to previous page</span>
        <IconChevronLeft className="h-8 w-8" />
      </button>

      <button
        className="h-12 w-12 rounded-md border
          flex items-center justify-center
        hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to next page</span>
        <IconChevronRight className="h-8 w-8" />
      </button>

      <button
        className="h-12 w-12 rounded-md border
          flex items-center justify-center
        hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to last page</span>

        <IconChevronRightPipe className="h-8 w-8" />
      </button>
    </div>
  );
}
