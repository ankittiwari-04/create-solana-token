import {
  Connection,
  Keypair,
} from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import fs from "fs";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

function getWallet() {
  const walletPath = "./wallet.json";
  
  if (fs.existsSync(walletPath)) {
    const secretKey = JSON.parse(fs.readFileSync(walletPath, "utf-8"));
    return Keypair.fromSecretKey(Uint8Array.from(secretKey));
  } else {
    const wallet = Keypair.generate();
    fs.writeFileSync(walletPath, JSON.stringify(Array.from(wallet.secretKey)));
    console.log("New wallet created");
    return wallet;
  }
}

async function main() {
  console.log("Creating Solana Token\n");
  
  const wallet = getWallet();
  console.log("Wallet:", wallet.publicKey.toString());
  
  const balance = await connection.getBalance(wallet.publicKey);
  console.log("Balance:", balance / 1000000000, "SOL");
  
  if (balance === 0) {
    console.log("\nGetting SOL from faucet...");
    try {
      const sig = await connection.requestAirdrop(wallet.publicKey, 2000000000);
      await connection.confirmTransaction(sig);
      console.log("Airdrop successful");
    } catch (e) {
      console.log("\nAirdrop failed. Please get SOL manually from:");
      console.log("https://faucet.solana.com");
      console.log("Your wallet:", wallet.publicKey.toString());
      return;
    }
  }
  
  console.log("\nCreating token mint...");
  const mint = await createMint(
    connection,
    wallet,
    wallet.publicKey,
    wallet.publicKey,
    9
  );
  
  console.log("\nToken created successfully");
  console.log("Mint Address:", mint.toString());
  console.log(`\nView on Explorer:\nhttps://explorer.solana.com/address/${mint.toString()}?cluster=devnet`);
}

main().catch(console.error);