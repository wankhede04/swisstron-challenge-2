import { ethers } from "hardhat";

async function read() {
  const swisstronContract = process.env.SWISSTRON_CONTRACT || "";
  const value = BigInt(await ethers.provider.getStorageAt(swisstronContract, 0)).toString();
  console.log("Private Data `_value`: ", value);
}

read().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
