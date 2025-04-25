import { Address, parseEther, PublicClient } from "viem";

import { simulateBuy, tradeCoin } from "@zoralabs/coins-sdk";
import { Hex } from "viem";
import { createWalletClient } from "viem";
import { http } from "viem";
import { createPublicClient } from "viem";
import { base } from "viem/chains";
import dotenv from "dotenv";

dotenv.config();
      

export async function simulateCoinBuy({
    target,
    address,
    requestedOrderSize,
    publicClient
}: {
    target: Address;
    address: Hex;
    requestedOrderSize: bigint;
    publicClient: PublicClient;
}) {
    try {
      console.log(`Starting simulation for contract: ${target}`);
      console.log(`Requested order size: ${requestedOrderSize} wei`);
      
      const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
      
   

      // Check if public client is valid
      console.log("Checking public client validity...");
      if (!publicClient) {
        throw new Error("Public client is undefined or null");
      }
      console.log("Public client type:", typeof publicClient);
      console.log("Public client methods:", Object.keys(publicClient));
      

      const buyParams = {
        direction: "buy" as const,
        target: target as Address,
        args: {
          recipient: address as Address, // Where to receive the purchased coins
          orderSize: parseEther("0.00001"), // Amount of ETH to spend
          minAmountOut: BigInt(0), // Minimum amount of coins to receive (0 = no minimum)
        }
      };

      // const simulation = await tradeCoin(buyParams, walletClient, publicClient);
      // console.log("Simulation:", simulation);
      
      const simulation = await simulateBuy({
        target,
        requestedOrderSize,
        publicClient,
      });
      console.log("Simulation:", simulation);
      
      console.log("Simulation successful");
      console.log("Order size", simulation.orderSize);
      console.log("Amount out", simulation.amountOut);
      
      return simulation;
    } catch (error) {
      console.error("Simulation failed with error:", error);
      throw error;
    }
  }