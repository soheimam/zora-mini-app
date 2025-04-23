"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useAccount } from "wagmi";
import { Button } from "./DemoComponents";
import { Icon } from "./DemoComponents";
import { useMiniKit, useAddFrame } from "@coinbase/onchainkit/minikit";

export function WalletConnectLayout() {
  const { isConnected } = useAccount();
  const { context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const addFrame = useAddFrame();

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (!isConnected) return null;
    
    if (context && !context.client.added) {
      return (
        <Button
          variant="primary"
          size="md"
          onClick={handleAddFrame}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
          icon={<Icon name="plus" size="sm" />}
        >
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-md font-bold text-pink-500 animate-pulse">
          <Icon name="check" size="sm" className="text-pink-500" />
          <span>Frame Saved!</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame, isConnected]);
  
  if (!isConnected) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <div className="w-full flex justify-center items-center py-3">
          <Wallet>
            <ConnectWallet>
              <Button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg">
                Connect Wallet
              </Button>
            </ConnectWallet>
          </Wallet>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-4 py-3">
      <header className="flex justify-between items-center h-11">
        <div>
          <div className="flex items-center space-x-2">
            <Wallet className="z-10">
              <ConnectWallet>
                <Name className="text-inherit" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        </div>
        <div>{saveFrameButton}</div>
      </header>
    </div>
  );
} 