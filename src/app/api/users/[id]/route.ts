import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { apiLink } from "../route";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const requestMockAPi = await fetch(
    `https://66044e0d2393662c31d122e1.mockapi.io/api/UserData/${id}`
  );

  if (!requestMockAPi.ok) {
    return new NextResponse("Error fetching user", { status: 400 });
  }

  const user = await requestMockAPi.json();

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
  const requestMockAPi = await fetch(`${apiLink}/${id}`);

  if (!requestMockAPi.ok) {
    return new NextResponse("Error fetching user", { status: 400 });
  }

  const user = await requestMockAPi.json();

  if (!user) {
    return new NextResponse("User Id does not exists", { status: 404 });
  }

  const body = await request.json();

  const newUser = {
    ...user,
    ...body,
    updatedAt: new Date().toLocaleDateString("en-US"),
  };

  const requestMockAPiPut = await fetch(`${apiLink}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  revalidatePath("/");

  return new NextResponse(null, {
    status: 200,
    statusText: "User updated successfully",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const requestMockAPi = await fetch(`${apiLink}/${id}`, {
    method: "DELETE",
  });

  if (!requestMockAPi.ok) {
    return new NextResponse("Error deleting user", { status: 400 });
  }

  revalidatePath("/");

  return new NextResponse(null, {
    status: 200,
    statusText: "User deleted successfully",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
