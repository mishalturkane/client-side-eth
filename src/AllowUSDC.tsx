import * as React from 'react'
import { useWriteContract } from 'wagmi'

export function AllowUSDC() {
  const { data: hash, writeContract } = useWriteContract()

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault();
    writeContract({
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC Ethereum contract
      abi: [{
        "constant": false,
        "inputs": [
          {
            "name": "_spender",
            "type": "address"
          },
          {
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }],
      functionName: 'approve',
      args: ["0x2966473D85A76A190697B5b9b66b769436EFE8e5", BigInt(1)],
    })
  } 

  return (
    <form onSubmit={submit}>
      <input name="tokenId" placeholder="69420" required />
      <button type="submit">Approve USDC token</button>
      {hash && <div>Transaction Hash: {hash}</div>}
    </form>
  )
}