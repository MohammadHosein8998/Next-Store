"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as productApi from "@/services/product/product.api";
import { Product } from "@/services/product/product.types";

export function useProducts() {
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ["products"],
    queryFn: productApi.getProducts,
    staleTime: 60_000,
  });

  const createPost = useMutation({
    mutationFn: productApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    posts : postQuery.data,
    isLoading : postQuery.isLoading,
    createPost
  };
}



export function useSearchProducts(params : {featured:string}) {
  return useQuery({
    queryKey: ["products", "search", params],
    queryFn: () => productApi.searchProducts(params),
    enabled: !!params,
  });
}





