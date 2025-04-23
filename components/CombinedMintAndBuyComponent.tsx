'use client'

import Image from "next/image";
import { useState, useMemo } from "react";
import { useAccount } from "wagmi";
import { Hex, Address, parseEther, formatEther, type PublicClient } from "viem";
import { buyCoin } from "./BuyCoin";
import { simulateCoinBuy } from "@/lib/zora";
// import { publicClient } from "@/lib/viem";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";

interface CombinedMintAndBuyProps {
  tokenAddress: string;
  tokenImage: string;
  tokenName: string;
  priceInEth: string;
  priceInUsd: string;
  coinAddress?: Address;
}

export function CombinedMintAndBuy({
  tokenImage = "/placeholder-token.png",
  tokenName = "Token",
  priceInEth = "0.000111",
  priceInUsd = "0.26",
}: Partial<CombinedMintAndBuyProps>) {
  // Use the specified contract address
  const coinAddress = "0x3aa49e8bbd095b7fef05f5868afb0604a89c9a96" as Address;
  
  const [buyAmount, setBuyAmount] = useState<string>("0.001");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<{
    amountOut: bigint;
    orderSize: bigint;
  } | null>(null);
  const [isReadyToBuy, setIsReadyToBuy] = useState<boolean>(false);
  const [simulationError, setSimulationError] = useState<string | null>(null);
  const { address } = useAccount();
  
  // Calculate price impact
  const priceImpact = useMemo(() => {
    if (!simulationResult) return null;
    
    const rate = parseFloat(formatEther(simulationResult.amountOut)) / 
                parseFloat(formatEther(simulationResult.orderSize));
    
    const baseRate = parseFloat(priceInEth) > 0 ? 1 / parseFloat(priceInEth) : 0;
    
    if (baseRate === 0) return null;
    
    const impact = Math.abs((rate - baseRate) / baseRate * 100);
    return isNaN(impact) ? null : impact;
  }, [simulationResult, priceInEth]);
  
  const handleQuickAmount = (amount: string) => {
    setBuyAmount(amount);
    setIsReadyToBuy(false);
    setSimulationResult(null);
    setSimulationError(null);
  };
  
  const handleAmountChange = (value: string) => {
    setBuyAmount(value);
    setIsReadyToBuy(false);
    setSimulationResult(null);
    setSimulationError(null);
  };

  const runSimulation = async () => {
    if (!buyAmount || buyAmount === "0") return;
    
    try {
      setIsSimulating(true);
      setSimulationError(null);
      
      // Validate input is a number
      if (isNaN(parseFloat(buyAmount))) {
        throw new Error("Please enter a valid number");
      }
      
      console.log("Simulating buy for", coinAddress, "with amount", buyAmount);
      
      const simulation = await simulateCoinBuy({
        target: coinAddress,
        address: address as Hex,
        requestedOrderSize: parseEther(buyAmount)
      });
      
      console.log("Simulation result:", simulation);
      
      setSimulationResult(simulation);
      setIsReadyToBuy(true);
      setIsSimulating(false);
    } catch (error) {
      console.error("Simulation error:", error);
      setSimulationError(error instanceof Error ? error.message : "Failed to simulate transaction");
      setIsSimulating(false);
      setIsReadyToBuy(false);
    }
  };
  
  const handleBuy = () => {
    if (address && buyAmount && buyAmount !== "0" && isReadyToBuy) {
      buyCoin(address as Hex, coinAddress, buyAmount);
      // Reset state after purchase
      setSimulationResult(null);
      setIsReadyToBuy(false);
      setBuyAmount("0.001");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#141720] text-white rounded-2xl overflow-hidden shadow-xl">
      {/* Token Address */}
      <div className="p-3 text-center text-xs font-mono text-gray-400 truncate border-b border-gray-800">
        {coinAddress}
      </div>
      <ConnectWallet />
      
      {/* Token Image */}
      <div className="relative w-full aspect-square bg-black flex items-center justify-center">
        <Image 
          src={tokenImage}
          alt={tokenName}
          fill
          className="object-contain"
        />
      </div>
      
      {/* Token Name and Price Section */}
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-2">{tokenName.length > 20 ? tokenName.substring(0, 10) + '...' : tokenName}</h2>
        
        {/* Price Info */}
        <div className="text-lg">
          <span>{priceInEth} ETH</span>
          <span className="text-gray-400 ml-2">~</span>
          <span className="text-gray-400 ml-2">${priceInUsd}</span>
        </div>
      </div>
      
      {/* Buy Tab */}
      <div className="bg-[#1c202b] px-4 py-2 flex justify-between items-center border-t border-gray-800">
        <button className="py-2 px-6 text-green-400 font-medium">
          Buy
        </button>
        
        <div className="text-sm text-gray-400">
          Balance <span className="text-gray-300 ml-1">0 ETH</span>
        </div>
      </div>
      
      {/* Input Amount Section */}
      <div className="p-5 pt-6">
        <div className="relative mb-6 flex justify-between items-center">
          <input
            type="text"
            value={buyAmount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="text-5xl font-bold bg-transparent w-2/3 outline-none"
            placeholder="0"
          />
          
          <div className="flex items-center">
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white rounded-full py-1.5 px-3">
              <span className="font-medium mr-1">ETH</span>
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <button 
            onClick={() => handleQuickAmount("0.001")}
            className="py-2.5 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 text-sm font-medium"
          >
            0.001 ETH
          </button>
          <button 
            onClick={() => handleQuickAmount("0.01")}
            className="py-2.5 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 text-sm font-medium"
          >
            0.01 ETH
          </button>
          <button 
            onClick={() => handleQuickAmount("0.1")}
            className="py-2.5 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 text-sm font-medium"
          >
            0.1 ETH
          </button>
          <button 
            className="py-2.5 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 text-sm font-medium"
          >
            Max
          </button>
        </div>
        
        {/* Simulation Error */}
        {simulationError && (
          <div className="p-3 bg-red-900/40 mb-4 rounded-lg text-red-300 text-sm">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
              <span>{simulationError}</span>
            </div>
          </div>
        )}

        {/* Simulation Loading */}
        {isSimulating && (
          <div className="text-center py-3">
            <div className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-500 mr-2"></div>
            <span className="text-gray-300 text-sm">Simulating transaction...</span>
          </div>
        )}

        {/* Simulation Result - Simplified */}
        {simulationResult && (
          <div className="p-3 bg-gray-800/50 mb-4 rounded-lg border border-gray-700">
            {priceImpact !== null && priceImpact > 5 && (
              <div className={`mb-2 px-3 py-2 rounded-md text-xs flex items-start ${
                priceImpact > 15 
                  ? 'bg-red-900/40 text-red-300' 
                  : 'bg-yellow-900/40 text-yellow-300'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92z" clipRule="evenodd" />
                  <path d="M10 8a1 1 0 00-1 1v2a1 1 0 102 0V9a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
                <div>Price impact: {priceImpact.toFixed(2)}%</div>
              </div>
            )}
            
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-gray-400">You&apos;ll receive</span>
              <span className="text-white font-medium">{parseFloat(formatEther(simulationResult.amountOut)).toFixed(6)} {tokenName}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Rate</span>
              <span className="text-gray-300">1 ETH = {(parseFloat(formatEther(simulationResult.amountOut)) / parseFloat(formatEther(simulationResult.orderSize))).toFixed(2)} {tokenName}</span>
            </div>
          </div>
        )}

        {/* Buy Button - Changed to explicitly differentiate between Simulate and Buy */}
        <button 
          onClick={isReadyToBuy ? handleBuy : runSimulation}
          disabled={isSimulating}
          className={`w-full py-3.5 ${
            isSimulating 
              ? 'bg-gray-600 cursor-wait'
              : isReadyToBuy 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors text-white text-lg font-medium rounded-md`}
        >
          {isSimulating ? 'Simulating...' : isReadyToBuy ? 'Buy' : 'Simulate Purchase'}
        </button>
      </div>
    </div>
  );
} 