"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WalletConnection } from "@/components/WalletConnection";
import { TransferForm } from "@/components/TransferForm";
import { useWalletConnection } from "@/hooks/useWalletConnection";

export default function Home() {
  const { isConnected } = useWalletConnection();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Crypto Transfer</CardTitle>
          <CardDescription>Transfer USDC on Avalanche Fuji</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? <WalletConnection /> : <TransferForm />}
        </CardContent>
      </Card>
    </main>
  );
}
