import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransferContainer } from "@/components/TransferContainer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Crypto Transfer</CardTitle>
          <CardDescription>Transfer USDC on Avalanche Fuji</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TransferContainer />
        </CardContent>
      </Card>
    </main>
  );
}
