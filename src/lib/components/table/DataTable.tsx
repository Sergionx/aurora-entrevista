"use client";

import { useState } from "react";

import {
  ColumnDef,
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
import { IconSearch } from "@tabler/icons-react";

interface DataTableProps<TData, TValue> {
  columns: CustomColumnDef<TData, TValue>[];
  data: TData[];
  filterField: keyof TData & string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterField,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <header className="flex items-center justify-end mb-4">
        <search
          className="flex items-center gap-4 relative w-full max-w-xs 
          focus-within:text-blue-500 focus-within:max-w-full 
            transition-all duration-300"
        >
          <IconSearch className="absolute ml-2 pointer-events-none" />
          <input
            placeholder="Filtrar por nombre..."
            value={
              (table.getColumn(filterField)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) => {
              table.getColumn(filterField)?.setFilterValue(event.target.value);
            }}
            className="pr-4 pl-10 py-2 border rounded-md 
              w-full text-black-UI
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent"
          />
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
    </div>
  );
}
