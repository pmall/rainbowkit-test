'use client';

import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Button } from "./Button";

export function ConnectModalButton({ children = null }: { children?: React.ReactNode }) {
    const { openConnectModal } = useConnectModal();

    return <Button onClick={openConnectModal}>{children}</Button>
}
