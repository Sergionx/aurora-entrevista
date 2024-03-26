import { NextResponse } from "next/server";

export function paginateData<T>(data: T[], page: number, limit: number): T[] {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return data.slice(startIndex, endIndex);
}


export function getPaginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
) {
  const totalCount = data.length;
  const lastPage = Math.ceil(totalCount / limit);

  const nextPage = Math.min(page + 1, lastPage);
  const prevPage = Math.max(page - 1, 1);

  return NextResponse.json(
    {
      data,
    },
    {
      headers: {
        "content-type": "application/json",
        "X-Total-Pages": String(lastPage),
        "X-Current-Page": String(page),
        "X-Next-Page": String(nextPage),
        "X-Prev-Page": String(prevPage),
      },
    }
  );
}
