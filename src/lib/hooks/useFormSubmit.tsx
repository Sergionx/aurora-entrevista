import { FormMode } from "@/app/users/[action]/constants";
import { Toast, useToast } from "./useToast";
import { useRouter } from "next/navigation";
import {
  DeepMap,
  DeepPartial,
  FieldValues,
  FormState,
  SubmitHandler,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  mode: FormMode;
  addAction?: (data: T) => Promise<string | null>;
  editAction?: (data: Partial<T>) => Promise<string | null>;
  formState: FormState<T>;
}

export default function useFormSubmit<T extends FieldValues>({
  mode,
  addAction,
  editAction,
  formState,
}: Props<T>) {
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<T> = async (data) => {
    const toastOptions: Toast = { title: "¡Éxito!", variant: "success" };

    if (
      formState.isSubmitting ||
      !formState.isValid ||
      (mode === "edit" && !formState.isDirty)
    ) {
      return;
    }

    try {
      switch (mode) {
        case "add":
          if (addAction) {
            const description = await addAction(data);
            toastOptions.description = description;
          }

          break;

        case "edit":
          const { dirtyFields } = formState;
          const toUpdate = getTouchedFields(data, dirtyFields);

          if (editAction) {
            const description = await editAction(toUpdate);
            toastOptions.description = description;
          }
          break;
      }

      toast(toastOptions);

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error: any) {
      toast({ title: "¡Error!", description: error.message, variant: "error" });
    }
  };

  function getTouchedFields<T>(
    data: T,
    dirty: Partial<Readonly<DeepMap<DeepPartial<T>, boolean>>>
  ): Partial<T> {
    let result: Partial<T> = {};

    for (let key in dirty) {
      if (dirty[key]) {
        result[key as keyof T] = data[key as keyof T];
      }
    }

    return result;
  }

  return onSubmit;
}
