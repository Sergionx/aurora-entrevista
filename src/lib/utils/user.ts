import { UserMockData, UserData } from "../interfaces/UserData";

export function transformMockUser(user: UserMockData): UserData {
  return {
    ...user,
    moneySpent: Number(user.moneySpent),
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
  };
}