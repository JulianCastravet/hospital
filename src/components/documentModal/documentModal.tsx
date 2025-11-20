import {
  Modal,
  DatePicker,
  Input,
  Form,
  Upload,
  Button,
  UploadFile,
} from "antd";
import { FormInstance } from "antd/es/form/Form";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { UploadChangeParam } from "antd/es/upload";
import { Document } from "../../types/document";

export interface DocumentModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  form: FormInstance;
  confirmLoading?: boolean;
}

export const DocumentModal = (props: DocumentModalProps) => {
  const { open, onOk, onCancel, form, confirmLoading } = props;
  const [file, setFile] = useState<UploadFile<Document>[] | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const FILE_SIZE = 1048576; // 1MB

  const handleChange = (doc: UploadChangeParam<UploadFile<Document>>) => {
    if (doc.file.size && doc.file.size > FILE_SIZE) {
      setErrorMessage("File should be less than 1 Mb");
      return;
    } else {
      setFile(doc.fileList);
      setErrorMessage("");
    }
  };

  return (
    <Modal
      open={open}
      onOk={onOk}
      destroyOnHidden
      onCancel={onCancel}
      confirmLoading={confirmLoading}
    >
      <Form form={form}>
        <Form.Item
          name="time"
          label="Date/Time"
          required
          rules={[{ required: true }]}
        >
          <DatePicker showTime format={"DD/MM/YYYY HH:mm"} />
        </Form.Item>
        <Form.Item
          name="document"
          label="PDF Document"
          required
          rules={[{ required: true }]}
          className={errorMessage && "mb-1"}
        >
          <Upload
            beforeUpload={() => false}
            multiple={false}
            maxCount={1}
            fileList={file}
            onChange={(doc) => handleChange(doc)}
            accept=".pdf"
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        {errorMessage && (
          <span className="text-red-500 text-center w-full block">
            {errorMessage}
          </span>
        )}
        <Form.Item
          name="title"
          label="Title"
          required
          rules={[{ required: true }]}
        >
          <Input type="text" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
