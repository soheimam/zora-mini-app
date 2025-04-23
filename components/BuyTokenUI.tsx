'use client'

import { useState } from 'react'

interface BuyTokenUIProps {
  onBuy?: (amount: string) => void;
}

export function BuyTokenUI({ onBuy }: BuyTokenUIProps) {
  const [amount, setAmount] = useState<string>("0")
  
  const handleBuy = () => {
    if (onBuy && amount !== "0") {
      onBuy(amount);
    }
  };
  
  const handleQuickAmount = (amount: string) => {
    setAmount(amount);
  };
  
  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Tab buttons */}
      <div className="flex mb-6">
        <button className="flex-1 py-4 px-8 text-xl font-medium bg-green-100 text-green-600 rounded-l-lg">
          Buy
        </button>
        <button className="flex-1 py-4 px-8 text-xl font-medium text-gray-600 bg-gray-100 rounded-r-lg">
          Sell
        </button>
        <div className="ml-auto flex items-center text-lg text-gray-500">
          Balance <span className="ml-2 font-medium text-gray-700">0 ETH</span>
        </div>
      </div>
      
      {/* Input field */}
      <div className="bg-gray-100 p-6 rounded-lg mb-6 flex items-center justify-between">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="text-5xl font-medium bg-transparent w-1/2 outline-none"
          placeholder="0"
        />
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-2">
            <span className="text-white">Ξ</span>
          </div>
          <span className="text-2xl font-medium">ETH</span>
          <button className="ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Quick amount buttons */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <button 
          onClick={() => handleQuickAmount("0.001")}
          className="py-4 px-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
        >
          0.001 ETH
        </button>
        <button 
          onClick={() => handleQuickAmount("0.01")}
          className="py-4 px-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
        >
          0.01 ETH
        </button>
        <button 
          onClick={() => handleQuickAmount("0.1")}
          className="py-4 px-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
        >
          0.1 ETH
        </button>
        <button className="py-4 px-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">
          Max
        </button>
      </div>

      {/* Buy button */}
      <button 
        onClick={handleBuy}
        className="w-full py-6 bg-green-500 hover:bg-green-600 transition-colors text-white text-xl font-medium rounded-lg"
      >
        Buy
      </button>
    </div>
  )
} 