import { MintComponent } from "@/components/MintComponent";

export default async function Page({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params;
  
  // In a real app, you would fetch token data based on the slug
  // This is placeholder data to match the image
  const tokenData = {
    title: "OCK Mint Component",
    tokenImage: "/logo.png", // Using existing logo as a placeholder
    tokenName: `${slug}.base.eth`,
    priceInEth: "0.000111",
    priceInUsd: "0.26",
    verified: true
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <MintComponent 
        title={tokenData.title}
        tokenImage={tokenData.tokenImage} 
        tokenName={tokenData.tokenName}
        priceInEth={tokenData.priceInEth}
        priceInUsd={tokenData.priceInUsd}
        verified={tokenData.verified}
      />
    </div>
  );
}