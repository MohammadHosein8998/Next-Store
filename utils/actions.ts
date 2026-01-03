"use server";

import { Product } from "@/services/product/product.types";
import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import { imageSchema, productSchema, validateWithZodSchema } from "./schemas";

import { revalidatePath } from "next/cache";

type SearchParams = {
  q?: string;
  featured?: boolean;
  page?: number;
  search?: string;
};

export async function getSearchProducts(
  params?: SearchParams
): Promise<Product[]> {
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
  const result = await res.json();
  return result;
}

export async function fetchSingleProduct(ProductId: string): Promise<Product> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}products/${ProductId}`
  );
  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) redirect("/products");

  const product = await res.json();
  return product;
}

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
};

export const fetchAdminProduct = async (): Promise<Product[]> => {
  await getAdminUser();
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}products/`);
  const res = await fetch(url.toString(), {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const result = await res.json();
  return result;
};

const renderError = (error: unknown): { message: string } => {
  const message = error instanceof Error ? error.message : "An Error accrued";
  return { message: message };
};

const ErrorResponseHandler = async (res: Response): Promise<void> => {
  if (!res.ok) {
    const errorMessage = await res.json();
    throw new Error(errorMessage);
  }
};

export const createProductAction = async (
  prevState: unknown,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });

    //payload

    const sendData = new FormData();

    Object.entries(validatedFields).forEach(([key, value]) => {
      sendData.set(key, String(value));
    });
    sendData.append("image", validatedFile.image);
    sendData.append("clerkId", user.id);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}products/`, {
      method: "POST",
      body: sendData,
      cache: "no-store",
    });

    await ErrorResponseHandler(res);
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin/products");
};

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState;
  await getAdminUser();
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}products/delete/${productId}`
    );
    const res = await fetch(url.toString(), {
      method: "DELETE",
      cache: "no-cache",
    });

    await ErrorResponseHandler(res);

    revalidatePath("/admin/products");
    return { message: "Product  Removed" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAdminProductDetails = async (productId: string) => {
  await getAuthUser();

  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}products/${productId}`
    );
    const res = await fetch(url.toString(), {
      cache: "no-cache",
    });
    await ErrorResponseHandler(res);
    const product = await res.json();

    if (!product) revalidatePath("/admin/products");

    return product;
  } catch (error) {
    return renderError(error);
  }
};

export const updateProductAction = async (
  PrevState: any,
  formData: FormData
) => {
  await getAdminUser();
  try {
    const productId = formData.get("id") as string;
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(productSchema, rawData);

    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}products/${productId}/edit`
    );

    console.log("url : ", url);

    console.log(JSON.stringify({ ...validatedFields }));

    const res = await fetch(url.toString(), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields),
      cache: "no-cache",
    });
    await ErrorResponseHandler(res);
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "product update successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProductImageAction = async (
  PrevState: any,
  formData: FormData
) => {
  return { message: "product Image update successfully" };
};
