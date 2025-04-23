import { publicClient } from "@/lib/viem";
import { getWalletClient } from "@/lib/viem";
import { tradeCoin } from "@zoralabs/coins-sdk";
import { Address, parseEther, Hex } from "viem";
 

 
// Define buy parameters


 
// Execute the buy
export async function buyCoin(account: Hex, target: Address, amount: string) {
    const buyParams = {
        direction: "buy" as const,
        target: target as Address,
        args: {
          recipient: account as Address, // Where to receive the purchased coins
          orderSize: parseEther(amount), // Amount of ETH to spend
          minAmountOut: BigInt(0), // Minimum amount of coins to receive (0 = no minimum) 
        }
      };

    const walletClient = getWalletClient(account);

    const result = await tradeCoin(buyParams, walletClient, publicClient);
  
  console.log("Transaction hash:", result.hash);
  console.log("Trade details:", result.trade);
  
  return result;
}