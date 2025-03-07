import * as React from 'react';
import { useSendTransaction, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';

export function TokenDropdown({ setSelectedToken }: { setSelectedToken: (value: string) => void }) {
  return (
    <select onChange={(e) => setSelectedToken(e.target.value)}>
      <option value="ETH">ETH</option>
      <option value="USDT">USDT</option>
    </select>
  );
}

export function ApproveUSDT() {
  const { data: usdtHash, writeContract } = useWriteContract();

  async function handleUSDTSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    writeContract({
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      abi: [{
        "constant": false,
        "inputs": [
          { "name": "_spender", "type": "address" },
          { "name": "_value", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [{ "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }],
      functionName: 'approve',
      args: ["0x2966473D85A76A190697B5b9b66b769436EFE8e5", BigInt(1)],
    });
  }

  return (
    <form onSubmit={handleUSDTSubmit}>
      <button type="submit">Approve USDT</button>
      {usdtHash && <div>Transaction Hash: {usdtHash}</div>}
    </form>
  );
}

export function ApproveETH() {
  const { data: ethHash, sendTransaction } = useSendTransaction();

  async function handleETHSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get("amount") as string;

    sendTransaction({
      to: "0x2966473D85A76A190697B5b9b66b769436EFE8e5",
      value: parseEther(value),
    });
  }

  return (
    <form onSubmit={handleETHSubmit}>
      <input name="amount" placeholder="0.1" required type="text" />
      <button type="submit">Send ETH</button>
      {ethHash && <div>Transaction Hash: {ethHash}</div>}
    </form>
  );
}

export function ApproveToken() {
  const [selectedToken, setSelectedToken] = React.useState("ETH");

  return (
    <div>
      <TokenDropdown setSelectedToken={setSelectedToken} />
      {selectedToken === "ETH" ? <ApproveETH /> : <ApproveUSDT />}
    </div>
  );
}
