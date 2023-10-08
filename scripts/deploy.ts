import hre from "hardhat";

async function main() {
  console.log("Swisstronik deploying ...");
  const contract = await hre.ethers.deployContract("Swisstronik", [`${process.env.INIT_VALUE}`]);
  await contract.deployed();

  console.log("Swisstronik deployed: ", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
