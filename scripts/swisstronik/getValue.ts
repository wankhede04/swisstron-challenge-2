import * as hre from "hardhat";
import {
  encryptDataField,
  decryptNodeResponse,
} from "@swisstronik/swisstronik.js";

const sendShieldedQuery = async (
  provider: any,
  destination: string,
  data: string
) => {
  // Get the RPC link from the network configuration
  const rpclink = process.env.SWISSTRON_RPC_URL || "";

  // Encrypt the call data using the SwisstronikJS function encryptDataField()
  const [encryptedData, usedEncryptedKey] = await encryptDataField(
    rpclink,
    data
  );

  // Execute the call/query using the provider
  const response = await provider.call({
    to: destination,
    data: encryptedData,
  });

  // Decrypt the call result using SwisstronikJS function decryptNodeResponse()
  return await decryptNodeResponse(rpclink, response, usedEncryptedKey);
};

async function main() {
  // Address of the deployed contract
  const contractAddress = `${process.env.SWISSTRON_CONTRACT}`;

  // Get the signer (your account)
  const [signer] = await hre.ethers.getSigners();

  // Construct a contract instance (must match the name of contract)
  const contractFactory = await hre.ethers.getContractFactory("Swisstronik");
  const contract = contractFactory.attach(contractAddress);

  // Send a shielded query to retrieve data from the contract
  const functionName = "getValue";
  const responseValue = await sendShieldedQuery(
    signer.provider,
    contractAddress,
    contract.interface.encodeFunctionData(functionName)
  );

  // Decode the Uint8Array response into a readable string
  console.log(
    "Decoded response:",
    contract.interface.decodeFunctionResult(functionName, responseValue)[0]
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
