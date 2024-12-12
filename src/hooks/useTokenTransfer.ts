import { useState } from "react";
import { useWriteContract, useReadContract } from "wagmi";
import { type Address, parseUnits } from "viem";
import { TOKEN_ABI, USDC_ADDRESS } from "@/lib/contracts/token-abi";

export function useTokenTransfer(address: Address | undefined) {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { writeContractAsync } = useWriteContract();
  const { data: balance } = useReadContract({
    address: USDC_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [address as Address],
  });

  const handleTransfer = async () => {
    if (!amount || !recipient) return;

    try {
      setIsLoading(true);
      const parsedAmount = parseUnits(amount, 6);

      const hash = await writeContractAsync({
        address: USDC_ADDRESS,
        abi: TOKEN_ABI,
        functionName: "transfer",
        args: [recipient as Address, parsedAmount],
      });

      setAmount("");
      setRecipient("");
      return hash;
    } catch (error) {
      console.error("Transfer failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    amount,
    setAmount,
    recipient,
    setRecipient,
    isLoading,
    balance,
    handleTransfer,
  };
} 