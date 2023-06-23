solc = require("solc");
fs = require("fs")
Web3 = require("web3")
const provider =  new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545")
web3 = new Web3(provider)

//reading the file 
file = fs.readFileSync("Simplestorage.sol").toString();
console.log(file)


var input={
    language: "Solidity",
    sources:{
        "Simplestorage.sol":{
            content:file,
        },
    },

    settings:{
        outputSelection:{
            "*":["*"], 
        }
    }
}

var output = json.parse(solc.compile(JSON.stringify(input)));
console.log("result:",output);

ABI = output.contracts[Simplestorage.sol]["Simplestorage"].abi;
bytecode = output.contracts["Simplestorage.sol"]["Simplestorage"].evm.bytecode.object;
console.log("Bytecode: ",bytecode);
console.log("ABI : ",ABI);
