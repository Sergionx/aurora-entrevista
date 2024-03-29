import { getUsers } from "@/lib/api";
import { DataTable } from "@/lib/components/table/DataTable";
import { userColumns } from "./userColumn";
import { getNumberFromString } from "@/lib/utils/searchParams";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/lib/components/shadcn/alert-dialog";

export default async function Home(
  { searchParams: { page, limit } } = {
    searchParams: {
      page: "1",
      limit: "10",
    },
  }
) {
  const pageNumber = getNumberFromString(page);
  const limitNumber = getNumberFromString(limit);

  const { data: users, pagination } = await getUsers(pageNumber, limitNumber);

  // TODO - Escojer color bonito de fondo
  return (
    <AlertDialog>
      <DataTable
        data={users}
        columns={userColumns}
        addUrl="/users/add"
        filterOptions={{
          field: "email",
          placeholder: "Filtrar por email",
        }}
        paginationData={pagination}
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está totalmente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esta acción eliminará
            permanentemente los datos del usuario.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className="bg-error text-white">
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
