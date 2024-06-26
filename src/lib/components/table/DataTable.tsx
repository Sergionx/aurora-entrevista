"use client";

import { useState } from "react";

import {
  ColumnFiltersState,
  RowData,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/lib/components/shadcn/table";
import Link from "next/link";
import { CustomColumnDef } from "./CustomColumDef";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { DataTablePagination, PaginationData } from "./Pagination";
import useTableServerPagination from "@/lib/hooks/useTableServerPagination";

interface DataTableProps<TData, TValue> {
  columns: CustomColumnDef<TData, TValue>[];
  data: TData[];
  addUrl?: string;
  filterOptions?: {
    field: keyof TData & string;
    placeholder: string;
  };
  paginationData: PaginationData;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  addUrl,
  filterOptions,
  paginationData,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [pagination, setPagination] = useTableServerPagination();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    manualPagination: true,
    pageCount: paginationData.lastPage,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  return (
    <div>
      <header className="flex items-center justify-end mb-4">
        <search
          className="flex items-center gap-4 relative w-full max-w-sm 
          focus-within:text-blue-500 focus-within:max-w-full 
            transition-all duration-300"
        >
          <IconSearch className="absolute ml-2 pointer-events-none" />

          {filterOptions && (
            <input
              placeholder={filterOptions.placeholder}
              value={
                (table
                  .getColumn(filterOptions.field)
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) => {
                table
                  .getColumn(filterOptions.field)
                  ?.setFilterValue(event.target.value);
              }}
              className="pr-4 pl-10 py-2 border rounded-md 
                w-full text-black-UI
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent"
            />
          )}

          {addUrl && (
            <Link
              href={addUrl}
              className="flex items-center justify-center gap-2 
                px-4 py-2 ml-4 text-white bg-green-800 rounded-md"
            >
              <IconPlus />
              Agregar
            </Link>
          )}
        </search>
      </header>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-gray-200 hover:bg-gray-300/60 text-black"
              >
                {headerGroup.headers.map((header) => {
                  const columnDef = header.column
                    .columnDef as CustomColumnDef<RowData>;

                  return (
                    <TableHead
                      key={header.id}
                      centerHeader={columnDef.centerHeader}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const columnDef = cell.column
                      .columnDef as CustomColumnDef<RowData>;

                    return (
                      <TableCell
                        key={cell.id}
                        centerText={columnDef.centerText}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
