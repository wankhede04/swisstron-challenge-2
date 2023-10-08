import { ethers } from "hardhat";

async function main() {
  console.log("Swisstron deploying ...");
  const contract = await ethers.getContractFactory("Swisstronik");
  const instance = await contract.deploy(`${process.env.INIT_VALUE}`);
  await instance.deployed();
  console.log("Swisstron deployed: ", instance.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
