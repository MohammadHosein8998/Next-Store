"use client";

import { useQuery, useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import * as userApi from "@/services/users/users.api";
import { User } from "@/services/users/users.types";

export function useUsers() {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["users"],
    queryFn: userApi.getUsers,
    staleTime: 60_000,
  });

  const createUser = useMutation({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const updateUser = useMutation({
    mutationFn: userApi.updateUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users" , variables._id] });
    },
  });

  const deleteUser = useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess : (_, userId)=>{
      queryClient.invalidateQueries({ queryKey : ["users"]});
      queryClient.removeQueries({ queryKey : ["user" , userId]})
    }
  })

  return {
    users: userQuery.data,
    isLoading: userQuery.isLoading,
    createUser,
    updateUser,
    deleteUser
  };
}


export function useSearchUsers(params : {featured:string}) {
  return useQuery({
    queryKey: ["users", "search", params],
    queryFn: () => userApi.searchUsers(params),
    enabled: !!params,
  });
}


 export function useUser(userId : string):UseQueryResult{
    return useQuery ({
        queryKey : ["user" , userId],
        queryFn : ()=> userApi.getUserById(userId),
        enabled : !userId,
        staleTime : 60_000
    })
}