'use client';

import { useEffect, useState } from 'react';
import { useNetwork, useAccount } from 'wagmi';
import { Button } from './Button';
import { ChainModalButton } from './ChainModalButton';
import { AccountModalButton } from './AccountModalButton';
import { ConnectModalButton } from './ConnectModalButton';

export function WalletButton() {
    const [hasMounted, setHasMounted] = useState<boolean>(false)
    const { chain } = useNetwork()
    const { address, isConnecting, isConnected, isDisconnected } = useAccount()

    useEffect(() => {
        setHasMounted(true)
    }, [])

    if (!hasMounted) return null;

    if (isConnecting) {
        return <Button disabled>Connecting...</Button>
    }

    if (isConnected && chain?.unsupported) {
        return <ChainModalButton>Wrong network</ChainModalButton>
    }

    if (isConnected && !chain?.unsupported) {
        return <AccountModalButton>{`${address?.slice(0, 4)}...${address?.slice(-4)}`}</AccountModalButton>
    }

    if (isDisconnected) {
        return <ConnectModalButton>Connect wallet</ConnectModalButton>
    }

    return null;
}
