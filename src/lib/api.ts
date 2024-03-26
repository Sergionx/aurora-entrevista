import { UserData } from "./interfaces/UserData";

export async function getUsers(page = 1, limit = 10): Promise<UserData[]> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const request = await fetch(`http://localhost:3000/api/users?${params}`);
  const data = await request.json();
  // console.log(request.headers);

  return data;
}
