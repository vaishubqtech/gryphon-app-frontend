"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import styles from "../../styles/Navbar.module.css";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { RocketOutlined, DollarOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Web3 from "web3";
import { useActiveAccount } from "thirdweb/react";
import { getNonce, verifyUser } from "../../services/APIManager";
var decimalChainId;
var publicAddress;

const Navbar = () => {
  const account = useActiveAccount();
  const navigate = useNavigate();

  const [isCreateAgentModal, setIsCreateAgentModal] = useState(false);
  const [getNonceData, setGetNonceData] = useState();
  const [verifyUserData, setVerifyUser] = useState();

  const showModal = () => {
    setIsCreateAgentModal(true);
  };
  const handleOk = () => {
    setIsCreateAgentModal(false);
  };
  const handleCancel = () => {
    setIsCreateAgentModal(false);
  };

  const handleLaunchNewToken = () => {
    navigate("/create-new-agent");
    setIsCreateAgentModal(false);
  };
  const handleExistingToken = () => {
    navigate("/create-existing-agent");
    setIsCreateAgentModal(false);
  };

  const client = createThirdwebClient({
    clientId: "bfb4a8901e09d80f302031db896aeec8",
  });
  const wallets = [
    inAppWallet({
      auth: {
        options: ["email"],
      },
    }),
    createWallet("io.metamask"),
    createWallet("com.trustwallet.app"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
  ];

  useEffect(() => {
    getAccount();   
  }, []);

  useEffect(() => {
    const publicAddress = localStorage.getItem("publicAddress");

    if (publicAddress) {
      getNonceApi();
      // verifyUserApi();
    }
  }, []);


  async function getAccount() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    publicAddress = accounts[0].toLowerCase();
    localStorage.setItem("publicAddress", publicAddress);
    let currentChain = await window.ethereum.request({ method: "eth_chainId" });
    decimalChainId = parseInt(currentChain, 16);
    localStorage.setItem("chainId", decimalChainId);

  }

  const getNonceApi = async () => {
    try {
      const nonceResult = await getNonce("0xda3b7E159f3fB7D1744673e821F22a0b961cE2B6", "2525");
      console.log("nonceResult", nonceResult);
      if (nonceResult.success) {
        setGetNonceData(nonceResult.data);
       
      }
      await verifyUserApi(nonceResult.data.nonce)
    } catch (err) {
      console.log("error in getNonce API", err);
      return;
    }
  };

  const verifyUserApi = async (nonce) => {
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signature = await web3.eth.personal.sign(
        web3.utils.utf8ToHex(`I am signing my one-time nonce:  ${nonce}`),
        publicAddress,
        ""
      );
      console.log("signature", signature)
      const verifyUserResult = await verifyUser(
        publicAddress,
        decimalChainId,
        signature
      );
      console.log("verifyUserResult", verifyUserResult);
      if(verifyUserResult.success){
        setVerifyUser(verifyUserResult.data)
      }
    } catch (err) {
      console.log("error in verifyUserApi API", err);
      return;
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        <span className={styles.brand}>Gryphon</span>
        <span className={styles.subtext}>PROTOCOL</span>
      </div>

      <ul className={styles.navLinks}>
        <li>
          <Link href="#">Sentient</Link>
        </li>
        <li>
          <Link href="#">Prototype</Link>
        </li>
        <li>
          <Link href="#">About</Link>
        </li>
        <li>
          <Link href="#">Try G.A.M.E</Link>
        </li>
      </ul>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
        />
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.createButton} onClick={showModal}>
          Create New Agent
        </button>
        <ConnectButton
          client={client}
          wallets={wallets}
          connectModal={{ size: "compact" }}
          theme={"light"}
          appMetadata={{
            name: "Gryphon Protocol",
            url: "https://example.com",
          }}
        />

        <Modal
          title="Create Agent"
          open={isCreateAgentModal}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div className={styles.modalContent}>
            <div className={styles.option} onClick={handleLaunchNewToken}>
              <RocketOutlined className={styles.icon} />
              <div>Launch a New Token</div>
            </div>
            <div className={styles.option} onClick={handleExistingToken}>
              <DollarOutlined className={styles.icon} />
              <div>I have my Own Token</div>
            </div>
          </div>
        </Modal>
      </div>
    </nav>
  );
};

export default Navbar;
