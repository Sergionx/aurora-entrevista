import type { UserCSVData, UserData } from "@/lib/interfaces/UserData";
import { getPaginatedResponse, paginateData } from "@/lib/utils/api";
import { readCSVFile, writeCSVFile } from "@/lib/utils/csv";
import { transformUserData } from "@/lib/utils/user";
import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: NextRequest) {
  const urlParams = request.nextUrl.searchParams;
  const page = Number(urlParams.get("page")) || 1;
  const limit = Number(urlParams.get("limit")) || 10;

  if (page < 1 || limit < 1)
    return new NextResponse("Invalid page or limit", { status: 400 });

  if (limit % 10 !== 0)
    return new NextResponse("Limit must be a multiple of 10", { status: 400 });

  if (limit > 100)
    return new NextResponse("Limit cannot be greater than 100", {
      status: 400,
    });

  const results = await readCSVFile("src/app/api/data/users.csv", (data) => ({
    id: data[0],
    firstName: data[1],
    lastName: data[2],
    email: data[3],
    moneySpent: data[4],
    productsPurchased: data[5],
    createdAt: data[6],
    updatedAt: data[7],
  }));

  const paginatedData = paginateData(results, page, limit);

  return getPaginatedResponse(paginatedData, results.length, page, limit);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body) return new NextResponse("No body provided", { status: 400 });

  const results = await readCSVFile("src/app/api/data/users.csv", (data) => ({
    id: data[0],
    firstName: data[1],
    lastName: data[2],
    email: data[3],
    moneySpent: data[4],
    productsPurchased: data[5],
    createdAt: data[6],
    updatedAt: data[7],
  }));
  const newUser: UserData = {
    id: results.length + 1,
    ...body,
    createdAt: new Date(),
    updatedAt: undefined,
  };
  results.push(transformUserData(newUser));

  writeCSVFile<UserCSVData>("src/app/api/data/users.csv", results);

  revalidateTag("users");
  // revalidatePath("/")

  return NextResponse.json(newUser, { status: 201 });
}
