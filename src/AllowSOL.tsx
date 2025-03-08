import * as React from 'react'
import { useWriteContract } from 'wagmi'

export function AllowSOL() {
  const { data: hash, writeContract } = useWriteContract()

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault();
    writeContract({
      address: '0xD31a59c85aE9D8edEFeC411D448f90841571b89c', // Wormhole Wrapped SOL (Ethereum)
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
      <input name="tokenId" placeholder="0" required />
      <button type="submit">Approve SOL token</button>
      {hash && <div>Transaction Hash: {hash}</div>}
    </form>
  )
}