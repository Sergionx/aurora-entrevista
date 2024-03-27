import type { UserData } from "@/lib/interfaces/UserData";
import { getPaginatedResponse, paginateData } from "@/lib/utils/api";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

const apiLink = process.env.NEXT_PUBLIC_MOCK_ENDPOINT ?? "";

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

  const requestMockAPi = await fetch(apiLink);
  const results = await requestMockAPi.json();

  const paginatedData = paginateData(results, page, limit);

  return getPaginatedResponse(paginatedData, results.length, page, limit);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body) return new NextResponse("No body provided", { status: 400 });

  const newUser: Partial<UserData> = {
    ...body,
    moneySpent: body.moneySpent.toFixed(2),
    createdAt: new Date(),
    updatedAt: null,
  };

  const requestMockAPi = await fetch(apiLink, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  revalidatePath("/");

  return NextResponse.json(newUser, { status: 201 });
}
