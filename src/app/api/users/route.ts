import type { UserCSVData, UserData } from "@/lib/interfaces/UserData";
import { getPaginatedResponse, paginateData } from "@/lib/utils/api";
import { readCSVFile } from "@/lib/utils/csv";
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

  const results = await readCSVFile<UserCSVData>("src/app/api/data/users.csv");

  const paginatedData = paginateData(results, page, limit);

  return getPaginatedResponse(paginatedData, results.length, page, limit);
}
