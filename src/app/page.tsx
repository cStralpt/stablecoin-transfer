"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useWriteContract,
  useReadContract,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { type Address, parseUnits } from "viem";
import { TOKEN_ABI, USDC_ADDRESS } from "@/lib/contracts/token-abi";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const { writeContractAsync } = useWriteContract();

  const { data: balance } = useReadContract({
    address: USDC_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [address as Address],
  });

  const idrRate = 15700;

  const handleConnect = async () => {
    try {
      connect({ connector: injected() });
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  const handleTransfer = async () => {
    if (!amount || !recipient) return;

    try {
      setIsLoading(true);
      const parsedAmount = parseUnits(amount, 6);

      await writeContractAsync({
        address: USDC_ADDRESS,
        abi: TOKEN_ABI,
        functionName: "transfer",
        args: [recipient as Address, parsedAmount],
      });

      setAmount("");
      setRecipient("");
    } catch (error) {
      console.error("Transfer failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Crypto Transfer</CardTitle>
          <CardDescription>Transfer USDC on Avalanche Fuji</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <Button onClick={handleConnect} className="w-full">
              Connect Wallet
            </Button>
          ) : (
            <>
              <div className="space-y-2">
                <h1 className="text-sm font-medium">Connected Address</h1>
                <p className="text-sm text-muted-foreground break-all">
                  {address}
                </p>
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
                      ≈ Rp {(Number(amount) * idrRate).toLocaleString('id-ID')} IDR
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
                onClick={handleTransfer}
              >
                {isLoading ? "Transferring..." : "Transfer"}
              </Button>

              <Button
                variant="outline"
                onClick={() => disconnect()}
                className="w-full"
              >
                Disconnect
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
