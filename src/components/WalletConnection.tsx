import { Button } from "@/components/ui/button";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { useNetworkManagement } from "@/hooks/useNetworkManagement";

export function WalletConnection() {
  const { handleConnect } = useWalletConnection();
  const { addNetwork } = useNetworkManagement();

  return (
    <>
      <Button onClick={handleConnect} className="w-full">
        Connect Wallet
      </Button>
      <Button onClick={addNetwork} variant="outline" className="w-full">
        Add Fuji Network
      </Button>
    </>
  );
} 