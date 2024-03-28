import { NavigationContainer, CommonActions } from "@react-navigation/native";
import Route from "./src/router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Route />
      </NavigationContainer>
    </QueryClientProvider>
  );
}