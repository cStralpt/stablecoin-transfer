"use client";

import { WalletConnection } from "@/components/WalletConnection";
import { TransferForm } from "@/components/TransferForm";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { useEffect, useState } from "react";

export function TransferContainer() {
  const { isConnected } = useWalletConnection();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-full" />
        <div className="h-10 bg-gray-200 rounded w-full" />
      </div>
    );
  }

  return !isConnected ? <WalletConnection /> : <TransferForm />;
}
