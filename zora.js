import { tradeCoin } from "@zoralabs/coins-sdk";
import { base } from "viem/chains";
import { createPublicClient } from "viem";
import { createWalletClient } from "viem";
import { http } from "viem";

async function main() {
    const publicClient = createPublicClient({
        chain: base,
        transport: http("https://api.developer.coinbase.com/rpc/v1/base/s9j9Te89XGVAVeKPRC26ts1NfPWSZD5s"),
      });

    const walletClient = createWalletClient({
        chain: base,
        account: "0xd9adc4107d6b79bbd96b1bea4db20ff72c64121b",
        transport: http("https://api.developer.coinbase.com/rpc/v1/base/s9j9Te89XGVAVeKPRC26ts1NfPWSZD5s"),
      });

        const buyParams = {
            target: "0x3aa49e8bbd095b7fef05f5868afb0604a89c9a96",
            direction: "buy",
            args: {
                recipient: "0xd9adc4107d6b79bbd96b1bea4db20ff72c64121b",
                orderSize: BigInt("100000000000000"),
                minAmountOut: BigInt("0"),
            },
        }
    const simulation = await tradeCoin(buyParams, walletClient, publicClient);

    console.log(simulation);
}

main();