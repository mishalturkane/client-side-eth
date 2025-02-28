import * as React from 'react';
import { useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';

export function SendETH() {
  const { data: hash, sendTransaction } = useSendTransaction();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get("amount") as string;

    sendTransaction({
      to: "0x2966473D85A76A190697B5b9b66b769436EFE8e5",
      value: parseEther(value),
    });
  }
  return (
    <form onSubmit={submit}>
      <input name="amount" placeholder="0.1" required type="text" />
      <button type="submit">Send ETH</button>
      {hash && <div>Transaction Hash: {hash}</div>}
    </form>
  );
}
