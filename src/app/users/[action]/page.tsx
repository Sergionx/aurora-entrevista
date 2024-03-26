import FormUser from "@/lib/components/form/FormUser";
import { redirect } from "next/navigation";
import { FormMode } from "./constants";

interface EditParams {
  params: {
    action: FormMode;
  };
}

export default async function UserPage({ params }: EditParams) {
  const { action } = params;

  if (action !== "add") redirect("/");

  return <FormUser mode={action}  />;
}
