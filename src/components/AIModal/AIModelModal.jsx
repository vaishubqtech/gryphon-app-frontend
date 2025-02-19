import React from "react";
import { Modal } from "antd";

const AIModelModal = ({ isVisible, onOk, onCancel, title, children }) => {
  return (
    <Modal
      title={title}
      visible={isVisible}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      centered
    >
      {children}
    </Modal>
  );
};

export default AIModelModal;
