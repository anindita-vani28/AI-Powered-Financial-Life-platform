import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuthStore } from "@/hooks/useAuth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function AppWrapper({ Component, pageProps }: AppProps) {
  const { fetchCurrentUser } = useAuthStore();

  useEffect(() => {
    // Initialize auth on app load
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return <Component {...pageProps} />;
}

export default function App(props: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper {...props} />
    </QueryClientProvider>
  );
}
