"use client";

import {
  ThirdwebProvider,
  embeddedWallet,
  metamaskWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const WalletProvider = ({ children }: Props) => {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      supportedWallets={[embeddedWallet(), walletConnect(), metamaskWallet()]}
      activeChain={{
        chainId: process.env.GIT_BRANCH === "main" ? 5040 : 5039,
        rpc:
          process.env.GIT_BRANCH === "main"
            ? ["https://subnets.avax.network/onigiri/mainnet/rpc"]
            : ["https://subnets.avax.network/onigiri/testnet/rpc"],
        nativeCurrency: {
          decimals: 18,
          name:
            process.env.GIT_BRANCH === "main"
              ? "ONIGIRI MAINNET"
              : "ONIGIRI TESTNET",
          symbol: "ONGR",
        },
        icon: {
          url: "/icon.png",
          width: 100,
          height: 100,
          format: "png",
        },
        shortName: "onigiri",
        slug: "onigiri",
        testnet: process.env.GIT_BRANCH === "main" ? false : true,
        chain: "ONIGIRI",
        name:
          process.env.GIT_BRANCH === "main"
            ? "ONIGIRI Mainnet"
            : "ONIGIRI Testnet",
        explorers:
          process.env.GIT_BRANCH === "main"
            ? [
                {
                  name: "ONIGIRI Explorer",
                  url: "https://subnets.avax.network/onigiri",
                  standard: "EIP3091",
                },
              ]
            : [],
      }}
      dAppMeta={{
        name: "Wallet Lottery",
        description: "Wallet Lottery",
        url: "https://www.ongr.org/",
        logoUrl:
          "https://nftstorage.link/ipfs/bafkreieenivbkpmaxslvvvaybi53hynnarng4ek37xhtf5euvsyunvhbai",
        isDarkMode: true,
      }}
    >
      {children}
    </ThirdwebProvider>
  );
};

export default WalletProvider;
