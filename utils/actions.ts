import { Product } from "@/services/product/product.types";

type SearchParams = {
  q?: string;
  featured?: boolean;
  page?: number;
};

export async function getSearchProducts(params?: SearchParams): Promise<Product[]> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}products/search`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  const res = await fetch(url.toString(), {
      cache: "no-store", // یا revalidate
    });
    
    if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const result = await res.json()
  return result;
}
