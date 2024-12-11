import { createWalletClient, custom } from "viem";
import { avalancheFuji } from "viem/chains";

export function useNetworkManagement() {
  const addNetwork = async () => {
    if (!window.ethereum) throw new Error("No ethereum wallet found");
    
    const walletClient = createWalletClient({
      chain: avalancheFuji,
      transport: custom(window.ethereum),
    });

    try {
      await walletClient.switchChain({ id: avalancheFuji.id });
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && error.code === 4902) {
        try {
          await walletClient.addChain({ chain: avalancheFuji });
        } catch (addError) {
          console.error("Failed to add network:", addError);
        }
      } else {
        console.error("Failed to switch network:", error);
      }
    }
  };

  return { addNetwork };
} 