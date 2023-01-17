'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from 'wagmi';
import { utils, BigNumber } from 'ethers';

import { Button } from '../components/Button';

export default function Home() {
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()

  const [to, setTo] = useState<string>('')
  const [debouncedTo] = useDebounce(to, 500)

  const [amount, setAmount] = useState<string>('')
  const [debouncedAmount] = useDebounce(amount, 500)

  const parsedAmount = debouncedAmount ? utils.parseEther(debouncedAmount) : BigNumber.from(0)

  const prepare = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: parsedAmount,
    },
  })

  const tx = useSendTransaction(prepare.config)

  const result = useWaitForTransaction({
    hash: tx.data?.hash,
  })

  const preparing = prepare.isLoading

  const sending = tx.isLoading || result.isLoading

  const valid = true
    && to === debouncedTo
    && amount === debouncedAmount
    && debouncedTo.trim().length > 0
    && debouncedAmount.trim().length > 0
    && parsedAmount.gt(BigNumber.from(0))
    && !prepare.isError

  const disabled = preparing || sending || !valid

  const isError = isConnected && (prepare.isError || tx.isError)

  const isSuccess = isConnected && result.isSuccess && !isError

  const error = prepare.error || tx.error

  return (
    <main>
      <h1 className="mb-4 text-3xl font-bold underline">
        Send transaction
      </h1>
      <form onSubmit={e => { e.preventDefault(); tx.sendTransaction?.() }}>
        <div className="flex flex-col space-y-4 w-80 mx-auto">
          <label className="block">
            <span className="text-gray-700">Recipient</span>
            <input
              type="text"
              placeholder="recipient"
              className="block rounded w-full"
              onChange={e => setTo(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Amount</span>
            <input
              type="number"
              step="any"
              placeholder="amount"
              className="block rounded w-full"
              onChange={e => setAmount(e.target.value)}
            />
          </label>
          {isConnected && (
            <Button type="submit" disabled={disabled}>
              {sending ? 'Sending...' : 'Send'}
            </Button>
          )}
          {!isConnected && (
            <Button onClick={() => openConnectModal?.()}>
              Plase connect your wallet
            </Button>
          )}
          {isSuccess && (
            <p className="text-green-600">
              <a
                className="block"
                href={`https://etherscan.io/tx/${tx.data?.hash}`}
                target="_blank"
              >Successfully sent {amount} ether to {to}</a>
            </p>
          )}
          {isError && (
            <pre className="text-red-500">{JSON.stringify(error, null, 2)}</pre>
          )}
        </div>
      </form>
    </main>
  )
}
