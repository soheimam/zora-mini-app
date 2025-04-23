'use client'
import React from 'react'
import {
 
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";

interface FooterButtonsProps {
  onReset: () => void
}

export function FooterButtons({ onReset }: FooterButtonsProps) {
  const openUrl = useOpenUrl();

  const handleSendShoutout = () => {
    // Create a personalized shoutout message
    const shoutoutMessage = `Not financial advice. Just personal branding`;
    
    // Open Warpcast with a prefilled message
    openUrl(`https://warpcast.com/~/compose?text=${encodeURIComponent(shoutoutMessage)}`);
  };

  return (
    <div className="flex justify-center mt-4 mb-6 gap-3">
      <button 
        onClick={handleSendShoutout}
        className="border border-gray-700 hover:border-lime-300 text-gray-400 py-3 px-6 font-mono tracking-wider transition-colors duration-300">
        Share on Warpcast
      </button>
      <button 
        onClick={onReset}
        className="border border-gray-700 hover:border-lime-300 text-gray-400 py-3 px-6 font-mono tracking-wider transition-colors duration-300">
        Try another handle
      </button>
    </div>
  )
} 