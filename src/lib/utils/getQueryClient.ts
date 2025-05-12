import { QueryClient } from '@tanstack/react-query';

let client: QueryClient | undefined;

export default function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new client
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30 * 1000, // 30 seconds
          retry: 1,
        },
      },
    });
  }
  // Browser: use a singleton client
  if (!client) {
    client = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30 * 1000, // 30 seconds
          retry: 1,
        },
      },
    });
  }
  return client;
}
