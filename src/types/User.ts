type User = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "user";
  createdAt?: string;
  updatedAt?: string;
};

export default User;