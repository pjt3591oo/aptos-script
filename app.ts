import { readFileSync } from "fs";
import { 
  Aptos, 
  Account, 
  AccountAddress, 
  parseTypeTag, 
  Network, 
  AptosConfig, 
  Ed25519PrivateKey, 
  U64,
  MoveVector
} from "@aptos-labs/ts-sdk";
 
const network = Network.TESTNET;
const config = new AptosConfig({ network });
const aptos = new Aptos(config);

// sender privatekey
const PK = '0x14e2bd711e809f858ef971fce9cbe5c21c36d9e604a4173b7858d90a2eb9189c'
const account = Account.fromPrivateKey({
  privateKey: new Ed25519PrivateKey(PK),
});
 
const buffer = readFileSync("./move/script.mv");
const bytecode = Uint8Array.from(buffer);
 
async function main() {
  const receiver0 = AccountAddress.from("0xe179330f98a154a7d5cdd2369eff026ee4f2265c53b57e75a2e97d8cbe14a1e4");
  const receiver1 = AccountAddress.from("0x1bf7d2330270e881df4e9cc7ed9b5d23e4cdc07395bf963109857349ac1d86ba");
  
  const amount = new U64(2);
  // const amounts = new MoveVector([amount, amount]);
  const receivers = new MoveVector([receiver0, receiver1])
  
  const transaction = await aptos.transaction.build.simple({
    sender: account.accountAddress,
    data: {
      bytecode,
      typeArguments: [parseTypeTag("0x1::aptos_coin::AptosCoin")],
      functionArguments: [receivers, amount],
    },
  });
   
  const pendingTxn = await aptos.signAndSubmitTransaction({
    signer: account,
    transaction,
  });
  
  await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
}

main();