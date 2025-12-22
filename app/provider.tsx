"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider } from "./theme-provider";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Provider = ({ children }: { children: React.ReactNode }) => {
  // ✅ safe: lazy init
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            gcTime: 10 * 60 * 60,
          },
        },
      })
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>{children}
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Provider;
