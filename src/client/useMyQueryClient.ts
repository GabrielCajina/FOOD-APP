import { useRouter } from "next/router";
import React from "react";
import { QueryClient } from "react-query";
import { logout } from "services/auth.service";

const useMyQueryClient = () => {
  const router = useRouter();

  async function onError(error: unknown) {
    await logout();
    router.push("/auth/login");
  }

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            onError,
          },
          mutations: {
            onError,
          },
        },
      })
  );
  return queryClient;
};

export default useMyQueryClient;
