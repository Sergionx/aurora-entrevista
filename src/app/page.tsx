import { getUsers } from "@/lib/api";
import { DataTable } from "@/lib/components/table/DataTable";
import { userColumns } from "./userColumn";
import { getNumberFromString } from "@/lib/utils/searchParams";

export default async function Home({
  searchParams: { page = "1", limit = "10" },
}: {
  searchParams: {
    page: string;
    limit: string;
  };
}) {
  const pageNumber = getNumberFromString(page);
  const limitNumber = getNumberFromString(limit);

  const { data: users, pagination } = await getUsers(pageNumber, limitNumber);

  // TODO - Escojer color bonito de fondo
  return (
    <DataTable
      data={users}
      columns={userColumns}
      addUrl="/users/add"
      filterOptions={{
        field: "email",
        placeholder: "Search by email",
      }}
      paginationData={pagination}
    />
  );
}
