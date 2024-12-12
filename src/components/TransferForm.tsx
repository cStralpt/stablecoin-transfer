import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { useTokenTransfer } from "@/hooks/useTokenTransfer";
import { useEffect, useState } from "react";
import type { Address } from "viem";

const IDR_RATE = 15700;

export function TransferForm() {
  const [isMounted, setIsMounted] = useState(false);
  const { address, disconnect } = useWalletConnection();
  const [txHash, setTxHash] = useState<Address | undefined>(undefined);
  const {
    amount,
    setAmount,
    recipient,
    setRecipient,
    isLoading,
    balance,
    handleTransfer,
  } = useTokenTransfer(address);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleTransferClick = async () => {
    try {
      const hash = await handleTransfer();
      setTxHash(hash);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isMounted) {
    return (
      <div className="space-y-4">
        <div className="h-20 bg-gray-200 rounded animate-pulse" />
        <div className="h-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-sm font-medium">Connected Address</h1>
        <p className="text-sm text-muted-foreground break-all">{address}</p>
      </div>

      {balance && (
        <div className="text-sm text-muted-foreground">
          Balance: {Number(balance) / 1e6} USDC
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="amount">
          Amount (USDC)
        </label>
        <Input
          id="amount"
          type="number"
          placeholder="0.0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {amount && (
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              ≈ ${Number(amount).toFixed(2)} USD
            </p>
            <p className="text-sm text-muted-foreground">
              ≈ Rp {(Number(amount) * IDR_RATE).toLocaleString("id-ID")} IDR
            </p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="recipient">
          Recipient Address
        </label>
        <Input
          id="recipient"
          placeholder="0x..."
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>

      <Button
        className="w-full"
        disabled={!amount || !recipient || isLoading}
        onClick={handleTransferClick}
      >
        {isLoading ? "Transferring..." : "Transfer"}
      </Button>

      {txHash && (
        <a
          href={`https://testnet.snowtrace.io/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:text-blue-600 block text-center"
        >
          View transaction on Explorer
        </a>
      )}

      <Button variant="outline" onClick={() => disconnect()} className="w-full">
        Disconnect
      </Button>
    </>
  );
}
