import { createContext, useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import Web3 from "web3";
import { createWeb3Object } from "../services/web3-services";
var web3Defaultobj;

export const web3GlobalContext = createContext({});


export function Web3Global({ children }) {
    const account = useActiveAccount();
    const connectedWalletAddress = account?.address;
    const [web3Obj, setWeb3Obj] = useState();

    useEffect(() => {
        if (connectedWalletAddress) {
            let web3 = new Web3(window.ethereum);
            setWeb3Obj(web3);
        }
    }, [connectedWalletAddress]);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("disconnect", () => {
                web3Defaultobj = createWeb3Object();
                setWeb3Obj(web3Defaultobj);
                console.log("disconnected");
            });
        }
    }, []);

    return (
        <web3GlobalContext.Provider
            value={{ web3Obj, setWeb3Obj }}
        >
            {children}
        </web3GlobalContext.Provider>
    )
}