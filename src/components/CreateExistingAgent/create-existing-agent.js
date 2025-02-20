import React, { useState } from "react";
import { Input, Select, Button, Switch, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "../../styles/CreateAgent.module.css";

const { TextArea } = Input;
const { Option } = Select;

const CreateExistingAgent = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [biography, setBiography] = useState("");
  const [visibility, setVisibility] = useState(true);
  const [agentType, setAgentType] = useState(null);
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
      <h2 className={styles.title}>Create New AI Agent (Existing Token)</h2>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>AI Agent Name *</label>
          <Input
            placeholder="AI Agent's name will be populated according to the token contract address."
            className={styles.input}
            disabled
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Token Contract Address on BASE Chain *</label>
          <Input
            placeholder="Token Contract Address on BASE Chain"
            className={styles.input}
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>AI Agent Biography *</label>
          <TextArea
            placeholder="This is the short bio that will be shown at your agent's profile."
            rows={4}
            className={styles.textArea}
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Agent Visibility</label>
          <Switch
            checkedChildren="Public"
            unCheckedChildren="Private"
            checked={visibility}
            onChange={setVisibility}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Agent Type *</label>
          <Select
            className={styles.select}
            placeholder="None"
            value={agentType}
            onChange={setAgentType}
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

        <div className={styles.advancedSettings}>
          <Button type="link" className={styles.advancedButton}>
            Advanced Settings
          </Button>
        </div>

        <Button type="primary" className={styles.createButton}>
          Create Agent
        </Button>
      </div>
    </div>
  );
};

export default CreateExistingAgent;
