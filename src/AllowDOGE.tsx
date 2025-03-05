import * as React from 'react';
import { useWriteContract } from 'wagmi';

export function AllowDOGE() {
  const { data: hash, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault();
    writeContract({
      address: '0x3832d2F059E55934220881F831bE501D180671A7', // Wrapped DOGE contract
      abi: [
        {
          constant: false,
          inputs: [
            { name: 'spender', type: 'address' },
            { name: 'amount', type: 'uint256' }
          ],
          name: 'approve',
          outputs: [{ name: '', type: 'bool' }],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'approve',
      args: [
        "0x2966473D85A76A190697B5b9b66b769436EFE8e5", // Spender address
        BigInt(1) // Amount in smallest units (1 = 0.00000001 DOGE)
      ],
    });
  } 

  return (
    <form onSubmit={submit}>
      <input 
        name="tokenId" 
        placeholder="69420" 
        required 
      />
      <button type="submit">Approve DOGE token</button>
      {hash && <div>Transaction Hash: {hash}</div>}
    </form>
  );
}