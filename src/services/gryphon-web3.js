import Web3 from "web3";
import config from "../config";
import FactoryABI from "../contract-abi/gryphon-factory.abi.json"
import TokenABI from "../contract-abi/gryphon-token.abi.json"

export const requiredGryphonAmount = async () => {
    try {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(FactoryABI, config.factory_contract_address);
        let result = await contract.methods.requiredGryphonAmount().call();
        console.log("requiredGryphonAmount", result);
        return result;
    } catch (e) {
        console.log("error in requiredGryphonAmount", e)
        return;
    }
}

export const approveFactory = async(gryphonAmountInWei,walletAddress) =>{
   console.log("---", gryphonAmountInWei,walletAddress)
    try{
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(TokenABI, config.gryphon_token_address);
        let result = await contract.methods.approve(config.factory_contract_address,gryphonAmountInWei).send({from:walletAddress});
        console.log("approveFactory", result);
        return result;
    }catch(e){
        console.log("error in approveFactory", e)
        return;
    }
}

export const createAgentSC = async(name,descriptions,TokenName,tokenSymbol,walletAddress) => {
    try{
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(FactoryABI, config.factory_contract_address);
        let result = await contract.methods.createAgent(name,descriptions,TokenName,tokenSymbol).send({from:walletAddress});
        console.log("createAgent", result);
        return result;
    }catch(e){
        console.log("error in createAgent", e)
        return;
    }
}