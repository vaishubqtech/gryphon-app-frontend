import React, { useState, useEffect } from "react";
import { Input, Select, Button, Upload, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "../../styles/CreateAgent.module.css";
import "../../styles/agentModal.css";
import { createAgent } from "../../services/APIManager";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { approveFactory, createAgentSC, requiredGryphonAmount } from "../../services/gryphon-web3";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;
const { Option } = Select;

const CreateAgent = () => {
  const navigate = useNavigate()
  const walletAddress = localStorage.getItem("publicAddress")
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("https://s3.ap-southeast-1.amazonaws.com/virtualprotocolcdn/name_7c02cc545e.jpeg");
  const [erc20Address, setErc20Address] = useState("0x7A5f5CcD46EBd7aC30615836D988ca3BD57412b3 ");
  const [ticker, setTicker] = useState("");
  const [bio, setBio] = useState("");
  const [agentType, setAgentType] = useState("");
  const [goal, setGoal] = useState("goal");
  const [personality, setPersonality] = useState("personality");
  const [niche, setNiche] = useState("niche");
  const [gryphonAmountInWei, setGryphonAmountInWei] = useState()
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");



  useEffect(() => {
    reqAmountInWei()
  }, [])


  const reqAmountInWei = async () => {
    try {
      const reqAmountInWeiRes = await requiredGryphonAmount();
      console.log("-----reqAmountInWeiRes-------", reqAmountInWeiRes.toString())
      setGryphonAmountInWei(reqAmountInWeiRes.toString())
    } catch (e) {
      console.log("error in reqAmountInWei ", e)
      return
    }
  }

  const approve_Factory = async () => {
    try {

      const approveFactoryRes = await approveFactory(gryphonAmountInWei, walletAddress);
      console.log("-----approveFactoryRes-------", approveFactoryRes)
      if (approveFactoryRes) {
        await create_agent();
      }
    } catch (e) {
      console.log("error in reqAmountInWei ", e)
      return;
    }
  }

  const create_agent = async () => {
    try {
      const createAgentRes = await createAgentSC(name,bio,name,ticker,walletAddress);
      console.log("-----createAgentRes-------", createAgentRes)
      if(createAgentRes?.status){
        await handleSubmit();
      }
    } catch (e) {
      console.log("error in create_agent ", e)
      return;
    }
  }


  const submitWeb3 = async () => {
    await approve_Factory();
  }



  const handleUpload = ({ file }) => {
    const actualFile = file.originFileObj || file; // Ensure we get the real file
    console.log("--file--", file)
    if (!actualFile || !(actualFile instanceof Blob)) {
      console.error("Invalid file:", actualFile);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(actualFile);
    reader.onload = () => {
      console.log("reader.result", reader.result); // Confirm reader.result is set
      setProfileImage(reader.result);
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };


  const handleSubmit = async () => {   
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("authToken");
    // await handleUpload();

    const agentData = {
      name,
      profileImage,
      erc20Address,
      ticker,
      bio,
      agentType,
      goal,
      personality,
      niche,
    };
    console.log("---agentData---", agentData)
    try {
      const response = await createAgent(agentData, token);

      if (response.success) {
        toast.success("Agent created successfully!", {
          position: "top-right",
          className: "copy-toast-message",
        });
        setMessage("Agent created successfully!");
        navigate("/")
        resetForm();
      } else {
        toast.error("Error Notification !", {
          position: "top-right",
        });
        setMessage(`Error: ${response.message}`);
      }
    } catch (error) {
      setMessage(`Request failed: ${error.message}`);
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setProfileImage("");
    setErc20Address("");
    setTicker("");
    setBio("");
    setAgentType("");
    setGoal("");
    setPersonality("");
    setNiche("");
  };


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create New AI Agent (New Token)</h2>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>AI Agent Name *</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Agent Name"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Ticker *</label>
          <Input
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="$"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>AI Agent Biography *</label>
          <TextArea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="This is the short bio that will be shown at your agent's profile."
            rows={4}
            className={styles.textArea}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Agent Type *</label>
          <Select
            className={styles.select}
            placeholder="None"
            value={agentType}
            onChange={(value) => setAgentType(value)}
          >
            <Option value="None">None</Option>
            <Option value="on-chain">On-chain</Option>
            <Option value="informative">Informative</Option>
            <Option value="Productivity">Productivity</Option>
            <Option value="Entertainment">Entertainment</Option>
            <Option value="Creative">Creative</Option>
          </Select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>AI Agent Profile Picture *</label>
          <Upload beforeUpload={() => false} onChange={handleUpload}>
            <Button icon={<UploadOutlined />}>Upload Picture</Button>
          </Upload>
        </div>

        <div className={styles.disclaimer}>
          <p>
            <strong>Disclaimer:</strong> Avoid using third-party token lockers during the bonding stage, as it may lead to token loss. Instead, send tokens to Virtuals wallet
            <strong> 0xAd4686299F85...e2AE252 </strong> for a secure, immediate 6-month lock.
          </p>
        </div>

        <Button
          type="primary"
          className={styles.createButton}
          // onClick={() => setOpenCreateModal(true)}
          // onClick={handleSubmit}

          onClick={submitWeb3}
          style={{ color: '#fff' }}
        >
          Create Agent
        </Button>
        <ToastContainer />
        <Modal
          title=""
          open={openCreateModal}
          onOk={() => setOpenCreateModal(false)}
          onCancel={() => setOpenCreateModal(false)}
          footer={null}
        >
          <h2 className="title">Creation Summary</h2>
          <h3 className="subtitle">Buy $GRYPH</h3>
          <p className="description">
            Purchasing a small amount of your token is optional but can help protect your coin from snipers.
          </p>

          <div className="section">
            <label className="section-title">VIRTUAL</label>
            <input type="text" className="input" value="0" readOnly />
            <p className="receive-info">You will receive 0 🦅 (0%)</p>
            <p className="trading-fee">Trading Fee ⓘ</p>
          </div>

          <div className="payment-summary">
            <h4 className="payment-title">Payment Summary</h4>
            <div className="payment-item">
              <span>Agent Creation Fee</span>
              <span>100 <span style={{ color: '#f85d4f', fontWeight: 500 }}>$G</span></span>
            </div>
            <div className="payment-item">
              <span>Your Initial Buy</span>
              <span>0 <span style={{ color: '#f85d4f', fontWeight: 500 }}>$G</span></span>
            </div>
            <div className="payment-item total">
              <span>Total</span>
              <span>100 <span style={{ color: '#f85d4f', fontWeight: 500 }}>$G</span></span>
            </div>
          </div>

          <div className="buttons">
            <button className="create-agent"  >
              Create Agent
            </button>
            <button className="cancel">Cancel</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CreateAgent;
