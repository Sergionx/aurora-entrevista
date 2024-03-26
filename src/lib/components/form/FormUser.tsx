"use client";

import React from "react";
import { UserData } from "@/lib/interfaces/UserData";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/shadcn/form";
import { Input } from "@/lib/components/shadcn/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../shadcn/button";
import { FormMode, formSchema } from "@/app/users/[action]/constants";
import useFormSubmit from "@/lib/hooks/useFormSubmit";
import { createUser, updateUser } from "@/lib/api";
import { Toaster } from "../Toaster";

interface Props {
  userData?: UserData;
  mode: FormMode;
}

export default function FormUser({ userData, mode }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,

    disabled: mode === "view",
    defaultValues: {
      firstName: userData?.firstName ?? "",
      lastName: userData?.lastName ?? "",
      email: userData?.email ?? "",
      moneySpent: userData?.moneySpent ?? 0,
      productsPurchased: userData?.productsPurchased ?? 0,
    },
  });
  const formState = form.formState;

  const onSubmit = useFormSubmit({
    mode,
    addAction: createUser,
    editAction: userData?.id ? updateUser.bind(null, userData.id) : undefined,
    formState,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        <main className="grid grid-cols-2 gap-x-4 gap-y-8 basis-1/2 h-fit">
          <fieldset className="col-span-2 md:col-span-1">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="col-span-2 md:col-span-1">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="col-span-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="col-span-2 md:col-span-1">
            <FormField
              control={form.control}
              name="moneySpent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dinero gastado</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    La cantidad de dinero que ha gastado el usuario en total
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="col-span-2 md:col-span-1">
            <FormField
              control={form.control}
              name="productsPurchased"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Productos Comprados</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    La cantidad de productos que ha gastado el usuario en total
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
        </main>

        {mode !== "view" && (
          <Button
            disabled={
              formState.isSubmitting ||
              !formState.isValid ||
              (mode === "edit" && !formState.isDirty)
            }
            className="mx-auto"
          >
            {
              {
                add: "Crear ",
                edit: "Editar ",
              }[mode]
            }
            Usuario
          </Button>
        )}
      </form>

      <Toaster />
    </Form>
  );
}
