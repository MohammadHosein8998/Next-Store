import { api } from "../api";
import { User } from "./users.types";

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get("/users/");
  return data;
};

export const createUser = async (payload: Partial<User>) => {
  const { data } = await api.post("/users/", payload);
  return data;
};

export const updateUser = async (payload: Partial<User>) => {
  const { data } = await api.put(`/users/${payload._id}`, payload);
  return data;
};

export const deleteUser = async (id: string) => {
  await api.delete(`/users/${id}`);
};

export const getUserById = async (userId: string): Promise<User> => {
  const { data } = await api.get(`/users/${userId}`);
  return data;
};

export const searchUsers = async (params: { featured: string }): Promise<User[]> => {
  const {data} = await api.get("/users/ ", { params });
  return data;
};
