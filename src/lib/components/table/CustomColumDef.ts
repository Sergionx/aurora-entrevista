import { ColumnDef, RowData } from "@tanstack/react-table";

export type CustomColumnDef<
  TData extends RowData,
  TValue = unknown
> = ColumnDef<TData, TValue> & {
  centerHeader?: boolean;
  centerText?: boolean;
};
