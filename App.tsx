import { NavigationContainer, CommonActions } from "@react-navigation/native";
import Route from "./src/router/router"; // Assuming this is your custom router component
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TestScreen from "./src/testscreen";
import {
  createWeb3Modal,
  defaultWagmiConfig,
} from "@web3modal/wagmi-react-native";
import { WagmiConfig } from "wagmi";
import { sepolia } from "viem/chains";
import { AuthProvider } from "./src/utils/context";

const projectId = "3064cb3b58975b8c8cd65e22a07d3ad0";
const metadata = {
  name: "Web3Modal RN",
  description: "Web3Modal RN Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};
const chains = [sepolia];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
});

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
          <NavigationContainer>
            <Route />
            {/* <TestScreen navigation={navigator}/> */}
          </NavigationContainer>
        </WagmiConfig>
      </QueryClientProvider>
    </AuthProvider>
  );
}
