'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains([goerli], [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY ?? '' }),
    publicProvider(),
])

const { connectors } = getDefaultWallets({ appName: 'My test app', chains })

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
})

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    )
}
