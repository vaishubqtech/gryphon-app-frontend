"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal } from 'antd';
import styles from "../../styles/Navbar.module.css";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { RocketOutlined, DollarOutlined } from "@ant-design/icons";
import { Link , useNavigate} from "react-router-dom";




const Navbar = () => {
  const navigate = useNavigate();
  const [isCreateAgentModal, setIsCreateAgentModal] = useState(false);
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
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={()=>navigate("/")}>
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
        <button className={styles.createButton} onClick={showModal} >Create New Agent</button>
        <ConnectButton
          client={client}
          wallets={wallets}
          connectModal={{ size: "compact" }}
          theme={"light"}
          appMetadata={{
            name: "Virtual Protocol",
            url: "https://example.com",
          }}
        />
          
      <Modal title="Create Agent" open={isCreateAgentModal} onOk={handleOk} onCancel={handleCancel} footer={null}>
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
