solc = require("solc");
fs=require("fs");
var { Web3 }=require("web3");
let web3=new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
let fileContent = fs.readFileSync("Simplestorage.sol").toString();
console.log(fileContent);
var input = {
    language: "Solidity",
    sources: {
      "Sample.sol": {
        content: fileContent,
      },
    },
  
    settings: {
      outputSelection: {
        "*": {
          "": [""],
        },
      },

    },
};
var output=JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output);
ABI=output.contracts["Simplestorage.sol"]["Simplestorage"].abi;
bytecode=output.contracts["Simplestorage.sol"]["Simplestorage"].evm.bytecode.object;
console.log(ABI);
console.log(bytecode);

contract=new web3.eth.Contract(ABI);
web3.eth.getAccounts().then((accounts)=>{
    console.log("Accounts:",accounts);
    defaultAccount=accounts[0];
    console.log("Default Account",defaultAccount);
    contract
    .deploy({data:bytecode})
    .send({from:defaultAccount,gas:500000})
    .on("receipt",(receipt)=>{
        console.log("Contract Address:",receipt.contractAddress);
    })
    .then((SampleContract)=>{
        SampleContract.methods.x().call((err,data)=>{
            console.log("Initial value:",data);
        });
    });
});
