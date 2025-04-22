import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";

interface MintComponentProps {
  title: string;
  tokenImage: string;
  tokenName: string;
  priceInEth: string;
  priceInUsd: string;
  verified?: boolean;
}

export function MintComponent({
  title,
  tokenImage,
  tokenName,
  priceInEth,
  priceInUsd,
  verified = false,
}: MintComponentProps) {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-xl bg-gray-950 text-white border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          <Image 
            src={tokenImage} 
            alt={tokenName} 
            fill 
            className="object-cover"
          />
        </div>
        <span className="text-lg font-medium">{tokenName}</span>
        {verified && (
          <svg 
            className="w-5 h-5 text-blue-500" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
          </svg>
        )}
      </div>
      
      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-6 bg-black flex items-center justify-center">
        <Image 
          src={tokenImage} 
          alt={title}
          fill
          className="object-contain"
        />
      </div>
      
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      
      <div className="flex items-center mb-6">
        <button 
          onClick={decreaseQuantity}
          className="w-12 h-12 flex items-center justify-center text-xl font-medium border border-gray-700 rounded-l-md bg-gray-900 hover:bg-gray-800"
        >
          -
        </button>
        <div className="w-full h-12 flex items-center justify-center text-xl font-medium border-t border-b border-gray-700 bg-gray-900">
          {quantity}
        </div>
        <button 
          onClick={increaseQuantity}
          className="w-12 h-12 flex items-center justify-center text-xl font-medium border border-gray-700 rounded-r-md bg-gray-900 hover:bg-gray-800"
        >
          +
        </button>
      </div>
      
      <div className="mb-6 text-lg">
        <span>{priceInEth} ETH</span>
        <span className="text-gray-400 ml-3">~</span>
        <span className="text-gray-400 ml-3">${priceInUsd}</span>
      </div>
      
      <Button className="w-full py-6 text-lg font-medium bg-indigo-500 hover:bg-indigo-600 transition-colors rounded-md">
        Connect Wallet
      </Button>
    </div>
  );
} 