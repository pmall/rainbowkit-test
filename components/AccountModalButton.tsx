'use client';

import { useAccountModal } from '@rainbow-me/rainbowkit';
import { Button } from "./Button";

export function AccountModalButton({ children = null }: { children?: React.ReactNode }) {
    const { openAccountModal } = useAccountModal();

    return <Button onClick={openAccountModal}>{children}</Button>
}
