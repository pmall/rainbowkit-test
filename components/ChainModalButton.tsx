'use client';

import { useChainModal } from '@rainbow-me/rainbowkit';
import { Button } from "./Button";

export function ChainModalButton({ children = null }: { children?: React.ReactNode }) {
    const { openChainModal } = useChainModal();

    return <Button onClick={openChainModal}>{children}</Button>
}
