import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import CharacterListPage from "@/pages/character-list-page";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CharacterListPage />
    </QueryClientProvider>
  );
}
