"use server";

import { z } from "zod";
import { PaginationData } from "./components/table/Pagination";
import { UserData } from "./interfaces/UserData";
import { formSchema } from "@/app/users/[action]/constants";
import { transformMockUser } from "./utils/user";
import { baseUrl } from "./constants";

export async function getUsers(page = 1, limit = 10) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  console.log("antes del fetch");
  console.log(`${baseUrl}/api/users?${params}`);
  const request = await fetch(`${baseUrl}/api/users/?${params}`, {
    next: {
      tags: ["users"],
    },
  });
  console.log("después del fetch");

  if (!request.ok) {
    throw new Error(
      `API request failed: ${request.status} ${request.statusText}`
    );
  }

  const data = await request.json();
  if (data === "Not found") {
    return {
      data: [],
      pagination: {
        lastPage: 1,
        currentPage: 1,
        nextPage: 1,
        prevPage: 1,
      },
    };
  }
  console.log({ data });

  const users = data.map((user: any) => transformMockUser(user));

  const paginationData: PaginationData = {
    lastPage: Number(request.headers.get("X-Total-Pages")),
    currentPage: Number(request.headers.get("X-Current-Page")),
    nextPage: Number(request.headers.get("X-Next-Page")),
    prevPage: Number(request.headers.get("X-Prev-Page")),
  };

  return {
    data: users,
    pagination: paginationData,
  };
}

export async function getUser(id: string) {
  const request = await fetch(`${baseUrl}/api/users/${id}`, {
    next: {
      tags: ["users"],
    },
  });

  if (!request.ok) {
    throw new Error(
      `API request failed: ${request.status} ${request.statusText}`
    );
  }

  const user = await request.json();

  const userData = transformMockUser(user);

  return userData;
}

export async function updateUser(id: number, data: Partial<UserData>) {
  const request = await fetch(`${baseUrl}/api/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),

    next: {
      tags: ["users"],
    },
  });

  const message = request.statusText;
  return message;
}

export async function createUser(data: z.infer<typeof formSchema>) {
  const request = await fetch(`${baseUrl}/api/users`, {
    method: "POST",
    body: JSON.stringify(data),

    next: {
      tags: ["users"],
    },
  });

  const message = request.statusText;
  if (!request.ok) {
    throw new Error(message);
  }

  return message;
}

export async function deleteUser(userId: number) {
  const request = await fetch(`${baseUrl}/api/users/${userId}`, {
    method: "DELETE",
    next: {
      tags: ["users"],
    },
  });

  const message = request.statusText;
  if (!request.ok) {
    throw new Error(message);
  }

  return message;
}
