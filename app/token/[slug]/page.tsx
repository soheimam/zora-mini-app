import { CombinedMintAndBuy } from "@/components/CombinedMintAndBuyComponent";

import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params;
  
  if (!slug) {
    notFound();
  }
  
  // In a real app, you would fetch token data based on the slug
  // This is placeholder data to match the image
  const tokenData = {
    tokenAddress: "0x3aa49e8bbd095b7fef05f5868afb0604a89c9a96",
    title: "OCK Mint Component",
    tokenImage: "/logo.png", // Using existing logo as a placeholder
    tokenName: `${slug}.base.eth`,
    priceInEth: "0.000111",
    priceInUsd: "0.26",
    verified: true
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      
      <CombinedMintAndBuy
        tokenAddress={tokenData.tokenAddress}
        tokenImage={tokenData.tokenImage}
        tokenName={tokenData.tokenName}
        priceInEth={tokenData.priceInEth}
        priceInUsd={tokenData.priceInUsd}
      />
    </div>
  );
}