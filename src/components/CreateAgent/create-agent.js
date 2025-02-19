// pages/create-agent.js
import React from "react";
import { Input, Select, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "../../styles/CreateAgent.module.css";

const { TextArea } = Input;
const { Option } = Select;

const CreateAgent = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create New AI Agent (New Token)</h2>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>AI Agent Name *</label>
          <Input placeholder="Agent Name" className={styles.input} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Ticker *</label>
          <Input placeholder="$" className={styles.input} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>AI Agent Biography *</label>
          <TextArea
            placeholder="This is the short bio that will be shown at your agent's profile."
            rows={4}
            className={styles.textArea}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Agent Type *</label>
          <Select className={styles.select} placeholder="None">
            <Option value="type1">Type 1</Option>
            <Option value="type2">Type 2</Option>
            <Option value="type3">Type 3</Option>
          </Select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>AI Agent Profile Picture *</label>
          <Upload>
            <Button icon={<UploadOutlined />}>Upload Picture</Button>
          </Upload>
        </div>

        <div className={styles.disclaimer}>
          <p>
            <strong>Disclaimer:</strong> Avoid using third-party token lockers during
            the bonding stage, as it may lead to token loss. Instead, send tokens to Virtuals wallet 
            <strong>0xAd4686299F85...e2AE252</strong> for a secure, immediate 6-month lock.
          </p>
        </div>

        <Button type="primary" className={styles.createButton} disabled>
          Create Agent
        </Button>
      </div>
    </div>
  );
};

export default CreateAgent;
