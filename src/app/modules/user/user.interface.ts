export type IUser = {
  email: string;
  password: string;
  name: string;
  wishlist?: [];
};

export type IUserLogin = {
  email: string;
  password: string;
};
