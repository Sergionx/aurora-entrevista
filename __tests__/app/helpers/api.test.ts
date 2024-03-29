import { getPaginatedResponse, paginateData } from "@/lib/utils/api";
import { NextResponse } from "next/server";

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest
      .fn()
      .mockImplementation((data, options) => ({ ...options, data })),
  },
}));

describe("paginateData", () => {
  it("should return the correct subset of data", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const page = 2;
    const limit = 3;
    const expected = [4, 5, 6];
    const result = paginateData(data, page, limit);
    expect(result).toEqual(expected);
  });

  it("should return the same array when the limit is greater than the data length", () => {
    const data = [1, 2, 3, 4, 5];
    const page = 1;
    const limit = 12;

    const result = paginateData(data, page, limit);
    expect(result).toEqual(data);
  });

  it("should return the correct subset of data when the limit is equal to the data length", () => {
    const data = [1, 2, 3, 4, 5];
    const page = 1;
    const limit = 5;
    const expected = [1, 2, 3, 4, 5];

    const result = paginateData(data, page, limit);
    expect(result).toEqual(expected);
  });

  it("should return a trimmed array when the ((page - 1) * limit) is greater than the data length", () => {
    const data = [1, 2, 3, 4, 5];
    const page = 2;
    const limit = 3;

    const result = paginateData(data, page, limit);
    expect(result).toEqual([4, 5]);
  });

  it("should return an empty array when (page * limit) is greater than the data length", () => {
    const data = [1, 2, 3, 4, 5];
    const page = 3;
    const limit = 3;

    const result = paginateData(data, page, limit);
    expect(result).toEqual([]);
  });
});

describe("getPaginatedResponse", () => {
  it("should return the correct response object", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const totalCount = data.length;
    const page = 2;
    const limit = 3;

    const expected = NextResponse.json(data, {
      status: 200,
      statusText: "Data paginated successfully",
      headers: {
        "content-type": "application/json",
        "X-Total-Pages": "4",
        "X-Current-Page": "2",
        "X-Next-Page": "3",
        "X-Prev-Page": "1",
      },
    });
    const result = getPaginatedResponse(data, totalCount, page, limit);
    expect(result).toEqual(expected);
  });

  it("should return the correct response object when the page is the last page", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const totalCount = data.length;
    const page = 4;
    const limit = 3;

    const expected = NextResponse.json(data, {
      status: 200,
      statusText: "Data paginated successfully",
      headers: {
        "content-type": "application/json",
        "X-Total-Pages": "4",
        "X-Current-Page": "4",
        "X-Next-Page": "4",
        "X-Prev-Page": "3",
      },
    });
    const result = getPaginatedResponse(data, totalCount, page, limit);
    expect(result).toEqual(expected);
  });

  it("should return the correct response object when the page is the first page", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const totalCount = data.length;
    const page = 1;
    const limit = 3;

    const expected = NextResponse.json(data, {
      status: 200,
      statusText: "Data paginated successfully",
      headers: {
        "content-type": "application/json",
        "X-Total-Pages": "4",
        "X-Current-Page": "1",
        "X-Next-Page": "2",
        "X-Prev-Page": "1",
      },
    });
    const result = getPaginatedResponse(data, totalCount, page, limit);
    expect(result).toEqual(expected);
  });

  it("should return the correct response object when the page is the only page", () => {
    const data = [1, 2, 3];
    const totalCount = data.length;
    const page = 1;
    const limit = 3;

    const expected = NextResponse.json(data, {
      status: 200,
      statusText: "Data paginated successfully",
      headers: {
        "content-type": "application/json",
        "X-Total-Pages": "1",
        "X-Current-Page": "1",
        "X-Next-Page": "1",
        "X-Prev-Page": "1",
      },
    });
    const result = getPaginatedResponse(data, totalCount, page, limit);
    expect(result).toEqual(expected);
  });

  it("should return the correct response object when the page is the only page and the limit is greater than the data length", () => {
    const data = [1, 2, 3];
    const totalCount = data.length;
    const page = 1;
    const limit = 5;

    const expected = NextResponse.json(data, {
      status: 200,
      statusText: "Data paginated successfully",
      headers: {
        "content-type": "application/json",
        "X-Total-Pages": "1",
        "X-Current-Page": "1",
        "X-Next-Page": "1",
        "X-Prev-Page": "1",
      },
    });
    const result = getPaginatedResponse(data, totalCount, page, limit);
    expect(result).toEqual(expected);
  });
});
