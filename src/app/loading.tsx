import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/shadcn/table";
import React from "react";
import { Skeleton } from "@/lib/components/shadcn/skeleton";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import Link from "next/link";

export default function loading() {
  const headers = [
    "Nombre",
    "Apellido",
    "Email",
    "Dinero gastado",
    "Fecha de creación",
    "Fecha de modificación",
    "Gasto por producto",
    "",
  ];

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
            placeholder="Filtrar por email"
            className="pr-4 pl-10 py-2 border rounded-md 
                w-full text-black-UI
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent"
          />
        </search>

        <Link
          href="/users/add"
          className="flex items-center justify-center gap-2 
                px-4 py-2 ml-4 text-white bg-green-800 rounded-md"
        >
          <IconPlus />
          Agregar
        </Link>
      </header>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200 hover:bg-gray-300/60 text-black">
              {headers.map((header, index) => (
                <TableHead key={header} centerHeader={true}>
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 10 }).map((header, index) => (
              <TableRow key={index}>
                <TableCell
                  colSpan={headers.length}
                  className="h-24 text-center"
                >
                  <Skeleton className=" h-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
