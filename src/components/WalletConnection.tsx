import { Button } from "@/components/ui/button";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { useNetworkManagement } from "@/hooks/useNetworkManagement";
import { useEffect, useState } from "react";

export function WalletConnection() {
  const { handleConnect } = useWalletConnection();
  const { addNetwork } = useNetworkManagement();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

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