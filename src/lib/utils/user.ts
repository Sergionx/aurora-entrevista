import { UserCSVData, UserData } from "../interfaces/UserData";

export function transformCSVUser(user: UserCSVData): UserData {
  return {
    ...user,
    id: Number(user.id),
    moneySpent: Number(user.moneySpent.replace("$", "")),
    productsPurchased: Number(user.productsPurchased),
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
  };
}

export function transformUserData(user: UserData): UserCSVData {
  console.log(user)
  return {
    ...user,
    id: String(user.id),
    moneySpent: `$${user.moneySpent}`,
    productsPurchased: String(user.productsPurchased),
    createdAt: user.createdAt.toLocaleDateString("en-US"),
    updatedAt: user.updatedAt?.toLocaleDateString() ?? "",
  };
}
