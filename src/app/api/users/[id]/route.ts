import { UserCSVData } from "@/lib/interfaces/UserData";
import { readCSVFile, writeCSVFile } from "@/lib/utils/csv";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const users = await readCSVFile<UserCSVData>("src/app/api/data/users.csv");

  const user = users.find((user) => user.id === id);

  if (!user) {
    return new NextResponse("User Id does not exists", { status: 404 });
  }

  return NextResponse.json(user, {
    status: 200,
    statusText: "User fetched successfully",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const users = await readCSVFile<UserCSVData>("src/app/api/data/users.csv");

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return new NextResponse("User Id does not exists", { status: 404 });
  }

  const body = await request.json();

  users[userIndex] = {
    ...users[userIndex],
    ...body,
  };

  await writeCSVFile<UserCSVData>("src/app/api/data/users.csv", users);

  return new NextResponse(null, {
    status: 200,
    statusText: "User updated successfully",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
