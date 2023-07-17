export type IUser = {
  email: string;
  password: string;
  name: string;
  wishlist?: [];
  readinglist?: [];
};

export type IUserLogin = {
  email: string;
  password: string;
};
