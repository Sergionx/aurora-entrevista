import { getUsers } from "@/lib/api";
import { DataTable } from "@/lib/components/table/DataTable";
import { userColumns } from "./userColumn";

export default async function Home() {
  const users = await getUsers();
  // console.log(users);

  return (
    <main>
      <DataTable
        data={users}
        columns={userColumns}
        filterOptions={{
          field: "email",
          placeholder: "Search by email",
        }}
      />
    </main>
  );
}
