// FILEPATH: /c:/Users/Sergionx/Documents/Code/Practica/Entrevistas Técnicas/aurora-entrevista/__tests__/lib/hooks/useTableServerPagination.test.tsx

import useTableServerPagination from "@/lib/hooks/useTableServerPagination";
import { act, renderHook } from "@testing-library/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "test.com",
  useSearchParams: () => new URLSearchParams(),
}));

describe("useTableServerPagination", () => {
  it("should initialize with correct default values", () => {
    const { result } = renderHook(useTableServerPagination);

    const [pagination] = result.current;

    expect(pagination).toEqual({
      pageIndex: 0,
      pageSize: 10,
    });
  });

  it("should update pagination state correctly", () => {
    const { result } = renderHook(useTableServerPagination);

    const [, setPagination] = result.current;
    act(() => {
      setPagination({
        pageIndex: 1,
        pageSize: 20,
      });
    });

    const [updatedPagination] = result.current;

    expect(updatedPagination).toEqual({
      pageIndex: 1,
      pageSize: 20,
    });
  });

  // it("should update pagination when the UrlParams change", () => {
  //   const { result, rerender } = renderHook(() => useTableServerPagination());

  //   const [pagination] = result.current;

  //   expect(pagination).toEqual({
  //     pageIndex: 0,
  //     pageSize: 10,
  //   });

  //   act(() => {
  //     const router = useRouter();
  //     const pathname = "/test";
  //     const params = new URLSearchParams({
  //       page: "2",
  //       limit: "20",
  //     });

  //     router.push(`${pathname}?${params}`);
  //   });

  //   // Rerender the hook with the new router context that has updated URL parameters
  //   rerender();

  //   const [updatedPagination] = result.current;

  //   expect(updatedPagination).toEqual({
  //     pageIndex: 2,
  //     pageSize: 20,
  //   });
  // });
});
