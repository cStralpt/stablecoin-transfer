import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export function useWalletConnection() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    try {
      connect({ connector: injected() });
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  return {
    address,
    isConnected,
    handleConnect,
    disconnect,
  };
} 