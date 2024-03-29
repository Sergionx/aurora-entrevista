import { UserMockData, UserData } from "@/lib/interfaces/UserData";
import { transformMockUser } from "@/lib/utils/user";

describe("transformMockUser", () => {
  it("should correctly transform dates and moneySpent to number and Date", () => {
    const mockUser: UserMockData = {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      productsPurchased: 0,
      // TO Test
      createdAt: "2022-01-01T00:00:00.000Z",
      updatedAt: "2022-01-01T00:00:00.000Z",
      moneySpent: "100",
    };

    const result = transformMockUser(mockUser);

    expect(result.moneySpent).toBe(100);
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);
  });
});
