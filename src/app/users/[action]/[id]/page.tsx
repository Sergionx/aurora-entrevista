import { getUser } from "@/lib/api";
import FormUser from "@/lib/components/form/FormUser";

import { redirect } from "next/navigation";
import { FormMode } from "../constants";

interface EditParams {
  params: {
    action: FormMode;
    id: string;
  };
}

export default async function UserPage({ params }: EditParams) {
  const { action, id } = params;

  if (!["edit", "view"].includes(action)) redirect("/");

  const userData = await getUser(id);

  return <FormUser userData={userData} mode={action} />;
}
