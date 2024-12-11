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
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const fiatRate = 1850;

  const handleConnect = async () => {
    try {
      await connect({ connector: injected() });
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Crypto Transfer</CardTitle>
          <CardDescription>Transfer USDT/USDC on testnet</CardDescription>
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

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="amount">
                  Amount (USDT)
                </label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                {amount && (
                  <p className="text-sm text-muted-foreground">
                    ≈ ${(Number.parseFloat(amount) * fiatRate).toFixed(2)} USD
                  </p>
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

              <Button className="w-full" disabled={!amount || !recipient}>
                Transfer
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
