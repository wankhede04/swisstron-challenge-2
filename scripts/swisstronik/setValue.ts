import * as hre from "hardhat";
import { encryptDataField } from "@swisstronik/swisstronik.js";

const sendShieldedTransaction = async (
  signer: any,
  destination: string,
  data: string,
  value: number
) => {
  const rpclink = process.env.SWISSTRON_RPC_URL || "";
  const [encryptedData] = await encryptDataField(rpclink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  // Address of the deployed contract
  const contractAddress = `${process.env.SWISSTRON_CONTRACT}`;

  // Get the signer (your account)
  const [signer] = await hre.ethers.getSigners();

  // Construct a contract instance
  const contractFactory = await hre.ethers.getContractFactory("Swisstronik");
  const contract = contractFactory.attach(contractAddress);

  // Send a shielded transaction to set a value in the contract
  const setValueTx = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData("setValue", [
      `${process.env.NEW_VALUE}`,
    ]),
    0
  );
  await setValueTx.wait();

  //It should return a TransactionResponse object
  console.log("Transaction Receipt: ", setValueTx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
