import React, { useState } from "react";
import { Input, Select, Button, Upload, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "../../styles/CreateAgent.module.css";
import "../../styles/agentModal.css";

const { TextArea } = Input;
const { Option } = Select;

const CreateAgent = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [ticker, setTicker] = useState("");
  const [biography, setBiography] = useState("");
  const [agentType, setAgentType] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleUpload = ({ file }) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfilePicture(reader.result);
    };
  };


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create New AI Agent (New Token)</h2>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>AI Agent Name *</label>
          <Input
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
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
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
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
            <Option value="Informative">Informative</Option>
            <Option value="Productivity">Productivity</Option>
            <Option value="Entertainment">Entertainment</Option>
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
          onClick={() => setOpenCreateModal(true)}
        >
          Create Agent
        </Button>

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
              <span>100 <span style={{ color: 'rgb(67, 187, 194)', fontWeight: 500 }}>$G</span></span>
            </div>
            <div className="payment-item">
              <span>Your Initial Buy</span>
              <span>0 <span style={{ color: 'rgb(67, 187, 194)', fontWeight: 500 }}>$G</span></span>
            </div>
            <div className="payment-item total">
              <span>Total</span>
              <span>100 <span style={{ color: 'rgb(67, 187, 194)', fontWeight: 500 }}>$G</span></span>
            </div>
          </div>

          <div className="buttons">
            <button className="create-agent" disabled>
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
