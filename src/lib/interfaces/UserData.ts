export interface UserMockData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  moneySpent: string;
  productsPurchased: number;
  updatedAt: string;
  createdAt: string;
}

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  moneySpent: number;
  productsPurchased: number;
  updatedAt?: Date;
  createdAt: Date;
}