import { PaginationData } from "./components/table/Pagination";
import { UserData } from "./interfaces/UserData";

export async function getUsers(page = 1, limit = 10) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const request = await fetch(`http://localhost:3000/api/users?${params}`);
  const data = await request.json();

  const users = data.map((user: any) => ({
    ...user,
    moneySpent: Number(user.moneySpent.replace("$", "")),
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
  }));

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
