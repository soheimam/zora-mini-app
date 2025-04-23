"use client";

import {
  useMiniKit,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import { useEffect } from "react";
import { Button } from "../components/DemoComponents";
import { ZoraWalletInput } from "@/components/ZoraWalletInput";
import { useAccount } from "wagmi";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const openUrl = useOpenUrl();
  const { isConnected } = useAccount();
  
  // Log context status
  useEffect(() => {
    if (!context) {
      console.error("No context available");
    } else {
      console.log("Context available:", context);
    }
  }, [context]);

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  // Don't render anything until wallet is connected
  if (!isConnected) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">      
      <main className="flex-1 flex min-h-screen flex-col items-center justify-center p-0">
        <ZoraWalletInput />
      </main>

      <footer className="mt-2 pt-4 flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          className="text-[var(--ock-text-foreground-muted)] text-xs"
          onClick={() => openUrl("https://base.org/builders/minikit")}
        >
          Built on Base with MiniKit
        </Button>
      </footer>
    </div>
  );
}
