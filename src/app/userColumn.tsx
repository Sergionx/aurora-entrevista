"use client";

import { CustomColumnDef } from "@/lib/components/table/CustomColumDef";
import { UserData } from "@/lib/interfaces/UserData";
import { cn } from "@/lib/utils/classNames";
import {
  Icon,
  IconArrowsSort,
  IconEye,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { Column, Row } from "@tanstack/react-table";

function headerSortable<T>(column: Column<T>, name: string, center = false) {
  const isSorted = column.getIsSorted();

  return (
    <button
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className={cn(
        "flex items-center gap-2",
        center && "justify-center w-full",
        isSorted && "text-blue-500"
      )}
    >
      {name}
      <IconArrowsSort />
    </button>
  );
}

function cellDate<
  T extends {
    createdAt: Date;
  }
>(row: Row<T>) {
  console.log(row.original);
  return (
    <span className="text-gray-700 text-center">
      {row.original.createdAt.toLocaleDateString("es-ES")}
    </span>
  );
}

function cellButtons<T>(
  buttonsOption: {
    icon: React.ReactNode;
    onClick: () => void;
  }[]
) {
  return (
    <div className="flex gap-4 justify-end">
      {buttonsOption.map((buttonOption, index) => (
        <button
          key={index}
          className="p-2 hover:bg-gray-200 rounded"
          onClick={buttonOption.onClick}
        >
          {buttonOption.icon}
        </button>
      ))}
    </div>
  );
}

export const userColumns: CustomColumnDef<UserData>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => headerSortable(column, "Nombre"),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => headerSortable(column, "Apellido"),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "moneySpent",
    header: "Dinero gastado",
  },
  {
    accessorKey: "createdAt",
    centerHeader: true,
    centerText: true,

    header: ({ column }) => headerSortable(column, "Fecha de creación", true),
    cell: ({ row }) => cellDate(row),
  },
  {
    accessorKey: "updatedAt",
    centerHeader: true,
    centerText: true,

    header: ({ column }) =>
      headerSortable(column, "Fecha de modificación", true),
    cell: ({ row }) => cellDate(row),
  },
  {
    id: "buttons",
    cell: ({ row }) =>
      cellButtons([
        {
          icon: <IconEye />,
          onClick: () => {},
        },
        {
          icon: <IconPencil />,
          onClick: () => {},
        },
        {
          icon: <IconTrash />,
          onClick: () => {},
        },
      ]),
  },
];
