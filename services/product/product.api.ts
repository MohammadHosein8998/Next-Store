import { api } from "../api";
import { Product } from "./product.types";

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get("/products");
  return data;
};

export const createProduct = async (payload: Partial<Product>) => {
  const { data } = await api.post("/products", payload);
  return data;
};

export const updateProduct = async (id: string, payload: Partial<Product>) => {
  const { data } = await api.put(`/products/${id}`, payload);
  return data;
};

export const deleteProduct = async (id: string) => {
  await api.delete(`/products/${id}`);
};


export const searchProducts = async (params: { featured: string }): Promise<Product[]> => {
  const {data} = await api.get("/products/search", { params });
  return data;
};