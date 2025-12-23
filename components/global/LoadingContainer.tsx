import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "@radix-ui/react-dropdown-menu";

function LoadingContainer() {
  return (
    <div className="mb-8 mt-24">
      <Skeleton className="h-8 w-2/4 md:w-1/4" />
      <Separator />
      <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        <LoadingProduct />
        <LoadingProduct />  
        <LoadingProduct />
      </div>
    </div>
  );
}


function LoadingProduct() {
  return (
    <Card>
      <CardContent className="p-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-4 w-3/4 mt-4" />
        <Skeleton className="h-4 w-2/4 mt-4" />
      </CardContent>
    </Card>
  );
}

export default LoadingContainer;
