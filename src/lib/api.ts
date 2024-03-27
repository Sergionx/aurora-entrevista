import { z } from "zod";
import { PaginationData } from "./components/table/Pagination";
import { UserCSVData, UserData } from "./interfaces/UserData";
import { formSchema } from "@/app/users/[action]/constants";
import { transformCSVUser } from "./utils/user";

export async function getUsers(page = 1, limit = 10) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const request = await fetch(`http://localhost:3000/api/users?${params}`, {
    next: {
      tags: ["users"],
    },
  });
  const data = await request.json();

  const users = data.map((user: any) => transformCSVUser(user));

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
  const request = await fetch(`http://localhost:3000/api/users/${id}`, {
    next: {
      tags: ["users"],
    },
  });
  const user = await request.json();

  const userData = transformCSVUser(user);

  return userData;
}

export async function updateUser(id: number, data: Partial<UserData>) {
  const request = await fetch(`http://localhost:3000/api/users/${id}`, {
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
  const request = await fetch(`http://localhost:3000/api/users`, {
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
  const request = await fetch(`http://localhost:3000/api/users/${userId}`, {
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
