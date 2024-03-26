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
import { ClassValue } from "clsx";
import { useRouter } from "next/navigation";

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
      <IconArrowsSort className="shrink-0" />
    </button>
  );
}

function cellDate<
  T extends {
    createdAt: Date;
  }
>(row: Row<T>) {
  return (
    <span className="text-gray-700 text-center">
      {row.original.createdAt.toLocaleDateString("es-ES")}
    </span>
  );
}

function cellCurrency({
  value,
  currency = "USD",
  locale = "es-ES",
  classValues = [],
}: {
  value: number;
  currency?: string;
  locale?: string;
  classValues?: ClassValue[];
}) {
  return (
    <span className={cn("text-gray-700 text-center", classValues)}>
      {value.toLocaleString(locale, {
        style: "currency",
        currency,
      })}
    </span>
  );
}

function cellButtons(
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

    centerText: true,
    centerHeader: true,

    cell: ({ row }) =>
      cellCurrency({
        value: row.original.moneySpent,
      }),
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
    id: "Gasto por producto",
    header: "Gasto por producto",
    centerHeader: true,
    centerText: true,

    cell: ({ row }) => {
      const value = row.original.moneySpent / row.original.productsPurchased;
      return cellCurrency({
        value,
        classValues: [
          "font-bold",
          {
            "text-red-500": value < 20,
            "text-yellow-500": value >= 20 && value < 40,
            "text-green-500": value >= 40,
          },
        ],
      });
    },
  },
  {
    id: "buttons",
    cell: ({ row }) => {
      const router = useRouter();

      return cellButtons([
        {
          icon: <IconEye />,
          onClick: () => {
            router.push(`/users/view/${row.original.id}`);
          },
        },
        {
          icon: <IconPencil />,
          onClick: () => {
            router.push(`/users/edit/${row.original.id}`);
          },
        },
        {
          icon: <IconTrash />,
          onClick: () => {},
        },
      ]);
    },
  },
];
