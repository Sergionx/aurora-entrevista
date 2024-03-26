import { PaginationData } from "./components/table/Pagination";
import { UserCSVData, UserData } from "./interfaces/UserData";

export async function getUsers(page = 1, limit = 10) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const request = await fetch(`http://localhost:3000/api/users?${params}`);
  const data = await request.json();

  const users = data.map((user: any) => transformUser(user));

  const paginationData: PaginationData = {
    lastPage: Number(request.headers.get("X-Total-Pages")),
    currentPage: Number(request.headers.get("X-Current-Page")),
    nextPage: Number(request.headers.get("X-Next-Page")),
    prevPage: Number(request.headers.get("X-Prev-Page")),
  };
  console.log(paginationData);

  return {
    data: users,
    pagination: paginationData,
  };
}

export async function getUser(id: string) {
  const request = await fetch(`http://localhost:3000/api/users/${id}`);
  const user = await request.json();

  // console.log({
  //   request,
  //   user,
  // });

  const userData = transformUser(user);

  return userData;
}

function transformUser(user: UserCSVData): UserData {
  return {
    ...user,
    id: Number(user.id),
    moneySpent: Number(user.moneySpent.replace("$", "")),
    productsPurchased: Number(user.productsPurchased),
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
  };
}

export async function updateUser(id: string, data: Partial<UserData>) {
  const request = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  return request.json();
}
