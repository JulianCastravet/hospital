import { Modal, DatePicker, Input, Form } from "antd";
import { FormInstance } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";

export interface DiagnoseModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  form: FormInstance;
}

export const DiagnoseModal = (props: DiagnoseModalProps) => {
  const { open, onOk, onCancel, form } = props;

  return (
    <Modal open={open} onOk={onOk} destroyOnHidden onCancel={onCancel}>
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
          name="diagnose"
          label="Diagnose"
          required
          rules={[{ required: true }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          required
          rules={[{ required: true }]}
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
